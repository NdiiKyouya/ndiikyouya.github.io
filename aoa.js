    // ── THEME TOGGLE ──────────────────────────────────────────
    const htmlEl = document.documentElement;
    const btn    = document.getElementById('themeToggle');
    const sun    = document.getElementById('iconSun');
    const moon   = document.getElementById('iconMoon');

    function applyTheme(t) {
      htmlEl.setAttribute('data-theme', t);
      sun.style.display  = t === 'dark' ? '' : 'none';
      moon.style.display = t === 'dark' ? 'none' : '';
      try { localStorage.setItem('theme', t); } catch {}
    }
    try { const s = localStorage.getItem('theme'); if (s) applyTheme(s); } catch {}
    btn.addEventListener('click', () => applyTheme(htmlEl.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'));

    // ── HAMBURGER ─────────────────────────────────────────────
    const ham  = document.getElementById('hamburger');
    const menu = document.getElementById('mobileMenu');
    ham.addEventListener('click', () => {
      const open = ham.classList.toggle('open');
      menu.classList.toggle('open', open);
    });
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      ham.classList.remove('open'); menu.classList.remove('open');
    }));

    // ── CURSOR GLOW ───────────────────────────────────────────
    const glow = document.getElementById('glow');
    document.addEventListener('mousemove', e => {
      glow.style.setProperty('--mx', e.clientX + 'px');
      glow.style.setProperty('--my', e.clientY + 'px');
    });

    // ── SCROLL REVEAL ─────────────────────────────────────────
    const revObs = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('visible'), i * 80);
          revObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => revObs.observe(el));

    // ── ACTIVE NAV ────────────────────────────────────────────
    const navH = parseInt(getComputedStyle(htmlEl).getPropertyValue('--nav-h')) || 68;
    const linkMap = {};
    document.querySelectorAll('.nav-links a').forEach(a => { linkMap[a.getAttribute('href').slice(1)] = a; });
    const secObs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        const a = linkMap[e.target.id];
        if (a) a.style.color = e.isIntersecting ? 'var(--text)' : '';
      });
    }, { rootMargin: `-${navH}px 0px -60% 0px` });
    document.querySelectorAll('section[id]').forEach(s => secObs.observe(s));
    
  document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
    alert("Maaf, fitur klik kanan dinonaktifkan demi keamanan konten.");
  });

  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('dragstart', function (e) {
      e.preventDefault();
    });
  });

  document.addEventListener('selectstart', function (e) {
    e.preventDefault();
  });
  document.addEventListener('copy', function (e) {
    e.preventDefault();
  });
    
  document.addEventListener('keydown', function (e) {
    if (e.key === "F12") {
      e.preventDefault();
    }
    
    if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j' || e.key === 'C' || e.key === 'c')) {
      e.preventDefault();
    }
    if (e.ctrlKey && (e.key === 'U' || e.key === 'u' || e.key === 'S' || e.key === 's' || e.key === 'P' || e.key === 'p')) {
      e.preventDefault();
    }

    if (e.ctrlKey && (e.key === '+' || e.key === '-' || e.key === '=' || e.key === '0')) {
      e.preventDefault();
    }
    
    if (e.key === "PrintScreen" || (e.metaKey && e.shiftKey && (e.key === 'S' || e.key === 's'))) {
      navigator.clipboard.writeText("");
    }
  });

  document.addEventListener('gesturestart', function (e) {
    e.preventDefault();
  });
  document.addEventListener('touchmove', function (e) {
    if (e.scale !== undefined && e.scale !== 1) { 
      e.preventDefault(); 
    }
  }, { passive: false });
  
// ── AUTO SCROLL PER SEGMEN (PAS DI TENGAH - FIX BALIK KE ATAS) ──
let sectionTimer;
const inactivityDelay = 5000; // Waktu tunggu tanpa aktivitas (5 detik)
const sectionsList = ['hero', 'about', 'journey', 'projects', 'skills', 'contact'];

function getNextSectionId() {
  // 1. TAMBAHAN PERBAIKAN: Cek apakah posisi scroll sudah mentok di batas bawah halaman
  const currentScroll = window.scrollY;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  
  // Jika jarak ke bawah sisa 10px atau kurang, langsung paksa balik ke 'hero'
  if (currentScroll >= maxScroll - 10) {
    return sectionsList[0];
  }

  // 2. Logika aslimu yang sudah cocok (Deteksi berdasarkan titik tengah layar)
  const midScreen = currentScroll + (window.innerHeight / 2);

  for (let i = 0; i < sectionsList.length; i++) {
    const el = document.getElementById(sectionsList[i]);
    if (el) {
      const top = el.offsetTop;
      const height = el.offsetHeight;
      
      if (midScreen >= top && midScreen < top + height) {
        if (i === sectionsList.length - 1) {
          return sectionsList[0]; // Jika terdeteksi di seksi terakhir, balik ke 'hero'
        }
        return sectionsList[i + 1]; // Pilih seksi berikutnya
      }
    }
  }
  return sectionsList[1];
}

function scrollToNextSection() {
  const nextId = getNextSectionId();
  const targetEl = document.getElementById(nextId);
  
  if (targetEl) {
    if (nextId === 'hero') {
      // Jika kembali ke hero, scroll langsung ke paling atas halaman secara smooth
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Memaksa seksi target berhenti pas di tengah layar (Vertikal)
      targetEl.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  }
  
  // Pasang timer ulang untuk seksi selanjutnya
  sectionTimer = setTimeout(scrollToNextSection, inactivityDelay);
}

function resetSectionTimer() {
  clearTimeout(sectionTimer);
  sectionTimer = setTimeout(scrollToNextSection, inactivityDelay);
}

// Deteksi aktivitas pengguna untuk mereset hitung mundur
['mousemove', 'mousedown', 'pointerdown', 'touchstart', 'scroll', 'keydown'].forEach(evt => {
  window.addEventListener(evt, resetSectionTimer, { passive: true });
});

// Jalankan pertama kali saat halaman dimuat
resetSectionTimer();
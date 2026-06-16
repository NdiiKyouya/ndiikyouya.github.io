<?php
// Tentukan nama cookie dan masa berlakunya (misal: 6 jam)
$cookie_name = "ndiik_verified";
$cookie_value = "secure_token_2026"; // Anda bebas mengubah token ini

if (!isset($_COOKIE[$cookie_name]) || $_COOKIE[$cookie_name] !== $cookie_value) {
    // Jika cookie tidak ada atau salah, tampilkan halaman verifikasi JavaScript
    ?>
    <!DOCTYPE html>
    <html lang="id">
    <head>
        <meta charset="UTF-8">
        <title>Memverifikasi Browser Anda...</title>
        <style>
            body { font-family: sans-serif; text-align: center; padding-top: 50px; background: #f9f9f9; }
            .loader { border: 4px solid #f3f3f3; border-top: 4px solid #3498db; border-radius: 50%; width: 40px; height: 40px; animation: spin 1s linear infinite; margin: 20px auto; }
            @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        </style>
    </head>
    <body>
        <h2>Mohon tunggu sebentar...</h2>
        <p>Kami sedang memastikan koneksi Anda aman.</p>
        <div class="loader"></div>

        <script>
            // Fungsi sederhana untuk menyimulasikan proses pengecekan browser
            (function() {
                // Menanam cookie lewat JavaScript
                var name = "<?php echo $cookie_name; ?>";
                var value = "<?php echo $cookie_value; ?>";
                var expires = new Date();
                expires.setTime(expires.getTime() + (6 * 60 * 60 * 1000)); // 6 Jam
                
                document.cookie = name + "=" + value + "; expires=" + expires.toUTCString() + "; path=/; SameSite=Strict";
                
                // Refresh halaman setelah cookie ditanam
                setTimeout(function() {
                    location.reload();
                }, 1000); // Delay 1 detik agar terlihat natural
            })();
        </script>
        <noscript>
            <p><strong>Peringatan:</strong> Aktifkan JavaScript di browser Anda untuk mengakses website ini.</p>
        </noscript>
    </body>
    </html>
    <?php
    exit(); // Hentikan eksekusi script agar konten asli tidak bocor ke bot
}
?>

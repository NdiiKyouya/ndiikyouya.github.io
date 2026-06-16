<?php
$cookie_name = "__test_portofolio";
$secret_value = "sukses_lewati_bot_challenge_99"; 

if (!isset($_COOKIE[$cookie_name]) || $_COOKIE[$cookie_name] !== $secret_value) {
    
    ?>
    <!DOCTYPE html>
    <html>
    <head>
        <title>Memverifikasi Browser Anda...</title>
        <style>
            body { font-family: sans-serif; text-align: center; padding-top: 50px; background: #f4f4f4; }
            .loader { border: 4px solid #f3f3f3; border-top: 4px solid #3498db; border-radius: 50%; width: 40px; height: 40px; animation: spin 1s linear infinite; margin: 20px auto; }
            @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        </style>
      
        <script src="https://cloudflare.com"></script>
    </head>
    <body>
        <h2>Mohon tunggu sebentar...</h2>
        <p>Kami sedang memastikan koneksi Anda aman.</p>
        <div class="loader"></div>

        <script>
            var ciphertext = "U2FsdGVkX196vWb4SgN067pLOfOBl+R/6nK47e5G9HscM3FvY0u96tKWhqYgUymn"; 
            var passPhrase = "KucingBahlilKueSalju";

            try {
                var bytes  = CryptoJS.AES.decrypt(ciphertext, passPhrase);
                var originalValue = bytes.toString(CryptoJS.enc.Utf8);

                if (originalValue === "sukses_lewati_bot_challenge_99") {
                    document.cookie = "<?php echo $cookie_name; ?>=" + originalValue + "; max-age=21600; path=/";
                    
                    location.reload();
                } else {
                    document.write("Gagal memverifikasi browser. Pastikan JavaScript aktif.");
                }
            } catch(e) {
                document.write("Terjadi kesalahan keamanan.");
            }
        </script>
        <noscript>Website ini memerlukan JavaScript. Aktifkan JavaScript pada browser Anda.</noscript>
    </body>
    </html>
    <?php
    exit;
}

?>

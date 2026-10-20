// Fungsi Utama Pemrosesan AI
function runAIFeature() {
    // 1. Ambil Nilai Input dari Form
    const productName = document.getElementById('productName').value;
    const category = document.getElementById('category').value;
    const targetAudience = document.getElementById('targetAudience').value;
    const tone = document.getElementById('tone').value;

    const outputCard = document.getElementById('outputCard');
    const loading = document.getElementById('loading');
    const resultContent = document.getElementById('aiResultContent');

    // 2. Tampilkan Card Hasil & Spinner Loading
    outputCard.style.display = 'block';
    loading.style.display = 'block';
    resultContent.innerHTML = ''; // Kosongkan hasil sebelumnya

    // Scroll otomatis ke bagian hasil
    outputCard.scrollIntoView({ behavior: 'smooth' });

    // 3. Simulasi Delay Pemrosesan AI (Delay 1.5 detik agar terasa seperti AI nyata)
    setTimeout(() => {
        loading.style.display = 'none'; // Sembunyikan loading

        // Generasi Teks Promo Berdasarkan Input
        const generatedData = generateAIPrompt(productName, category, targetAudience, tone);

        // Render Hasil ke HTML
        resultContent.innerHTML = `
            <div class="result-item">
                <h4>📌 Slogan / Catchphrase Utama:</h4>
                <p><em>"${generatedData.slogan}"</em></p>
            </div>
            
            <div class="result-item">
                <h4>📲 Teks Postingan Instagram / TikTok:</h4>
                <p>${generatedData.caption}</p>
            </div>

            <div class="result-item">
                <h4>💬 Teks Pesan WhatsApp (Direct Sales):</h4>
                <p>${generatedData.whatsappMsg}</p>
            </div>

            <div class="result-item">
                <h4>🏷️ Rekomendasi Hashtag:</h4>
                <p style="color: #4f46e5;">${generatedData.hashtags}</p>
            </div>
        `;
    }, 1500);
}

// Fungsi Logika Generator Teks AI (Simulasi)
function generateAIPrompt(product, category, target, tone) {
    let slogan = "";
    let caption = "";
    let whatsappMsg = "";
    let hashtags = "";

    // Penyesuaian berdasarkan Tone of Voice
    if (tone === "santai") {
        slogan = `Bikin hari kamu makin seru bareng ${product}! ✨`;
        caption = `Gak usah pusing nyari yang pas buat ${target}! Sekarang ada <strong>${product}</strong> yang siap nemenin aktivitas kamu. Dijamin bikin nagih dan gak bikin kantong jebol! Yuk checkout sekarang sebelum kehabisan! 🚀`;
        whatsappMsg = `Halo Kak! 👋 Mau kasih tahu nih, ${product} lagi ada promo spesial khusus hari ini buat kamu. Mau amankan slot promonya sekarang? 😊`;
    } else if (tone === "profesional") {
        slogan = `Solusi Terbaik & Terpercaya untuk ${product}.`;
        caption = `Mencari kualitas tanpa kompromi untuk kebutuhan ${target}? <strong>${product}</strong> hadir memberikan standar terbaik dalam kategori ${category}. Terbukti memberikan nilai lebih untuk kenyamanan Anda. Hubungi kami untuk konsultasi lebih lanjut.`;
        whatsappMsg = `Selamat pagi/siang Bapak/Ibu. Kami dari tim ${product} ingin menginformasikan penawaran eksklusif layanan ${category} untuk Anda. Silakan balas pesan ini untuk menerima katalog resmi.`;
    } else if (tone === "persuasif") {
        slogan = `Jangan Sampai Kehabisan! Stok ${product} Makin Menipis! 🔥`;
        caption = `🚨 <strong>PERHATIAN UNTUK ${target.toUpperCase()}!</strong> 🚨 Sering merasa kesulitan mencari ${category} yang berkualitas? <strong>${product}</strong> adalah solusinya! Khusus 10 pembeli pertama hari ini dapat DISKON KELIPATAN! Klik link di bio sekarang!`;
        whatsappMsg = `PEMBERITAHUAN PENTING! ⚠️ Promo diskon ${product} akan berakhir dalam 3 jam lagi. Jangan sampai terlewat, pesan unit Anda sekarang juga di sini!`;
    } else { // Lucu / Humoris
        slogan = `Hidup itu berat, yang ringan cuma harga ${product}! 😄`;
        caption = `Kata orang bahagia itu sederhana. Sederhana itu kalau kamu pesan <strong>${product}</strong> terus langsung sampai di depan rumah pas lagi butuh-butuhnya! Khusus buat ${target} yang butuh moodbooster hari ini! 🍫📦`;
        whatsappMsg = `Halo Kak! ${product} di sini. Cuma mau ngingetin, makan/pake produk ini gak bikin doi peka sih, tapi dijamin bikin senyum-senyum sendiri! Coba pesan satu dulu yuk? 😁`;
    }

    // Hashtag Generator
    const cleanProduct = product.replace(/\s+/g, '').toLowerCase();
    hashtags = `#${cleanProduct} #${category} #BisnisLocal #${target.replace(/\s+/g, '')} #PromoSpesial #StartupSMK`;

    return {
        slogan: slogan,
        caption: caption,
        whatsappMsg: whatsappMsg,
        hashtags: hashtags
    };
}

// Fungsi Salin Hasil ke Clipboard
function copyResult() {
    const resultContent = document.getElementById('aiResultContent').innerText;
    
    if (!resultContent) return;

    navigator.clipboard.writeText(resultContent).then(() => {
        alert('✅ Hasil teks berhasil disalin ke clipboard!');
    }).catch(err => {
        console.error('Gagal menyalin teks: ', err);
    });
}

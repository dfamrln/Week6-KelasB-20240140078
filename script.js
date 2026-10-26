document.addEventListener("DOMContentLoaded", () => {
    // ==========================================
    // 1. BAGIAN FORM - DOM & EVENT HANDLING
    // ==========================================
    const memberForm = document.getElementById("memberForm");
    const inputName = document.getElementById("fullname");
    const inputEmail = document.getElementById("email");
    const formFeedback = document.getElementById("formFeedback");

    memberForm.addEventListener("submit", function(event) {
        // Mencegah halaman ter-refresh saat form disubmit
        event.preventDefault();

        // Mengambil nilai input dan menghapus spasi berlebih
        const nameValue = inputName.value.trim();
        const emailValue = inputEmail.value.trim();

        // Validasi Sederhana
        if (nameValue === "" || emailValue === "") {
            // Tampilkan pesan error jika ada input yang kosong
            formFeedback.style.display = "block";
            formFeedback.className = "feedback-box error";
            formFeedback.innerHTML = "❌ Gagal! Nama lengkap dan alamat email wajib diisi.";
            return;
        }

        if (!emailValue.includes("@")) {
            // Validasi dasar format email
            formFeedback.style.display = "block";
            formFeedback.className = "feedback-box error";
            formFeedback.innerHTML = "❌ Gagal! Format email tidak valid.";
            return;
        }

        // Jika validasi berhasil, manipulasi DOM untuk umpan balik sukses
        formFeedback.style.display = "block";
        formFeedback.className = "feedback-box success";
        formFeedback.innerHTML = `✅ Sukses! Pendaftaran berhasil.<br>Halo, <strong>${nameValue}</strong>. Konfirmasi telah dikirim ke <em>${emailValue}</em>.`;

        // Reset form input setelah sukses
        memberForm.reset();
    });


    // ==========================================
    // 2. BAGIAN FETCH API - DATA PRODUK
    // ==========================================
    const productContainer = document.getElementById("productContainer");

    async function getProducts() {
        try {
            // Fetch data dari endpoint yang ditentukan
            const response = await fetch("https://dummyjson.com/products");
            
            // Cek apakah response berhasil
            if (!response.ok) {
                throw new Error("HTTP error! status: " + response.status);
            }
            
            // Olah response ke JSON
            const data = await response.json();
            const products = data.products;

            // Bersihkan tulisan "Memuat data produk..."
            productContainer.innerHTML = "";

            // Buat pembungkus grid untuk styling CSS
            const gridContainer = document.createElement("div");
            gridContainer.className = "product-grid";

            // Tampilkan data ke halaman web (minimal nama dan harga)
            products.forEach(product => {
                // Membuat elemen pembungkus tiap produk
                const productDiv = document.createElement("div");
                productDiv.className = "product-item";

                // Memasukkan gambar, judul (nama), dan harga menggunakan innerHTML
                productDiv.innerHTML = `
                    <img src="${product.thumbnail}" alt="${product.title}">
                    <h3 class="product-title">${product.title}</h3>
                    <p class="product-price">$${product.price}</p>
                `;

                // Masukkan produk ke dalam grid
                gridContainer.appendChild(productDiv);
            });

            // Masukkan seluruh grid ke dalam container utama di HTML
            productContainer.appendChild(gridContainer);

        } catch (error) {
            // Penanganan Error jika data gagal dimuat (misal: tidak ada internet)
            productContainer.innerHTML = `
                <div class="feedback-box error" style="text-align: center;">
                    <strong>Terjadi Kesalahan:</strong> Gagal memuat data produk.<br>
                    Detail: ${error.message}
                </div>
            `;
        }
    }

    // Panggil fungsi getProducts secara otomatis saat halaman dimuat
    getProducts();
});
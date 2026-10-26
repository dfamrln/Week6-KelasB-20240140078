document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. Form Event Handling ---
    const memberForm = document.getElementById("memberForm");
    const inputName = document.getElementById("fullname");
    const inputEmail = document.getElementById("email");
    const formFeedback = document.getElementById("formFeedback");

    memberForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const nameValue = inputName.value.trim();
        const emailValue = inputEmail.value.trim();

        if (nameValue === "" || emailValue === "") {
            formFeedback.style.display = "block";
            formFeedback.className = "feedback-box error";
            formFeedback.innerHTML = "Harap isi nama dan email Anda.";
            return;
        }

        if (!emailValue.includes("@")) {
            formFeedback.style.display = "block";
            formFeedback.className = "feedback-box error";
            formFeedback.innerHTML = "Format email tidak valid.";
            return;
        }

        formFeedback.style.display = "block";
        formFeedback.className = "feedback-box success";
        formFeedback.innerHTML = `Pendaftaran berhasil. Halo <strong>${nameValue}</strong>, konfirmasi dikirim ke ${emailValue}.`;

        memberForm.reset();
    });


    // --- 2. Fetch API Data ---
    const productContainer = document.getElementById("productContainer");

    async function getProducts() {
        try {
            const response = await fetch("https://dummyjson.com/products?limit=8"); // Limit 8 produk agar rapi
            if (!response.ok) throw new Error("Gagal mengambil data");
            
            const data = await response.json();
            
            productContainer.innerHTML = ""; // Bersihkan loading

            const gridContainer = document.createElement("div");
            gridContainer.className = "product-grid";

            data.products.forEach(product => {
                const productDiv = document.createElement("div");
                productDiv.className = "product-item";

                productDiv.innerHTML = `
                    <img src="${product.thumbnail}" alt="${product.title}">
                    <div class="product-title">${product.title}</div>
                    <div class="product-price">$${product.price}</div>
                `;
                gridContainer.appendChild(productDiv);
            });

            productContainer.appendChild(gridContainer);

        } catch (error) {
            productContainer.innerHTML = `
                <div class="info-msg">
                    Gagal memuat katalog. (${error.message})
                </div>
            `;
        }
    }

    getProducts();
});
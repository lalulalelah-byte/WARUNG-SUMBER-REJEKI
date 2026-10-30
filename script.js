// --- DATA MENU WARUNG SUMBER REJEKI ---
const menuData = [
    { id: 1, nama: "MIE PANGSIT", harga: 6000, kategori: "Mie" },
    { id: 2, nama: "MIE AYAM", harga: 8000, kategori: "Mie" },
    { id: 3, nama: "MIE LEVEL", harga: "8000-9000", minHarga: 8000, kategori: "Mie" }, // Harga rentang
    { id: 4, nama: "TAHU TELOR", harga: 10000, kategori: "Tahu" },
    { id: 5, nama: "TAHU LONTONG", harga: 12000, kategori: "Tahu" }
];

// Array untuk menyimpan item yang dipilih oleh pembeli (Keranjang)
let cart = [];

// Elemen DOM
const menuGrid = document.getElementById("menuGrid");
const cartItemsContainer = document.getElementById("cartItems");
const totalPriceElement = document.getElementById("totalPrice");

// Fungsi untuk menampilkan menu ke halaman HTML secara dinamis
function renderMenu() {
    menuGrid.innerHTML = ""; // Bersihkan kontainer terlebih dahulu

    menuData.forEach(item => {
        // Format tampilan harga (jika berupa angka atau rentang teks)
        let formattedHarga = typeof item.harga === "number" 
            ? `Rp ${item.harga.toLocaleString('id-ID')}` 
            : `Rp ${item.harga}`;

        // Buat elemen kartu menu
        const card = document.createElement("div");
        card.classList.add("menu-card");

        card.innerHTML = `
            <div class="menu-info">
                <h3>${item.nama}</h3>
                <div class="menu-price">${formattedHarga}</div>
            </div>
            <button class="btn-add" onclick="tambahKeKeranjang(${item.id})">
                <i class="fa-solid fa-plus"></i> Pilih Menu
            </button>
        `;

        menuGrid.appendChild(card);
    });
}

// Fungsi untuk menambahkan menu ke dalam keranjang
function tambahKeKeranjang(id) {
    const selectedItem = menuData.find(item => item.id === id);
    
    // Untuk menu dengan harga rentang (MIE LEVEL), ambil nilai minimum atau estimasi awal untuk perhitungan
    let hargaHitung = typeof selectedItem.harga === "number" ? selectedItem.harga : selectedItem.minHarga;

    // Cek apakah item sudah ada di keranjang
    const existingItem = cart.find(cartItem => cartItem.id === id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: selectedItem.id,
            nama: selectedItem.nama,
            hargaAsli: selectedItem.harga,
            hargaHitung: hargaHitung,
            quantity: 1
        });
    }

    updateCartUI();
}

// Fungsi untuk memperbarui tampilan keranjang dan total harga
function updateCartUI() {
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `<p class="empty-cart">Belum ada menu yang dipilih.</p>`;
        totalPriceElement.innerText = "Rp 0";
        return;
    }

    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        let subtotal = item.hargaHitung * item.quantity;
        total += subtotal;

        const itemRow = document.createElement("div");
        itemRow.classList.add("cart-item-row");
        itemRow.innerHTML = `
            <span>${item.nama} (x${item.quantity})</span>
            <span>Rp ${subtotal.toLocaleString('id-ID')}</span>
        `;
        cartItemsContainer.appendChild(itemRow);
    });

    totalPriceElement.innerText = `Rp ${total.toLocaleString('id-ID')}`;
}

// Fungsi interaktif saat tombol checkout / pesan ditekan
function checkoutPesanan() {
    if (cart.length === 0) {
        alert("Silakan pilih menu terlebih dahulu sebelum memesan!");
        return;
    }

    alert("Terima kasih! Pesanan Anda di Warung Sumber Rejeki telah dicatat. Silakan tunggu sebentar.");
    
    // Reset keranjang setelah checkout
    cart = [];
    updateCartUI();
}

// Jalankan fungsi render menu saat halaman pertama kali dimuat
document.addEventListener("DOMContentLoaded", renderMenu);

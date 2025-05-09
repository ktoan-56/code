// cart.js

document.addEventListener('DOMContentLoaded', async () => {
    const productList = document.querySelector('.product-list');
    const totalDisplay = document.querySelector('.total');

    // Tải sản phẩm từ file JSON
    const response = await fetch('products.json');
    const products = await response.json();

    // Tải giỏ hàng từ localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    function formatCurrency(value) {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(value);
    }

    function updateTotal() {
        let total = cart.reduce((sum, item) => sum + item.quantity * item.price, 0);
        totalDisplay.textContent = 'Tổng: ' + formatCurrency(total);
    }
    

    function renderCart() {
        productList.innerHTML = '';
        cart.forEach(item => {
            const div = document.createElement('div');
            div.classList.add('product');
            div.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="product-info">
                    <h3>${item.name}</h3>
                    <p class="price" data-price="${item.price}">${formatCurrency(item.price)}</p>
                    <div class="quantity-control">
                        <button class="decrease">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="increase">+</button>
                    </div>
                </div>
                <button class="remove-btn">Xóa</button>
            `;

            // Tăng,giảm số lượng
            div.querySelector('.increase').addEventListener('click', () => {
                item.quantity++;
                saveCart();
                renderCart();
            });

            div.querySelector('.decrease').addEventListener('click', () => {
                if (item.quantity > 1) {
                    item.quantity--;
                    saveCart();
                    renderCart();
                }
            });

            // Xóa sản phẩm
            div.querySelector('.remove-btn').addEventListener('click', () => {
                cart = cart.filter(p => p.id !== item.id);
                saveCart();
                renderCart();
            });

            productList.appendChild(div);
        });

        updateTotal();
    }

    // Render lần đầu nếu có sản phẩm trong cart
    renderCart();
});

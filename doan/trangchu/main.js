// main.js

document.addEventListener('DOMContentLoaded', async () => {
    const response = await fetch('../giohang/products.json');
    const products = await response.json();
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Gắn sự kiện cho trái tim yêu thích
    document.querySelectorAll('.bx-heart').forEach(heart => {
        const productName = heart.closest('.product').querySelector('h3').textContent;
        const product = products.find(p => p.name === productName);

        if (!product) return;

        // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
        const isInCart = cart.some(item => item.id === product.id);
        if (isInCart) {
            heart.classList.remove('bx-heart');
            heart.classList.add('bxs-heart'); // Nếu có trong giỏ hàng thì trái tim sẽ màu đỏ
        }

        // Xử lý khi người dùng nhấn vào trái tim
        heart.addEventListener('click', () => {
            event.preventDefault();      // Ngăn nhảy link
            event.stopPropagation(); 
            const exists = cart.find(item => item.id === product.id);
            if (!exists) {
                // Thêm vào giỏ hàng
                cart.push({ ...product, quantity: 1 });
                heart.classList.remove('bx-heart');
                heart.classList.add('bxs-heart'); // Đổi màu trái tim thành đỏ
            } else {
                // Xóa khỏi giỏ hàng
                cart = cart.filter(item => item.id !== product.id);
                heart.classList.remove('bxs-heart');
                heart.classList.add('bx-heart'); // Đổi màu trái tim thành xám
            }

            // Lưu giỏ hàng vào localStorage
            localStorage.setItem('cart', JSON.stringify(cart));
        });
    });
});

// themvaogiohang.js (cập nhật)
document.addEventListener('DOMContentLoaded', function() {
    // Xử lý sự kiện click trái tim
    document.body.addEventListener('click', function(e) {
        if (e.target.classList.contains('heart-icon')) {
            e.preventDefault();
            const productId = e.target.getAttribute('data-id');
            const isFavorite = e.target.classList.contains('bxs-heart');
            
            // Toggle trạng thái yêu thích
            toggleFavorite(productId);
            
            // Nếu đang bỏ yêu thích (chuyển từ đỏ sang trắng)
            if (isFavorite) {
                // Xóa khỏi giỏ hàng nếu có
                let cart = JSON.parse(localStorage.getItem('cart')) || [];
                cart = cart.filter(item => item.id !== productId);
                localStorage.setItem('cart', JSON.stringify(cart));
                
                // Đồng bộ danh sách yêu thích
                syncFavoritesWithCart();
            } 
            // Nếu đang thêm yêu thích (chuyển từ trắng sang đỏ)
            else {
                // Thêm vào giỏ hàng
                fetch('../nhannhieu/nhanhieu.json')
                    .then(res => res.json())
                    .then(data => {
                        const selected = data.products.find(p => p.id === productId);
                        if (selected) {
                            let cart = JSON.parse(localStorage.getItem('cart')) || [];
                            const exists = cart.find(item => item.id === selected.id);
                            
                            if (!exists) {
                                cart.push({ 
                                    ...selected, 
                                    quantity: 1 
                                });
                                localStorage.setItem('cart', JSON.stringify(cart));
                               
                            }
                        }
                    })
                    .catch(err => console.error('Lỗi:', err));
            }
        }
    });
});

// Hàm đồng bộ danh sách yêu thích với giỏ hàng
function syncFavoritesWithCart() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Lọc ra các sản phẩm trong favorites nhưng không có trong giỏ hàng
    const updatedFavorites = favorites.filter(productId => 
        cart.some(item => item.id === productId)
    );
    
    // Cập nhật lại danh sách yêu thích nếu có thay đổi
    if (updatedFavorites.length !== favorites.length) {
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    }
}
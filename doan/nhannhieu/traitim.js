// traitim.js (cập nhật)
document.addEventListener('DOMContentLoaded', function() {
    // Khởi tạo danh sách yêu thích nếu chưa có
    if (!localStorage.getItem('favorites')) {
        localStorage.setItem('favorites', JSON.stringify([]));
    }

    // Hàm thêm/xóa sản phẩm yêu thích
    window.toggleFavorite = function(productId) {
        const favorites = JSON.parse(localStorage.getItem('favorites'));
        const index = favorites.indexOf(productId);
        
        if (index === -1) {
            favorites.push(productId);
        } else {
            favorites.splice(index, 1);
        }
        
        localStorage.setItem('favorites', JSON.stringify(favorites));
        updateHeartIcons();
    };

    // Cập nhật trạng thái trái tim
    function updateHeartIcons() {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        document.querySelectorAll('.heart-icon').forEach(icon => {
            const productId = icon.getAttribute('data-id');
            icon.classList.toggle('bxs-heart', favorites.includes(productId));
            icon.classList.toggle('bx-heart', !favorites.includes(productId));
        });
    }

    // Gọi lần đầu khi tải trang
    updateHeartIcons();
    
    // Thêm sự kiện để cập nhật khi giỏ hàng hoặc danh sách yêu thích thay đổi từ trang khác
    window.addEventListener('storage', function(e) {
        if (e.key === 'cart' || e.key === 'favorites') {
            updateHeartIcons();
        }
    });

    // Kiểm tra và đồng bộ với giỏ hàng khi tải trang
    syncFavoritesWithCart();
});

// Đồng bộ danh sách yêu thích với giỏ hàng
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
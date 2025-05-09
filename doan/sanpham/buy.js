document.addEventListener('DOMContentLoaded', function() {
    
    // Xử lý nút MUA NGAY
    const buyNowBtn = document.querySelector('.buy-now');
    const modal = document.getElementById('purchaseModal');
    const closeBtn = document.querySelector('.close');
    const confirmBtn = document.getElementById('confirmPurchase');
    const selectedOptionsDiv = document.getElementById('selectedOptions');
    
    buyNowBtn.addEventListener('click', function() {
        // Lấy thông tin đã chọn
        const selectedColor = document.querySelector('.color-options .option.selected').textContent;
        const selectedStorage = document.querySelector('.storage-options .option.selected').textContent;
        const productName = document.querySelector('.product-title').textContent;
        const productPrice = document.querySelector('.price').textContent;
        
        // Hiển thị thông tin trong modal
        selectedOptionsDiv.innerHTML = `
            <p><strong>Sản phẩm:</strong> ${productName}</p>
            <p><strong>Màu sắc:</strong> ${selectedColor}</p>
            <p><strong>Bộ nhớ:</strong> ${selectedStorage}</p>
            <p><strong>Giá tiền:</strong> ${productPrice}</p>
        `;
        
        // Hiển thị modal
        modal.style.display = 'block';
    });
    
    // Đóng modal khi click nút X
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    // Đóng modal khi click bên ngoài
    window.addEventListener('click', function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });
    
    // Xử lý nút xác nhận mua hàng
    confirmBtn.addEventListener('click', function() {
        alert('Cảm ơn bạn đã mua hàng! Đơn hàng của bạn đã được xác nhận.');
        modal.style.display = 'none';
    });
});
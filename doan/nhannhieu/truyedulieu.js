// Hàm hiển thị sản phẩm
function displayProducts(filteredProducts) {
    const productList = document.querySelector('.product-list');
    productList.innerHTML = '';

    filteredProducts.forEach(product => {
        const productHTML = `
            <a href="../sanpham/index.html?product_id=${product.id}" class="product" style="display: block; text-decoration: none;">
                <img style="width: 150px;" src="${product.image}" alt="${product.name}">
                <h3 style="color: black;">${product.name}</h3>
                <p class="price">${product.price}</p>
                <p class="discount">${product.discount}</p>
                <div style="display: flex;">
                    <div class="star-rating">${'<i class="bx bxs-star"></i>'.repeat(product.rating)}${'<i class="bx bx-star"></i>'.repeat(5 - product.rating)}</div>
                    <div style="padding-left: 20px; display: flex; gap: 2px;">
                        <div style="font-size: 12px; margin-top: 3px; color: #8a8585;">Yêu thích</div>
                        <i class='bx bx-heart heart-icon' id="heart"></i>
                    </div>
                </div>
            </a>
        `;
        productList.innerHTML += productHTML;
    });
}
// truyedulieu.js (bổ sung phần hiển thị trái tim)
function displayProducts(filteredProducts) {
    const productList = document.querySelector('.product-list');
    productList.innerHTML = '';
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    filteredProducts.forEach(product => {
        const isFavorite = favorites.includes(product.id);
        const productHTML = `
            <a href="../sanpham/index.html?product_id=${product.id}" class="product" style="display: block; text-decoration: none;">
                <img style="width: 150px;" src="${product.image}" alt="${product.name}">
                <p style="color: black;font-size: 20px;">${product.name}</p>
                <p class="price">${formatCurrency(product.price)}</p>
                ${product.discount ? `<p class="discount">Giảm ${formatCurrency(product.discount)}</p>` : ''}
                <div style="display: flex;">
                    <div class="star-rating">${'<i class="bx bxs-star"></i>'.repeat(product.rating)}${'<i class="bx bx-star"></i>'.repeat(5 - product.rating)}</div>
                    <div style="padding-left: 20px; display: flex; gap: 2px;">
                        <div style="font-size: 12px; margin-top: 3px; color: #8a8585;">Yêu thích</div>
                        <i class='bx ${isFavorite ? 'bxs-heart' : 'bx-heart'} heart-icon' data-id="${product.id}"></i>
                    </div>
                </div>
            </a>
        `;
        productList.innerHTML += productHTML;
        
    });
    window.addEventListener('storage', function(e) {
        if (e.key === 'favorites') {
            const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
            document.querySelectorAll('.heart-icon').forEach(icon => {
                const productId = icon.getAttribute('data-id');
                icon.classList.toggle('bxs-heart', favorites.includes(productId));
                icon.classList.toggle('bx-heart', !favorites.includes(productId));
            });
        }
    });
}

// Hàm định dạng tiền tệ
function formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN', { 
        style: 'currency', 
        currency: 'VND' 
    }).format(amount);
}

// Load dữ liệu sản phẩm từ JSON và thiết lập sự kiện
document.addEventListener('DOMContentLoaded', function() {
    // Lấy tham số brand từ URL
    const urlParams = new URLSearchParams(window.location.search);
    const selectedBrand = urlParams.get('brand');
    
    fetch('../nhannhieu/nhanhieu.json')
        .then(response => response.json())
        .then(data => {
            const products = data.products;
            
            // Nếu có brand trong URL, lọc ngay từ đầu
            if (selectedBrand) {
                const filteredProducts = products.filter(product => 
                    product.brand.toLowerCase().includes(selectedBrand.toLowerCase())
                );
                displayProducts(filteredProducts.length > 0 ? filteredProducts : products);
            } else {
                displayProducts(products);
            }

            // Thêm sự kiện click cho các mục danh mục
            const categoryLinks = document.querySelectorAll('.menu-section1 a');
            
            categoryLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    const brand = this.textContent.trim();
                    const brandMapping = {
                        

                        // Thêm các mapping khác nếu cần
                    };
                    
                    // Ánh xạ tên hiển thị sang tên brand trong JSON
                    const searchBrand = brandMapping[brand] || brand;
                    
                    // Lọc sản phẩm theo thương hiệu
                    if (brand === "Xem tất cả") {
                        displayProducts(products);
                    } else {
                        const filteredProducts = products.filter(product => 
                            product.brand.toLowerCase().includes(searchBrand.toLowerCase())
                        );
                        
                        if (filteredProducts.length > 0) {
                            displayProducts(filteredProducts);
                        } else {
                            // Nếu không tìm thấy sản phẩm, hiển thị thông báo
                            document.querySelector('.product-list').innerHTML = `
                                <div style="width: 100%; text-align: center; padding: 20px;">
                                    <p>Không có sản phẩm nào thuộc hãng ${brand}</p>
                                </div>
                            `;
                        }
                    }
                });
            });
        })
        .catch(error => {
            console.error('Lỗi khi tải dữ liệu sản phẩm:', error);
            document.querySelector('.product-list').innerHTML = `
                <div style="width: 100%; text-align: center; padding: 20px;">
                    <p>Đã xảy ra lỗi khi tải dữ liệu sản phẩm</p>
                </div>
            `;
        });
        
});

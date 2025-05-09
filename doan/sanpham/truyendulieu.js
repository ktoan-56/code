document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('product_id');
    
    if (productId) {
        loadProductData(productId);
    } else {
        console.error('Không tìm thấy product_id trong URL');
        // Có thể redirect về trang chủ hoặc hiển thị thông báo
    }
});

async function loadProductData(productId) {
    try {
        const response = await fetch('../sanpham/sanpham.json');
        if (!response.ok) {
            throw new Error('Không thể tải dữ liệu sản phẩm');
        }
        
        const data = await response.json();
        const product = data.products.find(p => p.id === productId);
        
        if (product) {
            renderProductDetails(product);
        } else {
            console.error('Không tìm thấy sản phẩm với ID:', productId);
            // Có thể redirect về trang 404 hoặc trang chủ
        }
    } catch (error) {
        console.error('Lỗi khi tải dữ liệu:', error);
    }
}

function renderProductDetails(product) {
    // 1. Cập nhật thông tin cơ bản
    document.querySelector('.product-title').textContent = product.name;
    document.querySelector('.price').textContent = product.price;
    document.querySelector('.rating').textContent = product.rating;
    
    // Sửa lỗi reviewsCount (do JSON có cả reviewsreviewsCount)
    const reviewsCount = product.reviewsCount || product.reviewsreviewsCount || 0;
    document.querySelector('.product-meta div:nth-child(2)').textContent = `${reviewsCount} đánh giá`;
    
    document.querySelector('.product-meta div:nth-child(3)').textContent = `Đã bán: ${product.sold}`;
    document.querySelector('.promo-badge').innerHTML = `<span>KM</span>${product.promo}`;

    // 2. Cập nhật hình ảnh
    updateProductImages(product.images, product.thumbnails, product.name);

    // 3. Cập nhật màu sắc và bộ nhớ
    updateOptions('.color-options .options', product.colors);
    updateOptions('.storage-options .options', product.storages);

    // 4. Cập nhật mô tả sản phẩm
    updateProductDescription(product.description, product.name);

    // 5. Cập nhật thông số kỹ thuật
    updateProductSpecs(product.specs);

    // 6. Cập nhật đánh giá
    updateProductReviews(product.reviews);
}

function updateProductImages(images, thumbnails, productName) {
    const carouselInner = document.querySelector('.carousel-inner');
    const indicators = document.querySelector('.carousel-indicators');
    
    // Xóa nội dung cũ
    carouselInner.innerHTML = '';
    indicators.innerHTML = '';
    
    // Thêm hình ảnh mới
    images.forEach((img, index) => {
        carouselInner.innerHTML += `
            <div class="carousel-item ${index === 0 ? 'active' : ''}">
                <img src="${img}" class="d-block w-100" alt="${productName}">
            </div>
        `;
        
        indicators.innerHTML += `
            <button type="button" data-bs-target="#productCarousel" data-bs-slide-to="${index}" ${index === 0 ? 'class="active"' : ''}>
                <img src="${thumbnails[index]}" alt="Ảnh ${index + 1}">
            </button>
        `;
    });
}

function updateOptions(selector, options) {
    const container = document.querySelector(selector);
    container.innerHTML = '';
    
    options.forEach((option, index) => {
        container.innerHTML += `<div class="option ${index === 0 ? 'selected' : ''}">${option}</div>`;
    });
    
    // Thêm sự kiện click cho các option
    container.querySelectorAll('.option').forEach(option => {
        option.addEventListener('click', function() {
            container.querySelectorAll('.option').forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
        });
    });
}

function updateProductDescription(description, productName) {
    const descriptionTab = document.querySelector('#description');
    descriptionTab.innerHTML = `
        <h3>${productName} - Đỉnh cao công nghệ</h3>
        <p>${description.overview}</p>
        
        <h4>Thiết kế sang trọng, chất liệu cao cấp</h4>
        <p>${description.design}</p>
        
        <h4>Màn hình chất lượng cao</h4>
        <p>${description.display}</p>
        
        <h4>Hiệu năng vượt trội</h4>
        <p>${description.performance}</p>
    `;
}

function updateProductSpecs(specs) {
    const specsTab = document.querySelector('#specs');
    let specsHTML = '<table>';
    
    specs.forEach(spec => {
        specsHTML += `
            <tr>
                <th>${spec.name}</th>
                <td>${spec.value}</td>
            </tr>
        `;
    });
    
    specsHTML += '</table>';
    specsTab.innerHTML = specsHTML;
}

function updateProductReviews(reviews) {
    const reviewsTab = document.querySelector('#reviews');
    let reviewsHTML = '';
    
    reviews.forEach(review => {
        reviewsHTML += `
            <div class="review">
                <div class="reviewer">${review.name}</div>
                <div class="rating">${review.rating}</div>
                <div class="review-date">${review.date}</div>
                <div class="review-content">${review.content}</div>
            </div>
        `;
    });
    
    reviewsTab.innerHTML = reviewsHTML;
}

// Hàm chuyển tab (nếu cần)
function openTab(tabName) {
    const tabContents = document.querySelectorAll('.tab-content');
    const tabHeaders = document.querySelectorAll('.tab-header');
    
    tabContents.forEach(tab => tab.classList.remove('active'));
    tabHeaders.forEach(header => header.classList.remove('active'));
    
    document.getElementById(tabName).classList.add('active');
    document.querySelector(`.tab-header[onclick="openTab('${tabName}')"]`).classList.add('active');
}
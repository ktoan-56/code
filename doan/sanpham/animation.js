
function changeImage(newImage) {
    document.getElementById('mainImage').src = newImage;
}

// Tab switching functionality
function openTab(tabId) {
    // Hide all tab contents
    const tabContents = document.getElementsByClassName('tab-content');
    for (let i = 0; i < tabContents.length; i++) {
        tabContents[i].classList.remove('active');
    }
    
    // Remove active class from all tab headers
    const tabHeaders = document.getElementsByClassName('tab-header');
    for (let i = 0; i < tabHeaders.length; i++) {
        tabHeaders[i].classList.remove('active');
    }
    
    // Show the selected tab content and mark its header as active
    document.getElementById(tabId).classList.add('active');
    event.currentTarget.classList.add('active');
}

// Color and storage option selection
document.addEventListener('DOMContentLoaded', function() {
    const options = document.querySelectorAll('.option');
    
    options.forEach(option => {
        option.addEventListener('click', function() {
            // Remove selected class from siblings
            const siblings = this.parentNode.children;
            for (let i = 0; i < siblings.length; i++) {
                siblings[i].classList.remove('selected');
            }
            
            // Add selected class to clicked option
            this.classList.add('selected');
        });
    });
});


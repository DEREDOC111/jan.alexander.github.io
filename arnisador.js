/* --- ARNISADOR LOGIC --- */

window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }
});

// NAVIGATION FIX
document.querySelectorAll('.transition-link').forEach(link => {
    link.addEventListener('click', (e) => {
        if (link.getAttribute('href') === 'index.html') {
            window.location.href = 'index.html';
        }
    });
});

// LIGHTBOX LOGIC
function openLightbox(element) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const sourceImg = element.querySelector('img').src;
    
    lightboxImg.src = sourceImg;
    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Stop scrolling
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto'; // Enable scrolling
}
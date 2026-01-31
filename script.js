const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

// Toggle Mobile Menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    // Lock background scroll when menu is open
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : 'auto';
});

// Close menu on link click
document.querySelectorAll('#nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

const artworkImages = [
    "https://github.com/DEREDOC111/jan.alexander.github.io/blob/main/Art1.webp?raw=true",
    "https://github.com/DEREDOC111/jan.alexander.github.io/blob/main/Art2.webp?raw=true",
    "https://github.com/DEREDOC111/jan.alexander.github.io/blob/main/Art3.webp?raw=true" 
];

const modal = document.getElementById('portfolio-modal');
const track = document.getElementById('carousel-track');
const dotsContainer = document.getElementById('carousel-dots');
let currentIndex = 0;

function initCarousel() {
    track.innerHTML = artworkImages.map(src => `
        <div class="image-slide"><img src="${src}" alt="Art"></div>
    `).join('');
    dotsContainer.innerHTML = artworkImages.map((_, i) => `<div class="dot ${i === 0 ? 'active' : ''}"></div>`).join('');
}

function updateCarousel() {
    const width = modal.querySelector('.carousel-viewport').clientWidth;
    track.style.transform = `translateX(-${currentIndex * width}px)`;
}

document.querySelectorAll('.gallery-trigger').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        initCarousel();
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        currentIndex = 0;
        setTimeout(updateCarousel, 100);
    });
});

document.getElementById('next-btn').onclick = () => {
    currentIndex = (currentIndex + 1) % artworkImages.length;
    updateCarousel();
};

document.getElementById('prev-btn').onclick = () => {
    currentIndex = (currentIndex - 1 + artworkImages.length) % artworkImages.length;
    updateCarousel();
};

const closeModal = () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
};

document.querySelector('.close-modal').onclick = closeModal;
window.onclick = (e) => { if (e.target === modal) closeModal(); };

/* --- FINAL MOBILE GESTURE PROTECTION --- */
document.addEventListener('touchstart', (e) => {
    if (e.touches.length > 1) e.preventDefault();
}, { passive: false });

document.addEventListener('gesturestart', (e) => e.preventDefault());

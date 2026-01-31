const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

document.querySelectorAll('#nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
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
const closeBtn = document.querySelector('.close-modal');
let currentIndex = 0;

function initCarousel() {
    track.innerHTML = artworkImages.map(src => `
        <div class="image-slide">
            <div class="image-container">
                <img src="${src}" alt="Artwork">
            </div>
        </div>
    `).join('');
    
    dotsContainer.innerHTML = artworkImages.map((_, i) => `<div class="dot ${i === 0 ? 'active' : ''}"></div>`).join('');
}

function updateCarousel() {
    const viewport = modal.querySelector('.carousel-viewport');
    const width = viewport.clientWidth;
    track.style.transform = `translateX(-${currentIndex * width}px)`;
    
    document.querySelectorAll('.dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
    });
}

document.querySelectorAll('.gallery-trigger').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        initCarousel();
        modal.style.display = 'flex';
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

function closeModal() {
    modal.style.display = 'none';
}

closeBtn.onclick = closeModal;

window.onclick = (e) => {
    if (e.target === modal) closeModal();
};

window.onresize = () => {
    if (modal.style.display === 'flex') updateCarousel();
};


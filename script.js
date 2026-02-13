window.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loader');
    const bar = document.getElementById('loader-bar');
    const text = document.getElementById('loader-text');
    const shield = document.getElementById('loader-shield');
    
    const allImages = document.querySelectorAll('img');
    let imagesLoaded = 0;
    const totalImages = allImages.length;

    // --- EXIT TRANSITION (CLICKING PORTFOLIO LINKS) ---
    document.querySelectorAll('.transition-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const destination = this.href;
            
            // 1. Prepare loader for closing
            loader.classList.remove('fade-out');
            loader.classList.add('closing');
            shield.classList.add('hidden-shield');

            // 2. Navigate away after shutters meet
            setTimeout(() => {
                window.location.href = destination;
            }, 800);
        });
    });

    // --- ENTRY LOADING LOGIC ---
    function incrementLoader() {
        imagesLoaded++;
        const perc = totalImages > 0 ? (imagesLoaded / totalImages) * 100 : 100;
        if(bar) bar.style.width = perc + "%";
        
        if(imagesLoaded >= totalImages) {
            setTimeout(() => {
                if(text) text.innerText = "ACCESS GRANTED";
                setTimeout(() => {
                    // Open shutters
                    loader.classList.remove('closing');
                    loader.classList.add('fade-out');
                }, 400);
            }, 500);
        }
    }

    if(totalImages === 0) {
        setTimeout(() => {
            loader.classList.add('fade-out');
        }, 500);
    } else {
        allImages.forEach(img => {
            if(img.complete) incrementLoader();
            else {
                img.addEventListener('load', incrementLoader);
                img.addEventListener('error', incrementLoader);
            }
        });
    }
});

// --- NAVBAR LOGIC ---
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// --- GALLERY MODAL LOGIC ---
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
    track.innerHTML = artworkImages.map(src => `<div class="image-slide"><img src="${src}" alt="Artwork"></div>`).join('');
    dotsContainer.innerHTML = artworkImages.map((_, i) => `<div class="dot ${i === 0 ? 'active' : ''}"></div>`).join('');
}

function updateCarousel() {
    const viewportWidth = modal.querySelector('.carousel-viewport').clientWidth;
    track.style.transform = `translateX(-${currentIndex * viewportWidth}px)`;
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

document.getElementById('next-btn').onclick = () => { currentIndex = (currentIndex + 1) % artworkImages.length; updateCarousel(); };
document.getElementById('prev-btn').onclick = () => { currentIndex = (currentIndex - 1 + artworkImages.length) % artworkImages.length; updateCarousel(); };
closeBtn.onclick = () => { modal.style.display = 'none'; };
window.onclick = (e) => { if (e.target === modal) modal.style.display = 'none'; };
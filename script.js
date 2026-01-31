// --- NAVBAR MOBILE LOGIC ---
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('toggle');
});

// --- GALLERY MODAL LOGIC ---
const modal = document.getElementById('portfolio-modal');
const modalImg = document.getElementById('modal-img');
const closeBtn = document.querySelector('.close-modal');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

// Add your image URLs here
const artworkImages = [
    "https://github.com/DEREDOC111/jan.alexander.github.io/blob/main/Art1.webp?raw=true",
    "https://github.com/DEREDOC111/jan.alexander.github.io/blob/main/Art2.webp?raw=true",
    "https://via.placeholder.com/800x600/333333/ffffff?text=Sketch+3"
];

let currentIndex = 0;

// Function to update the image in the modal
function updateModalImage() {
    modalImg.src = artworkImages[currentIndex];
}

// Open modal when gallery buttons are clicked
document.querySelectorAll('.gallery-trigger').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        modal.style.display = 'flex';
        updateModalImage();
    });
});

// Close modal
closeBtn.onclick = () => { modal.style.display = 'none'; };
window.onclick = (e) => { if (e.target == modal) modal.style.display = 'none'; };

// Next/Prev Buttons
nextBtn.onclick = () => {
    currentIndex = (currentIndex + 1) % artworkImages.length;
    updateModalImage();
};

prevBtn.onclick = () => {
    currentIndex = (currentIndex - 1 + artworkImages.length) % artworkImages.length;
    updateModalImage();
};
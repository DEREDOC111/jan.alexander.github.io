/* --- TDK LOGIC: LOADER, MAP & MODAL --- */

window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }
});

// FIX FOR NAVIGATION: Ensures clicking "Portfolio" or "Return" works
document.querySelectorAll('.transition-link').forEach(link => {
    link.addEventListener('click', (e) => {
        // Only trigger if it's pointing to index.html
        if (link.getAttribute('href') === 'index.html') {
            window.location.href = 'index.html';
        }
    });
});

const shapes = document.querySelectorAll('.map-shape');
const tooltip = document.getElementById('map-tooltip');
const container = document.getElementById('map-interaction-container');
const maskHole = document.getElementById('mask-hole');
const overlay = document.getElementById('location-overlay');

if (shapes.length > 0) {
    shapes.forEach(shape => {
        shape.addEventListener('mouseenter', () => {
            const titleEl = document.getElementById('tooltip-title');
            const descEl = document.getElementById('tooltip-desc');
            if (titleEl) titleEl.innerText = shape.getAttribute('data-region');
            if (descEl) descEl.innerText = shape.getAttribute('data-desc');
            tooltip.style.opacity = '1';
            maskHole.setAttribute('points', shape.getAttribute('points'));
            container.classList.add('is-hovering');
        });

        shape.addEventListener('mousemove', (e) => {
            tooltip.style.left = (e.clientX + 20) + 'px';
            tooltip.style.top = (e.clientY + 20) + 'px';
        });

        shape.addEventListener('mouseleave', () => {
            tooltip.style.opacity = '0';
            container.classList.remove('is-hovering');
            maskHole.setAttribute('points', '');
        });
    });
}

function openLocation(slug) {
    const media = document.getElementById('media-container');
    const title = document.getElementById('overlay-title');
    const desc = document.getElementById('overlay-description');

    let videoSrc = "";
    let locationTitle = "";
    let locationDesc = "";

    switch(slug) {
        case 'throne-room':
            locationTitle = "The Throne Room";
            videoSrc = "https://res.cloudinary.com/ddsfqf0fp/video/upload/v1771013336/OW-TR-Map_hlgxli.mp4";
            break;
        case 'temple':
            locationTitle = "Temple Of The One";
            videoSrc = "https://res.cloudinary.com/ddsfqf0fp/video/upload/v1771013329/OW-TOTO-Map_kjhusy.mp4";
            break;
        case 'morden':
            locationTitle = "Morden";
            videoSrc = "https://res.cloudinary.com/ddsfqf0fp/video/upload/v1771013339/OW-MD-Map_anj1if.mp4";
            break;
        case 'garden':
            locationTitle = "The Garden";
            videoSrc = "https://res.cloudinary.com/ddsfqf0fp/video/upload/v1771013266/OW-GD-Map_pml1jp.mp4";
            break;
        case 'laboratory':
            locationTitle = "The Laboratory";
            videoSrc = "https://res.cloudinary.com/ddsfqf0fp/video/upload/v1771013299/OW-LAB-Map_oqnz54.mp4";
            break;
        case 'prison':
            locationTitle = "The Prison";
            videoSrc = "https://res.cloudinary.com/ddsfqf0fp/video/upload/v1771013329/OW-PR-Map_ph8axq.mp4";
            break;
        case 'graveyard':
            locationTitle = "The Graveyard";
            videoSrc = "https://res.cloudinary.com/ddsfqf0fp/video/upload/v1771013295/OW-GY-Map_uasrbo.mp4";
            break;
        case 'library':
            locationTitle = "The Library";
            videoSrc = "https://res.cloudinary.com/ddsfqf0fp/video/upload/v1771013292/OW-LIB-Map_bqk35l.mp4";
            break;
        case 'city':
            locationTitle = "City Of The Dead";
            videoSrc = "https://res.cloudinary.com/ddsfqf0fp/video/upload/v1771013196/OW-COTD-Map_ne3kbx.mp4";
            break;
        case 'forest':
            locationTitle = "Unholy Forest";
            videoSrc = "https://res.cloudinary.com/ddsfqf0fp/video/upload/v1771013415/OW-UF-Map_phoyr8.mp4";
            break;
        case 'nightmare':
            locationTitle = "Realm Of Nightmare";
            videoSrc = "https://res.cloudinary.com/ddsfqf0fp/video/upload/v1771013337/OW-RON-Map_wlvpqb.mp4";
            break;
    }

    title.innerText = locationTitle;
    desc.innerText = locationDesc;
    
    media.innerHTML = `
        <video controls autoplay class="overlay-main-media">
            <source src="${videoSrc}" type="video/mp4">
        </video>
    `;

    overlay.classList.add('active');
    document.body.style.overflow = 'hidden'; 
}

function closeLocation() {
    overlay.classList.remove('active');
    document.body.style.overflow = 'auto'; 
    document.getElementById('media-container').innerHTML = ''; 
}
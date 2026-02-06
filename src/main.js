import './styles/main.scss';
import 'locomotive-scroll/dist/locomotive-scroll.css';
import gsap from 'gsap';
import LocomotiveScroll from 'locomotive-scroll';

// Initialize Locomotive Scroll
const scroll = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true,
    lerp: 0.05
});

// Basic GSAP Test
console.log('Apno Studio Loaded');


// --- SETUP HERO ANIMATION (Paused initially) ---
const initHero = () => {
    const tl = gsap.timeline();

    tl.to('.hero__title .word', {
        y: 0,
        duration: 1.5,
        ease: 'power4.out',
        stagger: 0.2,
        delay: 0.5
    })
        .to('.hero__subtitle', {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out'
        }, '-=1');
};

// --- INTRO & AUDIO LOGIC ---
const introOverlay = document.getElementById('intro-overlay');
const enterBtn = document.getElementById('enter-btn');
const startupSound = document.getElementById('startup-sound');

if (enterBtn && introOverlay) {
    enterBtn.addEventListener('click', () => {
        // 1. Play Sound
        if (startupSound) {
            startupSound.volume = 0.5; // Set volume to 50%
            startupSound.play().catch(e => console.log("Audio play failed", e));
        }

        // 2. Fade Out Overlay
        introOverlay.classList.add('is-hidden');

        // 3. Start Site Animations after valid user interaction
        setTimeout(() => {
            initHero();
            introOverlay.style.display = 'none'; // Clean up
        }, 500); // Wait for overlay fade to start
    });
} else {
    // Fallback if overlay is missing
    initHero();
}



// Work Item Hover Effect - Mouse Follow
const workItems = document.querySelectorAll('.work-item');

workItems.forEach(item => {
    const img = item.querySelector('.work-item__img');

    item.addEventListener('mousemove', (e) => {
        // Calculate position relative to the item
        gsap.to(img, {
            x: e.clientX - window.innerWidth / 2,
            y: e.clientY - window.innerHeight / 2,
            xPercent: -50,
            yPercent: -50,
            duration: 0.5,
            ease: 'power2.out'
        });
    });
});

// Magnetic Buttons
const buttons = document.querySelectorAll('.btn-magnetic');

buttons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(btn, {
            x: x * 0.3, // Strength of magnet
            y: y * 0.3,
            duration: 0.3,
            ease: 'power2.out'
        });
    });

    btn.addEventListener('mouseleave', () => {
        gsap.to(btn, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: 'elastic.out(1, 0.3)'
        });
    });
});


// --- CAMPAIGN PAGE SLIDER ---
const initCampaignSlider = () => {
    const slides = document.querySelectorAll('.camp-hero__slide');
    if (!slides.length) return;

    let currentSlide = 0;
    const totalSlides = slides.length;
    const slideDuration = 4000; // 4 seconds per slide

    const nextSlide = () => {
        const previousSlide = currentSlide;
        currentSlide = (currentSlide + 1) % totalSlides;

        // Animate Out Previous
        if (slides[previousSlide]) {
            slides[previousSlide].classList.remove('is-active');
            gsap.to(slides[previousSlide], {
                opacity: 0,
                duration: 1,
                ease: 'power2.inOut'
            });
        }

        // Animate In Current
        if (slides[currentSlide]) {
            slides[currentSlide].classList.add('is-active');
            gsap.fromTo(slides[currentSlide],
                { opacity: 0, scale: 1.1 },
                { opacity: 1, scale: 1, duration: 1, ease: 'power2.inOut' }
            );
        }
    };

    // Auto-advance
    setInterval(nextSlide, slideDuration);

    // Animate first slide immediately
    gsap.fromTo(slides[0],
        { scale: 1.2 },
        { scale: 1, duration: 2, ease: 'power2.out' }
    );
};

// --- CAMPAIGN GALLERY LOGIC ---
const initCampaignGallery = () => {
    const galleryGrid = document.getElementById('campaign-gallery-grid');
    if (!galleryGrid) return; // Exit if not on campaign page

    // Import all images from the election folder
    const electionImages = import.meta.glob('./assets/showcase/election/*.{jpg,jpeg,png,webp,avif}', {
        eager: true,
        query: '?url',
        import: 'default'
    });

    // Convert object to array
    const imagePaths = Object.values(electionImages);

    if (imagePaths.length === 0) {
        galleryGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; opacity: 0.5;">No images found in election folder.</p>';
        return;
    }

    imagePaths.forEach(imgSrc => {
        const img = document.createElement('img');
        img.src = imgSrc;
        img.alt = "Campaign Image";
        img.loading = "lazy"; // Performance optimization
        galleryGrid.appendChild(img);
    });
};


// Run initializers
initCampaignSlider();
initCampaignGallery();


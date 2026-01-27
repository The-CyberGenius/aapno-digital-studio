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

import './styles/main.scss';
import LocomotiveScroll from 'locomotive-scroll';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const locoScroll = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true,
    multiplier: 1,
    lerp: 0.05
});

// Update ScrollTrigger on scroll
locoScroll.on('scroll', ScrollTrigger.update);

// Hero Animation
const initHeroAnimation = () => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.from('.hero__title-line', {
        y: 100,
        opacity: 0,
        duration: 1.5,
        stagger: 0.2,
        skewY: 7,
        delay: 0.5
    })
        .from('.hero__subtitle', {
            x: -20,
            opacity: 0,
            duration: 1
        }, '-=1')
        .from('.marquee-strip', {
            y: 50,
            opacity: 0,
            duration: 1
        }, '-=0.8')
        .from('.nav', {
            y: -100,
            opacity: 0,
            duration: 1
        }, '-=1.2');

    // Marquee Animation
    // Moved to initMarquee function

    // Work Showcase Stagger
    ScrollTrigger.batch('.project-item', {
        onEnter: batch => gsap.from(batch, {
            y: 50,
            opacity: 0,
            stagger: 0.15,
            duration: 1,
            ease: 'power3.out'
        }),
        start: 'top 85%'
    });
};

const initMarquee = () => {
    const marqueeInner = document.querySelector('.marquee-strip__inner');
    if (marqueeInner) {
        console.log("Initializing Marquee...");
        const content = marqueeInner.innerHTML;
        // Duplicate content sufficient times for seamless loop
        marqueeInner.innerHTML = content.repeat(4);

        gsap.to('.marquee-strip__inner', {
            xPercent: -50,
            ease: 'none',
            duration: 20,
            repeat: -1
        });
    }
};

// Project Reveal Animation
const initProjectReveal = () => {
    const revealContainer = document.querySelector('.project-reveal');
    const revealImg = document.querySelector('.project-reveal__img');
    const items = document.querySelectorAll('.project-item');

    if (!revealContainer || !items.length) return;

    // Move to cursor
    let xMove = gsap.quickTo(revealContainer, 'x', { duration: 0.4, ease: 'power3.out' });
    let yMove = gsap.quickTo(revealContainer, 'y', { duration: 0.4, ease: 'power3.out' });

    window.addEventListener('mousemove', (e) => {
        // Offset by half width/height to center
        xMove(e.clientX);
        yMove(e.clientY);
    });

    items.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const imgUrl = item.getAttribute('data-img');
            if (imgUrl) {
                revealImg.style.backgroundImage = `url(${imgUrl})`;
            }

            // Animate In
            gsap.to(revealContainer, {
                opacity: 1,
                visibility: 'visible',
                scale: 1,
                duration: 0.4,
                ease: 'power2.out'
            });

            gsap.to(revealImg, {
                scale: 1,
                duration: 0.4,
                ease: 'power2.out'
            });
        });

        item.addEventListener('mouseleave', () => {
            // Animate Out
            gsap.to(revealContainer, {
                opacity: 0,
                // visibility: 'hidden', // Don't hide immediately to allow fade out
                scale: 0.8,
                duration: 0.4,
                ease: 'power2.out'
            });

            gsap.to(revealImg, {
                scale: 1.2,
                duration: 0.4,
                ease: 'power2.out'
            });
        });
    });
};

// Mobile Menu
const initMobileMenu = () => {
    const toggle = document.querySelector('.nav__toggle');
    const menu = document.querySelector('.nav__mobile-menu');
    const links = document.querySelectorAll('.nav__mobile-link');

    if (!toggle || !menu) return;

    toggle.addEventListener('click', () => {
        const isActive = menu.classList.toggle('active');
        toggle.textContent = isActive ? 'Close' : 'Menu';
    });

    links.forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('active');
            toggle.textContent = 'Menu';
        });
    });
};

// Init
const init = () => {
    console.log('Apno Studio: Initializing...');
    initHeroAnimation();
    initMarquee();
    initProjectReveal();
    initMobileMenu();
};

document.addEventListener('DOMContentLoaded', init);

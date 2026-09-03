document.addEventListener("DOMContentLoaded", function () {
    // Register the ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // 1. Hero Section Initial Load Sequence
    const heroTimeline = gsap.timeline();
    
    heroTimeline.from(".hero-content > *", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out"
    })
    .from(".hero-product img", {
        scale: 0.8,
        opacity: 0,
        duration: 1,
        ease: "back.out(1.5)"
    }, "-=0.6")
    .from(".product-orbit", {
        scale: 0,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out"
    }, "-=0.8")
    .from(".product-tag", {
        opacity: 0,
        x: (i) => i === 0 ? -20 : 20,
        duration: 0.6,
        stagger: 0.2
    }, "-=0.5");

    // 2. Continuous Orbit Rotation
    gsap.to(".product-orbit:not(.orbit-two)", {
        rotation: "+=360",
        duration: 25,
        repeat: -1,
        ease: "none",
        transformOrigin: "center center"
    });

    gsap.to(".orbit-two", {
        rotation: "-=360",
        duration: 35,
        repeat: -1,
        ease: "none",
        transformOrigin: "center center"
    });

    // 3. Parallax Floating Effect for the Hero Mouse on Scroll
    gsap.to(".hero-product img", {
        y: 50,
        ease: "none",
        scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: true
        }
    });

    // 4. Scroll-Triggered Reveals for the Glassmorphism Product Cards
    gsap.from(".product-card", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".product-grid",
            start: "top 80%",
            toggleActions: "play none none reverse"
        }
    });

    // 5. Staggered Reveal for the Technical Specs
    gsap.from(".spec-row", {
        x: -30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".signal-copy",
            start: "top 85%"
        }
    });
});

let slideIndex = 0;
const slides = document.querySelectorAll('.hero-slide');
const dots = document.querySelectorAll('.hero-dots .dot');

function showSlide(n) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    slideIndex = (n + slides.length) % slides.length;

    slides[slideIndex].classList.add('active');
    dots[slideIndex].classList.add('active');
}

function changeSlide(n) {
    showSlide(slideIndex + n);
}

function currentSlide(n) {
    showSlide(n);
}

// Optional: Auto-advance every 6 seconds
setInterval(() => {
    changeSlide(1);
}, 5000);
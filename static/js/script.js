// script.js – Client-side enhancements for RumahCerdas

document.addEventListener('DOMContentLoaded', () => {

    // ===== Navbar Scroll Effect =====
    const navbar = document.getElementById('mainNav');
    if (navbar) {
        const onScroll = () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll(); // initial check
    }

    // ===== Active Nav Link Tracking =====
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar .nav-link');

    if (sections.length && navLinks.length) {
        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px -60% 0px',
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    navLinks.forEach(link => {
                        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                    });
                }
            });
        }, observerOptions);

        sections.forEach(section => observer.observe(section));
    }

    // ===== Scroll Reveal (Fade-in-Up) =====
    const fadeElements = document.querySelectorAll('.fade-in-up');
    if (fadeElements.length) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            rootMargin: '0px 0px -60px 0px',
            threshold: 0.1
        });

        fadeElements.forEach(el => revealObserver.observe(el));
    }

    // ===== Smooth Scroll for Anchor Links =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ===== Input Focus Animation =====
    const sqftInput = document.getElementById('sqft_living');
    if (sqftInput) {
        sqftInput.addEventListener('input', () => {
            const btn = document.getElementById('btn-predict');
            if (btn) {
                if (sqftInput.value.trim()) {
                    btn.style.boxShadow = '0 6px 20px rgba(56, 189, 248, 0.4)';
                } else {
                    btn.style.boxShadow = '0 4px 15px rgba(56, 189, 248, 0.25)';
                }
            }
        });
    }

    // ===== Smooth number formatting in input =====
    const formatInput = document.getElementById('sqft_living');
    if (formatInput) {
        formatInput.addEventListener('focus', () => {
            formatInput.parentElement.style.transform = 'scale(1.01)';
            formatInput.parentElement.style.transition = 'transform 0.2s ease';
        });
        formatInput.addEventListener('blur', () => {
            formatInput.parentElement.style.transform = 'scale(1)';
        });
    }

    // ===== Auto-scroll to result if present =====
    const resultAlert = document.querySelector('.alert-success-custom');
    if (resultAlert) {
        setTimeout(() => {
            resultAlert.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 300);
    }

    // ===== Counter Animation for Stats =====
    const animateCounters = () => {
        const counters = document.querySelectorAll('.stat-value');
        counters.forEach(counter => {
            const text = counter.textContent.trim();
            // Only animate percentage values
            if (text.includes('%')) {
                const value = parseFloat(text);
                if (!isNaN(value)) {
                    let current = 0;
                    const increment = value / 40;
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= value) {
                            current = value;
                            clearInterval(timer);
                        }
                        counter.textContent = current.toFixed(1) + '%';
                    }, 30);
                }
            }
        });
    };

    // Trigger counter animation when stats bar enters viewport
    const statsBar = document.querySelector('.stats-bar');
    if (statsBar) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        statsObserver.observe(statsBar);
    }
});

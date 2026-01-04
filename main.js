/* Main JS - Student Portfolio */

document.addEventListener('DOMContentLoaded', () => {

    // --- Stealth Dark Mode (Key: 'd') ---
    const toggleDarkMode = () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        localStorage.setItem('public_theme_preference', isDark ? 'dark' : 'light');
    };

    // Load Preference
    if (localStorage.getItem('public_theme_preference') === 'dark') {
        document.body.classList.add('dark-mode');
    }

    // Key Listener
    document.addEventListener('keydown', (e) => {
        // Toggle only if not typing in an input/textarea
        if (e.key.toLowerCase() === 'd' &&
            e.target.tagName !== 'INPUT' &&
            e.target.tagName !== 'TEXTAREA') {
            toggleDarkMode();
        }
    });

    // --- Mobile Menu Toggle ---
    const menuBtn = document.getElementById('menuBtn');
    const navLinks = document.getElementById('navLinks');

    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');

            // Icon Toggle
            const icon = menuBtn.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // --- Active Link Highlighting ---
    const currentPath = window.location.pathname;
    const links = document.querySelectorAll('.nav-link');

    links.forEach(link => {
        // Simple check: if href matches end of path
        if (currentPath.endsWith(link.getAttribute('href')) || (currentPath.endsWith('/') && link.getAttribute('href') === 'index.html')) {
            links.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        }
    });

    // --- Scroll Animations (Intersection Observer) ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal, .fade-in-up, .scale-in');
    revealElements.forEach(el => observer.observe(el));

    // --- Smooth Scroll for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    menuBtn.querySelector('i').classList.remove('fa-times');
                    menuBtn.querySelector('i').classList.add('fa-bars');
                }
            }
        });
    });
    // --- Track Profile View ---
    if (typeof DataManager !== 'undefined') {
        DataManager.incrementProfileViews();
    }
});

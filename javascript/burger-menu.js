// Burger menu functionality
function initBurgerMenu() {
    const burgerMenu = document.querySelector('.burger-menu');
    const navLinks = document.querySelector('.nav-links');

    if (!burgerMenu || !navLinks) {
        console.warn('Burger menu elements not found');
        return;
    }

    burgerMenu.addEventListener('click', function() {
        const isOpen = navLinks.classList.contains('active');
        
        if (isOpen) {
            navLinks.classList.remove('active');
            burgerMenu.classList.remove('active');
            burgerMenu.setAttribute('aria-expanded', 'false');
        } else {
            navLinks.classList.add('active');
            burgerMenu.classList.add('active');
            burgerMenu.setAttribute('aria-expanded', 'true');
        }
    });

    // Close menu when clicking on a link (for mobile)
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            burgerMenu.classList.remove('active');
            burgerMenu.setAttribute('aria-expanded', 'false');
        });
    });
}

// Header transparency on scroll
function initHeaderScroll() {
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (header) {
            if (window.scrollY > 100) {
                header.style.backgroundColor = 'rgba(44, 62, 80, 0.95)';
            } else {
                header.style.backgroundColor = 'rgba(44, 62, 80, 1)';
            }
        }
    });
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Delay initialization to ensure header is loaded
    setTimeout(() => {
        initBurgerMenu();
        initHeaderScroll();
    }, 100);
});
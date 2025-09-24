// Load header component
function loadHeader() {
    fetch('../includes/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-placeholder').innerHTML = data;
            
            // Set active navigation link
            const currentPage = window.location.pathname.split('/').pop();
            const navLinks = document.querySelectorAll('.nav-links a');
            navLinks.forEach(link => {
                const href = link.getAttribute('href');
                // Check if the current page matches the link
                if (href === currentPage || 
                    (href.includes('/') && href.split('/').pop() === currentPage)) {
                    link.classList.add('active');
                }
            });
            
            // Initialize burger menu functionality directly
            initBurgerMenuInHeader();
            initHeaderScrollInHeader();
            
            // Load footer after header is loaded
            loadFooterComponent();
        })
        .catch(error => {
            console.error('Error loading header:', error);
        });
}

// Load footer component
function loadFooterComponent() {
    console.log('Loading footer for pages...');
    const footerPlaceholder = document.getElementById('footer-placeholder');
    
    if (!footerPlaceholder) {
        console.error('Footer placeholder not found!');
        return;
    }
    
    fetch('../includes/footer.html')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            footerPlaceholder.innerHTML = data;
            console.log('Footer loaded successfully');
        })
        .catch(error => {
            console.error('Error loading footer:', error);
        });
}

// Burger menu functionality for dynamically loaded header
function initBurgerMenuInHeader() {
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

// Header transparency on scroll for dynamically loaded header
function initHeaderScrollInHeader() {
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

// Load header when DOM is ready
document.addEventListener('DOMContentLoaded', loadHeader);

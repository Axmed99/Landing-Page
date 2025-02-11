// Theme switcher functionality
const themeSwitch = document.getElementById('checkbox');
const currentTheme = localStorage.getItem('theme');

// Check for saved theme preference
if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'dark') {
        themeSwitch.checked = true;
    }
}

// Handle theme switch
themeSwitch.addEventListener('change', switchTheme);

function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Mobile navigation toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
    // Animate hamburger menu
    navToggle.classList.toggle('active');
    const spans = navToggle.querySelectorAll('span');
    if (navToggle.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Form handling
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Here you would typically send the form data to a server
    console.log('Form submitted:', { name, email, message });
    
    // Reset form
    contactForm.reset();
    alert('Thank you for your message! We will get back to you soon.');
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > lastScroll) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});

// Simple testimonial slider
const testimonialSlider = document.querySelector('.testimonials-slider');
let isDown = false;
let startX;
let scrollLeft;

testimonialSlider.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - testimonialSlider.offsetLeft;
    scrollLeft = testimonialSlider.scrollLeft;
});

testimonialSlider.addEventListener('mouseleave', () => {
    isDown = false;
});

testimonialSlider.addEventListener('mouseup', () => {
    isDown = false;
});

testimonialSlider.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - testimonialSlider.offsetLeft;
    const walk = (x - startX) * 2;
    testimonialSlider.scrollLeft = scrollLeft - walk;
});

// Update the image reveal functionality
const revealClickElements = document.querySelectorAll('.reveal-on-click');
const revealHoverElements = document.querySelectorAll('.reveal-on-hover');

// Handle click reveals
revealClickElements.forEach(element => {
    element.addEventListener('click', () => {
        element.classList.add('active');
        
        // Add a subtle bounce effect
        element.style.transform = 'scale(1.02)';
        setTimeout(() => {
            element.style.transform = 'scale(1)';
        }, 200);
    });
});

// Handle hover reveals for touch devices
if (window.matchMedia('(hover: none)').matches) {
    revealHoverElements.forEach(element => {
        element.addEventListener('touchstart', () => {
            element.classList.add('active');
        });
        
        element.addEventListener('touchend', () => {
            setTimeout(() => {
                element.classList.remove('active');
            }, 1000);
        });
    });
}

// Enhanced image loading handler
function handleImageLoad(img) {
    img.classList.add('loaded');
    
    // Add a subtle fade-in scale effect
    img.style.transition = 'all 0.5s ease';
    img.style.opacity = '0';
    img.style.transform = 'scale(0.95)';
    
    requestAnimationFrame(() => {
        img.style.opacity = '1';
        img.style.transform = 'scale(1)';
    });
}

// Load images with fade-in effect
document.querySelectorAll('.hidden-image').forEach(img => {
    if (img.complete) {
        handleImageLoad(img);
    } else {
        img.addEventListener('load', () => handleImageLoad(img));
    }
    
    // Add error handling
    img.addEventListener('error', () => {
        img.src = 'https://via.placeholder.com/400x300?text=Image+Not+Found';
    });
});

// Update the intersection observer threshold for smoother reveals
const observerOptions = {
    root: null,
    rootMargin: '50px',
    threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5]
};

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target.querySelector('.hidden-image');
            if (img) {
                img.src = img.dataset.src;
                observer.unobserve(entry.target);
            }
        }
    });
}, observerOptions);

// Observe all reveal elements
document.querySelectorAll('.reveal-on-hover, .reveal-on-click').forEach(element => {
    imageObserver.observe(element);
});

// Add lazy loading attributes to images
document.querySelectorAll('.hidden-image').forEach(img => {
    if (img.src) {
        img.dataset.src = img.src;
        img.removeAttribute('src');
    }
}); 
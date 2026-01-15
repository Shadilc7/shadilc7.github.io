document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Contact form handling
    const contactForm = document.getElementById('contact-form');
    const successModal = document.getElementById('success-modal');
    
    contactForm.addEventListener('submit', function(e) {
        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // After form submits to Google Forms, show success modal
        setTimeout(() => {
            successModal.style.display = 'flex';
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            // Auto-close modal after 3 seconds
            setTimeout(() => {
                closeModal();
            }, 5000);
        }, 1000);
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
            navbar.style.background = 'rgba(0, 0, 0, 0.98)';
        } else {
            navbar.classList.remove('scrolled');
            navbar.style.background = 'rgba(0, 0, 0, 0.95)';
        }
    });

    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target)) {
            navLinks.classList.remove('active');
        }
    });

    // Close mobile menu when clicking on a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
});

// Function to close modal
function closeModal() {
    document.getElementById('success-modal').style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('success-modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
};
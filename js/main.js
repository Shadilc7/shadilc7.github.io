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

    // Portfolio items data
    const portfolioItems = [
        {
            title: 'Project 1',
            image: 'assets/project1.jpg',
            description: 'Web application development',
            link: '#'
        },
        // Add more portfolio items
    ];

    // Generate portfolio items
    const portfolioGrid = document.querySelector('.portfolio-grid');
    portfolioItems.forEach(item => {
        const portfolioItem = `
            <div class="portfolio-item">
                <img src="${item.image}" alt="${item.title}">
                <div class="portfolio-item-content">
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                    <a href="${item.link}" class="project-link">View Project</a>
                </div>
            </div>
        `;
        portfolioGrid.innerHTML += portfolioItem;
    });

    // Contact form handling
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(contactForm);
        try {
            // Add your form submission logic here
            console.log('Form submitted:', Object.fromEntries(formData));
            contactForm.reset();
        } catch (error) {
            console.error('Error submitting form:', error);
        }
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
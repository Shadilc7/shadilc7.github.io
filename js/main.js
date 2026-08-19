/**
 * Shadil C — Portfolio Main Script (2026 Edition)
 */

document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------------------------------------------------
    // 1. Navbar Scroll Effect, Scrollspy, Progress Bar & Back-to-Top
    // -------------------------------------------------------------------------
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const scrollProgressBar = document.getElementById('scroll-progress');
    const scrollTopBtn = document.getElementById('scroll-top-btn');

    const handleScroll = () => {
        const scrollY = window.scrollY;
        const totalScrollHeight = document.documentElement.scrollHeight - window.innerHeight;

        // Reading progress bar
        if (totalScrollHeight > 0 && scrollProgressBar) {
            const progress = Math.min(100, Math.max(0, (scrollY / totalScrollHeight) * 100));
            scrollProgressBar.style.width = `${progress}%`;
            scrollProgressBar.setAttribute('aria-valuenow', Math.round(progress));
        }

        // Scroll to top button visibility
        if (scrollTopBtn) {
            if (scrollY > 350) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        }

        // Navbar background blur & shadow
        if (scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Scrollspy: active section tracking
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (currentSectionId && link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check on load

    // Scroll to Top smooth action
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // -------------------------------------------------------------------------
    // 2. Smooth Scrolling for Anchor Links
    // -------------------------------------------------------------------------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId && targetId.length > 1) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });

                    // Close mobile menu if open
                    const navMenu = document.getElementById('nav-links');
                    if (navMenu && navMenu.classList.contains('active')) {
                        navMenu.classList.remove('active');
                    }
                }
            }
        });
    });

    // -------------------------------------------------------------------------
    // 3. Mobile Navigation Menu Toggle
    // -------------------------------------------------------------------------
    const mobileMenuBtn = document.getElementById('mobile-menu-toggle');
    const navMenu = document.getElementById('nav-links');

    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            navMenu.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navbar.contains(e.target) && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
            }
        });
    }

    // -------------------------------------------------------------------------
    // 4. Hero Code Terminal Tabs
    // -------------------------------------------------------------------------
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTabId = btn.getAttribute('data-tab');

            // Update active tab button
            tabButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Show corresponding code pane
            tabPanes.forEach(pane => {
                pane.classList.remove('active');
                if (pane.id === targetTabId) {
                    pane.classList.add('active');
                }
            });
        });
    });

    // -------------------------------------------------------------------------
    // 5. Copy Email to Clipboard & Toast
    // -------------------------------------------------------------------------
    const copyEmailBtn = document.getElementById('copy-email-btn');
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');
    let toastTimeout;

    function showToast(message) {
        if (!toast) return;
        if (toastMessage) toastMessage.textContent = message;
        toast.classList.add('show');
        clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    if (copyEmailBtn) {
        copyEmailBtn.addEventListener('click', () => {
            const email = copyEmailBtn.getAttribute('data-email') || 'shadilc7@gmail.com';
            navigator.clipboard.writeText(email).then(() => {
                showToast(`Copied ${email} to clipboard!`);
            }).catch(() => {
                // Fallback for older browsers
                const textarea = document.createElement('textarea');
                textarea.value = email;
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand('copy');
                document.body.removeChild(textarea);
                showToast(`Copied ${email} to clipboard!`);
            });
        });
    }

    // -------------------------------------------------------------------------
    // 6. Project Category Filter Pills
    // -------------------------------------------------------------------------
    const filterPills = document.querySelectorAll('.filter-pill');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterPills.length > 0 && projectCards.length > 0) {
        filterPills.forEach(pill => {
            pill.addEventListener('click', () => {
                const targetFilter = pill.getAttribute('data-filter');

                // Update active pill state & ARIA attributes
                filterPills.forEach(p => {
                    p.classList.remove('active');
                    p.setAttribute('aria-selected', 'false');
                });
                pill.classList.add('active');
                pill.setAttribute('aria-selected', 'true');

                // Filter cards with smooth fade transition
                projectCards.forEach(card => {
                    const cardCategories = (card.getAttribute('data-category') || '').split(' ');
                    if (targetFilter === 'all' || cardCategories.includes(targetFilter)) {
                        card.classList.remove('is-hidden');
                        card.style.animation = 'none';
                        card.offsetHeight; // trigger reflow
                        card.style.animation = 'fadeIn 0.4s ease forwards';
                    } else {
                        card.classList.add('is-hidden');
                    }
                });
            });
        });
    }

    // -------------------------------------------------------------------------
    // 7. Contact Form Submission Handling
    // -------------------------------------------------------------------------
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const successModal = document.getElementById('success-modal');

    if (contactForm && submitBtn && successModal) {
        contactForm.addEventListener('submit', function () {
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;

            // Give Google Forms request brief transmission time before displaying success
            setTimeout(() => {
                successModal.style.display = 'flex';
                contactForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;

                // Auto-close modal after 5 seconds
                setTimeout(() => {
                    closeModal();
                }, 5000);
            }, 900);
        });
    }

    // Modal close button
    const modalCloseBtn = document.getElementById('modal-close-btn');
    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeModal);
    }
});

// -----------------------------------------------------------------------------
// Global Modal Helpers
// -----------------------------------------------------------------------------
function closeModal() {
    const modal = document.getElementById('success-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

window.addEventListener('click', (event) => {
    const modal = document.getElementById('success-modal');
    if (modal && event.target === modal) {
        modal.style.display = 'none';
    }
});
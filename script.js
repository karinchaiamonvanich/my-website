// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {

    // 1. Interactive Ambient Background (Mouse Follower Glow)
    document.addEventListener('mousemove', (e) => {
        // Use clientX / clientY for viewport coordinates
        document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
        document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    });

    // 1.1 Bento Cards Individual Mouse Follower Glow
    const bentoCards = document.querySelectorAll('.bento-card');
    bentoCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // 1.2 Magnetic Buttons Effect
    const magneticBtns = document.querySelectorAll('.btn-primary, .btn-secondary, .theme-btn, .footer-social a, .filter-btn');
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - (rect.left + rect.width / 2);
            const y = e.clientY - (rect.top + rect.height / 2);
            
            // Limit movement to max 8px for sublte premium feel
            const moveX = Math.max(-8, Math.min(8, x * 0.15));
            const moveY = Math.max(-8, Math.min(8, y * 0.15));
            
            btn.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
        });
    });


    // 2. Light / Dark Mode Switcher
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    // Load theme from localStorage or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    htmlElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });
    }

    function updateThemeIcon(theme) {
        if (!themeToggle) return;
        const icon = themeToggle.querySelector('i');
        if (theme === 'light') {
            icon.className = 'fas fa-moon';
        } else {
            icon.className = 'fas fa-sun';
        }
    }


    // 3. Typing Text Animation
    const typingText = document.getElementById('typing-text');
    const phrases = [
        'IoT & Robotics 🤖',
        'Web Development 💻',
        'Cyber Security (CTF) 🛡️',
        'การประดิษฐ์นวัตกรรม 💡'
    ];
    let phraseIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        if (!typingText) return;
        
        const currentPhrase = phrases[phraseIdx];
        
        if (isDeleting) {
            // Remove character
            typingText.textContent = currentPhrase.substring(0, charIdx - 1);
            charIdx--;
            typingSpeed = 50; // Deletion is faster
        } else {
            // Add character
            typingText.textContent = currentPhrase.substring(0, charIdx + 1);
            charIdx++;
            typingSpeed = 100;
        }

        // Handle states
        if (!isDeleting && charIdx === currentPhrase.length) {
            // Finished typing, pause
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIdx === 0) {
            // Finished deleting, move to next
            isDeleting = false;
            phraseIdx = (phraseIdx + 1) % phrases.length;
            typingSpeed = 500; // Small delay before next phrase starts
        }

        setTimeout(type, typingSpeed);
    }

    // Start typing
    type();


    // 4. Project Filter Tabs with Transition Animations
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectGrid = document.getElementById('projects-grid');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Switch active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            // Apply filter animation
            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category').split(' ');
                
                // Hide with transition
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8)';
                
                setTimeout(() => {
                    if (filterValue === 'all' || categories.includes(filterValue)) {
                        card.classList.remove('hide');
                        // Fade back in
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        card.classList.add('hide');
                    }
                }, 300);
            });
        });
    });


    // 5. Scroll Reveal / Reveal on Scroll Animation
    const revealElements = document.querySelectorAll('.hero-badge, .hero-title, .hero-typing, .hero-buttons, .hero-image, .bento-card, .skill-category, .filter-container, .project-card');
    
    // Add reveal class dynamically to elements
    revealElements.forEach(el => el.classList.add('reveal'));

    const scrollRevealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Once it has animated in, we can stop observing it
                scrollRevealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => scrollRevealObserver.observe(el));


    // 6. Navigation Link Active Observer & Smooth Scrolling
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '-80px 0px -50% 0px'
    });

    sections.forEach(sec => navObserver.observe(sec));


    // 7. Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking nav links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (hamburger && navMenu) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });
});

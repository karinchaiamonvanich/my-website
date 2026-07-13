// Theme handler for project detail pages
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);

    // Apply smooth reveal animations to project content elements
    const elements = document.querySelectorAll('.breadcrumb, .title, .subtitle, .cover, .section, .actions, .footer');
    elements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(15px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 100 * index);
    });

    // Add magnetic effect to breadcrumb back link and action buttons
    const magneticBtns = document.querySelectorAll('.breadcrumb a, .btn');
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - (rect.left + rect.width / 2);
            const y = e.clientY - (rect.top + rect.height / 2);
            
            const moveX = Math.max(-8, Math.min(8, x * 0.15));
            const moveY = Math.max(-8, Math.min(8, y * 0.15));
            
            btn.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
        });
    });
});

// Scroll Reveal Animation
class ScrollReveal {
    constructor() {
        this.elements = document.querySelectorAll('.fade-in-up, .section-title, .project-card, .certificate-card, .slide-in-left, .slide-in-right, .zoom-in');
        this.observer = new IntersectionObserver(this.handleIntersect.bind(this), {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        this.init();
    }
    
    init() {
        this.elements.forEach(el => {
            // Jangan langsung observe, beri delay sedikit
            setTimeout(() => {
                this.observer.observe(el);
            }, 100);
        });
    }
    
    handleIntersect(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Stagger animation untuk multiple elements
                if (entry.target.classList.contains('project-card') || 
                    entry.target.classList.contains('certificate-card')) {
                    const index = Array.from(this.elements).indexOf(entry.target);
                    entry.target.style.transitionDelay = `${index * 0.1}s`;
                }
            }
        });
    }
}

// Page Load Animation
function initPageLoadAnimations() {
    // Element yang mau animate saat page load
    const homeText = document.querySelector('.home-text');
    const homeImage = document.querySelector('.home-image');
    
    if (homeText && homeImage) {
        // Reset dulu
        homeText.style.opacity = '0';
        homeImage.style.opacity = '0';
        homeText.style.transform = 'translateX(-50px)';
        homeImage.style.transform = 'translateX(50px)';
        
        // Animate setelah page load
        setTimeout(() => {
            homeText.style.transition = 'all 0.8s ease';
            homeImage.style.transition = 'all 0.8s ease';
            homeText.style.opacity = '1';
            homeImage.style.opacity = '1';
            homeText.style.transform = 'translateX(0)';
            homeImage.style.transform = 'translateX(0)';
        }, 500);
    }
}

// Initialize all scroll effects - UPDATE
document.addEventListener('DOMContentLoaded', function() {
    new ScrollReveal();
    initPageLoadAnimations();
    initSmoothScroll();
    initNavbarScroll();
});
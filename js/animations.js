// Typewriter Effect
class TypeWriter {
    constructor(txtElement, words, wait = 3000) {
        this.txtElement = txtElement;
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.type();
        this.isDeleting = false;
    }

    type() {
        const current = this.wordIndex % this.words.length;
        const fullTxt = this.words[current];

        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

        let typeSpeed = 100;

        if (this.isDeleting) {
            typeSpeed /= 2;
        }

        if (!this.isDeleting && this.txt === fullTxt) {
            typeSpeed = this.wait;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.wordIndex++;
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// Initialize TypeWriter
document.addEventListener('DOMContentLoaded', init);

function init() {
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');
    new TypeWriter(txtElement, words, wait);
}

// Floating Elements Animation
function createFloatingElements() {
    const container = document.querySelector('#home');
    const elements = ['💻', '🚀', '⭐', '🔧', '⚡', '🎯', '💡', '🔗'];
    
    for (let i = 0; i < 15; i++) {
        const element = document.createElement('div');
        element.className = 'floating-element';
        element.textContent = elements[Math.floor(Math.random() * elements.length)];
        element.style.left = Math.random() * 100 + 'vw';
        element.style.animationDuration = (Math.random() * 10 + 10) + 's';
        element.style.animationDelay = Math.random() * 5 + 's';
        element.style.fontSize = (Math.random() * 10 + 10) + 'px';
        element.style.opacity = Math.random() * 0.5 + 0.3;
        container.appendChild(element);
    }
}

// Counter Animation
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + '%';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + '%';
        }
    }, 16);
}

// Skill Bar Animation
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-level');
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0%';
        setTimeout(() => {
            bar.style.transition = 'width 1.5s ease-in-out';
            bar.style.width = width;
        }, 500);
    });
}

// Project Card Tilt Effect
function initTiltEffect() {
    const cards = document.querySelectorAll('.project-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateY = (x - centerX) / 25;
            const rotateX = (centerY - y) / 25;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(-10px)';
            setTimeout(() => {
                card.style.transform = '';
            }, 150);
        });
    });
}

// Scroll Progress Bar
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrollTop = window.pageYOffset;
        const progress = (scrollTop / documentHeight) * 100;
        
        progressBar.style.width = progress + '%';
    });
}

// Initialize all animations
document.addEventListener('DOMContentLoaded', function() {
    // Typewriter
    if (document.querySelector('.txt-type')) {
        init();
    }
    
    // Floating elements in home section
    if (document.querySelector('#home')) {
        createFloatingElements();
    }
    
    // Skill bars animation
    const skillBars = document.querySelectorAll('.skill-level');
    if (skillBars.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkillBars();
                    // Animate counter numbers
                    const counters = document.querySelectorAll('.skill-name span:last-child');
                    counters.forEach(counter => {
                        const target = parseInt(counter.textContent);
                        animateCounter(counter, target);
                    });
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(document.querySelector('.skills'));
    }
    
    // Tilt effect for project cards
    initTiltEffect();
    
    // Scroll progress bar
    initScrollProgress();
});
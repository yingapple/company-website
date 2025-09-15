// Hero Interactive Effects
document.addEventListener('DOMContentLoaded', () => {
    // Particle Field Generation
    const particleField = document.getElementById('particleField');
    if (particleField) {
        const particleCount = 30;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 15 + 's';
            particle.style.animationDuration = (15 + Math.random() * 10) + 's';
            particleField.appendChild(particle);
        }
    }
    
    // Mouse Parallax Effect
    const hero = document.querySelector('.hero');
    const orbs = document.querySelectorAll('.gradient-orb');
    const floatingShape = document.querySelector('.floating-shape');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero) {
        let mouseX = 0;
        let mouseY = 0;
        let targetX = 0;
        let targetY = 0;
        
        hero.addEventListener('mousemove', (e) => {
            const rect = hero.getBoundingClientRect();
            mouseX = (e.clientX - rect.left) / rect.width - 0.5;
            mouseY = (e.clientY - rect.top) / rect.height - 0.5;
        });
        
        // Smooth animation loop
        function updateParallax() {
            targetX += (mouseX - targetX) * 0.1;
            targetY += (mouseY - targetY) * 0.1;
            
            // Move orbs with different intensities
            orbs.forEach((orb, index) => {
                const intensity = (index + 1) * 15;
                orb.style.transform = `translate(${targetX * intensity}px, ${targetY * intensity}px)`;
            });
            
            // Move floating shape
            if (floatingShape) {
                floatingShape.style.transform = `rotate(${targetX * 30}deg) translateY(${targetY * 20}px)`;
            }
            
            // Subtle content movement
            if (heroContent) {
                heroContent.style.transform = `translate(${targetX * -10}px, ${targetY * -10}px)`;
            }
            
            requestAnimationFrame(updateParallax);
        }
        
        updateParallax();
    }
    
    // Typing Effect for Headlines
    const textElements = document.querySelectorAll('.text-animate');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    });
    
    textElements.forEach(el => {
        el.style.animationPlayState = 'paused';
        observer.observe(el);
    });
    
    // Dynamic Gradient Animation on Scroll
    let scrollProgress = 0;
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const maxScroll = window.innerHeight;
        scrollProgress = Math.min(scrolled / maxScroll, 1);
        
        // Fade out hero background as user scrolls
        const heroBackground = document.querySelector('.hero-background');
        if (heroBackground) {
            heroBackground.style.opacity = 0.6 - (scrollProgress * 0.4);
        }
        
        // Parallax scroll effect for orbs
        orbs.forEach((orb, index) => {
            const speed = (index + 1) * 50;
            orb.style.transform = `translateY(${scrollProgress * speed}px)`;
        });
    });
    
    // Add hover effect to buttons
    const buttons = document.querySelectorAll('.button');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', (e) => {
            const rect = e.target.getBoundingClientRect();
            const ripple = document.createElement('span');
            ripple.className = 'button-ripple';
            ripple.style.width = ripple.style.height = Math.max(rect.width, rect.height) + 'px';
            ripple.style.left = e.clientX - rect.left - (Math.max(rect.width, rect.height) / 2) + 'px';
            ripple.style.top = e.clientY - rect.top - (Math.max(rect.width, rect.height) / 2) + 'px';
            e.target.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
    
    // Smooth reveal for scroll indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        setTimeout(() => {
            scrollIndicator.style.opacity = '1';
            scrollIndicator.style.transform = 'translateX(-50%) translateY(0)';
        }, 2000);
    }
});

// Add CSS for button ripple effect
const style = document.createElement('style');
style.textContent = `
    .button {
        position: relative;
        overflow: hidden;
    }
    
    .button-ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    .scroll-indicator {
        opacity: 0;
        transform: translateX(-50%) translateY(20px);
        transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
    }
`;
document.head.appendChild(style);

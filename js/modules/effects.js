/* ==================== EFFECTS MODULE ==================== */

import { CONFIG, SELECTORS } from '../utils/constants.js';
import { createElement } from '../utils/helpers.js';

export class RippleEffect {
    init() {
        const elements = document.querySelectorAll(SELECTORS.rippleElements);
        
        elements.forEach(element => {
            element.addEventListener('click', (e) => this.createRipple(e, element));
        });
    }

    createRipple(event, element) {
        const ripple = createElement('span', 'ripple');
        
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    }
}

export class MagneticEffect {
    init() {
        const elements = document.querySelectorAll(SELECTORS.magneticElements);
        
        elements.forEach(element => {
            element.classList.add('magnetic');
            
            element.addEventListener('mousemove', (e) => {
                this.applyMagnet(e, element);
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.transform = 'translate(0, 0)';
            });
        });
    }

    applyMagnet(event, element) {
        const rect = element.getBoundingClientRect();
        const x = event.clientX - rect.left - rect.width / 2;
        const y = event.clientY - rect.top - rect.height / 2;
        
        element.style.transform = `translate(${x * CONFIG.MAGNETIC_STRENGTH}px, ${y * CONFIG.MAGNETIC_STRENGTH}px)`;
    }
}

export class FloatingElements {
    init() {
        const badges = document.querySelectorAll(SELECTORS.floatElements);
        badges.forEach((badge, index) => {
            badge.classList.add('float-animation');
            badge.style.animationDelay = `${index * 0.2}s`;
        });

        // Pulse glow
        const glowElements = document.querySelectorAll(SELECTORS.glowElements);
        glowElements.forEach(el => {
            el.classList.add('pulse-glow');
        });
    }
}

export function initRippleEffect() {
    const ripple = new RippleEffect();
    ripple.init();
}

export function initMagneticButtons() {
    const magnetic = new MagneticEffect();
    magnetic.init();
}

export function initFloatingElements() {
    const floating = new FloatingElements();
    floating.init();
}

// Apply shine and glitch effects
export function applyVisualEffects() {
    document.querySelectorAll(SELECTORS.glitchElements).forEach(el => {
        el.classList.add('glitch');
    });

    document.querySelectorAll(SELECTORS.shineElements).forEach(el => {
        el.classList.add('shine');
    });

    // Animated background
    const animatedBg = createElement('div', 'animated-bg');
    document.body.insertBefore(animatedBg, document.body.firstChild);
}


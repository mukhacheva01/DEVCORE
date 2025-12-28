/* ==================== PARTICLES MODULE ==================== */

import { CONFIG, SELECTORS } from '../utils/constants.js';
import { createElement, randomRange } from '../utils/helpers.js';

export class ParticleSystem {
    constructor(containerSelector) {
        this.container = document.querySelector(containerSelector);
    }

    init() {
        if (!this.container) return;

        for (let i = 0; i < CONFIG.PARTICLES_COUNT; i++) {
            this.createParticle();
        }
    }

    createParticle() {
        const particle = createElement('div', 'particle');
        
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 10 + 's';
        particle.style.animationDuration = randomRange(
            CONFIG.PARTICLES_MIN_DURATION,
            CONFIG.PARTICLES_MAX_DURATION
        ) + 's';
        
        this.container.appendChild(particle);
    }
}

export function initParticles() {
    const particleSystem = new ParticleSystem(SELECTORS.hero);
    particleSystem.init();
}







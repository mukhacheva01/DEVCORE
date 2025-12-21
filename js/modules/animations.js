/* ==================== ANIMATIONS MODULE ==================== */

import { CONFIG, SELECTORS, ANIMATION_TYPES } from '../utils/constants.js';

export class ScrollAnimations {
    constructor(options = {}) {
        this.options = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px',
            ...options
        };
        this.observer = null;
    }

    init() {
        this.observer = new IntersectionObserver(
            (entries) => this.handleIntersection(entries),
            this.options
        );

        this.observeElements();
    }

    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                this.observer.unobserve(entry.target);
            }
        });
    }

    observeElements() {
        const elements = document.querySelectorAll(SELECTORS.fadeElements);
        elements.forEach(el => this.observer.observe(el));
    }
}

export class AdvancedScrollAnimations {
    constructor() {
        this.options = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };
    }

    init() {
        const observer = new IntersectionObserver(
            (entries) => this.handleIntersection(entries),
            this.options
        );

        this.setupAnimations(observer);
    }

    handleIntersection(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                const animationType = entry.target.dataset.animation || ANIMATION_TYPES.FADE_IN_UP;
                entry.target.style.animation = `${animationType} 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards`;
                entry.target.style.animationDelay = `${index * CONFIG.ANIMATION_DELAY_MULTIPLIER}s`;
            }
        });
    }

    setupAnimations(observer) {
        // Odd tags from left
        document.querySelectorAll(SELECTORS.oddTags).forEach(el => {
            el.dataset.animation = ANIMATION_TYPES.FADE_IN_LEFT;
            observer.observe(el);
        });

        // Even tags from right
        document.querySelectorAll(SELECTORS.evenTags).forEach(el => {
            el.dataset.animation = ANIMATION_TYPES.FADE_IN_RIGHT;
            observer.observe(el);
        });

        // Stats with scale
        document.querySelectorAll(SELECTORS.statItems).forEach(el => {
            el.dataset.animation = ANIMATION_TYPES.SCALE_IN;
            observer.observe(el);
        });
    }
}

export function initScrollAnimations() {
    const scrollAnimations = new ScrollAnimations();
    scrollAnimations.init();
}

export function initAdvancedScrollAnimations() {
    const advancedAnimations = new AdvancedScrollAnimations();
    advancedAnimations.init();
}


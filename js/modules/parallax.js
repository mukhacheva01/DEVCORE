/* ==================== PARALLAX MODULE ==================== */

import { prefersReducedMotion, isMobileDevice } from '../utils/helpers.js';

export class ParallaxHero {
    constructor() {
        this.heroSection = document.querySelector('.hero');
        this.heroBackground = document.querySelector('.hero-background');
        this.heroContent = document.querySelector('.hero-content');
        this.lastScrollY = 0;
        this.ticking = false;
        
        // Parallax speed multipliers (lower = slower)
        this.speeds = {
            background: 0.3,
            content: 0.15
        };
    }

    init() {
        // Only apply parallax on desktop and if motion is not reduced
        if (isMobileDevice() || prefersReducedMotion() || !this.heroSection) {
            return;
        }

        // Use requestAnimationFrame for smooth performance
        window.addEventListener('scroll', () => this.handleScroll(), { passive: true });
        
        // Initial call
        this.updateParallax();
    }

    handleScroll() {
        if (!this.ticking) {
            window.requestAnimationFrame(() => {
                this.updateParallax();
                this.ticking = false;
            });
            this.ticking = true;
        }
    }

    updateParallax() {
        const scrollY = window.scrollY;
        const heroRect = this.heroSection.getBoundingClientRect();
        const heroHeight = this.heroSection.offsetHeight;
        
        // Calculate parallax only when hero is visible
        if (heroRect.bottom < 0 || heroRect.top > window.innerHeight) {
            return;
        }

        // Calculate scroll progress (0 to 1) within hero section
        const scrollProgress = Math.max(0, Math.min(1, scrollY / heroHeight));

        // Apply parallax to background (moves slower)
        if (this.heroBackground) {
            const backgroundY = scrollProgress * heroHeight * this.speeds.background;
            this.heroBackground.style.transform = `translateY(${backgroundY}px) scale(1 + ${scrollProgress * 0.1})`;
            this.heroBackground.style.opacity = 1 - scrollProgress * 0.5;
        }

        // Apply parallax to content (moves slower than scroll)
        if (this.heroContent) {
            const contentY = scrollProgress * heroHeight * this.speeds.content;
            this.heroContent.style.transform = `translateY(${contentY}px)`;
            this.heroContent.style.opacity = 1 - scrollProgress * 0.3;
        }
    }
}

export function initParallaxHero() {
    const parallax = new ParallaxHero();
    parallax.init();
}


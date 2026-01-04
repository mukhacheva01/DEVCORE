/* ==================== MAIN APPLICATION ==================== */

import { isMobileDevice, prefersReducedMotion } from './utils/helpers.js';

// UI Modules
import {
    initScrollIndicator,
    initMobileMenu,
    initSmoothScroll,
    initSmartNavbar
} from './modules/ui.js';

// Animation Modules
import {
    initScrollAnimations,
    initAdvancedScrollAnimations,
    initUniversalScrollAnimations
} from './modules/animations.js';

// Effect Modules
import {
    initRippleEffect,
    initMagneticButtons,
    initFloatingElements,
    applyVisualEffects
} from './modules/effects.js';

// Text Modules
import {
    initTextReveal,
    initTypingEffect
} from './modules/text.js';

// Interactive Modules
import { initCustomCursor } from './modules/cursor.js';
import { initParticles } from './modules/particles.js';
import { initContactForm } from './modules/form.js';
import { initParallaxHero } from './modules/parallax.js';
import { initServicesFilter } from './modules/services-filter.js';
import { initCounterAnimation } from './modules/counter.js';

import { initPackageSelection } from './modules/packages.js';

/**
 * Main Application Class
 */
class DevCoreApp {
    constructor() {
        this.isMobile = isMobileDevice();
        this.reducedMotion = prefersReducedMotion();
    }

    /**
     * Initialize all modules
     */
    init() {
        console.log('%c DevCore Landing Page ', 'background: #6366f1; color: white; font-size: 20px; padding: 10px;');
        console.log('🚀 Модульная архитектура загружена');
        
        // Core UI (always load)
        this.initCoreModules();
        
        // Desktop-only effects
        if (!this.isMobile && !this.reducedMotion) {
            this.initDesktopEffects();
        }
        
        // Universal effects
        this.initUniversalEffects();
        
        // Visual enhancements
        this.initVisualEffects();
        
        console.log('✨ Все модули инициализированы');
        this.logStats();
    }

    /**
     * Core modules that always load
     */
    initCoreModules() {
        initScrollAnimations();
        initMobileMenu();
        initSmoothScroll();
        initSmartNavbar();
        initContactForm();
        initPackageSelection();
    }

    /**
     * Desktop-only effects
     */
    initDesktopEffects() {
        initCustomCursor();
        initParticles();
        initMagneticButtons();
        initTypingEffect();
        initParallaxHero();
    }

    /**
     * Effects for all devices
     */
    initUniversalEffects() {
        initRippleEffect();
        initTextReveal();
        initFloatingElements();
        initServicesFilter();
        initCounterAnimation();
        
        // Universal scroll animations for all sections
        initUniversalScrollAnimations();
        
        // Advanced scroll animations with delay
        setTimeout(() => {
            initAdvancedScrollAnimations();
        }, 100);
    }

    /**
     * Apply visual enhancements
     */
    initVisualEffects() {
        applyVisualEffects();
    }

    /**
     * Log application statistics
     */
    logStats() {
        console.log('%c 📊 Статистика ', 'background: #8b5cf6; color: white; font-size: 16px; padding: 8px;');
        console.log(`Device: ${this.isMobile ? 'Mobile' : 'Desktop'}`);
        console.log(`Reduced Motion: ${this.reducedMotion ? 'Yes' : 'No'}`);
        console.log(`Modules Loaded: ${this.isMobile ? 'Core + Universal' : 'All'}`);
    }
}

/**
 * Initialize application when DOM is ready
 */
document.addEventListener('DOMContentLoaded', () => {
    const app = new DevCoreApp();
    app.init();
});

/**
 * Handle window resize
 */
window.addEventListener('resize', () => {
    // Reload if device type changed
    const currentDevice = isMobileDevice();
    const app = new DevCoreApp();
    
    if (currentDevice !== app.isMobile) {
        console.log('Device type changed, consider reloading');
    }
});

export default DevCoreApp;
/* ==================== CONSTANTS ==================== */

export const CONFIG = {
    // Cursor
    CURSOR_TRAIL_FREQUENCY: 0.7, // 0-1, меньше = чаще
    CURSOR_SMOOTH_FACTOR: 0.15,
    CURSOR_DOT_SMOOTH_FACTOR: 0.25,
    
    // Particles
    PARTICLES_COUNT: 30,
    PARTICLES_MIN_DURATION: 10,
    PARTICLES_MAX_DURATION: 20,
    
    // Typing
    TYPING_SPEED: 150, // ms
    TYPING_DELAY: 500, // ms before start
    CURSOR_REMOVE_DELAY: 3000, // ms
    
    // Animations
    ANIMATION_DELAY_MULTIPLIER: 0.08,
    TEXT_REVEAL_CHAR_DELAY: 0.02,
    
    // Magnetic
    MAGNETIC_STRENGTH: 0.3,
    
    // Device detection
    MOBILE_BREAKPOINT: 768
};

export const SELECTORS = {
    // Navigation
    navbar: '.navbar',
    navMenu: '.nav-menu',
    navToggle: '.nav-toggle',
    navLinks: '.nav-menu a',
    
    // Hero
    hero: '.hero',
    scrollPercent: '.scroll-percent',
    heroTitle: '.hero-title',
    titleMain: '.title-main .gradient-text',
    
    // Animations
    fadeElements: '.project-card, .contact-card, .stat-item, .tag, .service-category',
    floatElements: '.project-badge, .badge-symbol',
    glowElements: '.badge-symbol',
    glitchElements: '.logo-text, .badge-symbol',
    shineElements: '.project-link, .nav-menu a',
    
    // Scroll animations
    scrollAnimateElements: '.task-card, .case-card, .package-card, .audience-column, .about-text-block, .section-header, .service-category, .project-card',
    
    // Interactive
    rippleElements: '.cta-button, .submit-button, .tag',
    magneticElements: '.cta-button, .submit-button',
    textRevealElements: '.section-title, .hero-title .title-line',
    
    // Tags
    oddTags: '.services-tags .tag:nth-child(odd)',
    evenTags: '.services-tags .tag:nth-child(even)',
    statItems: '.stat-item',
    
    // Form
    contactForm: '#contactForm',
    successModal: '#successModal'
};

export const ANIMATION_TYPES = {
    FADE_IN_UP: 'fadeInUp',
    FADE_IN_LEFT: 'fadeInLeft',
    FADE_IN_RIGHT: 'fadeInRight',
    SCALE_IN: 'scaleIn',
    ROTATE_IN: 'rotateIn'
};


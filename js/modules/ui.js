/* ==================== UI MODULE ==================== */

import { SELECTORS } from '../utils/constants.js';
import { throttle } from '../utils/helpers.js';

export class ScrollIndicator {
    constructor() {
        this.scrollPercent = document.querySelector(SELECTORS.scrollPercent);
    }

    init() {
        if (!this.scrollPercent) return;

        window.addEventListener('scroll', throttle(() => {
            this.update();
        }, 100));
    }

    update() {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        const percentage = Math.round((scrollTop / (documentHeight - windowHeight)) * 100);
        
        this.scrollPercent.textContent = `((${percentage}%))`;
    }
}

export class MobileMenu {
    constructor() {
        this.navToggle = document.querySelector(SELECTORS.navToggle);
        this.navMenu = document.querySelector(SELECTORS.navMenu);
    }

    init() {
        if (!this.navToggle || !this.navMenu) return;

        this.navToggle.addEventListener('click', () => {
            this.toggle();
        });

        // Close menu on link click
        const menuLinks = document.querySelectorAll(SELECTORS.navLinks);
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    this.close();
                }
            });
        });
    }

    toggle() {
        const isOpen = this.navMenu.style.display === 'flex';
        
        if (isOpen) {
            this.close();
        } else {
            this.open();
        }
    }

    open() {
        this.navMenu.style.display = 'flex';
        this.navMenu.style.position = 'absolute';
        this.navMenu.style.top = '100%';
        this.navMenu.style.left = '0';
        this.navMenu.style.right = '0';
        this.navMenu.style.background = 'rgba(10, 10, 10, 0.98)';
        this.navMenu.style.flexDirection = 'column';
        this.navMenu.style.padding = '20px';
        this.navMenu.style.gap = '20px';
        this.navMenu.style.backdropFilter = 'blur(20px)';
        this.navMenu.style.borderTop = '1px solid var(--color-border)';
    }

    close() {
        this.navMenu.style.display = 'none';
    }
}

export class SmoothScroll {
    init() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                
                if (href === '#') return;
                
                e.preventDefault();
                this.scrollTo(href);
            });
        });
    }

    scrollTo(selector) {
        const target = document.querySelector(selector);
        if (target) {
            const offsetTop = target.offsetTop - 80; // navbar offset
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }
}

export class SmartNavbar {
    constructor() {
        this.navbar = document.querySelector(SELECTORS.navbar);
        this.lastScroll = 0;
    }

    init() {
        if (!this.navbar) return;

        window.addEventListener('scroll', throttle(() => {
            this.update();
        }, 100));
    }

    update() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            this.navbar.style.boxShadow = 'none';
            return;
        }
        
        if (currentScroll > this.lastScroll && currentScroll > 100) {
            // Scrolling down
            this.navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            this.navbar.style.transform = 'translateY(0)';
            this.navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5)';
        }
        
        this.lastScroll = currentScroll;
    }
}

export function initScrollIndicator() {
    const indicator = new ScrollIndicator();
    indicator.init();
}

export function initMobileMenu() {
    const menu = new MobileMenu();
    menu.init();
}

export function initSmoothScroll() {
    const smoothScroll = new SmoothScroll();
    smoothScroll.init();
}

export function initSmartNavbar() {
    const navbar = new SmartNavbar();
    navbar.init();
}


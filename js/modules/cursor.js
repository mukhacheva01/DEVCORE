/* ==================== CURSOR MODULE ==================== */

import { CONFIG, SELECTORS } from '../utils/constants.js';
import { createElement } from '../utils/helpers.js';

export class CustomCursor {
    constructor() {
        this.cursor = null;
        this.cursorDot = null;
        this.mouseX = 0;
        this.mouseY = 0;
        this.cursorX = 0;
        this.cursorY = 0;
        this.dotX = 0;
        this.dotY = 0;
    }

    init() {
        this.createCursorElements();
        this.bindEvents();
        this.animate();
    }

    createCursorElements() {
        this.cursor = createElement('div', 'custom-cursor');
        this.cursorDot = createElement('div', 'custom-cursor-dot');
        
        document.body.appendChild(this.cursor);
        document.body.appendChild(this.cursorDot);
    }

    bindEvents() {
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
            
            if (Math.random() > CONFIG.CURSOR_TRAIL_FREQUENCY) {
                this.createTrail(e.clientX, e.clientY);
            }
        });

        // Увеличиваем курсор на интерактивных элементах
        const interactiveElements = document.querySelectorAll('a, button, .tag, .project-card');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => this.scale(1.5));
            el.addEventListener('mouseleave', () => this.scale(1));
        });
    }

    animate() {
        this.cursorX += (this.mouseX - this.cursorX) * CONFIG.CURSOR_SMOOTH_FACTOR;
        this.cursorY += (this.mouseY - this.cursorY) * CONFIG.CURSOR_SMOOTH_FACTOR;
        this.dotX += (this.mouseX - this.dotX) * CONFIG.CURSOR_DOT_SMOOTH_FACTOR;
        this.dotY += (this.mouseY - this.dotY) * CONFIG.CURSOR_DOT_SMOOTH_FACTOR;

        this.cursor.style.left = this.cursorX + 'px';
        this.cursor.style.top = this.cursorY + 'px';
        this.cursorDot.style.left = this.dotX + 'px';
        this.cursorDot.style.top = this.dotY + 'px';

        requestAnimationFrame(() => this.animate());
    }

    scale(factor) {
        this.cursor.style.transform = `scale(${factor})`;
        this.cursorDot.style.transform = `scale(${factor})`;
    }

    createTrail(x, y) {
        const trail = createElement('div', 'cursor-trail');
        trail.style.left = x + 'px';
        trail.style.top = y + 'px';
        document.body.appendChild(trail);
        
        setTimeout(() => trail.remove(), 500);
    }
}

export function initCustomCursor() {
    const cursor = new CustomCursor();
    cursor.init();
}


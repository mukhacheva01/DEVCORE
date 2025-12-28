/* ==================== TEXT ANIMATIONS MODULE ==================== */

import { CONFIG, SELECTORS } from '../utils/constants.js';
import { createElement, wait } from '../utils/helpers.js';

export class TextReveal {
    init() {
        const elements = document.querySelectorAll(SELECTORS.textRevealElements);
        
        elements.forEach(element => this.revealText(element));
    }

    revealText(element) {
        const text = element.textContent;
        element.innerHTML = '';
        element.classList.add('text-reveal');
        
        text.split('').forEach((char, index) => {
            const span = createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.transform = 'translateY(100%)';
            span.style.animationDelay = `${index * CONFIG.TEXT_REVEAL_CHAR_DELAY}s`;
            element.appendChild(span);
        });
    }
}

export class TypingEffect {
    constructor(elementSelector) {
        this.element = document.querySelector(elementSelector);
        this.originalText = '';
        this.currentIndex = 0;
    }

    async init() {
        if (!this.element) return;

        this.originalText = this.element.textContent;
        this.element.textContent = '';
        
        await wait(CONFIG.TYPING_DELAY);
        await this.type();
        await this.addCursor();
    }

    async type() {
        while (this.currentIndex < this.originalText.length) {
            this.element.textContent += this.originalText.charAt(this.currentIndex);
            this.currentIndex++;
            await wait(CONFIG.TYPING_SPEED);
        }
    }

    async addCursor() {
        const cursor = createElement('span', 'typing-cursor');
        this.element.appendChild(cursor);
        
        await wait(CONFIG.CURSOR_REMOVE_DELAY);
        cursor.remove();
    }
}

export function initTextReveal() {
    const textReveal = new TextReveal();
    textReveal.init();
}

export function initTypingEffect() {
    const typing = new TypingEffect(SELECTORS.titleMain);
    typing.init();
}







/* ==================== HELPER FUNCTIONS ==================== */

import { CONFIG } from './constants.js';

/**
 * Проверяет, является ли устройство мобильным
 */
export function isMobileDevice() {
    return window.innerWidth <= CONFIG.MOBILE_BREAKPOINT;
}

/**
 * Проверяет, запрошено ли уменьшение анимаций
 */
export function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Debounce функция
 */
export function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle функция
 */
export function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Генерирует случайное число в диапазоне
 */
export function randomRange(min, max) {
    return Math.random() * (max - min) + min;
}

/**
 * Создает элемент с классами
 */
export function createElement(tag, classNames = []) {
    const element = document.createElement(tag);
    if (Array.isArray(classNames)) {
        element.classList.add(...classNames);
    } else if (classNames) {
        element.classList.add(classNames);
    }
    return element;
}

/**
 * Ожидание (Promise-based delay)
 */
export function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Проверяет, виден ли элемент в viewport
 */
export function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}




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
                entry.target.style.animation = `${animationType} 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards`;
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

export class UniversalScrollAnimations {
    constructor() {
        this.options = {
            threshold: 0.1,
            rootMargin: '0px 0px -80px 0px'
        };
        this.observer = null;
    }

    init() {
        if (!window.IntersectionObserver) {
            // Fallback для браузеров без поддержки IntersectionObserver
            this.initWithoutObserver();
            return;
        }

        this.observer = new IntersectionObserver(
            (entries) => this.handleIntersection(entries),
            this.options
        );

        this.observeElements();
    }

    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // После анимации можно прекратить наблюдение для оптимизации
                // Но оставляем для возможности повторного появления
                // this.observer.unobserve(entry.target);
            }
        });
    }

    observeElements() {
        // Заголовки секций
        const sectionHeaders = document.querySelectorAll('.section-header');
        sectionHeaders.forEach(header => {
            this.observer.observe(header);
        });

        // Карточки задач
        const taskCards = document.querySelectorAll('.task-card');
        taskCards.forEach(card => {
            this.observer.observe(card);
        });

        // Карточки кейсов
        const caseCards = document.querySelectorAll('.case-card');
        caseCards.forEach(card => {
            this.observer.observe(card);
        });

        // Карточки пакетов
        const packageCards = document.querySelectorAll('.package-card');
        packageCards.forEach(card => {
            this.observer.observe(card);
        });

        // Колонки целевой аудитории
        const audienceColumns = document.querySelectorAll('.audience-column');
        audienceColumns.forEach(column => {
            this.observer.observe(column);
        });

        // Блоки текста в секции About
        const aboutTextBlocks = document.querySelectorAll('.about-text-block');
        aboutTextBlocks.forEach(block => {
            this.observer.observe(block);
        });

        // Карточки этапов процесса
        const processStepCards = document.querySelectorAll('.process-step-card');
        processStepCards.forEach(card => {
            this.observer.observe(card);
        });

        // Футер процесса
        const processFooter = document.querySelector('.process-footer');
        if (processFooter) {
            this.observer.observe(processFooter);
        }

        // Карточки проектов (если еще не анимированы)
        const projectCards = document.querySelectorAll('.project-card:not(.is-visible)');
        projectCards.forEach(card => {
            this.observer.observe(card);
        });

        // Категории услуг (если еще не анимированы)
        const serviceCategories = document.querySelectorAll('.service-category:not(.is-visible)');
        serviceCategories.forEach(category => {
            this.observer.observe(category);
        });
    }

    initWithoutObserver() {
        // Fallback: показываем все элементы сразу
        const allElements = document.querySelectorAll('.section-header, .task-card, .case-card, .package-card, .audience-column, .about-text-block');
        allElements.forEach(el => {
            el.classList.add('is-visible');
        });
    }
}

export function initAdvancedScrollAnimations() {
    const advancedAnimations = new AdvancedScrollAnimations();
    advancedAnimations.init();
}

export function initUniversalScrollAnimations() {
    const universalAnimations = new UniversalScrollAnimations();
    universalAnimations.init();
}


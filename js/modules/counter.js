/* ==================== COUNTER ANIMATION MODULE ==================== */

export class CounterAnimation {
    constructor() {
        this.counters = document.querySelectorAll('.stat-number[data-target]');
        this.hasAnimated = false;
        this.options = {
            threshold: 0.5,
            rootMargin: '0px'
        };
        this.observer = null;
    }

    init() {
        if (this.counters.length === 0) return;

        this.observer = new IntersectionObserver(
            (entries) => this.handleIntersection(entries),
            this.options
        );

        this.counters.forEach(counter => {
            const statItem = counter.closest('.stat-item');
            if (statItem) {
                this.observer.observe(statItem);
            }
        });
    }

    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.animated) {
                entry.target.dataset.animated = 'true';
                const counter = entry.target.querySelector('.stat-number[data-target]');
                if (counter && !counter.dataset.animating) {
                    counter.dataset.animating = 'true';
                    this.animateCounter(counter);
                }
            }
        });
    }

    animateCounter(element) {
        const target = parseInt(element.dataset.target);
        const statItem = element.closest('.stat-item');
        const suffix = statItem ? statItem.dataset.suffix || '' : '';
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // 60fps
        let current = 0;
        const startTime = performance.now();

        const updateCounter = (timestamp) => {
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function (ease-out)
            const easeOut = 1 - Math.pow(1 - progress, 3);
            current = Math.floor(target * easeOut);
            
            if (progress < 1) {
                element.textContent = current + suffix;
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target + suffix;
            }
        };

        requestAnimationFrame(updateCounter);
    }
}

export function initCounterAnimation() {
    const counter = new CounterAnimation();
    counter.init();
}


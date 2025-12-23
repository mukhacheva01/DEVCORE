/* ==================== SERVICES FILTER MODULE ==================== */

export class ServicesFilter {
    constructor() {
        this.container = document.querySelector('.services-list .container');
        this.categories = document.querySelectorAll('.service-category');
        this.filterButtons = null;
        this.currentFilter = 'all';
    }

    init() {
        if (!this.container || this.categories.length === 0) return;

        this.createFilterButtons();
        this.attachEventListeners();
    }

    createFilterButtons() {
        const filterContainer = document.createElement('div');
        filterContainer.className = 'services-filter';
        filterContainer.innerHTML = `
            <button class="filter-btn active" data-filter="all">Все услуги</button>
            <button class="filter-btn" data-filter="analytics">Analytics</button>
            <button class="filter-btn" data-filter="design">Design</button>
            <button class="filter-btn" data-filter="development">Development</button>
        `;

        // Insert before service categories
        const firstCategory = this.categories[0];
        if (firstCategory && firstCategory.parentNode) {
            firstCategory.parentNode.insertBefore(filterContainer, firstCategory);
        }
        
        this.filterButtons = filterContainer.querySelectorAll('.filter-btn');
    }

    attachEventListeners() {
        if (!this.filterButtons) return;

        this.filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const filter = e.target.dataset.filter;
                this.setActiveFilter(filter);
                this.filterCategories(filter);
            });
        });
    }

    setActiveFilter(filter) {
        this.currentFilter = filter;
        
        this.filterButtons.forEach(btn => {
            if (btn.dataset.filter === filter) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    filterCategories(filter) {
        this.categories.forEach((category, index) => {
            const categoryType = category.dataset.category;
            
            if (filter === 'all' || categoryType === filter) {
                // Show category with animation
                category.style.display = 'block';
                setTimeout(() => {
                    category.style.opacity = '1';
                    category.style.transform = 'translateY(0)';
                }, index * 100);
            } else {
                // Hide category
                category.style.opacity = '0';
                category.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    category.style.display = 'none';
                }, 300);
            }
        });
    }
}

export function initServicesFilter() {
    const filter = new ServicesFilter();
    filter.init();
}




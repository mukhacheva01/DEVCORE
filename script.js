// ==================== ИНИЦИАЛИЗАЦИЯ ====================
document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    initScrollIndicator();
    initMobileMenu();
    initContactForm();
    initSmoothScroll();
    
    // Эффекты только для десктопа
    const isMobile = window.innerWidth <= 768;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!isMobile && !prefersReducedMotion) {
        initCustomCursor();
        initParticles();
        initMagneticButtons();
        initTypingEffect();
    }
    
    // Эффекты для всех устройств
    initRippleEffect();
    initTextReveal();
    initFloatingElements();
});

// ==================== АНИМАЦИИ ПРИ ПРОКРУТКЕ ====================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Наблюдаем за элементами
    const elements = document.querySelectorAll('.project-card, .contact-card, .stat-item, .tag');
    elements.forEach(el => observer.observe(el));
}

// ==================== ИНДИКАТОР ПРОКРУТКИ ====================
function initScrollIndicator() {
    const scrollPercent = document.querySelector('.scroll-percent');
    
    if (!scrollPercent) return;

    window.addEventListener('scroll', () => {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        const scrollPercentage = Math.round((scrollTop / (documentHeight - windowHeight)) * 100);
        
        scrollPercent.textContent = `((${scrollPercentage}%))`;
    });
}

// ==================== МОБИЛЬНОЕ МЕНЮ ====================
function initMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!navToggle || !navMenu) return;

    navToggle.addEventListener('click', () => {
        navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
        
        if (navMenu.style.display === 'flex') {
            navMenu.style.position = 'absolute';
            navMenu.style.top = '100%';
            navMenu.style.left = '0';
            navMenu.style.right = '0';
            navMenu.style.background = 'rgba(10, 10, 10, 0.98)';
            navMenu.style.flexDirection = 'column';
            navMenu.style.padding = '20px';
            navMenu.style.gap = '20px';
            navMenu.style.backdropFilter = 'blur(20px)';
            navMenu.style.borderTop = '1px solid var(--color-border)';
        }
    });

    // Закрываем меню при клике на ссылку
    const menuLinks = document.querySelectorAll('.nav-menu a');
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navMenu.style.display = 'none';
            }
        });
    });
}

// ==================== ПЛАВНАЯ ПРОКРУТКА ====================
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            if (href === '#') return;
            
            e.preventDefault();
            
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 80; // Учитываем высоту навбара
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ==================== ФОРМА КОНТАКТОВ ====================
function initContactForm() {
    const form = document.getElementById('contactForm');
    const modal = document.getElementById('successModal');
    
    if (!form || !modal) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Получаем данные формы
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Здесь должна быть отправка данных на сервер
        // Для демонстрации просто показываем модальное окно
        console.log('Отправка данных:', data);
        
        // Имитация отправки
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Показываем модальное окно успеха
        showModal();
        
        // Очищаем форму
        form.reset();
    });
}

// ==================== МОДАЛЬНОЕ ОКНО ====================
function showModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.classList.add('active');
    }
}

function closeModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

// Закрываем модальное окно при клике вне контента
document.addEventListener('click', (e) => {
    const modal = document.getElementById('successModal');
    if (modal && e.target === modal) {
        closeModal();
    }
});

// ==================== ПАРАЛЛАКС ЭФФЕКТ ====================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');
    
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ==================== CURSOR EFFECT (ОПЦИОНАЛЬНО) ====================
document.addEventListener('mousemove', (e) => {
    const cards = document.querySelectorAll('.project-card, .contact-card');
    
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        } else {
            card.style.transform = '';
        }
    });
});

// ==================== NAVBAR SCROLL EFFECT ====================
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.boxShadow = 'none';
        return;
    }
    
    if (currentScroll > lastScroll && currentScroll > 100) {
        // Прокрутка вниз
        navbar.style.transform = 'translateY(-100%)';
    } else {
        // Прокрутка вверх
        navbar.style.transform = 'translateY(0)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5)';
    }
    
    lastScroll = currentScroll;
});

// ==================== АНИМАЦИЯ ЧИСЕЛ В СТАТИСТИКЕ ====================
function animateNumbers() {
    const stats = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const text = target.textContent;
                const number = parseInt(text.match(/\d+/)[0]);
                const suffix = text.replace(/\d+/, '');
                
                animateNumber(target, 0, number, 2000, suffix);
                observer.unobserve(target);
            }
        });
    }, observerOptions);
    
    stats.forEach(stat => observer.observe(stat));
}

function animateNumber(element, start, end, duration, suffix) {
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const current = Math.floor(progress * (end - start) + start);
        element.textContent = current + suffix;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

// Инициализируем анимацию чисел
setTimeout(() => {
    animateNumbers();
}, 100);

// ==================== ДИНАМИЧЕСКИЕ ГРАДИЕНТЫ ====================
function updateGradients() {
    const gradientTexts = document.querySelectorAll('.gradient-text');
    let hue = 0;
    
    setInterval(() => {
        hue = (hue + 1) % 360;
        
        gradientTexts.forEach(text => {
            text.style.backgroundImage = `linear-gradient(135deg, 
                hsl(${hue}, 70%, 60%), 
                hsl(${(hue + 60) % 360}, 70%, 60%), 
                hsl(${(hue + 120) % 360}, 70%, 60%)
            )`;
        });
    }, 50);
}

// Раскомментируйте для активации динамических градиентов
// updateGradients();

// ==================== CUSTOM CURSOR ====================
function initCustomCursor() {
    // Создаем элементы курсора
    const cursor = document.createElement('div');
    const cursorDot = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursorDot.className = 'custom-cursor-dot';
    document.body.appendChild(cursor);
    document.body.appendChild(cursorDot);

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let dotX = 0, dotY = 0;

    // Следим за движением мыши
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Создаем след
        if (Math.random() > 0.7) {
            createTrail(e.clientX, e.clientY);
        }
    });

    // Анимация курсора
    function animateCursor() {
        // Плавное следование за мышью
        cursorX += (mouseX - cursorX) * 0.15;
        cursorY += (mouseY - cursorY) * 0.15;
        dotX += (mouseX - dotX) * 0.25;
        dotY += (mouseY - dotY) * 0.25;

        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        cursorDot.style.left = dotX + 'px';
        cursorDot.style.top = dotY + 'px';

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Увеличиваем курсор при наведении на интерактивные элементы
    const interactiveElements = document.querySelectorAll('a, button, .tag, .project-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
            cursorDot.style.transform = 'scale(1.5)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursorDot.style.transform = 'scale(1)';
        });
    });
}

function createTrail(x, y) {
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    trail.style.left = x + 'px';
    trail.style.top = y + 'px';
    document.body.appendChild(trail);
    
    setTimeout(() => {
        trail.remove();
    }, 500);
}

// ==================== FLOATING PARTICLES ====================
function initParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 10 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        hero.appendChild(particle);
    }
}

// ==================== RIPPLE EFFECT ====================
function initRippleEffect() {
    const rippleElements = document.querySelectorAll('.cta-button, .submit-button, .tag');
    
    rippleElements.forEach(element => {
        element.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// ==================== MAGNETIC BUTTONS ====================
function initMagneticButtons() {
    const magneticElements = document.querySelectorAll('.cta-button, .submit-button');
    
    magneticElements.forEach(element => {
        element.classList.add('magnetic');
        
        element.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            this.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'translate(0, 0)';
        });
    });
}

// ==================== TEXT REVEAL ANIMATION ====================
function initTextReveal() {
    const textElements = document.querySelectorAll('.section-title, .hero-title .title-line');
    
    textElements.forEach(element => {
        const text = element.textContent;
        element.innerHTML = '';
        element.classList.add('text-reveal');
        
        text.split('').forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.transform = 'translateY(100%)';
            span.style.animationDelay = `${index * 0.03}s`;
            element.appendChild(span);
        });
    });
}

// ==================== TYPING EFFECT ====================
function initTypingEffect() {
    const titleMain = document.querySelector('.title-main .gradient-text');
    if (!titleMain) return;

    const originalText = titleMain.textContent;
    titleMain.textContent = '';
    
    let i = 0;
    function type() {
        if (i < originalText.length) {
            titleMain.textContent += originalText.charAt(i);
            i++;
            setTimeout(type, 150);
        } else {
            // Добавляем мигающий курсор
            const cursor = document.createElement('span');
            cursor.className = 'typing-cursor';
            titleMain.appendChild(cursor);
            
            // Убираем курсор через 3 секунды
            setTimeout(() => cursor.remove(), 3000);
        }
    }
    
    // Задержка перед началом печати
    setTimeout(type, 500);
}

// ==================== FLOATING ELEMENTS ====================
function initFloatingElements() {
    const badges = document.querySelectorAll('.project-badge, .badge-symbol');
    badges.forEach((badge, index) => {
        badge.classList.add('float-animation');
        badge.style.animationDelay = `${index * 0.2}s`;
    });

    // Добавляем pulse-glow для акцентных элементов
    const glowElements = document.querySelectorAll('.scroll-percent, .badge-symbol');
    glowElements.forEach(el => {
        el.classList.add('pulse-glow');
    });
}

// ==================== SCROLL REVEAL С РАЗНЫМИ НАПРАВЛЕНИЯМИ ====================
function initAdvancedScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Определяем направление анимации
                const animationType = entry.target.dataset.animation || 'fadeInUp';
                entry.target.style.animation = `${animationType} 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards`;
                entry.target.style.animationDelay = `${index * 0.1}s`;
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Применяем разные анимации к разным элементам
    document.querySelectorAll('.services-tags .tag:nth-child(odd)').forEach(el => {
        el.dataset.animation = 'fadeInLeft';
        observer.observe(el);
    });
    
    document.querySelectorAll('.services-tags .tag:nth-child(even)').forEach(el => {
        el.dataset.animation = 'fadeInRight';
        observer.observe(el);
    });

    document.querySelectorAll('.stat-item').forEach(el => {
        el.dataset.animation = 'scaleIn';
        observer.observe(el);
    });
}

// Инициализируем продвинутые анимации скролла
setTimeout(() => {
    initAdvancedScrollAnimations();
}, 100);

// ==================== GLITCH EFFECT НА HOVER ====================
document.querySelectorAll('.logo-text, .badge-symbol').forEach(el => {
    el.classList.add('glitch');
});

// ==================== SHINE EFFECT ====================
document.querySelectorAll('.project-link, .nav-menu a').forEach(el => {
    el.classList.add('shine');
});

// ==================== ANIMATED BACKGROUND ====================
const animatedBg = document.createElement('div');
animatedBg.className = 'animated-bg';
document.body.insertBefore(animatedBg, document.body.firstChild);

console.log('%c DevCore Landing Page ', 'background: #6366f1; color: white; font-size: 20px; padding: 10px;');
console.log('Разработано с ❤️ командой DevCore');
console.log('%c 🎨 Включены все анимации и эффекты! ', 'background: #8b5cf6; color: white; font-size: 16px; padding: 8px;');


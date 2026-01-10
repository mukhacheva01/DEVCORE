
const translations = {};
let currentLang = 'ru';

async function loadTranslations(lang) {
    try {
        const response = await fetch(`locales/${lang}.json`);
        if (!response.ok) {
            throw new Error(`Could not load translation file for ${lang}`);
        }
        const data = await response.json();
        translations[lang] = data;
        return data;
    } catch (error) {
        console.error('Failed to load translations:', error);
        return null;
    }
}

function translatePage(langData) {
    if (!langData) return;

    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (langData[key]) {
            if (element.tagName === 'META' && element.name === 'description' || element.tagName === 'META' && element.name === 'keywords') {
                element.content = langData[key];
            } else {
                element.innerHTML = langData[key];
            }
        }
    });
    document.documentElement.lang = currentLang;
}

async function setLanguage(lang) {
    currentLang = lang;
    let langData = translations[lang];
    if (!langData) {
        langData = await loadTranslations(lang);
    }
    translatePage(langData);
    localStorage.setItem('preferredLanguage', lang);
    updateSwitcherButton();
}

function updateSwitcherButton() {
    const langSwitcher = document.getElementById('lang-switcher');
    if (langSwitcher) {
        langSwitcher.textContent = currentLang === 'ru' ? 'EN' : 'RU';
    }
}

function initLangSwitcher() {
    const langSwitcher = document.getElementById('lang-switcher');
    if (langSwitcher) {
        langSwitcher.addEventListener('click', () => {
            const newLang = currentLang === 'ru' ? 'en' : 'ru';
            if (newLang === 'ru') {
                // To switch back to Russian, we just reload the page.
                localStorage.setItem('preferredLanguage', 'ru');
                window.location.reload();
            } else {
                setLanguage(newLang);
            }
        });
    }
}


export function initI18n() {
    const preferredLang = localStorage.getItem('preferredLanguage') || 'ru';
    
    initLangSwitcher();
    
    if (preferredLang !== 'ru') {
        setLanguage(preferredLang);
    } else {
        updateSwitcherButton();
    }
}

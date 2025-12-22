/* ==================== FORM MODULE ==================== */

import { SELECTORS } from '../utils/constants.js';

export class ContactForm {
    constructor() {
        this.form = document.querySelector(SELECTORS.contactForm);
        this.modal = document.querySelector(SELECTORS.successModal);
    }

    init() {
        if (!this.form || !this.modal) return;

        this.form.addEventListener('submit', (e) => {
            this.handleSubmit(e);
        });
    }

    async handleSubmit(event) {
        event.preventDefault();
        
        const submitButton = this.form.querySelector('.submit-button');
        const originalText = submitButton ? submitButton.innerHTML : '';
        
        // Set loading state
        if (submitButton) {
            submitButton.classList.add('btn-loading');
            submitButton.disabled = true;
            submitButton.setAttribute('aria-busy', 'true');
        }
        
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData);
        
        try {
            // Here you would send data to server
            console.log('Form submitted:', data);
            
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            this.showModal();
            this.form.reset();
        } catch (error) {
            console.error('Form submission error:', error);
            // Handle error state
        } finally {
            // Remove loading state
            if (submitButton) {
                submitButton.classList.remove('btn-loading');
                submitButton.disabled = false;
                submitButton.removeAttribute('aria-busy');
                submitButton.innerHTML = originalText;
            }
        }
    }

    showModal() {
        if (this.modal) {
            this.modal.classList.add('active');
        }
    }

    closeModal() {
        if (this.modal) {
            this.modal.classList.remove('active');
        }
    }
}

export function initContactForm() {
    const form = new ContactForm();
    form.init();
    
    // Make closeModal available globally
    window.closeModal = () => form.closeModal();
}


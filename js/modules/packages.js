/**
 * ==================== PACKAGES MODULE ====================
 * Handles the logic for selecting a package from the pricing table
 * and updating the contact form dropdown, and managing package tabs.
 */

export function initPackageSelection() {
    const packageButtons = document.querySelectorAll('.package-button[data-package]');
    const projectTypeSelect = document.querySelector('select[name="project-type"]');

    // Tab functionality
    const tabButtons = document.querySelectorAll('.package-tab-buttons .tab-button');
    const tabContents = document.querySelectorAll('.package-tab-content');

    if (tabButtons.length > 0 && tabContents.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetTabId = button.dataset.tab;

                tabButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                tabContents.forEach(content => {
                    if (content.id === targetTabId) {
                        content.style.display = 'block';
                    } else {
                        content.style.display = 'none';
                    }
                });
            });
        });
    }

    console.log('Found package buttons:', packageButtons);
    console.log('Found project type select:', projectTypeSelect);

    if (!packageButtons.length || !projectTypeSelect) {
        console.log('Package selection module: missing buttons or select element.');
        // return; // Don't return here, as tab functionality might still be needed
    }

    packageButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const packageValue = e.currentTarget.dataset.package;
            console.log('Clicked package button with value:', packageValue);
            if (packageValue) {
                if (projectTypeSelect) { // Check if projectTypeSelect exists
                    projectTypeSelect.value = packageValue;
                }

                // Optional: Scroll to the form
                const contactForm = document.getElementById('contact');
                if (contactForm) {
                    contactForm.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    console.log('📦 Package selection module initialized');
}
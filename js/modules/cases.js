/**
 * ==================== CASES MODULE ====================
 * Handles the logic for the tabs in the cases section.
 */

export function initCasesTabs() {
    const tabButtons = document.querySelectorAll('.cases-tab-buttons .case-tab-button');
    const tabContents = document.querySelectorAll('.case-tab-content');

    if (tabButtons.length > 0 && tabContents.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetTabId = button.dataset.tab;

                // Deactivate all buttons
                tabButtons.forEach(btn => btn.classList.remove('active'));
                
                // Activate the clicked button
                button.classList.add('active');

                // Show/hide content
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
    console.log('📦 Cases tabs module initialized');
}

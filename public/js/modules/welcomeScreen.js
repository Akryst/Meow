/**
 * Welcome Screen Module
 * Manages the entrance splash screen with blur effect
 */

class WelcomeScreen {
    constructor() {
        this.welcomeElement = null;
        this.mainContent = null;
        this.isVisible = true;
        
        this.init();
    }

    init() {
        this.createWelcomeScreen();
        
        // Add welcome-active class to body
        document.body.classList.add('welcome-active');
    }

    createWelcomeScreen() {
        this.welcomeElement = document.createElement('div');
        this.welcomeElement.className = 'welcome-screen';
        this.welcomeElement.id = 'welcome-screen';

        const welcomeContent = document.createElement('div');
        welcomeContent.className = 'welcome-content';

        // Get welcome text from config
        const welcomeText = window.siteConfig?.welcomeScreen?.text || 'Click here to continue';

        welcomeContent.innerHTML = `
            <button class="welcome-button" id="enter-button">
                <span>${welcomeText}</span>
            </button>
        `;

        this.welcomeElement.appendChild(welcomeContent);
        document.body.appendChild(this.welcomeElement);

        this.mainContent = document.getElementById('main-content') || document.body;

        // Simple click event listener
        this.welcomeElement.addEventListener('click', () => {
            this.enterSite();
        });
    }

    enterSite() {
        if (!this.isVisible) return;

        this.isVisible = false;

        // Add visual feedback
        const button = this.welcomeElement.querySelector('#enter-button');
        if (button) {
            button.style.transform = 'scale(0.95)';
            button.style.opacity = '0.7';
        }

        // Remove welcome-active class immediately to start blur removal
        document.body.classList.remove('welcome-active');

        // Fade out welcome screen
        this.welcomeElement.classList.add('hidden');

        // Remove the element after the CSS transition completes
        setTimeout(() => {
            if (this.welcomeElement && this.welcomeElement.parentNode) {
                this.welcomeElement.parentNode.removeChild(this.welcomeElement);
            }
            
            // Dispatch custom event for other modules
            document.dispatchEvent(new CustomEvent('welcomeScreenDismissed'));
            
            // Focus main content for accessibility
            if (this.mainContent) {
                this.mainContent.focus();
            }
        }, 300); // This matches the CSS transition time

        // Analytics or tracking (if needed)
        this.trackEntry();
    }

    trackEntry() {
        // Log entry for analytics
        console.log('User entered the site via welcome screen');
    }

    // Method to show welcome screen again (if needed)
    show() {
        if (!this.isVisible && this.welcomeElement) {
            this.isVisible = true;
            document.body.classList.add('welcome-active');
            this.welcomeElement.classList.remove('hidden');
        }
    }

    // Method to force hide welcome screen
    hide() {
        if (this.isVisible) {
            this.enterSite();
        }
    }

    // Check if welcome screen should be shown (e.g., first visit)
    static shouldShow() {
        // Check if welcome screen is enabled in config
        const enabled = window.siteConfig?.welcomeScreen?.enabled;
        return enabled !== false; // Default to true if not specified
    }
}

// Initialize welcome screen when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    if (WelcomeScreen.shouldShow()) {
        new WelcomeScreen();
        WelcomeScreen.markAsVisited();
    }
});

// Export for potential external use
window.WelcomeScreen = WelcomeScreen;

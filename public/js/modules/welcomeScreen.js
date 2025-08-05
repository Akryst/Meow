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
        
        document.body.classList.add('welcome-active');
    }

    createWelcomeScreen() {
        this.welcomeElement = document.createElement('div');
        this.welcomeElement.className = 'welcome-screen';
        this.welcomeElement.id = 'welcome-screen';

        const welcomeContent = document.createElement('div');
        welcomeContent.className = 'welcome-content';

        const welcomeText = window.siteConfig?.welcomeScreen?.text || 'Click here to continue';

        welcomeContent.innerHTML = `
            <button class="welcome-button" id="enter-button">
                <span>${welcomeText}</span>
            </button>
        `;

        this.welcomeElement.appendChild(welcomeContent);
        document.body.appendChild(this.welcomeElement);

        this.mainContent = document.getElementById('main-content') || document.body;

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

        document.body.classList.remove('welcome-active');

        // Fade out welcome screen
        this.welcomeElement.classList.add('hidden');

        setTimeout(() => {
            if (this.welcomeElement && this.welcomeElement.parentNode) {
                this.welcomeElement.parentNode.removeChild(this.welcomeElement);
            }
            
            document.dispatchEvent(new CustomEvent('welcomeScreenDismissed'));
            if (this.mainContent) {
                this.mainContent.focus();
            }
        }, 300);
        this.trackEntry();
    }

    trackEntry() {
        console.log('User entered the site via welcome screen');
    }

    show() {
        if (!this.isVisible && this.welcomeElement) {
            this.isVisible = true;
            document.body.classList.add('welcome-active');
            this.welcomeElement.classList.remove('hidden');
        }
    }

    hide() {
        if (this.isVisible) {
            this.enterSite();
        }
    }

    static shouldShow() {
        const enabled = window.siteConfig?.welcomeScreen?.enabled;
        return enabled !== false;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (WelcomeScreen.shouldShow()) {
        new WelcomeScreen();
    }
});
window.WelcomeScreen = WelcomeScreen;

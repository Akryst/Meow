/**
 * Main Application Entry Point
 * Coordinates all modules and initializes the app
 */

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Main initialization function
function initializeApp() {
    console.log('Loading...');

    // Initialize all modules
    TimeUtils.initTimeDisplay();
    MusicPlayer.initMusicPlayer();
    loadFooterConfig();
    
    console.log('Loaded');
}

// Load footer configuration
function loadFooterConfig() {
    if (window.siteConfig && window.siteConfig.footer) {
        const footerElement = document.querySelector('footer p');
        if (footerElement) {
            footerElement.innerHTML = window.siteConfig.footer.text;
        }
    }
}

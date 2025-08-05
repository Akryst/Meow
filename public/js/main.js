/**
 * Main Application Entry Point
 * Coordinates all modules and initializes the app
 */

document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    TimeUtils.initTimeDisplay();
    MusicPlayer.initMusicPlayer();
    loadFooterConfig();
}

function loadFooterConfig() {
    if (window.siteConfig && window.siteConfig.footer) {
        const footerElement = document.querySelector('footer p');
        if (footerElement) {
            footerElement.innerHTML = window.siteConfig.footer.text;
        }
    }
}

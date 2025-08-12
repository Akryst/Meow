/**
 * Time Utilities Module
 * Handles time display and updates
 */

function initTimeDisplay() {
    const timeElement = document.getElementById('current-time');
    
    function updateTime() {
        const now = new Date();
        const timeString = now.toTimeString().split(' ')[0];
        if (timeElement) {
            timeElement.textContent = timeString;
        }
    }
    
    updateTime();
    setInterval(updateTime, 1000);
}

window.TimeUtils = { initTimeDisplay };

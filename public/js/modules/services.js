// Enhanced Last.fm integration with real API
class LastFmService {
    constructor(apiKey, username) {
        this.apiKey = apiKey;
        this.username = username;
        this.baseUrl = 'https://ws.audioscrobbler.com/2.0/';
    }

    async getCurrentTrack() {
        try {
            const response = await fetch(
                `${this.baseUrl}?method=user.getrecenttracks&user=${this.username}&api_key=${this.apiKey}&format=json&limit=1`
            );
            const data = await response.json();
            return data.recenttracks?.track?.[0] || null;
        } catch (error) {
            console.error('Last.fm API error:', error);
            return null;
        }
    }
}

// Analytics Service for visitor tracking
class AnalyticsService {
    constructor(trackingId = null) {
        this.trackingId = trackingId;
        this.init();
    }

    init() {
        // Initialize visitor counter
        if (!localStorage.getItem('visit-count')) {
            localStorage.setItem('visit-count', '0');
        }
        
        this.updateVisitCount();
    }

    async updateVisitCount() {
        try {
            const sessionKey = 'session-visited';
            const hasVisitedThisSession = sessionStorage.getItem(sessionKey);
            
            if (!hasVisitedThisSession) {
                // Try to increment counter via our MongoDB API (with IP validation)
                try {
                    const response = await fetch('/api/visit-count/increment', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                    const data = await response.json();
                    
                    // Mark this session as visited regardless of IP validation result
                    sessionStorage.setItem(sessionKey, 'true');
                    
                    const countElement = document.getElementById('visit-count');
                    if (countElement && data.count !== undefined) {
                        countElement.textContent = data.count.toLocaleString();
                    }
                    
                    // Log result for debugging
                    if (data.newVisit) {
                        console.log('✓ New visit counted');
                    } else {
                        console.log('ℹ IP already counted in last 24h');
                    }
                } catch (apiError) {
                    console.warn('MongoDB API failed, using localStorage fallback');
                    this.updateLocalVisitCount();
                    sessionStorage.setItem(sessionKey, 'true');
                }
            } else {
                // Just display current count without attempting to increment
                try {
                    const response = await fetch('/api/visit-count');
                    const data = await response.json();
                    
                    const countElement = document.getElementById('visit-count');
                    if (countElement && data.count !== undefined) {
                        countElement.textContent = data.count.toLocaleString();
                    }
                } catch (apiError) {
                    this.displayLocalVisitCount();
                }
            }
        } catch (error) {
            console.error('Error updating visit count:', error);
            this.updateLocalVisitCount();
        }
    }

    updateLocalVisitCount() {
        const count = parseInt(localStorage.getItem('visit-count') || '0');
        localStorage.setItem('visit-count', (count + 1).toString());
        
        const countElement = document.getElementById('visit-count');
        if (countElement) {
            countElement.textContent = (count + 1).toLocaleString();
        }
    }

    displayLocalVisitCount() {
        const count = parseInt(localStorage.getItem('visit-count') || '0');
        const countElement = document.getElementById('visit-count');
        if (countElement) {
            countElement.textContent = count.toLocaleString();
        }
    }

    trackPageView() {
        console.log('Page view tracked');
        
        // Google Analytics 4 tracking
        if (this.trackingId && typeof gtag !== 'undefined') {
            gtag('config', this.trackingId, {
                page_title: document.title,
                page_location: window.location.href
            });
            gtag('event', 'page_view');
        }
    }

    trackEvent(category, action, label = null) {
        console.log(`Event tracked: ${category} - ${action} - ${label}`);
        
        // Google Analytics 4 event tracking
        if (this.trackingId && typeof gtag !== 'undefined') {
            gtag('event', action, {
                event_category: category,
                event_label: label
            });
        }
    }
}

// Make services available globally
window.LastFmService = LastFmService;
window.AnalyticsService = AnalyticsService;

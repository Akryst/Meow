// Page initializer - Connects configuration with HTML
document.addEventListener('DOMContentLoaded', function() {
    const config = window.siteConfig;
    
    if (!config) {
        console.error('Configuration not found');
        return;
    }
    
    // Setup profile information
    setupProfile(config.profile);
    
    // Setup social media links
    setupSocialLinks(config.socialMedia);
    
    // Setup location rotation
    if (config.locations.enabled === true) {
        setupLocationRotation(config.locations);
    } else {
        // Hide location element if disabled
        const locationElement = document.querySelector('.location-text');
        const locationRow = locationElement?.closest('.status-row');
        if (locationRow) {
            locationRow.style.display = 'none';
        }
    }
    
    // Initialize background manager (image/video)
    if (window.BackgroundManager) {
        const backgroundManager = new BackgroundManager(config);
        console.log('Background manager initialized');
    } else {
        console.warn('BackgroundManager not found');
    }
    
    // Initialize visual effects
    if (window.VisualEffectsManager) {
        const effectsManager = new VisualEffectsManager(config);
        console.log('Visual effects initialized');
    } else {
        console.warn('VisualEffectsManager not found');
    }
    
    if (config.lastfm && config.lastfm.username && window.LastFmService) {
        initializeLastFmWidget(config.lastfm);
        console.log('Last.fm service initialized');
    } else {
        console.warn('Last.fm not configured or service not found');
    }
    
    console.log('Page initialized with custom configuration');
});

function setupProfile(profile) {
    // Set name
    const nameElement = document.getElementById('profile-name');
    if (nameElement) {
        nameElement.textContent = profile.name;
    }
    
    // Set description
    const descElement = document.getElementById('profile-description');
    if (descElement) {
        descElement.textContent = profile.description;
    }
    
    // Set profile image
    const imgElement = document.querySelector('.profile-image');
    if (imgElement && profile.profileImage) {
        imgElement.src = profile.profileImage;
        imgElement.alt = `${profile.name} Profile`;
    }
    
    // Update page title
    document.title = `${profile.name} - Bio`;
    
    // Update Last.fm widget text
    const lastfmWidget = document.querySelector('.lastfm-widget .text-xs.text-gray-400.uppercase.tracking-wide');
    if (lastfmWidget) {
        lastfmWidget.textContent = `${profile.name.toUpperCase()} IS LISTENING TO`;
    }
}

function setupSocialLinks(socialMedia) {
    // Configure social media links
    const socialLinks = document.querySelectorAll('[data-social]');
    
    socialLinks.forEach(link => {
        const platform = link.getAttribute('data-social');
        const url = socialMedia[platform];
        
        if (url && socialMedia.hasOwnProperty(platform)) {
            link.href = url;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            link.style.display = ''; // Show
            
            link.addEventListener('mouseenter', function() {
                console.log(`Navigating to ${platform}: ${url}`);
            });
        } else {
            link.style.display = 'none';
            link.remove(); 
        }
    });
    
    const socialGrid = document.querySelector('.social-grid');
    if (socialGrid) {
        const visibleLinks = socialGrid.querySelectorAll('.social-icon:not([style*="display: none"])');
        console.log(`Active social networks: ${visibleLinks.length}`);
        
        socialGrid.className = `social-grid icons-${visibleLinks.length}`;
    }
}

function setupLocationRotation(locationConfig) {
    const locationElement = document.querySelector('.location-text');
    
    if (!locationConfig.enabled || !locationElement || !locationConfig.list || !locationConfig.list.length) {
        const locationRow = locationElement?.closest('.status-row');
        if (locationRow) {
            locationRow.style.display = 'none';
        }
        return;
    }
    
    let currentIndex = 0;
    
    function updateLocation() {
        locationElement.textContent = locationConfig.list[currentIndex];
        currentIndex = (currentIndex + 1) % locationConfig.list.length;
    }
    
    updateLocation();
    
    if (locationConfig.list.length > 1) {
        setInterval(updateLocation, locationConfig.interval);
    }
}

window.updateConfig = function(newConfig) {
    window.siteConfig = { ...window.siteConfig, ...newConfig };
    
    setupProfile(window.siteConfig.profile);
    setupSocialLinks(window.siteConfig.socialMedia);
    
    console.log('Configuration updated');
};

// Last.fm widget initialization
async function initializeLastFmWidget(lastfmConfig) {
    const trackNameElement = document.getElementById('track-name');
    const artistNameElement = document.getElementById('artist-name');
    
    if (!trackNameElement || !artistNameElement) {
        console.warn('Last.fm widget elements not found');
        return;
    }
    
    let lastFmService = null;
    
    const apiKey = window.siteConfig?.lastfm?.apiKey || '';
    if (apiKey && lastfmConfig.username) {
        lastFmService = new LastFmService(apiKey, lastfmConfig.username);
        console.log('Last.fm API service initialized');
    } else {
        console.warn('Last.fm API key or username not configured');
        trackNameElement.textContent = 'Last.fm not configured';
        artistNameElement.textContent = 'Check your .env file';
        return;
    }
    
    async function updateTrackDisplay() {
        if (!lastFmService) return;
        
        try {
            const currentTrack = await lastFmService.getCurrentTrack();
            if (currentTrack) {
                const track = {
                    name: currentTrack.name || 'Unknown Track',
                    artist: currentTrack.artist?.['#text'] || currentTrack.artist || 'Unknown Artist',
                    isPlaying: currentTrack['@attr']?.nowplaying === 'true'
                };
                trackNameElement.style.opacity = 0;
                artistNameElement.style.opacity = 0;
                setTimeout(() => {
                    trackNameElement.textContent = track.name;
                    artistNameElement.textContent = track.artist;
                    
                    trackNameElement.style.opacity = 1;
                    artistNameElement.style.opacity = 1;
                }, 300);
            } else {
                trackNameElement.textContent = 'Not listening';
                artistNameElement.textContent = 'Last.fm';
            }
        } catch (error) {
            console.error('🎵 Failed to fetch from Last.fm:', error);
            trackNameElement.textContent = 'API Error';
            artistNameElement.textContent = 'Last.fm unavailable';
        }
    }
    
    await updateTrackDisplay();
    
    setInterval(updateTrackDisplay, 30000);
    
    console.log('Last.fm widget initialized with username:', lastfmConfig.username);
}

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
        console.log('🎨 Background manager initialized');
    } else {
        console.warn('BackgroundManager not found');
    }
    
    // Initialize visual effects (bloom, particles, etc.)
    if (window.VisualEffectsManager) {
        const effectsManager = new VisualEffectsManager(config);
        console.log('🌟 Visual effects initialized');
    } else {
        console.warn('VisualEffectsManager not found');
    }
    
    // Initialize Last.fm service if configured
    if (config.lastfm && config.lastfm.username && window.LastFmService) {
        // For now we'll use a demo mode since we don't have the API key configured properly
        initializeLastFmWidget(config.lastfm);
        console.log('🎵 Last.fm service initialized');
    } else {
        console.warn('Last.fm not configured or service not found');
    }
    
    console.log('✅ Page initialized with custom configuration');
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
    document.title = profile.name;
}

function setupSocialLinks(socialMedia) {
    // Configure social media links
    const socialLinks = document.querySelectorAll('[data-social]');
    
    socialLinks.forEach(link => {
        const platform = link.getAttribute('data-social');
        const url = socialMedia[platform];
        
        // Only show if URL exists in configuration (already filtered)
        if (url && socialMedia.hasOwnProperty(platform)) {
            link.href = url;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            link.style.display = ''; // Show
            
            // Add custom hover effect
            link.addEventListener('mouseenter', function() {
                console.log(`🔗 Navigating to ${platform}: ${url}`);
            });
        } else {
            // If no URL configured or disabled, hide completely
            link.style.display = 'none';
            link.remove(); // Remove from DOM to avoid empty spaces
        }
    });
    
    // Update grid to center remaining icons
    const socialGrid = document.querySelector('.social-grid');
    if (socialGrid) {
        const visibleLinks = socialGrid.querySelectorAll('.social-icon:not([style*="display: none"])');
        console.log(`📱 Active social networks: ${visibleLinks.length}`);
        
        // Add class to adjust layout based on quantity
        socialGrid.className = `social-grid icons-${visibleLinks.length}`;
    }
}

function setupLocationRotation(locationConfig) {
    const locationElement = document.querySelector('.location-text');
    
    // Check if locations are enabled and have valid data
    if (!locationConfig.enabled || !locationElement || !locationConfig.list || !locationConfig.list.length) {
        // Hide location row if disabled or no data
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
    
    // Set initial location
    updateLocation();
    
    // Only start rotation if there's more than one location
    if (locationConfig.list.length > 1) {
        setInterval(updateLocation, locationConfig.interval);
    }
}

// Function to update configuration dynamically (useful for development)
window.updateConfig = function(newConfig) {
    window.siteConfig = { ...window.siteConfig, ...newConfig };
    
    // Reinitialize affected components
    setupProfile(window.siteConfig.profile);
    setupSocialLinks(window.siteConfig.socialMedia);
    
    console.log('✅ Configuration updated');
};

// Last.fm widget initialization
async function initializeLastFmWidget(lastfmConfig) {
    const trackNameElement = document.getElementById('track-name');
    const artistNameElement = document.getElementById('artist-name');
    const progressBar = document.getElementById('progress-bar');
    
    if (!trackNameElement || !artistNameElement) {
        console.warn('Last.fm widget elements not found');
        return;
    }
    
    let lastFmService = null;
    
    // Try to initialize real Last.fm service
    const apiKey = window.siteConfig?.lastfm?.apiKey || '';
    if (apiKey && lastfmConfig.username) {
        lastFmService = new LastFmService(apiKey, lastfmConfig.username);
        console.log('🎵 Last.fm API service initialized');
    } else {
        console.warn('🎵 Last.fm API key or username not configured');
        // Set default message when not configured
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
                
                // Update track info with animation
                trackNameElement.style.opacity = 0;
                artistNameElement.style.opacity = 0;
                
                setTimeout(() => {
                    trackNameElement.textContent = track.name;
                    artistNameElement.textContent = track.artist;
                    
                    trackNameElement.style.opacity = 1;
                    artistNameElement.style.opacity = 1;
                    
                    // Update progress bar - show full if currently playing
                    if (progressBar) {
                        progressBar.style.width = track.isPlaying ? '100%' : '0%';
                    }
                }, 300);
                
                console.log('🎵 Real track from Last.fm:', track);
            } else {
                // No current track
                trackNameElement.textContent = 'Not listening';
                artistNameElement.textContent = 'Last.fm';
                if (progressBar) {
                    progressBar.style.width = '0%';
                }
            }
        } catch (error) {
            console.error('🎵 Failed to fetch from Last.fm:', error);
            trackNameElement.textContent = 'API Error';
            artistNameElement.textContent = 'Last.fm unavailable';
            if (progressBar) {
                progressBar.style.width = '0%';
            }
        }
    }
    
    // Initial track
    await updateTrackDisplay();
    
    // Update track every 30 seconds
    setInterval(updateTrackDisplay, 30000);
    
    console.log('🎵 Last.fm widget initialized with username:', lastfmConfig.username);
}

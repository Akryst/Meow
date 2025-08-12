
document.addEventListener('DOMContentLoaded', async function() {
    const config = window.siteConfig;
    
    if (!config) {
        return;
    }

    if (window.FontManager) {
        const fontManager = new FontManager();
        await fontManager.initializeFromConfig(config);
        window.fontManager = fontManager;
    }

    setupProfile(config.profile);

    setupSocialLinks(config.socialMedia);
    
    if (config.locations.enabled === true) {
        setupLocationRotation(config.locations);
    } else {

        const locationElement = document.querySelector('.location-text');
        const locationRow = locationElement?.closest('.status-row');
        if (locationRow) {
            locationRow.style.display = 'none';
        }
    }
    
    if (window.BackgroundManager) {
        const backgroundManager = new BackgroundManager(config);
    }
    
    if (window.VisualEffectsManager) {
        const effectsManager = new VisualEffectsManager(config);
    }
    
    if (config.lastfm && config.lastfm.enabled && config.lastfm.username && window.LastFmService) {
        initializeLastFmWidget(config.lastfm);
    } else {

        const lastfmWidget = document.querySelector('.lastfm-widget');
        if (lastfmWidget) {
            lastfmWidget.parentElement.style.display = 'none';
        }
    }

    if (config.discord && config.discord.enabled && config.discord.userId && window.DiscordWidget) {
        const discordWidget = new DiscordWidget(config);
        window.discordWidget = discordWidget;

        discordWidget.onUserDataReceived = (userData) => {
            if (userData.discord_user && userData.discord_user.avatar_decoration_data) {
                applyDiscordDecorationToProfile(userData.discord_user.avatar_decoration_data);
            }
            
            updateDiscordStatus(userData.discord_status, userData.discord_user);
            
            if (config.discord.showBadges && userData.discord_user) {
                addDiscordBadgesToProfile(userData.discord_user, discordWidget);
            }
        };
    } else {

        updateDiscordStatus('online', { username: 'System' });
    }
    
    if (config.musicPlayer && config.musicPlayer.enabled && window.MusicPlayer) {
        window.MusicPlayer.initMusicPlayer(config.musicPlayer);
    } else {

        const musicWidget = document.querySelector('.music-player-widget');
        if (musicWidget) {
            musicWidget.parentElement.style.display = 'none';
        }
    }
});

function updateDiscordStatus(status = 'offline', user = null) {
    const statusDot = document.getElementById('discord-status-dot');
    const statusText = document.getElementById('discord-status-text');
    
    if (!statusDot || !statusText) {
        return;
    }

    const statusConfig = {
        'online': {
            text: 'Online',
            color: 'text-green-400',
            dotClass: 'active',
            dotColor: '#43b581'
        },
        'idle': {
            text: 'Away',
            color: 'text-yellow-400',
            dotClass: 'idle',
            dotColor: '#faa61a'
        },
        'dnd': {
            text: 'Do Not Disturb',
            color: 'text-red-400',
            dotClass: 'dnd',
            dotColor: '#f04747'
        },
        'offline': {
            text: 'Offline',
            color: 'text-gray-400',
            dotClass: 'offline',
            dotColor: '#747f8d'
        }
    };
    
    const config = statusConfig[status] || statusConfig['offline'];
    

    statusText.textContent = config.text;
    statusText.className = `text-xs ${config.color}`;
    

    statusDot.className = `status-dot ${config.dotClass}`;
    statusDot.style.backgroundColor = config.dotColor;
}

window.updateDiscordStatus = updateDiscordStatus;

function applyDiscordDecorationToProfile(decorationData) {
    const profileWrapper = document.querySelector('.profile-image-wrapper');
    
    if (!profileWrapper) {
        return;
    }

    const existingDecoration = profileWrapper.querySelector('.profile-decoration');
    if (existingDecoration) {
        existingDecoration.remove();
    }
    
    if (!decorationData) {
        return;
    }
    
    const decoration = document.createElement('div');
    decoration.className = 'profile-decoration';
    
    let decorationUrl;
    if (decorationData.url) {
        decorationUrl = decorationData.url;
    } else if (decorationData.asset) {
        decorationUrl = `https://cdn.discordapp.com/avatar-decoration-presets/${decorationData.asset}.png?size=160`;
    } else {
        return;
    }
    
    decoration.style.backgroundImage = `url(${decorationUrl})`;
    decoration.style.display = 'block';
    decoration.style.visibility = 'visible';
    decoration.style.opacity = '1';
    
    profileWrapper.appendChild(decoration);
    
    profileWrapper.classList.add('has-decoration');
    
    decoration.offsetHeight;
}

window.applyDiscordDecorationToProfile = applyDiscordDecorationToProfile;

function addDiscordBadgesToProfile(user, discordWidget) {
    const profileName = document.getElementById('profile-name');
    if (!profileName || !discordWidget.showBadges) return;
    
    const existingBadges = profileName.querySelector('.discord-badges');
    if (existingBadges) {
        existingBadges.remove();
    }
    
    const badgesHTML = discordWidget.renderDiscordBadges(user);
    if (badgesHTML) {
        const badgeContainer = document.createElement('span');
        badgeContainer.className = 'discord-badges';
        badgeContainer.innerHTML = badgesHTML;
        
        profileName.appendChild(badgeContainer);
    }
}

window.addDiscordBadgesToProfile = addDiscordBadgesToProfile;

function setupProfile(profile) {

    const nameElement = document.getElementById('profile-name');
    if (nameElement) {
        nameElement.textContent = profile.name;
    }
    

    const descElement = document.getElementById('profile-description');
    if (descElement) {
        descElement.textContent = profile.description;
    }
    

    const imgElement = document.querySelector('.profile-image');
    if (imgElement && profile.profileImage) {
        imgElement.src = profile.profileImage;
        imgElement.alt = `${profile.name} Profile`;
    }
    
    document.title = `${profile.name}`;
    
    const lastfmWidget = document.querySelector('.lastfm-widget .text-xs.text-gray-400.uppercase.tracking-wide');
    if (lastfmWidget) {
        lastfmWidget.textContent = `${profile.name.toUpperCase()} IS LISTENING TO`;
    }
}

function setupSocialLinks(socialMedia) {

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
            });
        } else {
            link.style.display = 'none';
            link.remove(); 
        }
    });
    
    const socialGrid = document.querySelector('.social-grid');
    if (socialGrid) {
        const visibleLinks = socialGrid.querySelectorAll('.social-icon:not([style*="display: none"])');

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
};

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
            console.error('Failed to fetch from Last.fm:', error);
            trackNameElement.textContent = 'API Error';
            artistNameElement.textContent = 'Last.fm unavailable';
        }
    }
    
    await updateTrackDisplay();
    
    setInterval(updateTrackDisplay, 30000);
}

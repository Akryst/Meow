const fs = require('fs');
const path = require('path');


function parseEnvFile(filePath) {
    try {
        const envContent = fs.readFileSync(filePath, 'utf8');
        const env = {};
        
        envContent.split('\n').forEach(line => {
            line = line.trim();
            if (line && !line.startsWith('#') && line.includes('=')) {
                const [key, ...valueParts] = line.split('=');
                let value = valueParts.join('=').trim();
                

                if ((value.startsWith('"') && value.endsWith('"')) || 
                    (value.startsWith("'") && value.endsWith("'"))) {
                    value = value.slice(1, -1);
                }
                

                if (value.startsWith('[') && value.endsWith(']')) {
                    try {
                        value = JSON.parse(value);
                    } catch (e) {

                    }
                }
                

                if (value === 'true') value = true;
                if (value === 'false') value = false;
                

                if (typeof value !== 'boolean' && 
                    !isNaN(value) && 
                    value !== '' && 
                    key !== 'DISCORD_USER_ID') { // Keep Discord ID as string
                    const num = Number(value);
                    if (Number.isInteger(num)) value = num;
                }
                
                env[key] = value;
            }
        });
        
        return env;
    } catch (error) {
        console.error('Error reading .env file:', error);
        return {};
    }
}


function generateConfigFile(env) {

    const filterSocialMedia = (socialUrls) => {
        const filtered = {};
        Object.keys(socialUrls).forEach(key => {
            const value = socialUrls[key];

            if (value && 
                value.toLowerCase() !== 'off' && 
                value !== '' && 
                !value.includes('yourprofile')) {
                filtered[key] = value;
            }
        });
        return filtered;
    };

    const config = {
        profile: {
            name: env.NAME || 'Your Name',
            description: env.DESCRIPTION || 'A brief description about yourself',
            timezone: env.TIMEZONE || 'Your/Timezone',
            profileImage: env.PROFILE_IMAGE || 'assets/images/profile.jpg',
            profileImageType: env.PROFILE_IMAGE_TYPE || 'jpg'
        },
        socialMedia: filterSocialMedia({
            twitter: env.TWITTER || '',
            lastfm: env.LASTFM || '',
            github: env.GITHUB || '',
            osu: env.OSU || '',
            vrchat: env.VRCHAT || '',
            steam: env.STEAM || '',
            instagram: env.INSTAGRAM || '',
            tiktok: env.TIKTOK || '',
            namemc: env.NAMEMC || '',
            youtube: env.YOUTUBE || ''
        }),
        locations: {
            enabled: env.LOCATIONS_ENABLED !== undefined ? JSON.parse(env.LOCATIONS_ENABLED) : false,
            interval: env.LOCATION_INTERVAL || 3000,
            list: env.LOCATIONS || ['Location 1', 'Location 2']
        },
        lastfm: {
            enabled: env.LASTFM_ENABLED !== undefined ? JSON.parse(env.LASTFM_ENABLED) : true,
            username: env.LASTFM_USERNAME || '',
            apiKey: env.LASTFM_API_KEY || ''
        },
        discord: {
            enabled: env.DISCORD_ENABLED !== undefined ? JSON.parse(env.DISCORD_ENABLED) : true,
            userId: env.DISCORD_USER_ID || '', // Keep as string to preserve large numbers
            updateInterval: parseInt(env.DISCORD_UPDATE_INTERVAL) || 15000,
            useWebSocket: env.DISCORD_USE_WEBSOCKET !== undefined ? JSON.parse(env.DISCORD_USE_WEBSOCKET) : true,
            showBadges: env.DISCORD_SHOW_BADGES !== undefined ? env.DISCORD_SHOW_BADGES : true
        },
        musicPlayer: {
            enabled: env.MUSIC_PLAYER_ENABLED !== undefined ? JSON.parse(env.MUSIC_PLAYER_ENABLED) : true,
            volume: parseInt(env.MUSIC_PLAYER_VOLUME) || 10,
            autoplay: env.MUSIC_PLAYER_AUTOPLAY !== undefined ? JSON.parse(env.MUSIC_PLAYER_AUTOPLAY) : false,
            tracks: env.MUSIC_PLAYER_TRACKS || ['assets/songs/Song1.mp3', 'assets/songs/Song2.mp3']
        },
        database: {
            enabled: env.MONGO_ENABLED || false
        },
        theme: {
            background: {
                type: env.BACKGROUND_TYPE || 'image',
                video: env.BACKGROUND_VIDEO || 'assets/videos/background.mp4',
                image: env.BACKGROUND_IMAGE || 'assets/images/background.jpg',
                blur: env.BACKGROUND_BLUR || '20px',
                opacity: parseFloat(env.BACKGROUND_OPACITY) || 0.3
            },
            effects: {
                bloom: {
                    enabled: env.BLOOM_ENABLED !== undefined ? JSON.parse(env.BLOOM_ENABLED) : true,
                    strength: parseFloat(env.BLOOM_STRENGTH) || 1.3,
                    radius: parseFloat(env.BLOOM_RADIUS) || 15,
                    textShadowColor: env.BLOOM_TEXT_SHADOW_COLOR || 'var(--color-primary)',
                    pulseAnimation: env.BLOOM_PULSE_ANIMATION !== undefined ? JSON.parse(env.BLOOM_PULSE_ANIMATION) : true
                },
                backgroundBlur: parseFloat(env.BACKGROUND_BLUR) || 20,
                locationRotation: {
                    interval: env.LOCATION_INTERVAL || 5000,
                    fadeTransition: env.LOCATION_FADE_TRANSITION !== undefined ? env.LOCATION_FADE_TRANSITION : true,
                    fadeTime: parseFloat(env.LOCATION_FADE_TIME) || 10
                }
            }
        },
        personal: {
            locations: env.LOCATIONS || ['Location 1', 'Location 2'],
            locationInterval: env.LOCATION_INTERVAL || 5000
        },
        welcomeScreen: {
            enabled: env.WELCOME_SCREEN_ENABLED !== undefined ? JSON.parse(env.WELCOME_SCREEN_ENABLED) : true,
            text: env.WELCOME_TEXT || 'Click here to continue'
        },
        font: {
            family: env.FONT_FAMILY || 'JetBrains Mono',
            weights: env.FONT_WEIGHTS || '300;400;500;600;700'
        },
        footer: {
            text: env.FOOTER || '© 2025 • music. connect. [people].'
        }
    };
    
    const configContent = `// Site configuration - Auto-generated from .env file
// Last updated: ${new Date().toISOString()}

const config = ${JSON.stringify(config, (key, value) => {

    if (key === 'userId' && typeof value === 'string' && value.length > 15) {
        return value;
    }
    return value;
}, 4)};

// Make available globally
window.siteConfig = config;

console.log('Configuration loaded:');`;
    
    return configContent;
}


function main() {
    const envPath = path.join(__dirname, '..', '.env');
    const configPath = path.join(__dirname, '..', 'public', 'js', 'config.js');
    
    console.log('Reading .env file...');
    const env = parseEnvFile(envPath);
    
    console.log('Generating config.js...');
    const configContent = generateConfigFile(env);
    

    const configDir = path.dirname(configPath);
    if (!fs.existsSync(configDir)) {
        fs.mkdirSync(configDir, { recursive: true });
    }
    

    fs.writeFileSync(configPath, configContent, 'utf8');
    
    console.log('config.js file generated successfully!');
    console.log('Location:', configPath);
}


if (require.main === module) {
    main();
}

module.exports = { parseEnvFile, generateConfigFile, main };

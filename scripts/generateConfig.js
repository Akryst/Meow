const fs = require('fs');
const path = require('path');

// Function to read and parse the .env file
function parseEnvFile(filePath) {
    try {
        const envContent = fs.readFileSync(filePath, 'utf8');
        const env = {};
        
        envContent.split('\n').forEach(line => {
            line = line.trim();
            if (line && !line.startsWith('#') && line.includes('=')) {
                const [key, ...valueParts] = line.split('=');
                let value = valueParts.join('=').trim();
                
                // Remove quotes if they exist
                if ((value.startsWith('"') && value.endsWith('"')) || 
                    (value.startsWith("'") && value.endsWith("'"))) {
                    value = value.slice(1, -1);
                }
                
                // Parse JSON arrays
                if (value.startsWith('[') && value.endsWith(']')) {
                    try {
                        value = JSON.parse(value);
                    } catch (e) {
                        // If parsing fails, keep as string
                    }
                }
                
                // Convert boolean values
                if (value === 'true') value = true;
                if (value === 'false') value = false;
                
                // Convert numbers (but not if it's already a boolean)
                if (typeof value !== 'boolean' && !isNaN(value) && value !== '') {
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

// Function to generate the config.js file
function generateConfigFile(env) {
    // Function to filter active social media platforms
    const filterSocialMedia = (socialUrls) => {
        const filtered = {};
        Object.keys(socialUrls).forEach(key => {
            const value = socialUrls[key];
            // Only include if not empty, not "off" and is a valid URL
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
            profileImage: 'assets/images/profile.jpg'
        },
        socialMedia: filterSocialMedia({
            twitter: env.TWITTER || '',
            lastfm: env.LASTFM || '',
            github: env.GITHUB || '',
            osu: env.OSU || '',
            vrchat: env.VRCHAT || '',
            instagram: env.INSTAGRAM || '',
            tiktok: env.TIKTOK || '',
            namemc: env.NAMEMC || '',
            youtube: env.YOUTUBE || ''
        }),
        locations: {
            enabled: env.LOCATIONS_ENABLED !== undefined ? env.LOCATIONS_ENABLED : true,
            interval: env.LOCATION_INTERVAL || 3000,
            list: env.LOCATIONS || ['Location 1', 'Location 2']
        },
        lastfm: {
            username: env.LASTFM_USERNAME || '',
            apiKey: env.LASTFM_API_KEY || ''
        },
        database: {
            enabled: env.MONGO_ENABLED || false
        },
        theme: {
            background: {
                type: env.BACKGROUND_TYPE || 'image',
                video: env.BACKGROUND_VIDEO || 'assets/videos/background.mp4',
                image: env.BACKGROUND_IMAGE || 'assets/images/background.jpg'
            },
            effects: {
                bloom: {
                    enabled: env.BLOOM_ENABLED !== undefined ? env.BLOOM_ENABLED : true,
                    strength: parseFloat(env.BLOOM_STRENGTH) || 1.3,
                    radius: parseFloat(env.BLOOM_RADIUS) || 15,
                    textShadowColor: env.BLOOM_TEXT_SHADOW_COLOR || 'var(--color-primary)',
                    pulseAnimation: env.BLOOM_PULSE_ANIMATION !== undefined ? env.BLOOM_PULSE_ANIMATION : true
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
        }
    };
    
    const configContent = `// Site configuration - Auto-generated from .env file
// Last updated: ${new Date().toISOString()}

const config = ${JSON.stringify(config, null, 4)};

// Make available globally
window.siteConfig = config;

console.log('🔧 Configuration loaded:', config);`;
    
    return configContent;
}

// Main script
function main() {
    const envPath = path.join(__dirname, '..', '.env');
    const configPath = path.join(__dirname, '..', 'public', 'js', 'config.js');
    
    console.log('Reading .env file...');
    const env = parseEnvFile(envPath);
    
    console.log('Generating config.js...');
    const configContent = generateConfigFile(env);
    
    // Create directory if it doesn't exist
    const configDir = path.dirname(configPath);
    if (!fs.existsSync(configDir)) {
        fs.mkdirSync(configDir, { recursive: true });
    }
    
    // Write config.js file
    fs.writeFileSync(configPath, configContent, 'utf8');
    
    console.log('config.js file generated successfully!');
    console.log('Location:', configPath);
}

// Execute if called directly
if (require.main === module) {
    main();
}

module.exports = { parseEnvFile, generateConfigFile, main };

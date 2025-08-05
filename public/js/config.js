// Site configuration - Auto-generated from .env file
// Last updated: 2025-08-04T23:09:51.941Z

const config = {
    "profile": {
        "name": "Akryst",
        "description": "VR Enthusiast • Music Lover • Avatar editor",
        "timezone": "America/Hermosillo",
        "profileImage": "assets/images/profile.jpg"
    },
    "socialMedia": {
        "twitter": "https://x.com/AkrystVRC",
        "lastfm": "https://www.last.fm/user/AkrystVRC",
        "github": "https://github.com/Akryst",
        "osu": "https://osu.ppy.sh/users/38184678",
        "vrchat": "https://vrchat.com/home/user/usr_3644022f-4da6-4438-973a-0eb31527a121"
    },
    "locations": {
        "enabled": false,
        "interval": 10000,
        "list": [
            "The Black Cat",
            "Popcorn Palace",
            "VRChat Home",
            "Midnight Rooftop"
        ]
    },
    "lastfm": {
        "username": "akrystvrc",
        "apiKey": "LastFM_API_Key"
    },
    "database": {
        "enabled": false
    },
    "theme": {
        "background": {
            "type": "video",
            "video": "assets/videos/background.mp4",
            "image": "assets/images/background.jpg"
        },
        "effects": {
            "bloom": {
                "enabled": true,
                "strength": 0.1,
                "radius": 30,
                "textShadowColor": "var(--color-primary)",
                "pulseAnimation": true
            },
            "backgroundBlur": 20,
            "locationRotation": {
                "interval": 10000,
                "fadeTransition": true,
                "fadeTime": 10
            }
        }
    },
    "personal": {
        "locations": [
            "The Black Cat",
            "Popcorn Palace",
            "VRChat Home",
            "Midnight Rooftop"
        ],
        "locationInterval": 10000
    },
    "welcomeScreen": {
        "enabled": true,
        "text": "Hey! Been trying to meet you."
    },
    "footer": {
        "text": "Made with ❤️ by Akryst"
    }
};

// Make available globally
window.siteConfig = config;

console.log('🔧 Configuration loaded:', config);
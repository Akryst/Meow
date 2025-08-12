// Site configuration - Auto-generated from .env file
// Last updated: 2025-08-12T05:09:21.281Z

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
        "vrchat": "https://vrchat.com/home/user/usr_3644022f-4da6-4438-973a-0eb31527a121",
        "steam": "https://steamcommunity.com/id/Akryst"
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
        "enabled": false,
        "username": "akrystvrc",
        "apiKey": "97cee68c6a28040c6269fa02dc86a948"
    },
    "discord": {
        "enabled": true,
        "userId": "1368371401546928148",
        "updateInterval": 5000,
        "useWebSocket": true,
        "showBadges": true
    },
    "musicPlayer": {
        "enabled": false,
        "volume": 50,
        "autoplay": true,
        "tracks": [
            "track1.mp3",
            "track2.mp3",
            "track3.mp3"
        ]
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
    "font": {
        "family": "Poppins",
        "weights": "300;400;500;600;700"
    },
    "footer": {
        "text": "Made with ❤️ by Akryst"
    }
};

// Make available globally
window.siteConfig = config;

console.log('🔧 Configuration loaded:', config);
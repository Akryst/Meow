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

window.LastFmService = LastFmService;

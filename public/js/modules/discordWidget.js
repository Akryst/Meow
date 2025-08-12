/**
 * Discord Widget Manager
 * Integrates with Lanyard API using WebSocket for real-time updates
 */

class DiscordWidget {
    constructor(config) {
        this.config = config;
        this.userId = config.discord?.userId;
        this.useWebSocket = config.discord?.useWebSocket !== false; // Default to true
        this.updateInterval = config.discord?.updateInterval || 15000; // Fallback for HTTP
        this.showBadges = config.discord?.showBadges !== false; // Default to true
        this.isUpdating = false;
        this.reconnectAttempts = 0;
        this.maxReconnectAttempts = 5;
        this.reconnectDelay = 5000;
        
        // API endpoints
        this.lanyardApi = `https://api.lanyard.rest/v1/users/${this.userId}`;
        this.websocketUrl = 'wss://api.lanyard.rest/socket';
        
        // WebSocket state
        this.ws = null;
        this.wsConnected = false;
        this.heartbeatInterval = null;
        
        // Discord Badge CDN URLs
        this.discordBadges = {
            staff: 'https://cdn.discordapp.com/badge-icons/5e74e9b61934fc1f67c65515d1f7e60d.png',
            partner: 'https://cdn.discordapp.com/badge-icons/3f9748e53446a137a052f3454e2de41e.png',
            hypesquad: 'https://cdn.discordapp.com/badge-icons/bf01d1073931f921909045f3a39fd264.png',
            bug_hunter_level_1: 'https://cdn.discordapp.com/badge-icons/2717692c7dca7289b35297368a940dd0.png',
            house_bravery: 'https://cdn.discordapp.com/badge-icons/8a88d63823d8a71cd5e390baa45efa02.png',
            house_brilliance: 'https://cdn.discordapp.com/badge-icons/011940fd013da3f7fb926e4a1cd2e618.png',
            house_balance: 'https://cdn.discordapp.com/badge-icons/3aa41de486fa12454c3761e8e223442e.png',
            early_supporter: 'https://cdn.discordapp.com/badge-icons/7060786766c9c840eb3019e725d2b358.png',
            bug_hunter_level_2: 'https://cdn.discordapp.com/badge-icons/848f79194d4be5ff5f81505cbd0ce1e6.png',
            verified_developer: 'https://cdn.discordapp.com/badge-icons/6bdc42827a38498929a4920da12695d9.png',
            active_developer: 'https://cdn.discordapp.com/badge-icons/6bdc42827a38498929a4920da12695d9.png',
            nitro: 'https://cdn.discordapp.com/badge-icons/2ba85e8026a8614b640c2837bcdfe21b.png',
            boost: 'https://cdn.discordapp.com/badge-icons/72bed35d95f44c38d0b04a4af36e01ba.png'
        };
        
        this.init();
    }
    
    init() {
        if (!this.userId) {
            this.hideWidget();
            return;
        }
        

        this.updateConnectionIndicator('error');
        
        if (this.useWebSocket) {
            this.initWebSocket();
        } else {
            this.initHttpPolling();
        }
    }
    
    initWebSocket() {
        try {
            this.ws = new WebSocket(this.websocketUrl);
            this.setupWebSocketHandlers();
        } catch (error) {
            this.fallbackToHttp();
        }
    }
    
    setupWebSocketHandlers() {
        this.ws.onopen = () => {
            this.wsConnected = true;
            this.reconnectAttempts = 0;
            this.updateConnectionIndicator('websocket');
            

            this.sendWebSocketMessage({
                op: 2, // Subscribe
                d: {
                    subscribe_to_id: this.userId
                }
            });
        };
        
        this.ws.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                this.handleWebSocketMessage(data);
            } catch (error) {

            }
        };
        
        this.ws.onclose = (event) => {
            this.wsConnected = false;
            this.stopHeartbeat();
            this.updateConnectionIndicator('error');
            
            if (event.code !== 1000) { // Not a normal closure
                this.handleReconnect();
            }
        };
        
        this.ws.onerror = (error) => {
            this.handleReconnect();
        };
    }
    
    handleWebSocketMessage(data) {
        if (!data || typeof data.op === 'undefined') {
            return;
        }

        switch (data.op) {
            case 1: // Hello - Start heartbeat
                if (data.d && data.d.heartbeat_interval) {
                    this.startHeartbeat(data.d.heartbeat_interval);
                }
                break;
                
            case 0: // Event
                if (data.t === 'INIT_STATE' && data.d) {
                    this.renderDiscordData(data.d);
                } else if (data.t === 'PRESENCE_UPDATE' && data.d) {
                    this.renderDiscordData(data.d);
                }
                break;
                
            case 11: // Heartbeat ACK

                break;
                
            default:
                break;
        }
    }
    
    sendWebSocketMessage(message) {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(JSON.stringify(message));
        }
    }
    
    startHeartbeat(interval) {
        this.stopHeartbeat();
        this.heartbeatInterval = setInterval(() => {
            this.sendWebSocketMessage({ op: 3 }); // Heartbeat
        }, interval);
    }
    
    stopHeartbeat() {
        if (this.heartbeatInterval) {
            clearInterval(this.heartbeatInterval);
            this.heartbeatInterval = null;
        }
    }
    
    handleReconnect() {
        if (this.reconnectAttempts >= this.maxReconnectAttempts) {
            this.fallbackToHttp();
            return;
        }
        
        this.reconnectAttempts++;
        const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1); // Exponential backoff
        
        setTimeout(() => {
            if (!this.wsConnected) {
                this.initWebSocket();
            }
        }, delay);
    }
    
    fallbackToHttp() {
        this.useWebSocket = false;
        this.closeWebSocket();
        this.updateConnectionIndicator('http');
        this.initHttpPolling();
    }
    
    closeWebSocket() {
        this.stopHeartbeat();
        if (this.ws) {
            this.ws.close(1000, 'Switching to HTTP polling');
            this.ws = null;
        }
        this.wsConnected = false;
    }
    
    initHttpPolling() {
        this.updateDiscordStatus();
        this.updateConnectionIndicator('http');
        this.startPolling();
    }
    
    async updateDiscordStatus() {
        if (this.isUpdating) return;
        this.isUpdating = true;
        
        try {
            const response = await fetch(this.lanyardApi);
            const data = await response.json();
            
            if (data.success && data.data) {
                this.renderDiscordData(data.data);
            } else {
                this.showOfflineStatus();
            }
        } catch (error) {
            this.showOfflineStatus();
        } finally {
            this.isUpdating = false;
        }
    }
    
    renderDiscordData(userData) {

        if (!userData) {
            return;
        }
        
        const { discord_user, discord_status, activities, spotify } = userData;
        


        if (this.onUserDataReceived && typeof this.onUserDataReceived === 'function') {
            this.onUserDataReceived(userData);
        } else {

            if (window.applyDiscordDecorationToProfile && discord_user && discord_user.avatar_decoration_data) {
                window.applyDiscordDecorationToProfile(discord_user.avatar_decoration_data);
            }

            if (window.updateDiscordStatus) {
                window.updateDiscordStatus(discord_status, discord_user);
            }
        }
    }
    
    // Render Discord badges with official icons
    renderDiscordBadges(user) {
        if (!this.showBadges || !user) return '';
        
        const badges = [];
        const flags = user.public_flags || 0;
        
        // Badge flag mapping
        const badgeFlags = {
            1: 'staff',
            2: 'partner', 
            4: 'hypesquad',
            8: 'bug_hunter_level_1',
            64: 'house_bravery',
            128: 'house_brilliance', 
            256: 'house_balance',
            512: 'early_supporter',
            16384: 'bug_hunter_level_2',
            131072: 'verified_developer',
            262144: 'active_developer'
        };
        
        // Check each flag
        for (const [flag, badgeKey] of Object.entries(badgeFlags)) {
            if (flags & parseInt(flag)) {
                badges.push({
                    key: badgeKey,
                    url: this.discordBadges[badgeKey],
                    title: this.getBadgeTitle(badgeKey)
                });
            }
        }
        
        // Check for Nitro (based on avatar decoration or premium features)
        if (user.avatar_decoration_data || user.banner) {
            badges.push({
                key: 'nitro',
                url: this.discordBadges.nitro,
                title: 'Discord Nitro'
            });
        }
        
        // Check for server boosting (if in a guild with boost info)
        if (user.premium_since) {
            badges.push({
                key: 'boost',
                url: this.discordBadges.boost,
                title: 'Server Booster'
            });
        }
        
        return badges.map(badge => 
            `<img src="${badge.url}" alt="${badge.key}" class="discord-badge ${badge.key}" title="${badge.title}">`
        ).join('');
    }
    
    // Get badge display title
    getBadgeTitle(badgeKey) {
        const titles = {
            staff: 'Discord Staff',
            partner: 'Partnered Server Owner',
            hypesquad: 'HypeSquad Events',
            bug_hunter_level_1: 'Bug Hunter Level 1',
            house_bravery: 'House Bravery',
            house_brilliance: 'House Brilliance',
            house_balance: 'House Balance',
            early_supporter: 'Early Supporter',
            bug_hunter_level_2: 'Bug Hunter Level 2',
            verified_developer: 'Verified Bot Developer',
            active_developer: 'Active Developer',
            nitro: 'Discord Nitro',
            boost: 'Server Booster'
        };
        return titles[badgeKey] || badgeKey;
    }
    
    showOfflineStatus() {
        if (window.updateDiscordStatus) {
            window.updateDiscordStatus('offline', null);
        }
    }
    
    hideWidget() {
        const widget = document.querySelector('.discord-widget');
        if (widget) {
            widget.style.display = 'none';
        }
    }
    
    updateConnectionIndicator(status) {

    }
    

    startPolling() {
        if (!this.useWebSocket) {
            setInterval(() => {
                this.updateDiscordStatus();
            }, this.updateInterval);
        }
    }
    

    destroy() {
        this.closeWebSocket();
        this.hideWidget();
    }
}


window.DiscordWidget = DiscordWidget;

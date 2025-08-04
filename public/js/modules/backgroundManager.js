/**
 * Background Manager
 * Handles dynamic background switching between image and video
 */
class BackgroundManager {
    constructor(config) {
        this.config = config;
        this.backgroundType = config.theme?.background?.type || 'image';
        this.videoElement = null;
        this.fallbackElement = null;
        
        this.init();
    }
    
    init() {
        // Remove existing background from body
        document.body.style.backgroundImage = 'none';
        
        if (this.backgroundType === 'video') {
            this.setupVideoBackground();
        } else {
            this.setupImageBackground();
        }
        
        console.log(`🎨 Background initialized: ${this.backgroundType}`);
    }
    
    setupVideoBackground() {
        // Create video element
        this.videoElement = document.createElement('video');
        this.videoElement.id = 'bg-video';
        this.videoElement.autoplay = true;
        this.videoElement.muted = true; // Always muted for background videos
        this.videoElement.loop = true;
        this.videoElement.playsInline = true; // For mobile compatibility
        
        // Set video source
        const videoSrc = this.config.theme.background.video || 'assets/videos/background.mp4';
        this.videoElement.src = videoSrc;
        
        // Apply styles
        Object.assign(this.videoElement.style, {
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: '-2',
            pointerEvents: 'none'
        });
        
        // Create fallback image element
        this.createFallbackBackground();
        
        // Handle video load errors
        this.videoElement.onerror = () => {
            console.warn('🎬 Video background failed to load, falling back to image');
            this.fallbackToImage();
        };
        
        // Ensure video plays
        this.videoElement.oncanplay = () => {
            this.videoElement.play().catch(error => {
                console.warn('🎬 Video autoplay blocked, falling back to image');
                this.fallbackToImage();
            });
        };
        
        // Insert video into DOM
        document.body.insertBefore(this.videoElement, document.body.firstChild);
        
        console.log('🎬 Video background setup completed');
    }
    
    setupImageBackground() {
        // Create image background element
        const imageElement = document.createElement('div');
        imageElement.id = 'bg-image';
        
        const imageSrc = this.config.theme.background.image || 'assets/images/background.jpg';
        
        Object.assign(imageElement.style, {
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            backgroundImage: `url('${imageSrc}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed',
            zIndex: '-2',
            pointerEvents: 'none'
        });
        
        document.body.insertBefore(imageElement, document.body.firstChild);
        
        console.log('🖼️ Image background setup completed');
    }
    
    createFallbackBackground() {
        this.fallbackElement = document.createElement('div');
        this.fallbackElement.id = 'bg-fallback';
        
        const imageSrc = this.config.theme.background.image || 'assets/images/background.jpg';
        
        Object.assign(this.fallbackElement.style, {
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            backgroundImage: `url('${imageSrc}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            zIndex: '-3',
            pointerEvents: 'none'
        });
        
        document.body.insertBefore(this.fallbackElement, document.body.firstChild);
    }
    
    fallbackToImage() {
        if (this.videoElement) {
            this.videoElement.style.display = 'none';
        }
        
        if (this.fallbackElement) {
            this.fallbackElement.style.zIndex = '-2';
        } else {
            this.setupImageBackground();
        }
    }
    
    // Method to switch background type dynamically
    switchBackgroundType(newType) {
        // Clean up existing background
        this.cleanup();
        
        // Update config and reinitialize
        this.backgroundType = newType;
        this.config.theme.background.type = newType;
        this.init();
    }
    
    cleanup() {
        // Remove video element
        if (this.videoElement) {
            this.videoElement.remove();
            this.videoElement = null;
        }
        
        // Remove fallback element
        if (this.fallbackElement) {
            this.fallbackElement.remove();
            this.fallbackElement = null;
        }
        
        // Remove image background
        const imageElement = document.getElementById('bg-image');
        if (imageElement) {
            imageElement.remove();
        }
    }
}

// Make BackgroundManager available globally
window.BackgroundManager = BackgroundManager;

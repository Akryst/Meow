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
        document.body.style.backgroundImage = 'none';
        
        if (this.backgroundType === 'video') {
            this.setupVideoBackground();
        } else {
            this.setupImageBackground();
        }
    }
    
    setupVideoBackground() {
        this.videoElement = document.createElement('video');
        this.videoElement.id = 'bg-video';
        this.videoElement.autoplay = true;
        this.videoElement.muted = true;
        this.videoElement.loop = true;
        this.videoElement.playsInline = true;
        
        const videoSrc = this.config.theme.background.video || 'assets/videos/background.mp4';
        this.videoElement.src = videoSrc;
        
        const blur = this.config.theme.background.blur || '20px';
        const opacity = this.config.theme.background.opacity || 0.3;
        
        Object.assign(this.videoElement.style, {
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: '-2',
            pointerEvents: 'none',
            filter: `blur(${blur})`,
            opacity: opacity
        });
        
        this.createFallbackBackground();
        
        this.videoElement.onerror = () => {
            this.fallbackToImage();
        };
        
        this.videoElement.oncanplay = () => {
            this.videoElement.play().catch(error => {
                this.fallbackToImage();
            });
        };
        
        document.body.insertBefore(this.videoElement, document.body.firstChild);
    }
    
    setupImageBackground() {
        const imageElement = document.createElement('div');
        imageElement.id = 'bg-image';
        
        const imageSrc = this.config.theme.background.image || 'assets/images/background.jpg';
        const blur = this.config.theme.background.blur || '20px';
        const opacity = this.config.theme.background.opacity || 0.3;
        
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
            zIndex: '-2',
            pointerEvents: 'none',
            filter: `blur(${blur})`,
            opacity: opacity
        });
        
        document.body.insertBefore(imageElement, document.body.firstChild);
    }
    
    createFallbackBackground() {
        this.fallbackElement = document.createElement('div');
        this.fallbackElement.id = 'bg-fallback';
        
        const imageSrc = this.config.theme.background.image || 'assets/images/background.jpg';
        const blur = this.config.theme.background.blur || '20px';
        const opacity = this.config.theme.background.opacity || 0.3;
        
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
            pointerEvents: 'none',
            filter: `blur(${blur})`,
            opacity: opacity
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
    
    switchBackgroundType(newType) {
        this.cleanup();
        
        this.backgroundType = newType;
        this.config.theme.background.type = newType;
        this.init();
    }
    
    cleanup() {
        if (this.videoElement) {
            this.videoElement.remove();
            this.videoElement = null;
        }
        
        if (this.fallbackElement) {
            this.fallbackElement.remove();
            this.fallbackElement = null;
        }
        
        const imageElement = document.getElementById('bg-image');
        if (imageElement) {
            imageElement.remove();
        }
    }
}

window.BackgroundManager = BackgroundManager;

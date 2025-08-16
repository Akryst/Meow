// Simple profile image handler
class ProfileImageManager {
    constructor() {
        this.img = null;
        this.types = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
        this.init();
    }

    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }

    setup() {
        this.img = document.querySelector('.profile-image');
        if (!this.img) return;

        this.loadImage();
        this.addLoadingStates();
    }

    loadImage() {
        // Wait for config if not ready
        if (!window.config?.profile) {
            setTimeout(() => this.loadImage(), 100);
            return;
        }

        const { profileImage, profileImageType, name } = config.profile;
        if (!profileImage) return;

        const type = this.getImageType(profileImage, profileImageType);
        
        this.img.src = profileImage;
        this.img.alt = `${name || 'Profile'} picture`;
        
        if (type === 'gif') {
            this.img.classList.add('profile-image-gif');
            this.pauseWhenHidden();
        }
        
        this.img.onerror = () => this.fallback();
        this.img.onload = () => this.optimize(type);
    }

    getImageType(path, configType) {
        if (configType && this.types.includes(configType.toLowerCase())) {
            return configType.toLowerCase();
        }
        
        const ext = path.split('.').pop().toLowerCase();
        return this.types.includes(ext) ? ext : 'jpg';
    }

    pauseWhenHidden() {
        if (!('IntersectionObserver' in window)) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                this.img.style.animationPlayState = entry.isIntersecting ? 'running' : 'paused';
            });
        });
        observer.observe(this.img);
    }

    optimize(type) {
        this.img.style.imageRendering = (type === 'png') ? 'crisp-edges' : 'auto';
    }

    addLoadingStates() {
        this.img.classList.add('loading');
        
        this.img.addEventListener('load', () => {
            this.img.classList.remove('loading');
            this.img.classList.add('loaded');
        });

        this.img.addEventListener('error', () => {
            this.img.classList.remove('loading');
            this.img.classList.add('error');
        });
    }

    fallback() {
        const fallbacks = [
            'assets/images/profile.png',
            'assets/images/default.jpg'
        ];
        
        this.tryFallback(fallbacks, 0);
    }

    tryFallback(list, index) {
        if (index >= list.length) return;
        
        const test = new Image();
        test.onload = () => this.img.src = list[index];
        test.onerror = () => this.tryFallback(list, index + 1);
        test.src = list[index];
    }

    change(path, type = null) {
        if (!this.img) return;
        
        const detectedType = this.getImageType(path, type);
        
        // Clean up
        this.img.classList.remove('profile-image-gif', 'loading', 'loaded', 'error');
        const oldBtn = document.querySelector('.gif-control-btn');
        if (oldBtn) oldBtn.remove();
        
        // Set new image
        this.img.src = path;
        
        if (detectedType === 'gif') {
            this.img.classList.add('profile-image-gif');
            this.pauseWhenHidden();
        }
        
        this.optimize(detectedType);
    }
}

const profileImageManager = new ProfileImageManager();
window.profileImageManager = profileImageManager;

/**
 * Visual Effects Manager
 * Handles particle effects, bloom and dynamic location rotation
 */
class VisualEffectsManager {
    constructor(config) {
        this.config = config;
        this.currentLocationIndex = 0;
        this.locationElement = null;
        
        // Aplica el desenfoque de fondo si está configurado
        if (this.config.theme?.effects?.backgroundBlur !== undefined) {
            document.documentElement.style.setProperty('--background-blur', this.config.theme.effects.backgroundBlur + 'px');
        }
        
        this.init();
    }
    
    init() {
        // Initialize all visual effects
        this.initParticles();
        this.applyBloomEffects();
        this.setupLocationRotation();
        
        console.log('Visual effects initialized');
    }
    
    initParticles() {
        // Add particles container to DOM if it doesn't exist
        if (!document.getElementById('particles-js')) {
            const particlesContainer = document.createElement('div');
            particlesContainer.id = 'particles-js';
            document.body.insertBefore(particlesContainer, document.body.firstChild);
        }
        
        // Initialize particles.js with a small delay to ensure DOM is ready
        setTimeout(() => {
            if (window.particlesJS) {
                particlesJS('particles-js', {
                    particles: {
                        number: {
                            value: 60,
                            density: {
                                enable: true,
                                value_area: 900
                            }
                        },
                        color: {
                            value: "#ffffff"
                        },
                        shape: {
                            type: ["circle", "edge", "triangle"],
                            stroke: {
                                width: 0,
                                color: "#000000"
                            },
                            polygon: {
                                nb_sides: 5
                            }
                        },
                        opacity: {
                            value: 0.4,
                            random: true,
                            anim: {
                                enable: true,
                                speed: 1,
                                opacity_min: 0.05,
                                sync: false
                            }
                        },
                        size: {
                            value: 3.5,
                            random: true,
                            anim: {
                                enable: true,
                                speed: 2,
                                size_min: 0.1,
                                sync: false
                            }
                        },
                        line_linked: {
                            enable: false
                        },
                        move: {
                            enable: true,
                            speed: 0.8,
                            direction: "bottom",
                            random: true,
                            straight: false,
                            out_mode: "out",
                            bounce: false,
                            attract: {
                                enable: false,
                                rotateX: 600,
                                rotateY: 1200
                            }
                        }
                    },
                    interactivity: {
                        detect_on: "canvas",
                        events: {
                            onhover: {
                                enable: true,
                                mode: "repulse"
                            },
                            onclick: {
                                enable: false
                            },
                            resize: true
                        }
                    },
                    retina_detect: true
                });
            } else {
                console.warn('particles.js not found. Skipping particle initialization.');
            }
        }, 100);
    }
    
    applyBloomEffects() {
        // Check if bloom effect is enabled in config
        const bloomEnabled = this.config.theme?.effects?.bloom?.enabled ?? true;
        if (!bloomEnabled) {
            console.log('🌟 Bloom effects disabled');
            return;
        }
        
        // Apply bloom configuration if available
        if (this.config.theme?.effects?.bloom) {
            const bloomConfig = this.config.theme.effects.bloom;
            
            // Apply bloom strength
            if (bloomConfig.strength) {
                document.documentElement.style.setProperty('--bloom-strength', bloomConfig.strength);
            }
            
            // Apply bloom radius
            if (bloomConfig.radius) {
                document.documentElement.style.setProperty('--bloom-radius', `${bloomConfig.radius}px`);
            }
            
            // Apply text shadow color
            if (bloomConfig.textShadowColor) {
                document.documentElement.style.setProperty('--bloom-text-shadow', bloomConfig.textShadowColor);
            }
            
            // Set bloom color (same as primary color)
            document.documentElement.style.setProperty('--bloom-color', 'var(--color-primary)');
            
            // Toggle pulse animation
            if (bloomConfig.pulseAnimation === false) {
                document.documentElement.style.setProperty('--bloom-animation', 'none');
            } else {
                document.documentElement.style.setProperty('--bloom-animation', 'subtle-pulse 4s infinite alternate');
            }
            
            console.log('🌟 Bloom effects applied:', {
                strength: bloomConfig.strength,
                radius: `${bloomConfig.radius}px`,
                pulseAnimation: bloomConfig.pulseAnimation
            });
        }
        
        // Add bloom effect to various elements
        const bloomElements = [
            '.progress-bar'
        ];
        
        bloomElements.forEach(selector => {
            document.querySelectorAll(selector).forEach(el => {
                el.classList.add('bloom');
            });
        });
        
        // Add bloom to profile image wrapper (without brightness change)
        document.querySelectorAll('.profile-image-wrapper').forEach(el => {
            el.classList.add('bloom-image');
        });
        
        // Add bloom to status dots (without brightness change, using dot color)
        document.querySelectorAll('.status-dot, .status-dot.active').forEach(el => {
            el.classList.add('bloom-dot');
        });
        
        // Add bloom to social icons
        document.querySelectorAll('.social-icon').forEach(el => {
            el.classList.add('bloom-icon');
        });
        
        // Add bloom to text elements
        document.querySelectorAll('#profile-name, h1').forEach(el => {
            el.classList.add('bloom-text');
        });
    }
    
    setupLocationRotation() {
        // Find the location element
        const locationElements = document.querySelectorAll('.status-row span');
        locationElements.forEach(el => {
            if (el.previousElementSibling && el.previousElementSibling.textContent === 'Location') {
                this.locationElement = el;
                el.classList.add('location-text');
            }
        });
        
        if (!this.locationElement) {
            console.warn('Location element not found in DOM');
            return;
        }
        
        // Start rotation if locations are available
        if (this.config.locations && 
            this.config.locations.enabled && 
            this.config.locations.list && 
            this.config.locations.list.length > 0) {
            this.startLocationRotation();
        }
    }
    
    startLocationRotation() {
        // Set the initial location
        this.updateLocationDisplay();
        
        // Get rotation configuration
        let interval = this.config.locations.interval || 5000; // default
        
        // Use the configured interval from locations
        if (this.config.theme?.effects?.locationRotation?.interval) {
            interval = this.config.theme.effects.locationRotation.interval;
        }
        
        // Start rotation
        setInterval(() => this.rotateLocation(), interval);
    }
    
    rotateLocation() {
        // Increment the index and wrap around if needed
        this.currentLocationIndex = (this.currentLocationIndex + 1) % this.config.locations.list.length;
        
        // Check if fade transition is enabled
        const useFade = this.config.theme?.effects?.locationRotation?.fadeTransition ?? true;
        const fadeTime = this.config.theme?.effects?.locationRotation?.fadeTime ?? 10;
        
        if (useFade) {
            // Update the display with animation
            this.locationElement.style.opacity = 0;
            this.locationElement.style.transform = 'translateY(-10px)';
            
            setTimeout(() => {
                this.updateLocationDisplay();
                this.locationElement.style.opacity = 1;
                this.locationElement.style.transform = 'translateY(0)';
            }, fadeTime);
        } else {
            // Update without animation
            this.updateLocationDisplay();
        }
    }
    
    updateLocationDisplay() {
        if (this.locationElement && this.config.locations && this.config.locations.list) {
            this.locationElement.textContent = this.config.locations.list[this.currentLocationIndex];
        }
    }
    
    // Apply bloom effect to dynamic elements
    applyBloomToElement(element) {
        if (element.tagName === 'IMG' || element.classList.contains('profile-image-wrapper')) {
            element.classList.add('bloom-image');
        } else if (element.classList.contains('status-dot')) {
            element.classList.add('bloom-dot');
        } else if (element.tagName === 'I') {
            element.classList.add('bloom-icon');
        } else if (element.tagName === 'H1' || element.tagName === 'H2') {
            element.classList.add('bloom-text');
        } else {
            element.classList.add('bloom');
        }
    }
}

// Make VisualEffectsManager available globally
window.VisualEffectsManager = VisualEffectsManager;

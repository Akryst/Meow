


class FontManager {
    constructor() {
        this.currentFont = null;
        this.fontCache = new Set();
    }

    static getFontConfigs() {
        return {
            'JetBrains Mono': {
                weights: '300;400;500;600;700',
                url: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@{weights}&display=swap',
                cssName: 'JetBrains Mono'
            },
            'Fira Code': {
                weights: '300;400;500;600;700',
                url: 'https://fonts.googleapis.com/css2?family=Fira+Code:wght@{weights}&display=swap',
                cssName: 'Fira Code'
            },
            'Source Code Pro': {
                weights: '300;400;500;600;700',
                url: 'https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@{weights}&display=swap',
                cssName: 'Source Code Pro'
            },
            'Roboto Mono': {
                weights: '300;400;500;700',
                url: 'https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@{weights}&display=swap',
                cssName: 'Roboto Mono'
            },
            'Inter': {
                weights: '300;400;500;600;700',
                url: 'https://fonts.googleapis.com/css2?family=Inter:wght@{weights}&display=swap',
                cssName: 'Inter'
            },
            'Poppins': {
                weights: '300;400;500;600;700',
                url: 'https://fonts.googleapis.com/css2?family=Poppins:wght@{weights}&display=swap',
                cssName: 'Poppins'
            }
        };
    }


    async loadFont(fontFamily, weights = '300;400;500;600;700') {
        const fontConfigs = FontManager.getFontConfigs();
        const config = fontConfigs[fontFamily];
        
        if (!config) {
            return false;
        }

        const fontUrl = config.url.replace('{weights}', weights);
        const cacheKey = `${fontFamily}-${weights}`;


        if (this.fontCache.has(cacheKey)) {
            return true;
        }

        try {

            this.removeExistingFontLinks();


            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = fontUrl;
            link.id = 'dynamic-font-link';
            
            document.head.appendChild(link);


            await this.waitForFont(config.cssName);

            this.fontCache.add(cacheKey);
            this.currentFont = fontFamily;

            return true;

        } catch (error) {
            return false;
        }
    }


    removeExistingFontLinks() {
        const existingLink = document.getElementById('dynamic-font-link');
        if (existingLink) {
            existingLink.remove();
        }
    }

    waitForFont(fontFamily, timeout = 5000) {
        return new Promise((resolve, reject) => {
            if (!document.fonts) {

                setTimeout(resolve, 1000);
                return;
            }

            const timeoutId = setTimeout(() => {
                reject(new Error(`Font loading timeout: ${fontFamily}`));
            }, timeout);

            document.fonts.ready.then(() => {
                clearTimeout(timeoutId);
                resolve();
            }).catch((error) => {
                clearTimeout(timeoutId);
                reject(error);
            });
        });
    }

    applyFont(fontFamily) {
        const isMonospace = fontFamily.includes('Mono') || fontFamily.includes('Code');
        const fallbacks = isMonospace ? 'monospace' : 'sans-serif';
        const fontStack = `'${fontFamily}', ${fallbacks}`;
        

        document.documentElement.style.setProperty('--font-mono', fontStack);
        

        document.body.style.fontFamily = fontStack;
    }


    async initializeFromConfig(config) {
        if (!config?.font) {
            return;
        }
        const { family, weights } = config.font;
        const success = await this.loadFont(family, weights);
        if (success) {
            this.applyFont(family);
        } else {
        }
    }

    getCurrentFont() {
        return {
            family: this.currentFont,
            applied: document.documentElement.style.getPropertyValue('--font-mono'),
            bodyFont: document.body.style.fontFamily
        };
    }
}

window.FontManager = FontManager;

// Client-side Router for Single Page Application

class Router {
    constructor() {
        this.routes = new Map();
        this.currentRoute = null;
        this.init();
    }
    
    init() {
        // Define routes
        this.defineRoutes();
        
        // Handle browser navigation
        window.addEventListener('popstate', () => this.handleRoute());
        
        // Handle link clicks
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[href^="/"]');
            if (link && !link.hasAttribute('target')) {
                e.preventDefault();
                this.navigate(link.getAttribute('href'));
            }
        });
        
        // Initial route
        this.handleRoute();
    }
    
    defineRoutes() {
        // Main pages
        this.route('/', () => this.loadPage('home'));
        this.route('/about', () => this.loadPage('about'));
        this.route('/philosophy', () => this.loadPage('philosophy'));
        
        // App pages
        this.route('/apps/:id', (params) => this.loadAppPage(params.id));
        
        // Policy pages
        this.route('/policies/privacy', () => this.loadPolicyPage('privacy'));
        this.route('/policies/terms', () => this.loadPolicyPage('terms'));
        this.route('/policies/cookies', () => this.loadPolicyPage('cookies'));
        
        // App-specific policies
        this.route('/policies/:app/privacy', (params) => this.loadAppPolicy(params.app, 'privacy'));
        this.route('/policies/:app/terms', (params) => this.loadAppPolicy(params.app, 'terms'));
        this.route('/policies/:app/eula', (params) => this.loadAppPolicy(params.app, 'eula'));
        
        // 404
        this.route('*', () => this.load404());
    }
    
    route(path, handler) {
        this.routes.set(path, handler);
    }
    
    navigate(path) {
        window.history.pushState({}, '', path);
        this.handleRoute();
    }
    
    handleRoute() {
        const path = window.location.pathname;
        
        // Try exact match first
        if (this.routes.has(path)) {
            this.routes.get(path)();
            return;
        }
        
        // Try pattern matching
        for (const [pattern, handler] of this.routes) {
            const params = this.matchPattern(pattern, path);
            if (params) {
                handler(params);
                return;
            }
        }
        
        // 404
        if (this.routes.has('*')) {
            this.routes.get('*')();
        }
    }
    
    matchPattern(pattern, path) {
        if (pattern === '*') return {};
        
        const patternParts = pattern.split('/');
        const pathParts = path.split('/');
        
        if (patternParts.length !== pathParts.length) {
            return null;
        }
        
        const params = {};
        
        for (let i = 0; i < patternParts.length; i++) {
            if (patternParts[i].startsWith(':')) {
                const paramName = patternParts[i].slice(1);
                params[paramName] = pathParts[i];
            } else if (patternParts[i] !== pathParts[i]) {
                return null;
            }
        }
        
        return params;
    }
    
    async loadPage(page) {
        const container = document.getElementById('app');
        if (!container) return;
        
        // Add loading state
        container.classList.add('loading');
        
        try {
            const response = await fetch(`/pages/${page}.html`);
            const html = await response.text();
            
            // Update content
            container.innerHTML = html;
            
            // Re-initialize scripts
            this.initializePageScripts();
            
            // Update meta tags
            this.updateMetaTags(page);
            
            // Scroll to top
            window.scrollTo(0, 0);
            
        } catch (error) {
            console.error('Error loading page:', error);
            this.load404();
        } finally {
            container.classList.remove('loading');
        }
    }
    
    async loadAppPage(appId) {
        const container = document.getElementById('app');
        if (!container) return;
        
        try {
            // Load app data
            const response = await fetch('/config/apps.json');
            const data = await response.json();
            const app = data.apps.find(a => a.id === appId);
            
            if (!app) {
                this.load404();
                return;
            }
            
            // Generate app page HTML
            container.innerHTML = this.generateAppPage(app);
            
            // Update meta tags
            this.updateMetaTags(app.name, app.description);
            
            // Initialize page scripts
            this.initializePageScripts();
            
            // Scroll to top
            window.scrollTo(0, 0);
            
        } catch (error) {
            console.error('Error loading app page:', error);
            this.load404();
        }
    }
    
    generateAppPage(app) {
        return `
            <div class="app-page">
                <section class="app-hero">
                    <div class="container">
                        <div class="app-hero-content">
                            ${app.icon ? `<img src="${app.icon}" alt="${app.name}" class="app-icon-large">` : ''}
                            <h1 class="app-title">${app.name}</h1>
                            <p class="app-tagline">${app.tagline}</p>
                            <p class="app-description">${app.description}</p>
                            
                            <div class="app-actions">
                                ${app.links.appStore ? 
                                    `<a href="${app.links.appStore}" class="button button-primary" target="_blank">
                                        Download on App Store
                                    </a>` : ''}
                                ${app.links.playStore ? 
                                    `<a href="${app.links.playStore}" class="button button-primary" target="_blank">
                                        Get it on Google Play
                                    </a>` : ''}
                                ${app.links.website ? 
                                    `<a href="${app.links.website}" class="button button-secondary" target="_blank">
                                        Visit Website
                                    </a>` : ''}
                            </div>
                        </div>
                    </div>
                </section>
                
                <section class="app-features">
                    <div class="container">
                        <h2 class="section-title">Features</h2>
                        <div class="features-grid">
                            ${app.features.map(feature => `
                                <div class="feature-item">
                                    <div class="feature-icon">✨</div>
                                    <p class="feature-text">${feature}</p>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </section>
                
                <section class="app-platforms">
                    <div class="container">
                        <h2 class="section-title">Available On</h2>
                        <div class="platforms-list">
                            ${app.platforms.map(platform => `
                                <span class="platform-badge">${platform}</span>
                            `).join('')}
                        </div>
                    </div>
                </section>
                
                <section class="app-policies">
                    <div class="container">
                        <h2 class="section-title">Legal & Privacy</h2>
                        <div class="policies-links">
                            ${app.policies.privacy ? 
                                `<a href="${app.policies.privacy}" class="policy-link">Privacy Policy</a>` : ''}
                            ${app.policies.terms ? 
                                `<a href="${app.policies.terms}" class="policy-link">Terms of Service</a>` : ''}
                            ${app.policies.eula ? 
                                `<a href="${app.policies.eula}" class="policy-link">End User License Agreement</a>` : ''}
                        </div>
                    </div>
                </section>
            </div>
        `;
    }
    
    async loadPolicyPage(policy) {
        const container = document.getElementById('app');
        if (!container) return;
        
        try {
            const response = await fetch(`/policies/${policy}/content.html`);
            const html = await response.text();
            
            container.innerHTML = html;
            this.initializePageScripts();
            this.updateMetaTags(`${policy.charAt(0).toUpperCase() + policy.slice(1)} Policy`);
            window.scrollTo(0, 0);
            
        } catch (error) {
            console.error('Error loading policy page:', error);
            this.load404();
        }
    }
    
    async loadAppPolicy(appId, policyType) {
        const container = document.getElementById('app');
        if (!container) return;
        
        try {
            const response = await fetch(`/policies/${appId}/${policyType}.html`);
            const html = await response.text();
            
            container.innerHTML = html;
            this.initializePageScripts();
            
            // Get app name for title
            const appsResponse = await fetch('/config/apps.json');
            const data = await appsResponse.json();
            const app = data.apps.find(a => a.id === appId);
            
            if (app) {
                this.updateMetaTags(`${app.name} - ${policyType.charAt(0).toUpperCase() + policyType.slice(1)} Policy`);
            }
            
            window.scrollTo(0, 0);
            
        } catch (error) {
            console.error('Error loading app policy:', error);
            this.load404();
        }
    }
    
    load404() {
        const container = document.getElementById('app');
        if (!container) return;
        
        container.innerHTML = `
            <div class="error-page">
                <div class="container">
                    <h1 class="error-title">404</h1>
                    <p class="error-message">Page not found</p>
                    <p class="error-description">The page you're looking for doesn't exist or has been moved.</p>
                    <a href="/" class="button button-primary">Return Home</a>
                </div>
            </div>
        `;
        
        this.updateMetaTags('Page Not Found');
    }
    
    updateMetaTags(title, description) {
        // Update title
        document.title = title ? `${title} — ElephantFly` : 'ElephantFly — Crafting Digital Excellence';
        
        // Update description
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription && description) {
            metaDescription.content = description;
        }
        
        // Update OG tags
        const ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle) {
            ogTitle.content = document.title;
        }
        
        const ogDescription = document.querySelector('meta[property="og:description"]');
        if (ogDescription && description) {
            ogDescription.content = description;
        }
    }
    
    initializePageScripts() {
        // Re-initialize animations
        if (window.animations) {
            window.animations.init();
        }
        
        // Re-initialize portfolio
        if (window.loadPortfolio) {
            window.loadPortfolio();
        }
        
        // Trigger custom event
        document.dispatchEvent(new CustomEvent('pageLoaded'));
    }
}

// Initialize router
document.addEventListener('DOMContentLoaded', () => {
    window.router = new Router();
});

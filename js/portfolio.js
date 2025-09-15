// Portfolio System - Dynamic App Loading

document.addEventListener('DOMContentLoaded', async () => {
    await loadPortfolio();
    await loadFooterApps();
});

// Load Portfolio Items
async function loadPortfolio() {
    try {
        const response = await fetch('/config/apps.json');
        const data = await response.json();
        const container = document.getElementById('portfolio-container');
        
        if (!container) return;
        
        // Clear loading state
        container.innerHTML = '';
        
        // Render each app
        data.apps.forEach((app, index) => {
            const portfolioItem = createPortfolioItem(app, index);
            container.appendChild(portfolioItem);
        });
        
        // Initialize animations
        initPortfolioAnimations();
        
    } catch (error) {
        console.error('Error loading portfolio:', error);
        showErrorState();
    }
}

// Create Portfolio Item
function createPortfolioItem(app, index) {
    const item = document.createElement('div');
    const isComing = app.status === 'coming-soon';
    item.className = `portfolio-item scroll-animate${isComing ? ' is-coming-soon' : ''}`;
    item.style.animationDelay = `${index * 0.1}s`;
    
    // Create gradient background based on app colors
    const gradient = `linear-gradient(135deg, ${app.primaryColor}20 0%, ${app.accentColor}20 100%)`;
    
    // Build hero styling overrides
    const heroFit = app.heroFit || 'cover';
    const heroPosition = app.heroPosition || 'center';
    const heroScale = app.heroScale ? `transform: translate(-50%, -50%) scale(${app.heroScale});` : '';
    const heroStyle = `object-fit: ${heroFit}; object-position: ${heroPosition}; ${heroScale}`;
    
    const heroMarkup = app.hero
        ? `<img src="${app.hero}" alt="${app.name} hero" class="portfolio-hero" style="${heroStyle}">`
        : (isComing ? `
            <div class="coming-soon-visual">
                <span class="cs-badge">Coming Soon</span>
                <div class="cs-shape cs-shape-1"></div>
                <div class="cs-shape cs-shape-2"></div>
                <div class="cs-shape cs-shape-3"></div>
            </div>
        ` : '');

    item.innerHTML = `
        <div class="portfolio-image${isComing ? ' is-coming-soon' : ''}" style="background: ${gradient};">
            ${heroMarkup}
            ${app.status === 'beta' ? '<span class="portfolio-badge">Beta</span>' : ''}
        </div>
        <div class="portfolio-content">
            <div class="portfolio-category">${app.category}</div>
            <h3 class="portfolio-title">${app.name}</h3>
            <p class="portfolio-tagline">${app.tagline}</p>
            <p class="portfolio-description">${app.description}</p>
            <div class="portfolio-features">
                ${app.features.slice(0, 3).map(feature => 
                    `<span class="portfolio-feature">${feature}</span>`
                ).join('')}
            </div>
            <div class="portfolio-links">
                ${app.links.appStore ? 
                    `<a href="${app.links.appStore}" class="portfolio-link" target="_blank" rel="noopener">
                        App Store
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M4 12L12 4M12 4H5M12 4V11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </a>` : ''}
                ${app.links.playStore ? 
                    `<a href="${app.links.playStore}" class="portfolio-link" target="_blank" rel="noopener">
                        Play Store
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M4 12L12 4M12 4H5M12 4V11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </a>` : ''}
                ${app.links.website ? 
                    `<a href="${app.links.website}" class="portfolio-link" target="_blank" rel="noopener">
                        Visit Website
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M4 12L12 4M12 4H5M12 4V11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </a>` : ''}
            </div>
            <div class="portfolio-policies">
                ${app.policies.privacy ? 
                    `<a href="${app.policies.privacy}" class="policy-link">Privacy Policy</a>` : ''}
                ${app.policies.terms ? 
                    `<a href="${app.policies.terms}" class="policy-link">Terms of Service</a>` : ''}
            </div>
        </div>
    `;
    
    // Add click handler for app details
    item.addEventListener('click', (e) => {
        // Don't trigger if clicking on a link
        if (e.target.tagName === 'A' || e.target.closest('a')) return;
        
        // Open app details page
        openAppDetails(app);
    });
    
    return item;
}

// Load Footer Apps
async function loadFooterApps() {
    try {
        const response = await fetch('/config/apps.json');
        const data = await response.json();
        const container = document.getElementById('footer-apps');
        
        if (!container) return;
        
        container.innerHTML = data.apps.map(app => 
            `<a href="/apps/${app.id}">${app.name}</a>`
        ).join('');
        
    } catch (error) {
        console.error('Error loading footer apps:', error);
    }
}

// Open App Details
function openAppDetails(app) {
    // Create modal or navigate to app page
    const modal = createAppModal(app);
    document.body.appendChild(modal);
    
    // Animate in
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
}

// Create App Modal
function createAppModal(app) {
    const modal = document.createElement('div');
    modal.className = 'app-modal';
    
    modal.innerHTML = `
        <div class="modal-backdrop"></div>
        <div class="modal-content">
            <button class="modal-close" aria-label="Close">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M6 6L18 18M6 18L18 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
            </button>
            <div class="modal-header">
                <h2 class="modal-title">${app.name}</h2>
                <p class="modal-tagline">${app.tagline}</p>
            </div>
            <div class="modal-body">
                <p class="modal-description">${app.description}</p>
                <div class="modal-features">
                    <h3>Key Features</h3>
                    <ul>
                        ${app.features.map(feature => 
                            `<li>${feature}</li>`
                        ).join('')}
                    </ul>
                </div>
                <div class="modal-platforms">
                    <h3>Available On</h3>
                    <div class="platform-badges">
                        ${app.platforms.map(platform => 
                            `<span class="platform-badge">${platform}</span>`
                        ).join('')}
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <div class="modal-links">
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
    `;
    
    // Add styles
    addModalStyles();
    
    // Close handlers
    const closeBtn = modal.querySelector('.modal-close');
    const backdrop = modal.querySelector('.modal-backdrop');
    
    const closeModal = () => {
        modal.classList.remove('active');
        setTimeout(() => modal.remove(), 300);
    };
    
    closeBtn.addEventListener('click', closeModal);
    backdrop.addEventListener('click', closeModal);
    
    // ESC key to close
    const escHandler = (e) => {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', escHandler);
        }
    };
    document.addEventListener('keydown', escHandler);
    
    return modal;
}

// Add Modal Styles
function addModalStyles() {
    if (document.getElementById('modal-styles')) return;
    
    const styles = document.createElement('style');
    styles.id = 'modal-styles';
    styles.textContent = `
        .app-modal {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .app-modal.active {
            opacity: 1;
        }
        
        .modal-backdrop {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(10px);
        }
        
        .modal-content {
            position: relative;
            background: white;
            border-radius: 16px;
            max-width: 600px;
            width: 90%;
            max-height: 90vh;
            overflow-y: auto;
            padding: 3rem;
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
            transform: scale(0.95);
            transition: transform 0.3s ease;
        }
        
        .app-modal.active .modal-content {
            transform: scale(1);
        }
        
        .modal-close {
            position: absolute;
            top: 1.5rem;
            right: 1.5rem;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
        }
        
        .modal-close:hover {
            background: var(--color-background-alt);
        }
        
        .modal-icon {
            width: 80px;
            height: 80px;
            border-radius: 20px;
            margin-bottom: 1.5rem;
        }
        
        .modal-title {
            font-size: 2.5rem;
            margin-bottom: 0.5rem;
        }
        
        .modal-tagline {
            font-size: 1.25rem;
            color: var(--color-text-secondary);
            margin-bottom: 2rem;
        }
        
        .modal-description {
            font-size: 1.125rem;
            line-height: 1.7;
            color: var(--color-text-secondary);
            margin-bottom: 2rem;
        }
        
        .modal-features h3,
        .modal-platforms h3 {
            font-size: 1.25rem;
            margin-bottom: 1rem;
        }
        
        .modal-features ul {
            list-style: none;
            padding: 0;
        }
        
        .modal-features li {
            padding: 0.5rem 0;
            padding-left: 1.5rem;
            position: relative;
        }
        
        .modal-features li::before {
            content: "✓";
            position: absolute;
            left: 0;
            color: var(--color-secondary);
        }
        
        .platform-badges {
            display: flex;
            gap: 0.5rem;
            margin-bottom: 2rem;
        }
        
        .platform-badge {
            padding: 0.5rem 1rem;
            background: var(--color-background-alt);
            border-radius: 100px;
            font-size: 0.875rem;
            font-weight: 500;
        }
        
        .modal-footer {
            padding-top: 2rem;
            border-top: 1px solid var(--color-border-light);
        }
        
        .modal-links {
            display: flex;
            gap: 1rem;
            flex-wrap: wrap;
        }
        
        .portfolio-badge {
            position: absolute;
            top: 1rem;
            right: 1rem;
            padding: 0.5rem 1rem;
            background: white;
            border-radius: 100px;
            font-size: 0.75rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        
        .portfolio-features {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            margin: 1rem 0;
        }
        
        .portfolio-feature {
            padding: 0.25rem 0.75rem;
            background: var(--color-background-alt);
            border-radius: 100px;
            font-size: 0.75rem;
            color: var(--color-text-secondary);
        }
        
        .portfolio-policies {
            display: flex;
            gap: 1rem;
            margin-top: 1rem;
            padding-top: 1rem;
            border-top: 1px solid var(--color-border-light);
        }
        
        .policy-link {
            font-size: 0.875rem;
            color: var(--color-text-muted);
            text-decoration: underline;
            text-underline-offset: 2px;
        }
        
        .policy-link:hover {
            color: var(--color-text-secondary);
        }
        
        .portfolio-icon {
            width: 60px;
            height: 60px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            border-radius: 12px;
        }
    `;
    
    document.head.appendChild(styles);
}

// Initialize Portfolio Animations
function initPortfolioAnimations() {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.1,
            rootMargin: '50px'
        }
    );
    
    document.querySelectorAll('.scroll-animate').forEach(el => {
        observer.observe(el);
    });
}

// Error State
function showErrorState() {
    const container = document.getElementById('portfolio-container');
    if (!container) return;
    
    container.innerHTML = `
        <div class="error-state">
            <p>Unable to load portfolio items. Please try again later.</p>
        </div>
    `;
}

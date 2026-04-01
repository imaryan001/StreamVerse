// Mobile-First Modern UI Enhancements

// Enhanced Touch Interactions with Material Design
function initTouchInteractions() {
    // Add Material Design ripple effect to all interactive elements
    const interactiveElements = document.querySelectorAll('button, .material-button, .nav-item, .movie-card, .hero-nav-btn, .indicator, .hero-btn, .mobile-back-btn');
    
    interactiveElements.forEach(element => {
        // Touch feedback
        element.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
            this.style.transition = 'transform 0.1s ease';
        }, { passive: true });
        
        element.addEventListener('touchend', function() {
            this.style.transform = '';
            this.style.transition = 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)';
        }, { passive: true });
        
        element.addEventListener('touchcancel', function() {
            this.style.transform = '';
        }, { passive: true });

        // Material Design Ripple Effect
        element.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            // Remove existing ripples
            const existingRipples = this.querySelectorAll('.ripple');
            existingRipples.forEach(r => r.remove());
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Pull to Refresh
function initPullToRefresh() {
    let startY = 0;
    let currentY = 0;
    let pullDistance = 0;
    let isPulling = false;
    let refreshThreshold = 80;
    
    const refreshIndicator = document.createElement('div');
    refreshIndicator.className = 'pull-to-refresh';
    refreshIndicator.innerHTML = '↓ Pull to refresh';
    document.body.appendChild(refreshIndicator);
    
    document.addEventListener('touchstart', (e) => {
        if (window.scrollY === 0) {
            startY = e.touches[0].clientY;
            isPulling = true;
        }
    }, { passive: true });
    
    document.addEventListener('touchmove', (e) => {
        if (!isPulling) return;
        
        currentY = e.touches[0].clientY;
        pullDistance = currentY - startY;
        
        if (pullDistance > 0 && window.scrollY === 0) {
            e.preventDefault();
            
            if (pullDistance > refreshThreshold) {
                refreshIndicator.innerHTML = '↑ Release to refresh';
                refreshIndicator.style.background = 'rgba(76, 175, 80, 0.9)';
            } else {
                refreshIndicator.innerHTML = '↓ Pull to refresh';
                refreshIndicator.style.background = 'rgba(229, 9, 20, 0.9)';
            }
            
            refreshIndicator.classList.add('active');
            document.body.style.transform = `translateY(${Math.min(pullDistance * 0.5, 40)}px)`;
        }
    }, { passive: false });
    
    document.addEventListener('touchend', () => {
        if (isPulling && pullDistance > refreshThreshold) {
            refreshIndicator.innerHTML = '🔄 Refreshing...';
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } else {
            refreshIndicator.classList.remove('active');
            document.body.style.transform = '';
        }
        
        isPulling = false;
        pullDistance = 0;
    }, { passive: true });
}

// Haptic Feedback (if supported)
function triggerHapticFeedback(type = 'light') {
    if ('vibrate' in navigator) {
        switch(type) {
            case 'light':
                navigator.vibrate(10);
                break;
            case 'medium':
                navigator.vibrate(20);
                break;
            case 'heavy':
                navigator.vibrate(50);
                break;
        }
    }
}

// Enhanced Smooth Scroll
function enhanceScrolling() {
    // Add smooth scrolling to all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                triggerHapticFeedback('light');
            }
        });
    });

    // Enhanced navbar scroll effect with performance optimization
    let ticking = false;
    function updateNavbar() {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    }, { passive: true });
}

// Mobile-Optimized Loading States
function addLoadingStates() {
    const movieRows = document.querySelectorAll('.movie-row');
    
    movieRows.forEach(row => {
        if (row.children.length === 0) {
            // Add skeleton loading optimized for mobile
            const skeletonCount = window.innerWidth < 768 ? 3 : 5;
            for (let i = 0; i < skeletonCount; i++) {
                const skeleton = document.createElement('div');
                skeleton.className = 'movie-card skeleton';
                skeleton.style.minWidth = window.innerWidth < 768 ? '160px' : '300px';
                skeleton.style.height = window.innerWidth < 768 ? '240px' : '420px';
                row.appendChild(skeleton);
            }
        }
    });
}

// Enhanced Search with Mobile Optimizations
function enhanceSearch() {
    const searchInput = document.getElementById('quickSearch');
    if (!searchInput) return;

    let searchTimeout;
    
    // Add search suggestions (mock implementation)
    const suggestions = ['Action Movies', 'Comedy Series', 'Thriller', 'Drama', 'Sci-Fi'];
    
    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        const query = e.target.value.trim();
        
        if (query.length > 0) {
            searchInput.classList.add('searching');
            
            searchTimeout = setTimeout(() => {
                console.log('Searching for:', query);
                searchInput.classList.remove('searching');
                triggerHapticFeedback('light');
            }, 500);
        } else {
            searchInput.classList.remove('searching');
        }
    });

    // Add focus/blur effects
    searchInput.addEventListener('focus', () => {
        searchInput.parentElement.classList.add('focused');
    });

    searchInput.addEventListener('blur', () => {
        searchInput.parentElement.classList.remove('focused');
    });
}

// Mobile Modal Enhancements
function enhanceModals() {
    const modals = document.querySelectorAll('.modal');
    
    modals.forEach(modal => {
        // Close on backdrop click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
                triggerHapticFeedback('light');
            }
        });
        
        // Enhanced escape key support
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeModal();
                triggerHapticFeedback('light');
            }
        });

        // Prevent body scroll when modal is open
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'class') {
                    if (modal.classList.contains('active')) {
                        document.body.style.overflow = 'hidden';
                    } else {
                        document.body.style.overflow = '';
                    }
                }
            });
        });

        observer.observe(modal, { attributes: true });
    });
}

// Network Status Indicator
function initNetworkStatus() {
    const networkIndicator = document.createElement('div');
    networkIndicator.style.cssText = `
        position: fixed;
        top: 16px;
        right: 16px;
        background: rgba(76, 175, 80, 0.9);
        color: white;
        padding: 8px 16px;
        border-radius: 20px;
        font-size: 12px;
        font-weight: 600;
        z-index: 1001;
        transform: translateY(-100px);
        transition: transform 0.3s ease;
        backdrop-filter: blur(10px);
    `;
    networkIndicator.textContent = '🌐 Online';
    document.body.appendChild(networkIndicator);

    function updateNetworkStatus() {
        if (navigator.onLine) {
            networkIndicator.style.background = 'rgba(76, 175, 80, 0.9)';
            networkIndicator.textContent = '🌐 Online';
        } else {
            networkIndicator.style.background = 'rgba(244, 67, 54, 0.9)';
            networkIndicator.textContent = '📡 Offline';
        }
        
        networkIndicator.style.transform = 'translateY(0)';
        setTimeout(() => {
            networkIndicator.style.transform = 'translateY(-100px)';
        }, 3000);
    }

    window.addEventListener('online', updateNetworkStatus);
    window.addEventListener('offline', updateNetworkStatus);
}

// Performance Monitoring
function monitorPerformance() {
    if ('performance' in window) {
        window.addEventListener('load', () => {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            console.log(`📱 Mobile page loaded in ${loadTime}ms`);
            
            // Show performance warning for slow loads
            if (loadTime > 3000) {
                console.warn('⚠️ Slow page load detected:', loadTime + 'ms');
            }
        });
    }

    // Monitor memory usage (if supported)
    if ('memory' in performance) {
        setInterval(() => {
            const memory = performance.memory;
            if (memory.usedJSHeapSize > memory.jsHeapSizeLimit * 0.9) {
                console.warn('⚠️ High memory usage detected');
            }
        }, 30000);
    }
}

// Intersection Observer for Lazy Loading
function setupLazyLoading() {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.remove('skeleton');
                    imageObserver.unobserve(img);
                }
            }
        });
    }, {
        rootMargin: '50px'
    });

    // Observe all images with data-src
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Initialize all mobile enhancements
function initModernUI() {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!prefersReducedMotion) {
        setupLazyLoading();
    }
    
    initTouchInteractions();
    enhanceScrolling();
    addLoadingStates();
    enhanceSearch();
    enhanceModals();
    initNetworkStatus();
    monitorPerformance();
    
    // Only add pull-to-refresh on mobile
    if (window.innerWidth <= 768) {
        initPullToRefresh();
    }
    
    console.log('📱 Mobile-first UI enhancements loaded');
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initModernUI);
} else {
    initModernUI();
}

// Export for other scripts
if (typeof window !== 'undefined') {
    window.modernUI = {
        initModernUI,
        triggerHapticFeedback,
        enhanceSearch,
        enhanceScrolling
    };
}
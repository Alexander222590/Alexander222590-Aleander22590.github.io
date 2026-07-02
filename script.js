/* ============================================
   FORD GALAXY - JAVASCRIPT FUNCTIONALITY
   ============================================ */

// ============================================
// THEME TOGGLE (Light/Dark Mode)
// ============================================

const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
document.body.classList.toggle('dark-mode', currentTheme === 'dark');
updateThemeToggle(currentTheme);

themeToggle.addEventListener('click', () => {
    const isDarkMode = document.body.classList.toggle('dark-mode');
    const theme = isDarkMode ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
    updateThemeToggle(theme);
});

function updateThemeToggle(theme) {
    themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
}

// ============================================
// MOBILE MENU TOGGLE
// ============================================

const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-container')) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// ============================================
// SEARCH FUNCTIONALITY
// ============================================

const searchInput = document.querySelector('.search-input');
const searchBtn = document.querySelector('.search-btn');

searchBtn.addEventListener('click', performSearch);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        performSearch();
    }
});

function performSearch() {
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
        console.log('Searching for:', searchTerm);
        // In a real app, this would search the database
        showNotification(`Searching for "${searchTerm}"...`);
        searchInput.value = '';
    }
}

// ============================================
// SMOOTH SCROLL NAVIGATION
// ============================================

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// ============================================
// TRAILER MODAL FUNCTIONALITY
// ============================================

const trailerModal = document.getElementById('trailerModal');
const trailerFrame = document.getElementById('trailerFrame');

function openTrailerModal(videoUrl) {
    trailerModal.classList.add('active');
    trailerFrame.src = videoUrl;
    document.body.style.overflow = 'hidden';
}

function closeTrailerModal() {
    trailerModal.classList.remove('active');
    trailerFrame.src = '';
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
trailerModal.addEventListener('click', (e) => {
    if (e.target === trailerModal) {
        closeTrailerModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeTrailerModal();
    }
});

// ============================================
// NOTIFICATION SYSTEM
// ============================================

function showNotification(message, type = 'info', duration = 3000) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        z-index: 3000;
        animation: slideInRight 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
    `;

    document.body.appendChild(notification);

    // Remove notification after duration
    setTimeout(() => {
        notification.style.animation = 'slideInLeft 0.3s ease reverse';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, duration);
}

// ============================================
// WATCHLIST FUNCTIONALITY
// ============================================

let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];

function addToWatchlist(animeTitle) {
    if (!watchlist.includes(animeTitle)) {
        watchlist.push(animeTitle);
        localStorage.setItem('watchlist', JSON.stringify(watchlist));
        showNotification(`Added "${animeTitle}" to watchlist!`, 'success');
        return true;
    } else {
        showNotification(`"${animeTitle}" is already in your watchlist!`, 'info');
        return false;
    }
}

function removeFromWatchlist(animeTitle) {
    watchlist = watchlist.filter(item => item !== animeTitle);
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
    showNotification(`Removed "${animeTitle}" from watchlist!`, 'success');
}

// Add event listeners to watchlist buttons
const watchlistButtons = document.querySelectorAll('.btn-small');
watchlistButtons.forEach((btn, index) => {
    if (btn.textContent.includes('Add to Watchlist')) {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const animeTitle = btn.closest('.upcoming-card').querySelector('h3').textContent;
            addToWatchlist(animeTitle);
            btn.textContent = '✓ Added to Watchlist';
            btn.style.opacity = '0.7';
            btn.style.cursor = 'default';
        });
    }
});

// ============================================
// FAVORITES/LIKES FUNCTIONALITY
// ============================================

let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

function toggleFavorite(element, title) {
    if (favorites.includes(title)) {
        favorites = favorites.filter(item => item !== title);
        element.textContent = '☆';
        element.style.opacity = '1';
    } else {
        favorites.push(title);
        element.textContent = '★';
        element.style.opacity = '1';
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

// ============================================
// ANIMATED COUNTERS
// ============================================

function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Animate stats when about section comes into view
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && entry.target.classList.contains('about-stats')) {
            const stats = entry.target.querySelectorAll('.stat h3');
            stats.forEach(stat => {
                if (!stat.classList.contains('animated')) {
                    const number = parseInt(stat.textContent);
                    animateCounter(stat, number);
                    stat.classList.add('animated');
                }
            });
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const aboutStats = document.querySelector('.about-stats');
if (aboutStats) {
    observer.observe(aboutStats);
}

// ============================================
// LAZY LOADING FOR IMAGES
// ============================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================
// LIVE CLOCK FOR COUNTDOWNS
// ============================================

function updateCountdowns() {
    const countdownElements = document.querySelectorAll('.countdown');
    
    countdownElements.forEach(countdown => {
        // Get random future date for demo
        const targetDate = new Date();
        targetDate.setDate(targetDate.getDate() + Math.floor(Math.random() * 60) + 7);
        
        const items = countdown.querySelectorAll('.countdown-item');
        
        function update() {
            const now = new Date().getTime();
            const distance = targetDate.getTime() - now;
            
            if (distance < 0) {
                items[0].querySelector('.countdown-number').textContent = '0';
                items[1].querySelector('.countdown-number').textContent = '0';
                items[2].querySelector('.countdown-number').textContent = '0';
                return;
            }
            
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            
            items[0].querySelector('.countdown-number').textContent = String(days).padStart(2, '0');
            items[1].querySelector('.countdown-number').textContent = String(hours).padStart(2, '0');
            items[2].querySelector('.countdown-number').textContent = String(minutes).padStart(2, '0');
        }
        
        update();
        setInterval(update, 60000); // Update every minute
    });
}

updateCountdowns();

// ============================================
// SCROLL ANIMATIONS
// ============================================

const animateOnScroll = () => {
    const elements = document.querySelectorAll('.trailer-card, .upcoming-card, .news-card, .studio-card');
    
    elements.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            el.style.animation = 'fadeIn 0.6s ease-out forwards';
        }
    });
};

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// ============================================
// KEYBOARD SHORTCUTS
// ============================================

document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K for search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchInput.focus();
    }
    
    // Ctrl/Cmd + L for light mode
    if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
        e.preventDefault();
        if (document.body.classList.contains('dark-mode')) {
            themeToggle.click();
        }
    }
    
    // Ctrl/Cmd + D for dark mode
    if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
        e.preventDefault();
        if (!document.body.classList.contains('dark-mode')) {
            themeToggle.click();
        }
    }
});

// ============================================
// PERFORMANCE MONITORING
// ============================================

// Log page load performance
window.addEventListener('load', () => {
    if (window.performance) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log('Page load time:', pageLoadTime + 'ms');
    }
});

// ============================================
// ACCESSIBILITY
// ============================================

// Ensure all interactive elements are keyboard accessible
document.addEventListener('DOMContentLoaded', () => {
    const interactiveElements = document.querySelectorAll('a, button, [role="button"]');
    interactiveElements.forEach(el => {
        if (!el.hasAttribute('tabindex')) {
            el.setAttribute('tabindex', '0');
        }
    });
});

// ============================================
// INITIALIZATION
// ============================================

console.log('Ford Galaxy - Anime Trailer Platform Loaded');
console.log('Keyboard Shortcuts:');
console.log('  Ctrl/Cmd + K: Focus search');
console.log('  Ctrl/Cmd + L: Light mode');
console.log('  Ctrl/Cmd + D: Dark mode');
console.log('  Escape: Close modals');

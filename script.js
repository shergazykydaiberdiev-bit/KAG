/**
 * ==========================================================================
 * KAG Platform — Global Client-Side Script
 * Theme: Dark Green & Gold (#022c22, #064e3b, #d97706)
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log('KAG Platform initialized successfully.');

    // Initialize interactive handlers
    initSearchFilters();
    initNotifications();
    initMobileEnhancements();
});

/**
 * Handles search inputs across marketplace and tickets pages
 */
function initSearchFilters() {
    const searchInputs = document.querySelectorAll('input[placeholder*="Поиск"]');
    
    searchInputs.forEach(input => {
        input.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            // Find container grid elements (services or tickets)
            const cardsContainer = document.querySelector('.grid-cols-1.md\\:grid-cols-3');
            
            if (!cardsContainer) return;

            const cards = cardsContainer.children;
            Array.from(cards).forEach(card => {
                const textContent = card.textContent.toLowerCase();
                if (textContent.includes(query)) {
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

/**
 * Global smooth notification or toast alert helper
 */
function showNotification(message, type = 'success') {
    const existingToast = document.getElementById('kag-toast');
    if (existingToast) existingToast.remove();

    const toast = document.createElement('div');
    toast.id = 'kag-toast';
    toast.className = `fixed bottom-5 right-5 z-50 px-6 py-3 rounded-2xl text-sm font-bold shadow-2xl transition-all transform translate-y-2 opacity-0 flex items-center gap-3 border ${
        type === 'success' 
            ? 'bg-slate-950 border-emerald-500/50 text-emerald-400' 
            : 'bg-slate-950 border-amber-500/50 text-amber-400'
    }`;
    
    toast.innerHTML = `
        <i class="fa-solid ${type === 'success' ? 'fa-circle-check text-emerald-500' : 'fa-circle-exclamation text-amber-500'} text-lg"></i>
        <span>${message}</span>
    `;

    document.body.appendChild(toast);

    // Fade in
    setTimeout(() => {
        toast.classList.remove('translate-y-2', 'opacity-0');
    }, 10);

    // Fade out after 3 seconds
    setTimeout(() => {
        toast.classList.add('translate-y-2', 'opacity-0');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

/**
 * Mobile enhancements and UI interactivity
 */
function initMobileEnhancements() {
    // Highlight active menu item based on current pathname
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a, .md\\:hidden a');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath) {
            link.classList.add('text-amber-400');
            link.classList.remove('text-slate-300');
        }
    });
}


/**
 * ==========================================================================
 * KAG Platform — Global Client-Side Script with LocalStorage Cart
 * Theme: Dark Green & Gold (#022c22, #064e3b, #d97706)
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log('KAG Platform initialized successfully.');

    // Initialize interactive handlers
    initSearchFilters();
    initNotifications();
    initMobileEnhancements();
    initCartSystem();
});

/**
 * Handles search inputs across marketplace and tickets pages
 */
function initSearchFilters() {
    const searchInputs = document.querySelectorAll('input[placeholder*="Поиск"], input[placeholder*="поиск"]');
    
    searchInputs.forEach(input => {
        input.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
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

    setTimeout(() => {
        toast.classList.remove('translate-y-2', 'opacity-0');
    }, 10);

    setTimeout(() => {
        toast.classList.add('translate-y-2', 'opacity-0');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

/**
 * Mobile enhancements and UI interactivity
 */
function initMobileEnhancements() {
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

/**
 * LocalStorage Cart Management System
 */
function initCartSystem() {
    // Save items to localStorage when "Заказать", "Купить билет" buttons are clicked
    const actionButtons = document.querySelectorAll('a[href="checkout.html"], button');
    
    actionButtons.forEach(btn => {
        // Check if the button represents adding an item
        const btnText = btn.textContent.toLowerCase();
        if (btnText.includes('заказать') || btnText.includes('купить')) {
            btn.addEventListener('click', (e) => {
                // Find parent card to extract title and price
                const card = btn.closest('.bg-slate-950');
                if (card) {
                    const titleEl = card.querySelector('h3');
                    const priceEl = card.querySelector('.text-amber-500.font-extrabold, .text-amber-500.text-xl');
                    
                    if (titleEl && priceEl) {
                        const item = {
                            title: titleEl.textContent.trim(),
                            price: priceEl.textContent.trim()
                        };
                        
                        let cart = JSON.parse(localStorage.getItem('kag_cart')) || [];
                        cart.push(item);
                        localStorage.setItem('kag_cart', JSON.stringify(cart));
                        
                        showNotification(`"${item.title}" успешно добавлена в корзину!`, 'success');
                    }
                }
            });
        }
    });
}


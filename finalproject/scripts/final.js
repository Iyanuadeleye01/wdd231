
// Navigation Manipulation
const hambButton = document.querySelector("#hamburger-btn");
const nav = document.querySelector("nav");

// Add event listener
hambButton.addEventListener("click", () =>{
    nav.classList.toggle("show");
});


import { fetchProducts } from './modules/data.js';
import { renderProducts, openDialog, closeDialog, formatError } from './modules/user_interface.js';

const favoritesKey = 'tk_favorites';

// Helper: get favorites from localStorage
function getFavorites() {
  try {
    const raw = localStorage.getItem(favoritesKey);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function setFavorites(arr) {
  localStorage.setItem(favoritesKey, JSON.stringify(arr));
}

// DOM utilities
const lastModifiedSpan = document.getElementById('lastmodified');
if (lastModifiedSpan) {
  lastModifiedSpan.textContent = `Last modified: ${document.lastModified}`;
}




// Page-specific bootstrapping
document.addEventListener('DOMContentLoaded', async () => {
  const productsGrid = document.getElementById('itemsGrid') || document.getElementById('featured');
  const dialog = document.getElementById('styleDialog');

  if (!productsGrid) return; 

  try {
    const products = await fetchProducts();

    // show 15+ items in collections page. We use all items (20).
    const itemsToShow = location.pathname.includes('collections') ? products : products.slice(0, 6);

    // favorites
    let favorites = getFavorites();

    renderProducts(productsGrid, itemsToShow, favorites);

    // delegated click handling for details & fav
    productsGrid.addEventListener('click', (e) => {
      const card = e.target.closest('.card');
      if (!card) return;
      const id = Number(card.dataset.id);
      const product = products.find(p => p.id === id);
      if (!product) return;

      if (e.target.matches('.details-btn')) {
        openDialog(dialog, product);
      } else if (e.target.matches('.fav-btn')) {
        // toggle favorite
        favorites = favorites.includes(id) ? favorites.filter(x => x !== id) : [...favorites, id];
        setFavorites(favorites);
        // update UI on this particular card
        const btn = card.querySelector('.fav-btn');
        btn.setAttribute('aria-pressed', String(favorites.includes(id)));
        btn.textContent = favorites.includes(id) ? '★' : '☆';
        btn.title = favorites.includes(id) ? 'Remove favorite' : 'Save favorite';
      }
    });

    // dialog close button
    if (dialog) {
      const closeBtn = dialog.querySelector('#closeDialog');
      closeBtn.addEventListener('click', () => closeDialog(dialog));

      // close on Esc
      dialog.addEventListener('keydown', (evt) => {
        if (evt.key === 'Escape') closeDialog(dialog);
      });

      // delegate save from inside dialog
      dialog.addEventListener('click', (evt) => {
        if (evt.target.id === 'savePref') {
          const name = dialog.querySelector('h2')?.textContent;
          const product = products.find(p => p.name === name);
          if (product) {
            const id = product.id;
            favorites = favorites.includes(id) ? favorites : [...favorites, id];
            setFavorites(favorites);
            // update grid buttons
            const btn = document.querySelector(`.card[data-id="${id}"] .fav-btn`);
            if (btn) { btn.setAttribute('aria-pressed', 'true'); btn.textContent = '★'; }
            closeDialog(dialog);
          }
        }
      });
    }

    // For home page we also display featured items (first 3) in container with id "featured"
    if (location.pathname.endsWith('index.html') || location.pathname === '/' ) {
      const featured = products.slice(0,3);
      const featuredContainer = document.getElementById('featured');
      if (featuredContainer) renderProducts(featuredContainer, featured, favorites);
    }

    // Provide simple filter example using array.filter (toy UI)
    const filterSelect = document.getElementById('categoryFilter');
    if (filterSelect) {
      const categories = ['All', ...new Set(products.map(p => p.category))];
      filterSelect.innerHTML = categories.map(c => `<option value="${c}">${c}</option>`).join('');
      filterSelect.addEventListener('change', () => {
        const choice = filterSelect.value;
        const list = choice === 'All' ? products : products.filter(p => p.category === choice);
        renderProducts(productsGrid, list, favorites);
      });
    }

  } catch (err) {
    // show friendly error on the page
    formatError(productsGrid, 'Sorry — we could not load the collections right now. Please try again later.');
  }
});

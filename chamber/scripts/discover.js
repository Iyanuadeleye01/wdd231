import {places} from '../data/places.mjs';

const cardGrid = document.getElementById('cardsGrid');
const visitMessage = document.getElementById('visitMessage');
const yearEl = document.getElementById('year');
if(yearEl) yearEl.textContent = new Date().getFullYear();


/* Build the 8 cards dynamically */
function buildCards(items = []) {
  items.forEach((item, idx) => {
    const n = idx + 1;
    const card = document.createElement('article');
    card.className = `card c${n}`;
    card.setAttribute('aria-labelledby', `title-${item.id}`);

    card.innerHTML = `
      <figure>
        <img src="${item.image}" alt="${escapeHtml(item.title)} image" loading="lazy" width="300" height="200">
      </figure>
      <div class="card-body">
        <h2 id="title-${item.id}">${escapeHtml(item.title)}</h2>
        <address>${escapeHtml(item.address)}</address>
        <p>${escapeHtml(item.description)}</p>
        <div class="actions">
          <button type="button" aria-label="Learn more about ${escapeHtml(item.title)}">Learn more</button>
        </div>
      </div>
    `;
    cardsGrid.appendChild(card);
  });
}

function escapeHtml(str) {
  return str.replace(/[&<>"']/g, function (match) {
    return ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    })[match];
  });
}



/* LocalStorage visit logic */
const STORAGE_KEY = 'tkd_last_visit';

function updateVisitMessage(){
  const now = Date.now();
  const prev = localStorage.getItem(STORAGE_KEY);

  if(!prev){
    visitMessage.textContent = "Welcome! Let us know if you have any questions.";
  } else {
    const prevMs = Number(prev);
    if(Number.isNaN(prevMs)){
      visitMessage.textContent = "Welcome! Let us know if you have any questions.";
    } else {
      const diffMs = now - prevMs;
      const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      if(diffMs < (1000 * 60 * 60 * 24)){
        // less than 1 day
        visitMessage.textContent = "Back so soon! Awesome!";
      } else {
        visitMessage.textContent = `You last visited ${days} ${days === 1 ? 'day' : 'days'} ago.`;
      }
    }
  }

  // Save current visit time
  localStorage.setItem(STORAGE_KEY, String(now));
}

/* Initialize page */
function init(){
  buildCards(places);
  updateVisitMessage();
}

document.addEventListener('DOMContentLoaded', init);





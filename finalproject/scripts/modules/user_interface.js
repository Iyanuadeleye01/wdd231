

export function createCard(item, isFav = false) {
  // Use template literals for building card markup
  return `
    <article class="card" data-id="${item.id}">
      <button class="fav-btn" aria-pressed="${isFav}" title="${isFav ? 'Remove favorite' : 'Save favorite'}">
        ${isFav ? '★' : '☆'}
      </button>
      <img src="${item.image}" alt="${item.name}" loading="lazy" width="400" height="300">
      <div class="card-body">
        <h3 class="item-name">${item.name}</h3>
        <p class="meta">${item.category} • ${item.color}</p>
        <p class="price">₦${item.price.toLocaleString()}</p>
        <button class="details-btn">Details</button>
      </div>
    </article>
  `;
}

export function renderProducts(container, products, favorites = []) {
  const html = products.map(p => createCard(p, favorites.includes(p.id))).join('');
  container.innerHTML = html;
}


export function openDialog(dialogEl, item) {
  const details = dialogEl.querySelector('#dialogDetails');
  details.innerHTML = `
    <h2>${item.name}</h2>
    <p><strong>Category:</strong> ${item.category}</p>
    <p><strong>Color:</strong> ${item.color}</p>
    <p><strong>Price:</strong> ₦${item.price.toLocaleString()}</p>
    <p>${item.description}</p>
    <button id="savePref">Save as Favorite</button>
  `;
  dialogEl.showModal();
  dialogEl.setAttribute('aria-hidden', 'false');
  // move focus into dialog
  const focusTarget = dialogEl.querySelector('button, a, input, textarea') || dialogEl;
  focusTarget.focus();
}


export function closeDialog(dialogEl, opener = null) {
  dialogEl.close();
  dialogEl.setAttribute('aria-hidden', 'true');
  if (opener) opener.focus();
}


export function formatError(container, message) {
  container.innerHTML = `<p class="error">${message}</p>`;
}
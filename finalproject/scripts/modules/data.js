export async function fetchProducts() {
  try {
    const resp = await fetch('./data/products.json');
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    const data = await resp.json();
    return data;
  } catch (err) {
    console.error('Failed to load products:', err);
    throw err; 
  }
}
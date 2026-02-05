// Simple helpers to persist products per-user in localStorage
export const storageKeyForUser = (userId) => `savedProducts_${userId}`;

export function getProductsForUser(userId) {
  if (!userId) return [];
  try {
    const raw = localStorage.getItem(storageKeyForUser(userId));
    if (!raw) return [];
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : [];
  } catch (e) {
    return [];
  }
}

export function saveProductForUser(userId, product) {
  if (!userId || !product) return;
  try {
    const current = getProductsForUser(userId);
    // Avoid duplicate by id or sku
    const exists = current.some((p) => (p.id && product.id && p.id === product.id) || (p.sku && product.sku && p.sku === product.sku));
    if (!exists) {
      current.push(product);
      localStorage.setItem(storageKeyForUser(userId), JSON.stringify(current));
    }
  } catch (e) {
    // ignore
  }
}

export function clearProductsForUser(userId) {
  if (!userId) return;
  try {
    localStorage.removeItem(storageKeyForUser(userId));
  } catch {}
}

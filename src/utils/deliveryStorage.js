// Helpers to persist delivery partners in localStorage
const KEY = 'deliveryPartners';

export function getDeliveryPartners() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : [];
  } catch (e) {
    return [];
  }
}

export function saveDeliveryPartner(partner) {
  if (!partner) return;
  try {
    const list = getDeliveryPartners();
    // dedupe by uniqueId
    const exists = list.some((p) => p.uniqueId === partner.uniqueId);
    if (!exists) {
      list.unshift(partner);
      localStorage.setItem(KEY, JSON.stringify(list));
    } else {
      // update existing
      const updated = list.map((p) => (p.uniqueId === partner.uniqueId ? { ...p, ...partner } : p));
      localStorage.setItem(KEY, JSON.stringify(updated));
    }
  } catch {}
}

export function updateDeliveryPartner(uniqueId, patch) {
  try {
    const list = getDeliveryPartners();
    const updated = list.map((p) => (p.uniqueId === uniqueId ? { ...p, ...patch } : p));
    localStorage.setItem(KEY, JSON.stringify(updated));
    return updated;
  } catch {
    return getDeliveryPartners();
  }
}

export function removeDeliveryPartner(uniqueId) {
  try {
    const list = getDeliveryPartners().filter((p) => p.uniqueId !== uniqueId);
    localStorage.setItem(KEY, JSON.stringify(list));
    return list;
  } catch {
    return getDeliveryPartners();
  }
}

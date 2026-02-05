import React, { useState, useEffect } from "react";

const STORAGE_KEY = "heroItems";

const AdminHeroManager = () => {
  const [items, setItems] = useState([]);
  const [series, setSeries] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [alt, setAlt] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed = JSON.parse(raw || "[]");
      setItems(Array.isArray(parsed) ? parsed : []);
    } catch (e) {
      setItems([]);
    }
  }, []);

  const saveItems = (next) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    // notify other tabs and same-tab listeners
    window.dispatchEvent(new Event("heroItemsChanged"));
    try {
      // trigger storage event in other tabs
      localStorage.setItem("__heroItems_updated_at", Date.now().toString());
    } catch {}
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!series || !title || !image) {
      setMessage("Please provide series, title and image URL.");
      return;
    }

    if (editingIndex !== null && editingIndex >= 0 && editingIndex < items.length) {
      // update existing
      const next = items.map((it, idx) =>
        idx === editingIndex ? { series, title, image, alt: alt || title } : it
      );
      setItems(next);
      saveItems(next);
      setMessage("Hero item updated.");
      setEditingIndex(null);
    } else {
      const next = [{ series, title, image, alt: alt || title }, ...items];
      setItems(next);
      saveItems(next);
      setMessage("Hero item added.");
    }

    setSeries("");
    setTitle("");
    setImage("");
    setAlt("");
    setTimeout(() => setMessage(""), 3000);
  };

  const handleRemove = (idx) => {
    const next = items.filter((_, i) => i !== idx);
    setItems(next);
    saveItems(next);
    setMessage("Item removed.");
    setTimeout(() => setMessage(""), 2000);
  };

  const handleEdit = (idx) => {
    const it = items[idx];
    if (!it) return;
    setSeries(it.series || "");
    setTitle(it.title || "");
    setImage(it.image || "");
    setAlt(it.alt || "");
    setMessage("Editing item — make changes and click Update.");
    setEditingIndex(idx);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setSeries("");
    setTitle("");
    setImage("");
    setAlt("");
    setEditingIndex(null);
    setMessage("");
  };

  return (
    <section className="bg-white shadow rounded-xl p-6">
      <h2 className="text-xl font-semibold mb-4">Hero Showcase Manager</h2>

      <form onSubmit={handleAdd} className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        <div className="flex flex-col">
          <label className="text-sm text-gray-600 mb-1">Series</label>
          <input
            value={series}
            onChange={(e) => setSeries(e.target.value)}
            placeholder="Series (e.g. New Arrivals)"
            className="block w-full border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-gray-600 mb-1">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title (e.g. Effortless Style)"
            className="block w-full border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
        </div>

        <div className="sm:col-span-2 flex flex-col">
          <label className="text-sm text-gray-600 mb-1">Image URL</label>
          <input
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="Image URL (absolute or /image/...)"
            className="block w-full border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
        </div>

        <div className="sm:col-span-2 flex flex-col">
          <label className="text-sm text-gray-600 mb-1">Alt text (optional)</label>
          <input
            value={alt}
            onChange={(e) => setAlt(e.target.value)}
            placeholder="Alt text (optional)"
            className="block w-full border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
        </div>

        <div className="sm:col-span-2 flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <button type="submit" className="w-full sm:w-auto px-4 py-3 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700">
            {editingIndex !== null ? "Update Hero Item" : "Add Hero Item"}
          </button>
          {editingIndex !== null && (
            <button type="button" onClick={handleCancelEdit} className="w-full sm:w-auto px-4 py-3 border rounded-md bg-white">
              Cancel
            </button>
          )}
          <span className="text-sm text-gray-500 mt-2 sm:mt-0">Adds item at start (first slide)</span>
        </div>
      </form>

      {message && <div className="text-sm text-green-600 mb-3">{message}</div>}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {items.length === 0 ? (
          <p className="text-gray-500">No hero items configured.</p>
        ) : (
          items.map((it, idx) => (
            <div key={idx} className="flex flex-col sm:flex-row items-start sm:items-center justify-between border rounded p-2 gap-3">
              <div className="flex items-start sm:items-center gap-3">
                <img src={it.image} alt={it.alt || it.title} className="w-20 h-20 sm:w-16 sm:h-16 object-cover rounded" onError={(e)=>{e.target.src="https://placehold.co/200x240/FFFFFF/000000?text=Image"}} />
                <div>
                  <div className="font-medium">{it.title}</div>
                  <div className="text-xs text-gray-500">{it.series}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button type="button" onClick={() => handleEdit(idx)} className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">Edit</button>
                <button type="button" onClick={() => handleRemove(idx)} className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200">Remove</button>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default AdminHeroManager;

import React, { useEffect, useState } from "react";
import { Plus, Edit2, Trash2 } from "lucide-react";

const PER_PAGE = 8;

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: "", price: "", description: "", image: "", category: "", countInStock: 0 });

  const token = localStorage.getItem('token');

  const fetchProducts = async (p = 1) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/products?page=${p}&limit=${PER_PAGE}`);
      const data = await res.json();
      setProducts(data && Array.isArray(data.items) ? data.items : []);
      setTotal(data && typeof data.total === 'number' ? data.total : 0);
    } catch (err) {
      setError('Could not load products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProducts(page); }, [page]);

  const totalPages = Math.max(1, Math.ceil(total / PER_PAGE));
  const startIndex = (page - 1) * PER_PAGE;
  const endIndex = Math.min(page * PER_PAGE, total);
  const visibleProducts = products; // server already returns current page

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const openAdd = () => { setEditing(null); setForm({ name: "", price: "", description: "", image: "", category: "", countInStock: 0 }); setModalOpen(true); }; 

  const openEdit = (p) => { setEditing(p); setForm({ name: p.name, price: p.price, description: p.description || '', image: p.image || '', category: p.category || '', countInStock: p.countInStock || 0 }); setModalOpen(true); };

  const handleImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setForm((s) => ({ ...s, image: reader.result }));
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    try {
      const url = editing ? `/api/products/${editing.id}` : '/api/products';
      const method = editing ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        body: JSON.stringify({ ...form, price: Number(form.price), countInStock: Number(form.countInStock) })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Error');
      setModalOpen(false);
      fetchProducts(page);
    } catch (err) {
      alert(err.message || 'Save failed');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this product?')) return;
    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE', headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) } });
      if (!res.ok) throw new Error('Delete failed');
      fetchProducts(page);
    } catch (err) { alert(err.message || 'Delete failed'); }
  };

  return (
    <div className="bg-gray-100">

      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Admin: Product Management</h1>
          <div className="flex gap-3">
            <button onClick={openAdd} className="px-4 py-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white text-sm shadow flex items-center gap-2">
              <Plus className="w-4 h-4" /> Add New Product
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow overflow-hidden">
          <div className="max-h-[60vh] overflow-y-auto">
            <table className="w-full text-sm min-w-[720px]">
              <thead className="bg-gray-50 text-gray-600 sticky top-0 z-10">
                <tr>
                  <th className="px-6 py-4 text-left">NAME</th>
                  <th className="px-6 py-4">CATEGORY</th>
                  <th className="px-6 py-4">PRICE</th>
                  <th className="px-6 py-4">STOCK</th>
                  <th className="px-6 py-4">ACTION</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="5" className="text-center py-10">Loading...</td></tr>
                ) : products.length === 0 ? (
                  <tr><td colSpan="5" className="text-center py-10 text-gray-400">No products available</td></tr>
                ) : (
                  visibleProducts.map((p) => (
                    <tr key={p.id} className="border-t hover:bg-gray-50">
                      <td className="px-6 py-4 flex items-center gap-3">
                        <div className="w-12 h-12 rounded overflow-hidden bg-gray-100 flex items-center justify-center">
                          <img src={p.image || '/image/logo.png'} alt={p.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <div className="font-semibold">{p.name}</div>
                          <div className="text-xs text-gray-500 overflow-hidden" style={{ maxWidth: 300 }}>{p.description}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">{p.category}</td>
                      <td className="px-6 py-4">₹{p.price}</td>
                      <td className="px-6 py-4">{p.countInStock}</td>
                      <td className="px-6 py-4 space-x-2">
                        <button onClick={() => openEdit(p)} className="px-3 py-1 bg-blue-100 text-blue-600 rounded text-xs flex items-center gap-2"><Edit2 className="w-4 h-4" />Edit</button>
                        <button onClick={() => handleDelete(p.id)} className="px-3 py-1 bg-red-100 text-red-600 rounded text-xs flex items-center gap-2"><Trash2 className="w-4 h-4" />Delete</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-3 border-t flex items-center justify-between">
            <div className="text-sm text-gray-600">Showing {Math.min(startIndex + 1, products.length)} - {Math.min(endIndex, products.length)} of {products.length} products</div>
            <div className="flex items-center gap-2">
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className={`px-3 py-1 rounded ${page === 1 ? 'bg-gray-100 text-gray-400' : 'bg-white border'}`}>Prev</button>
              {Array.from({ length: totalPages }).map((_, i) => {
                const p = i + 1;
                return (<button key={p} onClick={() => setPage(p)} className={`px-3 py-1 rounded ${p === page ? 'bg-indigo-500 text-white' : 'bg-white border text-black'}`}>{p}</button>);
              })}
              <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className={`px-3 py-1 rounded ${page === totalPages ? 'bg-gray-100 text-gray-400' : 'bg-white border'}`}>Next</button>
            </div>
          </div>
        </div>

        {/* Modal */}
        {modalOpen && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-lg">
              <h3 className="text-lg font-semibold mb-4">{editing ? 'Edit Product' : 'Add Product'}</h3>

              <div className="grid grid-cols-1 gap-3">
                <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="border rounded p-2" />
                <input placeholder="Price" type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="border rounded p-2" />
                <input placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="border rounded p-2" />
                <input placeholder="Stock" type="number" value={form.countInStock} onChange={(e) => setForm({ ...form, countInStock: e.target.value })} className="border rounded p-2" />
                <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="border rounded p-2" />
                <div className="flex items-center gap-3">
                  <input type="file" accept="image/*" onChange={handleImage} />
                  {form.image && <img src={form.image} alt="preview" className="w-14 h-14 object-cover rounded" />}
                </div>

                <div className="flex justify-end gap-3 mt-4">
                  <button onClick={() => setModalOpen(false)} className="px-4 py-2 border rounded">Cancel</button>
                  <button onClick={handleSave} className="px-4 py-2 bg-indigo-600 text-white rounded">Save</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminProducts;

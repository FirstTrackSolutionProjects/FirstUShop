import React, { useState } from "react";

const Support = () => {
  const [form, setForm] = useState({ type: "Order Issue", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.message.trim()) return setStatus("Please enter a message");

    const saved = JSON.parse(localStorage.getItem("merchant_support_messages")) || [];
    saved.unshift({ id: Date.now(), ...form, date: new Date().toISOString() });
    localStorage.setItem("merchant_support_messages", JSON.stringify(saved));

    setStatus("Message sent — support will contact you soon");
    setForm({ type: "Order Issue", message: "" });
    setTimeout(() => setStatus(""), 3000);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow space-y-4 max-w-2xl">
      <h2 className="font-semibold text-lg">Need Help?</h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <select name="type" value={form.type} onChange={handleChange} className="w-full border rounded p-2">
          <option>Order Issue</option>
          <option>Payment Issue</option>
          <option>Account Issue</option>
          <option>Other</option>
        </select>

        <textarea name="message" value={form.message} onChange={handleChange} placeholder="Describe the issue" rows="4" className="w-full border rounded p-2" />

        <div className="flex items-center gap-3">
          <button type="submit" className="py-2 px-4 bg-orange-500 text-white rounded">Send</button>
          <div className="text-sm text-gray-600">or email <b>support@example.com</b></div>
        </div>

        {status && <div className="text-sm text-green-600">{status}</div>}
      </form>

      <div className="border-t pt-3 text-sm text-gray-600">
        📞 +91 99999 99999
      </div>
    </div>
  );
};

export default Support;

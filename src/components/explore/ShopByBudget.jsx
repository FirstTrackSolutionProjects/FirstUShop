import React from "react";
import { useNavigate } from "react-router-dom";

const budgets = [
  { label: "Under ₹199", max: 199 },
  { label: "Under ₹299", max: 299 },
  { label: "Under ₹499", max: 499 },
  { label: "Under ₹999", max: 999 },
];

const ShopByBudget = () => {
  const navigate = useNavigate();

  return (
    <div className="mb-8">
      <h3 className="text-2xl font-bold mb-4">💸 Shop by Budget</h3>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {budgets.map((b, i) => (
          <div
            key={i}
            onClick={() => navigate(`/budget/${b.max}`)}
            className="p-4 bg-gradient-to-r from-indigo-100 to-indigo-200 rounded-2xl shadow-lg text-center font-semibold cursor-pointer transform transition hover:scale-105 hover:shadow-xl"
          >
            {b.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopByBudget;



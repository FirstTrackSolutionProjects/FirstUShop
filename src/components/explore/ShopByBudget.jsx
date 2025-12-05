import React from "react";

const budgets = ["Under ₹199", "Under ₹299", "Under ₹499", "Under ₹999"];

const ShopByBudget = () => {
  return (
    <div className="mb-8">
      <h3 className="text-2xl font-bold mb-4">💸 Shop by Budget</h3>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {budgets.map((b, i) => (
          <div
            key={i}
            className="p-4 bg-gradient-to-r from-indigo-100 to-indigo-200 rounded-2xl shadow-lg text-center font-semibold cursor-pointer transform transition hover:scale-105 hover:shadow-xl"
          >
            {b}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopByBudget;

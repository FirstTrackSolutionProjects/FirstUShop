import React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

const CategorySlider = ({ search }) => {
  const navigate = useNavigate();

  const categories = [
    {
      name: "Women Fashion",
      icon: "👗",
      slug: "women-fashion",
      image:
        "https://images.unsplash.com/photo-1520975918318-3ff5c2f1f6b3?auto=format&fit=crop&w=800&q=80",
      tag: "Trending",
    },
    {
      name: "Men Fashion",
      icon: "👕",
      slug: "men-fashion",
      image:
        "https://images.unsplash.com/photo-1521335629791-ce4aec67dd47?auto=format&fit=crop&w=800&q=80",
      tag: "New",
    },
    {
      name: "Home & Kitchen",
      icon: "🏡",
      slug: "home-kitchen",
      image:
        "https://images.unsplash.com/photo-1600585153473-913b4a0f0b0a?auto=format&fit=crop&w=900&q=80",
      tag: "Popular",
    },
    {
      name: "Electronics",
      icon: "📱",
      slug: "electronics",
      image:
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80",
      tag: "Hot",
    },
    {
      name: "Baby Care",
      icon: "🍼",
      slug: "baby-care",
      image:
        "https://images.unsplash.com/photo-1542831371-d531d36971e6?auto=format&fit=crop&w=800&q=80",
      tag: "Best Seller",
    },
  ];

  const filtered = categories.filter((cat) =>
    cat.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="mt-4 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">🛍️ Categories</h2>
      </div>

      <div className="flex space-x-6 overflow-x-auto pb-4">
        {filtered.map((cat, i) => (
          <div
            key={i}
            onClick={() => navigate(`/category/${cat.slug}`)}
            className="min-w-[250px] rounded-2xl bg-white shadow-md cursor-pointer overflow-hidden group transition-all"
          >
            <div className="relative h-48 w-full overflow-hidden">
              <img
                src={cat.image}
                alt={cat.name}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

              <span className="absolute top-3 left-3 text-xs bg-indigo-600 text-white px-3 py-1 rounded-full shadow">
                {cat.tag}
              </span>

              <div className="absolute top-3 right-3 bg-white shadow p-2 rounded-full text-xl">
                {cat.icon}
              </div>
            </div>

            <div className="p-4">
              <h3 className="font-bold text-lg text-gray-800">{cat.name}</h3>
            </div>
          </div>
        ))}
      </div>

      <style>{`div::-webkit-scrollbar { display: none; }`}</style>
    </div>
  );
};

export default CategorySlider;

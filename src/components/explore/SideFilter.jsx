const SideFilter = ({ activeSection, setActiveSection }) => {
  const sections = [
    { key: "DealsOfTheDay", label: "🔥 Deals of the Day" },
    { key: "ShopByBudget", label: "💰 Shop by Budget" },
    { key: "Recommended", label: "✨ Recommended for You" },
  ];

  return (
    <aside className=" hidden md:block sticky top-24 mb-7">
      <div className="bg-white rounded-2xl shadow-lg p-5">
        <h2 className="font-bold text-xl mb-5">Filters</h2>

        <div className="space-y-3">
          {sections.map((sec) => {
            const isActive = activeSection === sec.key;

            return (
              <button
                key={sec.key}
                onClick={() => setActiveSection(sec.key)}
                className={`w-full flex items-center gap-2 px-4 py-3 rounded-xl transition font-medium
                  ${
                    isActive
                      ? "bg-blue-600 text-white shadow-md"
                      : "bg-gray-100 hover:bg-blue-50 hover:text-blue-600"
                  }`}
              >
                {sec.label}
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
};

export default SideFilter;

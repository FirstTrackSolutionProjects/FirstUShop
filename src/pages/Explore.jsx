import React, { useState } from "react";
import SearchBar from "../components/explore/SearchBar";
import PromoBanner from "../components/explore/PromoBanner";
import TrendingSearch from "../components/explore/TrendingSearch";
import CategorySlider from "../components/explore/CategorySlider";
import DealsOfTheDay from "../components/explore/DealsOfTheDay";
import ShopByBudget from "../components/explore/ShopByBudget";
import Recommended from "../components/explore/Recommended";

const Explore = () => {
  const [search, setSearch] = useState("");

  return (
    <div className="min-h-screen bg-gray-100 p-4">

      <SearchBar search={search} setSearch={setSearch} />
      <PromoBanner />
      <CategorySlider search={search} />
      <TrendingSearch search={search} />
    
      <DealsOfTheDay />
      <ShopByBudget />
      <Recommended search={search} />

    </div>
  );
};

export default Explore;

import React from "react";
import SearchBar from "../components/explore/SearchBar";
import PromoBanner from "../components/explore/PromoBanner";
import TrendingSearch from "../components/explore/TrendingSearch";
import CategorySlider from "../components/explore/CategorySlider";
import DealsOfTheDay from "../components/explore/DealsOfTheDay";
import ShopByBudget from "../components/explore/ShopByBudget";
import FeaturedCollection from "../components/explore/FeaturedCollection";
import Recommended from "../components/explore/Recommended";

const Explore = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4">

      <SearchBar />

      <PromoBanner />

      <TrendingSearch />

      <CategorySlider />

      <DealsOfTheDay />

      <ShopByBudget />

      <FeaturedCollection />

      <Recommended />

    </div>
  );
};

export default Explore;

"use client";

import Sidebar from "@/components/sidebar/Sidebar";
import ProductCard from "@/components/ui/cards/products/ProductCard";
import { useShade } from "@/context/useShade";
import { products } from "@/data/products";
import { Product } from "@/types/global_types";
import { useState } from "react";
import { FaSearch, FaFilter } from "react-icons/fa";

export default function Home() {
  const { selectedShade } = useShade();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]); // Increase max price range
  const [showFilters, setShowFilters] = useState(false);

  const allProducts: Product[] = products?.map((product) => ({
    ...product,
    rating: 4.5,
    category: "face",
    isNewArrival: false,
    price: product.price, // Convert price from cents to dollars if needed
  }));

  const filteredProducts = allProducts
    .filter((product) => {
      return (
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedCategory === "all" || product.category === selectedCategory) &&
        product.price >= priceRange[0] &&
        product.price <= priceRange[1] &&
        (!selectedShade ||
          product.shades.some((shade) => shade.name === selectedShade))
      );
    })
    .sort((a, b) =>
      sortOrder === "asc" ? a.price - b.price : b.price - a.price
    );

  const categories = [
    "all",
    ...new Set(allProducts.map((product) => product.category)),
  ];

  return (
    <div className="shop-container">
      <div className="banner-container">
        <div className="banner">
          <picture>
            <source
              srcSet={"/assets/shop_page_mobile.png"}
              media="(max-width: 768px)"
            />
            <img
              src="/assets/Shop Page.png"
              alt="Shop Banner"
              className="banner-image"
            />
          </picture>
        </div>
      </div>
      <div className="max-w-[2000px] mx-auto -mt-6 md:-mt-8 relative z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-sm p-4 mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Our Collection
            </h1>
            <p className="text-gray-600 mt-1">Discover your perfect match</p>
          </div>
          <div className="flex flex-col lg:flex-row min-h-screen">
            {/* Sidebar */}
            <div className="w-full lg:w-80 flex-shrink-0">
              <div className="lg:sticky lg:top-24">
                <div className="lg:hidden flex justify-between items-center p-4 bg-white rounded-lg shadow-sm mb-4">
                  <h2 className="text-xl font-bold">Filters</h2>
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="text-gray-600 hover:text-black"
                  >
                    <FaFilter size={20} />
                  </button>
                </div>
                <div
                  className={`${
                    showFilters ? "block" : "hidden lg:block"
                  } bg-white rounded-lg shadow-sm p-6`}
                >
                  <Sidebar
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    priceRange={priceRange}
                    setPriceRange={setPriceRange}
                    sortOrder={sortOrder}
                    setSortOrder={setSortOrder}
                    categories={categories as string[]}
                    showFilters={showFilters}
                    setShowFilters={setShowFilters}
                  />
                </div>
              </div>
            </div>

            {/* Main content */}
            <div className="flex-grow lg:pl-8 lg:mt-0">
              {/* Search and Results Info */}
              <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                <div className="relative w-full mb-6">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-3 pl-12 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors duration-300"
                  />
                  <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4">
                  {selectedShade && (
                    <div className="flex items-center bg-gray-100 px-4 py-2 rounded-full">
                      <span className="text-sm font-medium">
                        Shade: {selectedShade}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Product grid */}
              {filteredProducts.length === 0 ? (
                <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                  <p className="text-gray-500 text-lg mb-2">
                    No products found
                  </p>
                  <p className="text-gray-400">
                    Try adjusting your filters or search term
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <div key={product.id} className="h-full flex">
                      <div className="w-full flex flex-col">
                        <ProductCard
                          {...product}
                          rating={product.rating || 4.5}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

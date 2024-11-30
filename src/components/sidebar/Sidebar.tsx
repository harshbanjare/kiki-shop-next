import { useShade } from "@/context/useShade";
import React from "react";
import {
  FaSortAmountDown,
  FaSortAmountUp,
  FaTags,
  FaDollarSign,
  FaFilter,
} from "react-icons/fa";

interface SidebarProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  sortOrder: "asc" | "desc";
  setSortOrder: (order: "asc" | "desc") => void;
  categories: string[];
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  selectedCategory,
  setSelectedCategory,
  priceRange,
  setPriceRange,
  sortOrder,
  setSortOrder,
  categories,
  showFilters,
}) => {
  const { selectedShade, setSelectedShade } = useShade();

  const shades = [
    { name: "Feisty", color: "#E5CAB8" },
    { name: "Fierce", color: "#9F7B67" },
    { name: "Mystique", color: "#A58165" },
    { name: "Fearless", color: "#A9794D" },
    { name: "Electric", color: "#A07145" },
    { name: "Majestic", color: "#9F7B61" },
    { name: "Celestial", color: "#975D3E" },
    { name: "Stellar", color: "#8F6B58" },
    { name: "Unstoppable", color: "#916D4C" },
    { name: "Empress", color: "#977157" },
    { name: "Savage", color: "#7B5C49" },
    { name: "Enigma", color: "#683D2C" },
  ];

  return (
    <div className="w-full bg-white p-4">
      <div className={`${showFilters ? "block" : "hidden lg:block"}`}>
        <div className="p-6">
          <h2 className="hidden md:flex text-2xl font-bold mb-6  items-center">
            <FaFilter className="mr-2" />
            Filters
          </h2>
          <div className="mb-6">
            <label className="flex items-center text-sm font-medium text-black mb-2">
              <FaTags className="mr-2 text-gray-600" />
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 bg-white border-b border-gray-300 focus:outline-none focus:border-b-black transition-colors duration-300"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-6">
            <label className="flex items-center text-sm font-medium text-black mb-2">
              <FaDollarSign className="mr-2 text-gray-600" />
              Price Range
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                value={priceRange[0]}
                onChange={(e) =>
                  setPriceRange([Number(e.target.value), priceRange[1]])
                }
                className="w-1/2 px-3 py-2 bg-white border-b border-gray-300 focus:outline-none focus:border-b-black transition-colors duration-300"
              />
              <span>-</span>
              <input
                type="number"
                value={priceRange[1]}
                onChange={(e) =>
                  setPriceRange([priceRange[0], Number(e.target.value)])
                }
                className="w-1/2 px-3 py-2 bg-white border-b border-gray-300 focus:outline-none focus:border-b-black transition-colors duration-300"
              />
            </div>
          </div>
          <div className="mb-6">
            <label className="flex items-center text-sm font-medium text-black mb-2">
              <FaSortAmountDown className="mr-2 text-gray-600" />
              Sort by Price
            </label>
            <button
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
              className="w-full px-3 py-2 bg-gray-200 border border-none focus:outline-none focus:border-black text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-300"
            >
              <span>
                {sortOrder === "asc"
                  ? "Lowest to Highest"
                  : "Highest to Lowest"}
              </span>
              {sortOrder === "asc" ? (
                <FaSortAmountUp className="text-gray-600" />
              ) : (
                <FaSortAmountDown className="text-gray-600" />
              )}
            </button>
          </div>

          {/* Shade Selector */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Shades</h3>
            <div className="grid grid-cols-3 gap-2">
              {shades.map((shade) => (
                <button
                  key={shade.name}
                  onClick={() =>
                    setSelectedShade(
                      shade.name === selectedShade ? "" : shade.name
                    )
                  }
                  className={`w-full aspect-square relative flex items-center justify-center transition-all duration-200 ${
                    selectedShade === shade.name
                      ? "ring-2 ring-black ring-offset-2"
                      : "hover:ring-2 hover:ring-gray-300 hover:ring-offset-2"
                  }`}
                  style={{ backgroundColor: shade.color }}
                  title={shade.name}
                >
                  {selectedShade === shade.name && (
                    <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">
                      ✓
                    </span>
                  )}
                </button>
              ))}
            </div>
            {selectedShade && (
              <p className="mt-2 text-sm text-gray-600">
                Selected: {selectedShade}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

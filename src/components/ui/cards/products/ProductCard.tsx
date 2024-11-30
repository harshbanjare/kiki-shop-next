"use client";

import React from "react";
import { FaStar } from "react-icons/fa";
import { ProductCardProps } from "@/types/global_types";
import { useCart } from "@/context/useCart";
import { useShade } from "@/context/useShade";
import Link from "next/link";

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  rating,
  description,
  images,
  shades,
}) => {
  const { addToCart } = useCart();
  const { selectedShade } = useShade();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const shadeToUse =
      selectedShade && shades.some((shade) => shade.name === selectedShade)
        ? selectedShade
        : shades[0].name;
    addToCart({
      id,
      name,
      price,
      quantity: 1,
      image: images[shadeToUse][0],
      shade: shadeToUse,
    });
  };

  return (
    <Link href={`/product/${id}`} className="block h-full">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden h-full hover:shadow-md transition-shadow duration-300 flex flex-col">
        <div className="relative aspect-square overflow-hidden">
          <img
            src={images[selectedShade || shades[0].name][0]}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute top-4 right-4">
            <span className="bg-black text-white text-xs font-bold px-3 py-1 rounded-full">
              NEW
            </span>
          </div>
        </div>

        <div className="p-6 flex flex-col flex-grow">
          <div className="mb-4 flex-grow">
            <h3 className="text-lg font-semibold mb-2 line-clamp-2 h-12 overflow-hidden">
              {name}
            </h3>
            <p className="text-gray-600 text-sm line-clamp-2 mb-2 h-10 overflow-hidden">
              {description}
            </p>
            <div className="flex items-center gap-2">
              <div className="flex items-center text-yellow-400">
                <FaStar />
                <span className="ml-1 text-sm text-gray-700">
                  {rating.toFixed(1)}
                </span>
              </div>
              <div className="flex -space-x-1">
                {shades.slice(0, 4).map((shade, index) => (
                  <div
                    key={index}
                    className="w-4 h-4 rounded-full border-2 border-white"
                    style={{ backgroundColor: shade.color }}
                  />
                ))}
                {shades.length > 4 && (
                  <div className="w-4 h-4 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center">
                    <span className="text-[8px] text-gray-600 font-medium">
                      +{shades.length - 4}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mt-auto">
            <span className="text-lg font-bold">₹{price}</span>
            <button
              onClick={handleAddToCart}
              className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-300"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;

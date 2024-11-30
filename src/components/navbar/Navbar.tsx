"use client";

import { useState, useEffect } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "@/context/useCart";
import Link from "next/link";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cart } = useCart();

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const nav = document.getElementById("mobile-menu");
      const button = document.getElementById("mobile-menu-button");
      if (
        nav &&
        !nav.contains(event.target as Node) &&
        button &&
        !button.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="sticky top-0 left-0 w-full flex flex-col bg-zinc-950 text-white z-50">
      <div className="h-[1px] w-full bg-gradient-to-r from-zinc-800 via-zinc-500 to-zinc-800"></div>

      {/* Main navbar content */}
      <div className="flex justify-between items-center w-full relative backdrop-blur-sm">
        <div className="flex items-center justify-between w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-3 lg:py-4">
          {/* Logo section */}
          <div className="flex items-center flex-shrink-0">
            <Link
              href="https://kikibeauty.in"
              className="flex items-center group"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <img
                src="/assets/kiki-white.png"
                alt="KIK Logo"
                className="h-8 sm:h-10 md:h-12 lg:h-14 transition-all duration-300 group-hover:scale-105 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation - removed Bestsellers */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-12 text-sm xl:text-base font-medium flex-grow justify-center max-w-3xl">
            <Link
              href="/"
              className="hover:text-white text-zinc-300 transition-all duration-300 py-2 relative group whitespace-nowrap"
            >
              <span className="relative z-10">Shop</span>
              <span className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-zinc-600 to-zinc-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
            </Link>
            <Link
              href="/shade-finder"
              className="hover:text-white text-zinc-300 transition-all duration-300 py-2 relative group whitespace-nowrap"
            >
              <span className="relative z-10">Find your Shade</span>
              <span className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-zinc-600 to-zinc-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
            </Link>
            <Link
              href="/blogs"
              className="hover:text-white text-zinc-300 transition-all duration-300 py-2 relative group"
            >
              <span className="relative z-10">Blogs</span>
              <span className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-zinc-600 to-zinc-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
            </Link>
          </div>

          {/* Desktop Action Buttons - unchanged */}
          <div className="hidden lg:flex items-center space-x-3 xl:space-x-4 flex-shrink-0">
            <Link
              href="/our-story"
              className="px-4 xl:px-6 py-1.5 xl:py-2 bg-zinc-950 text-zinc-300 border border-zinc-700 rounded-full text-sm font-medium hover:bg-zinc-900 hover:text-white transition-all duration-300 transform hover:scale-105 hover:border-zinc-500 whitespace-nowrap"
            >
              Our Story
            </Link>
            <Link
              href="/cart"
              className="px-4 xl:px-6 py-1.5 xl:py-2 bg-white text-zinc-950 border border-zinc-200 rounded-full text-sm font-medium hover:bg-zinc-100 transition-all duration-300 transform hover:scale-105 flex items-center group whitespace-nowrap"
            >
              <FaShoppingCart className="mr-2 group-hover:rotate-12 transition-transform duration-300" />
              <span className="relative">
                Cart
                {cart.length > 0 && (
                  <span className="absolute -top-3 -right-4 bg-zinc-950 text-white border border-zinc-700 rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {cart.length}
                  </span>
                )}
              </span>
            </Link>
          </div>

          {/* Mobile Cart and Menu Buttons */}
          <div className="lg:hidden flex items-center space-x-2">
            {/* Mobile Cart Button */}
            <Link
              href="/cart"
              className="p-2 text-zinc-300 hover:text-white transition-colors duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <div className="relative">
                <FaShoppingCart className="w-6 h-6" />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-white text-zinc-950 rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium">
                    {cart.length}
                  </span>
                )}
              </div>
            </Link>

            {/* Mobile Menu Button */}
            <button
              id="mobile-menu-button"
              onClick={toggleMobileMenu}
              className="p-2 text-zinc-400 hover:text-white focus:outline-none hover:bg-zinc-900/50 rounded-lg transition-colors duration-300"
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              <div className="w-6 h-6 flex flex-col justify-center space-y-1.5 relative">
                <span
                  className={`block h-0.5 w-6 bg-current transform transition-all duration-300 ${
                    isMobileMenuOpen ? "rotate-45 translate-y-2" : ""
                  }`}
                ></span>
                <span
                  className={`block h-0.5 w-6 bg-current transform transition-all duration-300 ${
                    isMobileMenuOpen ? "opacity-0" : ""
                  }`}
                ></span>
                <span
                  className={`block h-0.5 w-6 bg-current transform transition-all duration-300 ${
                    isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
                  }`}
                ></span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu - removed Bestsellers */}
      <div
        id="mobile-menu"
        className={`lg:hidden fixed right-0 top-[57px] h-[calc(100vh-57px)] w-full sm:w-80 bg-zinc-950 transform transition-all duration-300 ease-in-out z-50 overflow-y-auto ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="px-4 py-4 space-y-2">
          {[
            { to: "/", text: "Shop" },
            { to: "/shade-finder", text: "Find your Shade" },
            { to: "/blogs", text: "Blogs" },
            { to: "/our-story", text: "Our Story" },
          ].map((link) => (
            <Link
              key={link.to}
              href={link.to}
              className="block px-4 py-3 text-base font-medium text-zinc-300 hover:bg-zinc-900/50 rounded-lg transition-all duration-300 ease-in-out group"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="flex items-center">
                <span className="h-[2px] w-4 bg-zinc-600 mr-3 group-hover:w-6 transition-all duration-300"></span>
                {link.text}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

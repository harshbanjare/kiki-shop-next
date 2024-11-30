"use client";

import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaCheck } from "react-icons/fa";
import { motion } from "framer-motion";
import { useShade } from "@/context/useShade";
import { QuizOption } from "@/types/global_types";
import { quizData } from "@/data/temp";
import { shades } from "@/data/shades";
import Link from "next/link";

const ShadeFinder: React.FC = () => {
  const { selectedShade, setSelectedShade } = useShade();
  const [currentLevel, setCurrentLevel] = useState(1);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [currentOptions, setCurrentOptions] = useState<QuizOption[]>(
    quizData.start
  );
  const [isQuizStarted, setIsQuizStarted] = useState(false);

  // Add useEffect to reset quiz on mount
  useEffect(() => {
    resetQuiz();
  }, []); // Empty dependency array means this runs once on mount

  const shadeMapping: { [key: string]: string } = {
    "L3-1": shades[0].name,
    "L3-2": shades[1].name,
    "L3-3": shades[2].name,
    "L3-4": shades[3].name,
    "L3-5": shades[4].name,
    "L3-6": shades[5].name,
    "L3-7": shades[6].name,
    "L3-8": shades[7].name,
    "L3-9": shades[8].name,
    "L3-10": shades[9].name,
    "L3-11": shades[10].name,
    "L3-12": shades[11].name,
  };

  const handleImageSelect = (selected: QuizOption) => {
    const newSelectedImages = [...selectedImages, selected.name];
    setSelectedImages(newSelectedImages);

    if (currentLevel === 3) {
      // Store the shade result first
      const mappedShade = shadeMapping[selected.name];
      const foundShade = shades.find((shade) => shade.name === mappedShade);

      if (foundShade) {
        // Don't set selectedShade yet, just store it temporarily
        localStorage.setItem("tempSelectedShade", foundShade.name);
      }

      // Show undertone options
      const container = document.querySelector(".options-grid");
      if (container) {
        container.classList.add("fade-out");
      }

      setTimeout(() => {
        setCurrentOptions(quizData.undertones);
        setCurrentLevel(4);
      }, 300);
    } else if (currentLevel === 4) {
      // After undertone selection, show the stored result
      const storedShade = localStorage.getItem("tempSelectedShade");
      if (storedShade) {
        setSelectedShade(storedShade);
        localStorage.removeItem("tempSelectedShade"); // Clean up
      }
    } else if (selected.nextLevel) {
      // Handle levels 1 and 2
      const container = document.querySelector(".options-grid");
      if (container) {
        container.classList.add("fade-out");
      }

      setTimeout(() => {
        setCurrentOptions(selected.nextLevel ?? []);
        setCurrentLevel(currentLevel + 1);
      }, 300);
    }
  };

  const startQuiz = () => {
    setIsQuizStarted(true);
  };

  const resetQuiz = () => {
    setCurrentLevel(1);
    setSelectedImages([]);
    setCurrentOptions(quizData.start);
    setSelectedShade("");
    setIsQuizStarted(false); // Reset to show header
  };

  const getQuizTitle = (level: number) => {
    switch (level) {
      case 1:
        return "We've got 12 shades, let's find yours. Which of these is closest to your skin tone?";
      case 2:
        return "Love it. Let's get a bit more precise. Which of these most resembles your skin tone?";
      case 3:
        return "You're doing great. Our last shade-centric question for you. What's your best match here?";
      case 4:
        return "Which one of these is your undertone?";
      default:
        return "Select Your Best Match";
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        {!isQuizStarted && !selectedShade && (
          <div className="relative">
            {/* Background Pattern */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-4 -right-4 w-96 h-96 bg-gradient-to-br from-gray-50 to-white rounded-full opacity-60 blur-3xl" />
              <div className="absolute -bottom-4 -left-4 w-96 h-96 bg-gradient-to-tr from-gray-50 to-white rounded-full opacity-60 blur-3xl" />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[length:24px_24px]" />
              </div>
            </div>

            {/* Header Content */}
            <div className="relative text-center mb-16 max-w-3xl mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                {/* Top Label */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mb-8"
                >
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full text-xs font-medium text-gray-600 tracking-wide shadow-md">
                    <span className="w-1.5 h-1.5 bg-black rounded-full animate-pulse" />
                    KIKI BEAUTY • SHADE FINDER • PERFECT MATCH
                  </span>
                </motion.div>

                {/* Main Title */}
                <div className="relative mb-6">
                  <motion.h1
                    className="text-5xl md:text-6xl font-bold text-gray-900 tracking-tight"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <span className="block mb-1 text-xl md:text-2xl font-medium text-gray-500">
                      Discover
                    </span>
                    <span className="block mb-2">Your Perfect</span>
                    <span className="relative inline-block">
                      Skin Shade
                      <motion.div
                        className="absolute -bottom-2 left-0 w-full h-1 bg-black"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 0.8, duration: 0.8 }}
                      />
                    </span>
                  </motion.h1>
                </div>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="text-lg md:text-xl text-gray-600 mb-10 leading-relaxed max-w-2xl mx-auto"
                >
                  Experience our revolutionary shade-matching technology for
                  your perfect shade match.
                </motion.p>

                {/* Stats Grid */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mb-10"
                >
                  {[
                    { number: "3", label: "Steps", sublabel: "Quick & Easy" },
                    {
                      number: "12",
                      label: "Shades",
                      sublabel: "Perfect Match",
                    },
                    { number: "100%", label: "Match", sublabel: "Guaranteed" },
                  ].map((stat, index) => (
                    <motion.div
                      key={index}
                      className="relative p-4 rounded-xl bg-white group hover:bg-black transition-all duration-500 shadow-md hover:shadow-xl"
                      whileHover={{ y: -3 }}
                    >
                      <div className="relative">
                        <span className="block text-3xl font-bold mb-1 group-hover:text-white transition-colors duration-300">
                          {stat.number}
                        </span>
                        <span className="block text-xs font-semibold uppercase tracking-wider text-gray-900 group-hover:text-white transition-colors duration-300">
                          {stat.label}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Start Quiz Button */}
                <motion.button
                  onClick={startQuiz}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 }}
                  className="group relative inline-flex items-center justify-center"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative inline-flex items-center gap-3 bg-black text-white px-10 py-4 rounded-full text-base font-medium transition-all duration-300">
                    Start Your Journey
                    <motion.svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      initial={{ x: 0 }}
                      animate={{ x: [0, 3, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </motion.svg>
                  </span>
                </motion.button>
              </motion.div>
            </div>
          </div>
        )}

        {/* Quiz Section */}
        {isQuizStarted && !selectedShade && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -40, scale: 0.95 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="max-w-5xl mx-auto"
          >
            {/* Quiz Header */}
            <div className="text-center mb-16">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white text-xs 
                  font-medium tracking-wide rounded-full mb-8"
              >
                SHADE FINDER
              </motion.span>

              {/* Progress Section */}
              <motion.div
                className="max-w-sm mx-auto mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-medium text-gray-500">
                    Step {currentLevel} of 4
                  </span>
                  <span className="text-sm font-medium text-gray-900">
                    {Math.round(((currentLevel - 1) / 3) * 100)}% Complete
                  </span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-black rounded-full origin-left"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: (currentLevel - 1) / 3 }}
                    transition={{ duration: 0.7, ease: "easeOut", delay: 0.4 }}
                  />
                </div>
              </motion.div>

              {/* Quiz Title */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-3">
                  {getQuizTitle(currentLevel)}
                </h2>
                <p className="text-gray-600 max-w-md mx-auto">
                  Choose the shade that most closely matches your natural skin
                  tone
                </p>
              </motion.div>
            </div>

            {/* Options Grid */}
            <motion.div
              className={`options-grid grid ${
                currentLevel === 4
                  ? "grid-cols-1 gap-6 max-w-2xl mx-auto"
                  : "grid-cols-1 sm:grid-cols-3 gap-12"
              } mb-16 px-4`}
              key={currentLevel}
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.15,
                    delayChildren: 0.3,
                  },
                },
              }}
              initial="hidden"
              animate="show"
            >
              {currentOptions.map((option: QuizOption, index: number) => (
                <motion.button
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0 },
                  }}
                  onClick={() => handleImageSelect(option)}
                  className={`group relative ${
                    currentLevel === 4
                      ? "bg-white p-6 rounded-xl border border-gray-200 hover:border-black transition-all duration-300"
                      : ""
                  }`}
                  whileHover={currentLevel === 4 ? { y: -4 } : { y: -8 }}
                  transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                >
                  {currentLevel === 4 ? (
                    // Undertone option layout
                    <div className="text-left">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {option.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {option.description}
                      </p>
                      <div className="mt-4 h-0.5 w-0 bg-black group-hover:w-full transition-all duration-300" />
                    </div>
                  ) : (
                    // Regular image-based option layout
                    <>
                      {/* Existing image option layout code */}
                      <div
                        className="absolute -inset-4 rounded-full bg-black/5 opacity-0 
                        group-hover:opacity-100 transition-all duration-500 blur-xl"
                      />
                      <div className="relative">
                        <div
                          className="w-56 h-56 mx-auto rounded-full overflow-hidden bg-gray-50 
                          shadow-md group-hover:shadow-xl transition-all duration-500"
                        >
                          <div
                            className="relative h-full transform transition-transform duration-500 
                            ease-out group-hover:scale-110"
                          >
                            <img
                              src={option.img}
                              alt={option.name}
                              className="w-full h-full object-cover"
                            />
                            <div
                              className="absolute inset-0 bg-gradient-to-b from-black/0 to-black/50 
                              opacity-0 group-hover:opacity-100 transition-all duration-500"
                            />
                          </div>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <motion.div
                              className="w-3 h-3 bg-white rounded-full transform scale-0 opacity-0 
                              group-hover:scale-100 group-hover:opacity-100 transition-all duration-300"
                            />
                          </div>
                        </div>
                        <div
                          className="absolute -inset-2 rounded-full border border-black/0 
                          group-hover:border-black/20 transform scale-90 group-hover:scale-100 
                          opacity-0 group-hover:opacity-100 transition-all duration-500"
                        />
                      </div>
                      <div
                        className="absolute -inset-8 rounded-full opacity-0 group-hover:opacity-100 
                        transition-opacity duration-500"
                      >
                        <div
                          className="absolute inset-0 rounded-full bg-gradient-to-b from-black/5 
                          to-transparent blur-2xl transform scale-95 group-hover:scale-100 
                          transition-transform duration-500"
                        />
                      </div>
                    </>
                  )}
                </motion.button>
              ))}
            </motion.div>

            {/* Back Button */}
            {currentLevel > 1 && (
              <motion.button
                onClick={resetQuiz}
                className="flex items-center gap-2 text-gray-500 hover:text-black mx-auto 
                  group transition-colors duration-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <FaArrowLeft
                  className="w-4 h-4 transform group-hover:-translate-x-1 
                  transition-transform duration-300"
                />
                <span className="font-medium">Start Over</span>
              </motion.button>
            )}
          </motion.div>
        )}

        {/* Results Section */}
        {selectedShade && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto bg-gradient-to-br from-white to-gray-50 p-12 rounded-3xl shadow-xl border border-gray-200"
          >
            <div className="flex flex-col md:flex-row items-center gap-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="w-full md:w-1/2"
              >
                <div className="h-40 rounded-2xl overflow-hidden shadow-2xl bg-gray-50 relative group">
                  <img
                    src={`/assets/${
                      shades.find((shade) => shade.name === selectedShade)?.img
                    }`}
                    alt={selectedShade}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <p className="mt-4 text-sm text-gray-600 font-medium">
                  Shade Strip Reference
                </p>
              </motion.div>

              <div className="w-full md:w-1/2 text-left">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-20 h-20 bg-gradient-to-br from-black to-gray-800 rounded-full flex items-center justify-center mb-6 shadow-lg"
                >
                  <FaCheck className="w-10 h-10 text-white" />
                </motion.div>
                <h2 className="text-4xl font-bold mb-4 text-gray-900 leading-tight">
                  Perfect Match Found!
                </h2>
                <p className="text-2xl mb-8 text-gray-700">
                  Your recommended shade is{" "}
                  <span className="font-bold text-black relative inline-block">
                    {selectedShade}
                    <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-black to-gray-600 rounded-full" />
                  </span>
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/product/1"
                    className="bg-gradient-to-r from-black to-gray-800 text-white px-8 py-4 rounded-xl font-medium hover:from-gray-900 hover:to-black transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg text-center flex-1"
                  >
                    View Product
                  </Link>
                  <button
                    onClick={resetQuiz}
                    className="border-2 border-black px-8 py-4 rounded-xl font-medium hover:bg-black hover:text-white transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg text-center flex-1"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ShadeFinder;

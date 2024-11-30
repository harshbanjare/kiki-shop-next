"use client";

import React, { useState, useRef, useEffect } from "react";
import { FaPlus, FaMinus, FaCheck, FaPlay, FaPause } from "react-icons/fa";
import { Dialog } from "@headlessui/react";
import {
  PinCodeResponse,
  SampleRequestForm,
  VideoGallery,
} from "@/types/global_types";
import { useParams } from "next/navigation";
import { products } from "@/data/products";
import { useCart } from "@/context/useCart";
import { useShade } from "@/context/useShade";
import Link from "next/link";

// Add this sanitization function
const sanitizeInput = (input: string): string => {
  return input.replace(/[<>]/g, "").trim();
};

// Add these functions before the component
const fetchPinCodeDetails = async (
  pinCode: string
): Promise<PinCodeResponse> => {
  const response = await fetch(
    `https://api.postalpincode.in/pincode/${pinCode}`
  );
  const data = await response.json();
  return data[0];
};

// Add this helper function near the top of the file
const isVideo = (url: string) => url.toLowerCase().endsWith(".mp4");

// Update the VideoCard component with an enhanced design
const VideoCard = ({
  video,
  onClick,
}: {
  video: VideoGallery;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className="group relative w-full overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-gray-200"
  >
    <div className="aspect-video relative overflow-hidden rounded-t-2xl">
      <img
        src={video.thumbnail}
        alt={video.title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      {/* Enhanced overlay with multiple gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-300" />

      {/* Animated play button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-20 h-20 rounded-full bg-white/95 flex items-center justify-center transform scale-75 translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 transition-all duration-500 shadow-xl">
          <FaPlay className="text-black ml-1.5 text-2xl" />
        </div>
      </div>

      {/* Duration badge */}
      <div className="absolute bottom-3 right-3 px-2.5 py-1 bg-black/80 rounded-md text-white text-xs font-medium backdrop-blur-sm">
        4:32
      </div>
    </div>

    {/* Enhanced video info section */}
    <div className="p-5">
      <h3 className="text-left font-semibold text-gray-900 line-clamp-2 group-hover:text-black transition-colors mb-2">
        {video.title}
      </h3>
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500 flex items-center group-hover:text-black/70 transition-colors">
          <FaPlay className="w-3 h-3 mr-2" />
          Watch Tutorial
        </p>
        <span className="text-xs text-gray-400 group-hover:text-black/50 transition-colors">
          Beauty Tips
        </span>
      </div>
    </div>
  </button>
);

// Update the VideoPlayer component with better hover states and loading
const VideoPlayer = ({ src }: { src: string }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        setIsPlaying(false);
      });
    }
  }, [src]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
  };

  const handleLoadedData = () => {
    setIsLoading(false);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        setIsPlaying(false);
      });
    }
  };

  return (
    <div
      className="relative w-full h-full group cursor-pointer"
      onClick={togglePlay}
    >
      <video
        ref={videoRef}
        src={src}
        className="w-full h-full object-cover"
        playsInline
        onEnded={handleVideoEnd}
        onLoadedData={handleLoadedData}
        loop
        muted
      />

      {/* Loading spinner */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/10">
          <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin" />
        </div>
      )}

      {/* Play/Pause button */}
      <div
        className={`
          absolute inset-0 flex items-center justify-center
          ${isPlaying ? "bg-black/0" : "bg-black/20"}
          transition-colors duration-300
          group-hover:bg-black/20
        `}
      >
        <div
          className={`
            transform transition-all duration-300
            ${isPlaying ? "opacity-0 scale-90" : "opacity-100 scale-100"}
            group-hover:opacity-100 group-hover:scale-100
            w-20 h-20 rounded-full bg-white/90 
            flex items-center justify-center 
            shadow-xl backdrop-blur-sm
          `}
        >
          {isPlaying ? (
            <FaPause className="text-black text-2xl" />
          ) : (
            <FaPlay className="text-black text-2xl ml-1.5" />
          )}
        </div>
      </div>
    </div>
  );
};

const ProductDetails = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));
  const { addToCart } = useCart();
  const { selectedShade, setSelectedShade } = useShade();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState("description");
  const [isSampleModalOpen, setIsSampleModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [requestError, setRequestError] = useState<string | null>(null);
  const [formData, setFormData] = useState<SampleRequestForm>({
    name: "",
    email: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zip: "",
  });
  const [isLoadingPinCode, setIsLoadingPinCode] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<VideoGallery | null>(null);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Product not found</p>
      </div>
    );
  }

  useEffect(() => {
    if (!selectedShade) {
      setSelectedShade(Object.keys(product.images)[0]);
    }
  }, [product, selectedShade, setSelectedShade]);

  const handleAddToCart = () => {
    const currentShade = selectedShade || Object.keys(product.images)[0];
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity,
      image: product.images[currentShade][0],
      shade: currentShade,
    });
  };

  // Add this function after existing handlers
  const handleSampleRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setRequestError(null);

    // Basic validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[6-9]\d{9}$/;

    if (!emailRegex.test(formData.email)) {
      setRequestError("Please enter a valid email address");
      setIsSubmitting(false);
      return;
    }

    if (!phoneRegex.test(formData.phone)) {
      setRequestError("Please enter a valid Indian phone number");
      setIsSubmitting(false);
      return;
    }

    // Combine address fields
    const fullAddress = `${formData.addressLine1}, ${
      formData.addressLine2 ? formData.addressLine2 + ", " : ""
    }${formData.city}, ${formData.state}, ${formData.zip}, India`;

    try {
      const response = await fetch(
        "https://api-sac6b737pq-uc.a.run.app/freeSample",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: "+91" + formData.phone,
            address: fullAddress,
            product: product.name,
            shade: selectedShade || Object.keys(product.images)[0],
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      // Success
      setIsSampleModalOpen(false);
      setShowSuccessModal(true);

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        zip: "",
      });
    } catch (error) {
      setRequestError(
        error instanceof Error ? error.message : "An error occurred"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Add this function to handle input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    let value = e.target.value;

    // Sanitize all inputs
    value = sanitizeInput(value);

    // Special handling for phone number
    if (e.target.name === "phone") {
      value = value.replace(/\D/g, "").slice(0, 10);
    }

    setFormData((prev) => ({
      ...prev,
      [e.target.name]: value,
    }));
  };

  // Add this function to handle PIN code changes
  const handlePinCodeChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const pinCode = e.target.value.replace(/\D/g, "").slice(0, 6);

    setFormData((prev) => ({
      ...prev,
      zip: pinCode,
    }));

    if (pinCode.length === 6) {
      setIsLoadingPinCode(true);
      try {
        const data = await fetchPinCodeDetails(pinCode);
        if (
          data.Status === "Success" &&
          data.PostOffice &&
          data.PostOffice.length > 0
        ) {
          const { State, District } = data.PostOffice[0];
          setFormData((prev) => ({
            ...prev,
            city: District,
            state: State,
          }));
        }
      } catch (error) {
        console.error("Error fetching PIN code details:", error);
      } finally {
        setIsLoadingPinCode(false);
      }
    }
  };

  // Add type for shade from your shades type
  interface Shade {
    name: string;
    color: string;
    img: string;
  }

  const renderShades = (shade: Shade) => (
    <button
      key={shade.name}
      onClick={() => setSelectedShade(shade.name)}
      className={`w-8 h-8 rounded-full transition-all ${
        selectedShade === shade.name
          ? "ring-2 ring-black"
          : "hover:ring-1 hover:ring-gray-300"
      }`}
      style={{ backgroundColor: shade.color }}
      title={shade.name}
    >
      {selectedShade === shade.name && (
        <FaCheck className="m-auto text-white text-xs" />
      )}
    </button>
  );

  const renderHowToUse = (step: string, index: number) => {
    if (index === 0) {
      return (
        <h3 key={index} className="text-xl font-bold text-gray-900 mb-6">
          {step}
        </h3>
      );
    }
    return (
      <div key={index} className="flex items-start gap-4 mb-6">
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-semibold">
          {index}
        </div>
        <div className="flex-1">
          <p className="text-gray-700 leading-relaxed">
            {step.replace(/Step \d: /, "")}
          </p>
        </div>
      </div>
    );
  };

  // // Move renderImages inside the component
  // const renderImages = (media: string, index: number) => (
  //   <button
  //     key={index}
  //     onClick={() => setSelectedImage(index)}
  //     className={`
  //       aspect-square rounded-lg overflow-hidden
  //       border-2 transition-all duration-300
  //       ${
  //         selectedImage === index
  //           ? "border-black ring-2 ring-black ring-offset-2"
  //           : "border-transparent hover:border-gray-300"
  //       }
  //     `}
  //   >
  //     {isVideo(media) ? (
  //       <div className="relative w-full h-full group">
  //         <video
  //           src={media}
  //           className="w-full h-full object-cover"
  //           muted
  //           playsInline
  //         />
  //         <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
  //           <div className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center">
  //             <FaPlay className="text-black text-xs ml-0.5" />
  //           </div>
  //         </div>
  //       </div>
  //     ) : (
  //       <img
  //         src={media}
  //         alt={`${product.name} view ${index + 1}`}
  //         className="w-full h-full object-cover"
  //       />
  //     )}
  //   </button>
  // );

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Product Info Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 lg:p-8">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                {selectedShade &&
                  (isVideo(product.images[selectedShade][selectedImage]) ? (
                    <VideoPlayer
                      src={product.images[selectedShade][selectedImage]}
                    />
                  ) : (
                    <img
                      src={product.images[selectedShade][selectedImage]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ))}
              </div>
              <div className="grid grid-cols-4 gap-4">
                {selectedShade &&
                  product.images[selectedShade].map((media, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`
                      aspect-square rounded-lg overflow-hidden 
                      border-2 transition-all duration-300
                      ${
                        selectedImage === index
                          ? "border-black ring-2 ring-black ring-offset-2"
                          : "border-transparent hover:border-gray-300"
                      }
                    `}
                    >
                      {isVideo(media) ? (
                        <div className="relative w-full h-full group">
                          <video
                            src={media}
                            className="w-full h-full object-cover"
                            muted
                            playsInline
                          />
                          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                            <div className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center">
                              <FaPlay className="text-black text-xs ml-0.5" />
                            </div>
                          </div>
                        </div>
                      ) : (
                        <img
                          src={media}
                          alt={`${product.name} view ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </button>
                  ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                <p className="text-gray-600 text-lg mb-4">
                  {product.shortDescription}
                </p>
                <div className="flex items-center gap-4">
                  <span className="text-2xl font-bold">
                    ₹{product.price.toFixed(2)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-lg text-gray-500 line-through">
                      ₹{product.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>
              </div>

              {/* Shade Selection */}
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 transition-all hover:shadow-md">
                <h3 className="text-lg font-semibold mb-3">Shade Selection</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {product.shades.map(renderShades)}
                </div>
                {selectedShade && (
                  <div className="w-full animate-fadeIn">
                    <div className="bg-gray-100 p-4 rounded-md">
                      <img
                        src={`/assets${
                          product.shades.find(
                            (s: Shade) => s.name === selectedShade
                          )?.img
                        }`}
                        alt={`${selectedShade} preview`}
                        className="w-full h-24 object-cover rounded-md mb-4"
                      />
                      <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-600">Selected Shade</p>
                        <p className="text-lg font-semibold">{selectedShade}</p>
                      </div>
                    </div>
                  </div>
                )}
                <Link
                  href="/shade-finder"
                  className="mt-4 text-sm text-gray-600 hover:text-black flex items-center justify-center gap-2 py-3 border-t border-gray-100"
                >
                  Not sure about your shade? Try our Shade Finder
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-900">
                  Quantity
                </span>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-gray-100"
                  >
                    <FaMinus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-2 text-center min-w-[3rem]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-gray-100"
                  >
                    <FaPlus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <div className="space-y-4">
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-black text-white py-4 px-8 rounded-lg hover:bg-gray-800 transition-colors duration-300"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => setIsSampleModalOpen(true)}
                  className="w-full bg-white text-black border-2 border-black py-4 px-8 rounded-lg hover:bg-gray-100 transition-colors duration-300"
                >
                  Request Free Sample
                </button>

                {/* Product Badges */}
                <div className="pt-6 border-t border-gray-100">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="flex flex-col items-center text-center">
                      <img
                        src="/assets/icons/cruelty-free.png"
                        alt="Cruelty Free"
                        className="w-10 h-10 mb-2"
                      />
                      <span className="text-xs font-medium text-gray-600">
                        Cruelty Free
                      </span>
                    </div>
                    <div className="flex flex-col items-center text-center">
                      <img
                        src="/assets/icons/paraben-free.png"
                        alt="Paraben Free"
                        className="w-10 h-10 mb-2"
                      />
                      <span className="text-xs font-medium text-gray-600">
                        Paraben Free
                      </span>
                    </div>
                    <div className="flex flex-col items-center text-center">
                      <img
                        src="/assets/icons/oil-free.png"
                        alt="Oil & Mineral Free"
                        className="w-10 h-10 mb-2"
                      />
                      <span className="text-xs font-medium text-gray-600">
                        Oil & Mineral Free
                      </span>
                    </div>
                    <div className="flex flex-col items-center text-center">
                      <img
                        src="/assets/icons/vegan.png"
                        alt="Vegan"
                        className="w-10 h-10 mb-2"
                      />
                      <span className="text-xs font-medium text-gray-600">
                        Vegan
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details Tabs */}
          <div className="border-t border-gray-200">
            <div className="max-w-7xl mx-auto">
              {/* Tabs Navigation */}
              <div className="border-b border-gray-200">
                <div className="flex justify-center space-x-12">
                  {(["description", "ingredients", "how To Use"] as const).map(
                    (tab) => (
                      <button
                        key={tab}
                        onClick={() =>
                          setActiveTab(
                            tab.replace(/\s+/g, "") as
                              | "description"
                              | "ingredients"
                              | "howToUse"
                          )
                        }
                        className={`relative py-6 text-sm font-medium transition-colors duration-200 ${
                          activeTab === tab.replace(/\s+/g, "")
                            ? "text-black"
                            : "text-gray-500 hover:text-gray-800"
                        }`}
                      >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        {activeTab === tab.replace(/\s+/g, "") && (
                          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black" />
                        )}
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* Tabs Content */}
              <div className="py-12 px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                  {activeTab === "description" && (
                    <div
                      className="prose prose-sm sm:prose lg:prose-lg max-w-none animate-fadeIn"
                      dangerouslySetInnerHTML={{
                        __html: product.details.description,
                      }}
                    />
                  )}
                  {activeTab === "ingredients" && (
                    <div
                      className="prose prose-sm sm:prose lg:prose-lg max-w-none prose-headings:font-bold prose-h3:text-xl prose-p:text-gray-600 animate-fadeIn"
                      dangerouslySetInnerHTML={{
                        __html: product.details.ingredients,
                      }}
                    />
                  )}
                  {activeTab === "howToUse" && (
                    <div className="space-y-6 animate-fadeIn">
                      <div className="bg-gray-50 rounded-xl p-8">
                        {product.details.howToUse.map(renderHowToUse)}
                        <div className="mt-8 p-4 bg-gray-100 rounded-lg">
                          <p className="text-sm text-gray-600 italic">
                            Pro tip: For best results, allow each layer to set
                            for a few seconds before building up coverage in
                            areas where needed.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add the modal at the end of the component, before the closing div */}
      <Dialog
        open={isSampleModalOpen}
        onClose={() => setIsSampleModalOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-xl w-full bg-white rounded-xl p-8 shadow-xl overflow-y-auto max-h-[90vh]">
            <div className="flex justify-between items-center mb-8">
              <div>
                <Dialog.Title className="text-2xl font-bold text-gray-900">
                  Request Free Sample
                </Dialog.Title>
                <p className="mt-2 text-gray-600">
                  Try {product.name} before you buy. Fill in your details below.
                </p>
              </div>
              <button
                onClick={() => setIsSampleModalOpen(false)}
                className="text-gray-400 hover:text-gray-500 p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Add product preview */}
            <div className="mb-8 p-4 bg-gray-50 rounded-lg flex items-center gap-4">
              <img
                src={
                  product.images[
                    selectedShade || Object.keys(product.images)[0]
                  ][0]
                }
                alt={product.name}
                className="w-16 h-16 object-cover rounded-md"
              />
              <div>
                <h3 className="font-medium text-gray-900">{product.name}</h3>
                <p className="text-sm text-gray-600">
                  Shade: {selectedShade || Object.keys(product.images)[0]}
                </p>
              </div>
            </div>

            <form onSubmit={handleSampleRequest} className="space-y-6">
              {requestError && (
                <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm flex items-center gap-2">
                  <svg
                    className="w-5 h-5 flex-shrink-0"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {requestError}
                </div>
              )}

              {/* Personal Information Section */}
              <div className="space-y-6">
                <div className="border-b border-gray-200 pb-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-colors"
                        placeholder="Your full name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-colors"
                        placeholder="your@email.com"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <div className="flex">
                        <span className="inline-flex items-center px-4 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm font-medium">
                          +91
                        </span>
                        <input
                          type="tel"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="10-digit mobile number"
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-black focus:border-black transition-colors"
                          maxLength={10}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Shipping Address Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Shipping Address
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        PIN Code
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="zip"
                          required
                          value={formData.zip}
                          onChange={handlePinCodeChange}
                          placeholder="Enter 6-digit PIN code"
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-colors"
                          maxLength={6}
                        />
                        {isLoadingPinCode && (
                          <div className="absolute right-3 top-1/2 -translate-y-1/2">
                            <svg
                              className="animate-spin h-5 w-5 text-gray-400"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                                fill="none"
                              />
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              />
                            </svg>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Address Line 1
                      </label>
                      <input
                        type="text"
                        name="addressLine1"
                        required
                        value={formData.addressLine1}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-colors"
                        placeholder="House/Flat No., Building Name, Street"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Address Line 2
                      </label>
                      <input
                        type="text"
                        name="addressLine2"
                        value={formData.addressLine2}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-colors"
                        placeholder="Area, Landmark (Optional)"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        required
                        value={formData.city}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed"
                        readOnly
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        State
                      </label>
                      <input
                        type="text"
                        name="state"
                        required
                        value={formData.state}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed"
                        readOnly
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-200">
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setIsSampleModalOpen(false)}
                    className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-300 font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 px-4 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg
                          className="animate-spin h-5 w-5"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Submitting...
                      </span>
                    ) : (
                      "Submit Request"
                    )}
                  </button>
                </div>
                <p className="mt-4 text-sm text-gray-500 text-center">
                  By submitting this form, you agree to receive a free product
                  sample from us.
                </p>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
      <Dialog
        open={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-md w-full bg-white rounded-xl p-6 shadow-xl">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                <svg
                  className="h-6 w-6 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <Dialog.Title className="text-lg font-medium text-gray-900 mb-2">
                Sample Request Submitted!
              </Dialog.Title>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  We've received your request for {product.name}. Check your
                  email for further updates about your sample.
                </p>
              </div>
              <div className="mt-6">
                <button
                  type="button"
                  onClick={() => setShowSuccessModal(false)}
                  className="w-full inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-black rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                >
                  Got it, thanks!
                </button>
              </div>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
      <Dialog
        open={selectedVideo !== null}
        onClose={() => setSelectedVideo(null)}
        className="relative z-50"
      >
        <div
          className="fixed inset-0 bg-black/95 backdrop-blur-md"
          aria-hidden="true"
        />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-5xl w-full">
            <div className="relative">
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute -top-14 right-0 text-white/80 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10 group"
              >
                <span className="absolute right-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-sm">
                  Close video
                </span>
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10">
                <iframe
                  src={`https://www.youtube.com/embed/${selectedVideo?.videoId}?autoplay=1&rel=0&modestbranding=1`}
                  title={selectedVideo?.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              {selectedVideo && (
                <div className="mt-4 text-white/90">
                  <h3 className="text-lg font-medium">{selectedVideo.title}</h3>
                </div>
              )}
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* Video gallery section */}
      {product.videos && product.videos.length > 0 && (
        <div className="border-t border-gray-200 bg-gradient-to-b from-white to-gray-50 py-20 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900">
                Video Tutorials{" "}
              </h2>
            </div>

            {/* Enhanced grid layout with better spacing */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10">
              {product.videos.map((video: VideoGallery) => (
                <VideoCard
                  key={video.videoId}
                  video={video}
                  onClick={() => setSelectedVideo(video)}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;

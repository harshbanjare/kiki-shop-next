"use client";

import React, { useState } from "react";
import { FaArrowLeft, FaTrash, FaMinus, FaPlus } from "react-icons/fa";
import { useCart } from "@/context/useCart";
import Link from "next/link";
import { Dialog } from "@headlessui/react";

interface CheckoutForm {
  name: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  zip: string;
}

interface PinCodeResponse {
  Status: string;
  PostOffice?: Array<{
    State: string;
    District: string;
  }>;
}

const sanitizeInput = (input: string): string => {
  return input.replace(/[<>]/g, "").trim();
};

const fetchPinCodeDetails = async (
  pinCode: string
): Promise<PinCodeResponse> => {
  const response = await fetch(
    `https://api.postalpincode.in/pincode/${pinCode}`
  );
  const data = await response.json();
  return data[0];
};

const ShoppingCart: React.FC = () => {
  const { cart, removeFromCart, clearCart, getTotalCost, updateQuantity } =
    useCart();
  const [showModal, setShowModal] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [isLoadingPinCode, setIsLoadingPinCode] = useState(false);
  const [formData, setFormData] = useState<CheckoutForm>({
    name: "",
    email: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zip: "",
  });

  const ComingSoonModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-xl max-w-md w-full mx-4">
        <h2 className="text-2xl font-bold mb-4">Coming Soon!</h2>
        <p className="text-gray-600 mb-6">
          We're working hard to implement the checkout process. Please check
          back later!
        </p>
        <button
          onClick={() => setShowModal(false)}
          className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-300"
        >
          Close
        </button>
      </div>
    </div>
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    let value = e.target.value;
    value = sanitizeInput(value);

    if (e.target.name === "phone") {
      value = value.replace(/\D/g, "").slice(0, 10);
    }

    setFormData((prev) => ({
      ...prev,
      [e.target.name]: value,
    }));
  };

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

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowCheckoutModal(false);
    setShowModal(true);
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
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {showModal && <ComingSoonModal />}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <h1 className="text-3xl font-bold text-center">Shopping Cart</h1>
          <p className="text-gray-500 text-center mt-2">
            {cart.length} {cart.length === 1 ? "item" : "items"}
          </p>
        </div>

        {cart.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <div className="max-w-md mx-auto">
              <h2 className="text-2xl font-semibold mb-4">
                Your cart is empty
              </h2>
              <p className="text-gray-500 mb-8">
                Looks like you haven't added any products to your cart yet.
              </p>
              <Link
                href="/"
                className="inline-flex items-center justify-center bg-black text-white px-8 py-3 rounded-lg font-medium transition-colors duration-300 hover:bg-gray-800"
              >
                <FaArrowLeft className="mr-2" />
                Continue Shopping
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                {cart.map((item, index) => (
                  <div
                    key={item.id}
                    className={`p-6 ${
                      index !== cart.length - 1
                        ? "border-b border-gray-100"
                        : ""
                    }`}
                  >
                    <div className="flex items-center gap-6">
                      {/* Product Image */}
                      <div className="w-24 h-24 flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-grow">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-semibold mb-1">
                              {item.name}
                            </h3>
                            <p className="text-gray-500 text-sm mb-2">
                              Shade: {item.shade}
                            </p>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors duration-200"
                            aria-label="Remove item"
                          >
                            <FaTrash size={16} />
                          </button>
                        </div>

                        {/* Price and Quantity */}
                        <div className="flex justify-between items-center mt-4">
                          <div className="flex items-center border border-gray-200 rounded-lg">
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.id,
                                  Math.max(1, item.quantity - 1)
                                )
                              }
                              className="p-2 hover:bg-gray-50 transition-colors duration-200"
                            >
                              <FaMinus size={12} />
                            </button>
                            <span className="px-4 py-2 text-center min-w-[3rem]">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="p-2 hover:bg-gray-50 transition-colors duration-200"
                            >
                              <FaPlus size={12} />
                            </button>
                          </div>
                          <span className="font-semibold">
                            ₹{(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">
                      ₹{getTotalCost().toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="text-green-600 font-medium">Free</span>
                  </div>
                  <div className="border-t border-gray-100 pt-4">
                    <div className="flex justify-between">
                      <span className="font-semibold">Total</span>
                      <span className="font-bold">
                        ₹{getTotalCost().toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setShowCheckoutModal(true)}
                  className="w-full bg-black text-white py-3 rounded-lg font-medium mb-4 hover:bg-gray-800 transition-colors duration-300"
                >
                  Proceed to Checkout
                </button>

                <button
                  onClick={clearCart}
                  className="w-full bg-white text-black border border-black py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-300"
                >
                  Clear Cart
                </button>
              </div>

              <Link
                href="/"
                className="inline-flex items-center text-gray-600 hover:text-black mt-6 transition-colors duration-200"
              >
                <FaArrowLeft className="mr-2" />
                Continue Shopping
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Add the Checkout Modal */}
      <Dialog
        open={showCheckoutModal}
        onClose={() => setShowCheckoutModal(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Dialog.Panel className="mx-auto max-w-xl w-full bg-white rounded-xl p-8 shadow-xl overflow-y-auto max-h-[90vh]">
            <div className="flex justify-between items-center mb-8">
              <div>
                <Dialog.Title className="text-2xl font-bold text-gray-900">
                  Checkout Details
                </Dialog.Title>
                <p className="mt-2 text-gray-600">
                  Please provide your shipping information
                </p>
              </div>
              <button
                onClick={() => setShowCheckoutModal(false)}
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

            <form onSubmit={handleCheckoutSubmit} className="space-y-6">
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
                    onClick={() => setShowCheckoutModal(false)}
                    className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-300 font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-300 font-medium"
                  >
                    Continue to Payment
                  </button>
                </div>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default ShoppingCart;

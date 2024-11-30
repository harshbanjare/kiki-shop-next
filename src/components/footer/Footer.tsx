import Link from "next/link";
import { FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Logo Section */}
          <div className="flex flex-col items-start">
            <Link href="/" className="mb-4">
              <img
                src="/assets/kiki-white.png"
                alt="Kiki Beauty"
                className="h-12 w-auto"
              />
            </Link>
            <p className="text-zinc-400 text-sm">
              Celebrating the beauty of every shade
            </p>
          </div>

          {/* Navigation Links */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 relative inline-block group">
                Shop
                <span className="absolute -bottom-1 left-0 w-1/2 h-0.5 bg-[#E4AA81] transform origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/"
                    className="text-zinc-400 hover:text-white transition-colors duration-300"
                  >
                    All Products
                  </Link>
                </li>
                <li>
                  <Link
                    href="/shade-finder"
                    className="text-zinc-400 hover:text-white transition-colors duration-300"
                  >
                    Find your Shade
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blogs"
                    className="text-zinc-400 hover:text-white transition-colors duration-300"
                  >
                    Blogs
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 relative inline-block group">
                Support
                <span className="absolute -bottom-1 left-0 w-1/2 h-0.5 bg-[#E4AA81] transform origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/faqs"
                    className="text-zinc-400 hover:text-white transition-colors duration-300"
                  >
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link
                    href="/returns-and-exchange"
                    className="text-zinc-400 hover:text-white transition-colors duration-300"
                  >
                    Returns & Exchange
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy-policy"
                    className="text-zinc-400 hover:text-white transition-colors duration-300"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="text-zinc-400 hover:text-white transition-colors duration-300"
                  >
                    Terms & Conditions
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Connect Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 relative inline-block group">
              Connect
              <span className="absolute -bottom-1 left-0 w-1/2 h-0.5 bg-[#E4AA81] transform origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
            </h3>
            <div className="flex space-x-6 mb-8">
              {[
                { Icon: FaInstagram, label: "Instagram" },
                { Icon: FaFacebook, label: "Facebook" },
                { Icon: FaTwitter, label: "Twitter" },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="text-2xl hover:text-[#E4AA81] transition-all duration-300 transform hover:scale-110 hover:-translate-y-1"
                >
                  <Icon className="filter hover:drop-shadow-lg" />
                </a>
              ))}
            </div>

            <div className="group">
              <h4 className="text-sm font-semibold mb-3">
                Subscribe to our newsletter
              </h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-zinc-900 text-white px-4 py-2 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-[#E4AA81] flex-grow text-sm"
                />
                <button className="bg-[#E4AA81] text-black px-4 py-2 rounded-r-lg hover:bg-[#d39b72] transition-colors duration-300 text-sm font-medium">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-zinc-800">
          <p className="text-zinc-400 text-sm text-center">
            © {new Date().getFullYear()} Kiki Beauty. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

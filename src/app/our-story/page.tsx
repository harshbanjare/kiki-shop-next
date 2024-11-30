"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

const OurStory: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" },
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  return (
    <div className="bg-white text-zinc-900">
      {/* Hero Section */}
      <div className="relative h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[90vh] min-h-[400px] sm:min-h-[500px] md:min-h-[600px] flex items-center justify-center overflow-hidden">
        <motion.div style={{ opacity, scale }} className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/30 z-10" />
          <motion.img
            src="/assets/OS-1.jpg"
            alt="Hero background"
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
          />
        </motion.div>
        <div className="relative z-20 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="space-y-4 sm:space-y-6"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-tight">
              Written in Our DNA
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-zinc-100 font-light max-w-2xl mx-auto px-4">
              Celebrating the beauty of every shade
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col items-center space-y-3"
          >
            <div className="w-24 sm:w-32 h-[2px] bg-gradient-to-r from-white/30 via-white/70 to-white/30" />
            <div className="w-12 sm:w-16 h-[2px] bg-gradient-to-r from-white/30 via-white/70 to-white/30" />
          </motion.div>
        </div>

        {/* Scroll Indicator - Hidden on mobile */}
        <motion.div
          className="hidden sm:block absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center"
          >
            <motion.div className="w-1 h-2 bg-white/70 rounded-full mt-2" />
          </motion.div>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
        {/* Section 1 */}
        <motion.div
          className="grid md:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 mb-16 sm:mb-24 lg:mb-40 items-center"
          variants={staggerChildren}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="relative h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] order-2 md:order-1 group">
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-zinc-100 to-zinc-200 rounded-2xl sm:rounded-3xl -rotate-2"
              whileHover={{ rotate: 0 }}
              transition={{ duration: 0.4 }}
            />
            <motion.img
              src="/assets/OS-1.jpg"
              alt="Beauty store representation"
              className="absolute inset-0 w-full h-full object-cover rounded-2xl sm:rounded-3xl rotate-2 shadow-xl"
              whileHover={{ rotate: 0, scale: 1.02 }}
              transition={{ duration: 0.4 }}
            />
          </div>
          <motion.div
            className="order-1 md:order-2 space-y-6 sm:space-y-8 lg:space-y-10"
            variants={fadeIn}
          >
            <div className="space-y-6 sm:space-y-8">
              <div className="space-y-2 sm:space-y-3">
                <div className="w-16 sm:w-24 h-[2px] bg-gradient-to-r from-zinc-200 via-zinc-400 to-zinc-200" />
                <div className="w-8 sm:w-12 h-[2px] bg-gradient-to-r from-zinc-200 via-zinc-400 to-zinc-200" />
              </div>
              <p className="text-2xl sm:text-3xl lg:text-4xl font-light italic text-zinc-800 leading-relaxed">
                "Imagine walking into a beauty store, only to be reminded that
                you don't quite fit in."
              </p>
              <p className="text-base sm:text-lg text-zinc-600 leading-relaxed">
                For a dusky woman in India, that feeling is all too familiar.
                She stands in front of endless displays, whispering to herself,
                "Will I find a shade that truly sees me?"
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Section 2 - Similar responsive updates */}
        <motion.div
          className="grid md:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 mb-16 sm:mb-24 lg:mb-40 items-center"
          variants={staggerChildren}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div
            className="space-y-6 sm:space-y-8 lg:space-y-10"
            variants={fadeIn}
          >
            <div className="space-y-6 sm:space-y-8">
              <div className="space-y-2 sm:space-y-3">
                <div className="w-16 sm:w-24 h-[2px] bg-gradient-to-r from-zinc-200 via-zinc-400 to-zinc-200" />
                <div className="w-8 sm:w-12 h-[2px] bg-gradient-to-r from-zinc-200 via-zinc-400 to-zinc-200" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-light text-zinc-800 leading-relaxed">
                Kiki is born from her journey, from her voice that has too often
                gone unheard.
              </h3>
              <p className="text-base sm:text-lg text-zinc-600 leading-relaxed">
                It's a tribute to the rich, beautiful tones that make her who
                she is. More than makeup, Kiki is a promise—a promise to shatter
                the barriers that have kept women of deeper skin tones from
                feeling seen, cherished, and celebrated.
              </p>
            </div>
          </motion.div>
          <div className="relative h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] group">
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-zinc-100 to-zinc-200 rounded-2xl sm:rounded-3xl rotate-2"
              whileHover={{ rotate: 0 }}
              transition={{ duration: 0.4 }}
            />
            <motion.img
              src="/assets/OS-2.jpg"
              alt="Kiki's journey"
              className="absolute inset-0 w-full h-full object-cover rounded-2xl sm:rounded-3xl -rotate-2 shadow-xl"
              whileHover={{ rotate: 0, scale: 1.02 }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </motion.div>

        {/* Final Section */}
        <motion.div
          className="grid md:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center"
          variants={staggerChildren}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="relative h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] group">
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-zinc-100 to-zinc-200 rounded-2xl sm:rounded-3xl -rotate-2"
              whileHover={{ rotate: 0 }}
              transition={{ duration: 0.4 }}
            />
            <motion.img
              src="/assets/OS-3.jpg"
              alt="Celebrating diversity"
              className="absolute inset-0 w-full h-full object-cover rounded-2xl sm:rounded-3xl rotate-2 shadow-xl"
              whileHover={{ rotate: 0, scale: 1.02 }}
              transition={{ duration: 0.4 }}
            />
          </div>
          <motion.div
            className="space-y-6 sm:space-y-8 lg:space-y-10"
            variants={fadeIn}
          >
            <div className="space-y-6 sm:space-y-8">
              <div className="space-y-2 sm:space-y-3">
                <div className="w-16 sm:w-24 h-[2px] bg-gradient-to-r from-zinc-200 via-zinc-400 to-zinc-200" />
                <div className="w-8 sm:w-12 h-[2px] bg-gradient-to-r from-zinc-200 via-zinc-400 to-zinc-200" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-light text-zinc-800 leading-relaxed">
                This isn't just about products; it's about rewriting the
                narrative.
              </h3>
              <p className="text-base sm:text-lg text-zinc-600 leading-relaxed">
                It's about looking into the mirror and seeing a shade that feels
                like home. Kiki is here to honor dusky skin in all its bold,
                unapologetic beauty.
              </p>
              <p className="text-lg sm:text-xl font-medium text-zinc-800 leading-relaxed mt-6 sm:mt-8">
                We see you. We celebrate you. And together, we're ready to
                redefine beauty, one shade at a time.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Call to Action Section */}
      <motion.div
        className="relative overflow-hidden bg-gradient-to-br from-zinc-100 to-zinc-200"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex flex-col md:flex-row items-center justify-between space-y-10 md:space-y-0 md:space-x-10"
          >
            <motion.div
              className="w-full md:w-1/2 space-y-6"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-4xl sm:text-5xl font-bold text-zinc-900 leading-tight">
                Join Our Journey
              </h2>
              <p className="text-xl text-zinc-700 leading-relaxed">
                Experience makeup that celebrates your unique beauty and
                empowers your true self
              </p>
            </motion.div>
            <motion.div
              className="w-full md:w-1/2 flex justify-center"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Link href="/">
                <motion.button
                  className="px-10 py-4 bg-zinc-900 text-white rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  Explore Our Collection
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default OurStory;

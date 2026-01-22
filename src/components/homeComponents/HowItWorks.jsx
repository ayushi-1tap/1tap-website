import { useState, useRef, useEffect } from "react";
import laptop from "../../assets/Laptop.svg";
import laptop2 from "../../assets/Laptop2.svg";
import laptop3 from "../../assets/Laptop3.svg";
import laptop4 from "../../assets/Laptop4.svg";
import { motion, useInView, AnimatePresence } from "framer-motion";

const HowItWorks = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    if (isInView) {
      setAnimationKey(prev => prev + 1);
    }
  }, [isInView]);

  const steps = [
    { id: "01", title: "Create Your Account" },
    { id: "02", title: "Share Your Business Details" },
    { id: "03", title: "Select AI-Recommended Jurisdiction" },
    { id: "04", title: "Receive Your Business License" },
  ];

  const laptopImages = [laptop, laptop2, laptop3, laptop4];

  const [active, setActive] = useState(0);

  return (
    <motion.section 
      ref={ref}
      className="w-full pt-16 pb-4 bg-white"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-[85%] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-10"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-[var(--color-text-primary)]"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            How It Works
          </motion.h2>
          <motion.p 
            className="mt-3 text-[15px] md:text-lg text-gray-500 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Experience our seamless 4-step process from application to business
            launch
          </motion.p>
        </motion.div>

        {/* Steps + connector line (matches your ss2) */}
        <div className="relative  mx-auto">
          {/* Horizontal connector line */}
          <div
            className="hidden lg:block absolute left-10 right-10"
            style={{
              top: "50%",
              height: "2px",
              transform: "translateY(-50%)",
              background: "rgba(212,228,250,0.9)", // var(--color-blue-100) feel
            }}
          />

          <div className="flex flex-col lg:flex-row items-stretch justify-between gap-5 lg:gap-8">
            {steps.map((s, idx) => {
              const isActive = idx === active;

              return (
                <motion.button
                  key={`${s.id}-${animationKey}`}
                  type="button"
                  onClick={() => setActive(idx)}
                  className={`relative z-10 w-full lg:w-[280px] rounded-xl px-6 py-6 text-center border bg-white transition-all duration-300 ease-in-out transform flex flex-col items-center ${
                    isActive ? "scale-105" : "hover:scale-105 active:scale-95"
                  }`}
                  style={{
                    border: isActive
                      ? "1px solid rgba(46,149,244,0.45)"
                      : "1px solid rgba(0,0,0,0.06)",
                    boxShadow: isActive
                      ? "0 10px 24px rgba(12,120,220,0.12)"
                      : "0 8px 20px rgba(0,0,0,0.05)",
                  }}
                  initial={{ opacity: 0, y: 50, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.8 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: 0.7 + (idx * 0.15),
                    ease: "easeOut"
                  }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* number pill */}
                  <div
                    className={`flex items-center justify-center w-9 h-9 rounded-full text-[12px] font-semibold text-white transition-all duration-300 ease-in-out ${
                      isActive ? "scale-110 rotate-6" : ""
                    }`}
                    style={{
                      background: "var(--color-primary-600)",
                    }}
                  >
                    {s.id}
                  </div>

                  <div
                    className="mt-5 font-semibold leading-snug"
                    style={{
                      color: isActive
                        ? "var(--color-blue-600)"
                        : "rgba(95,107,133,0.95)",
                    }}
                  >
                    {s.title}
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Laptop image */}
        <motion.div 
          className="mt-20 flex justify-center"
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={active}
              src={laptopImages[active]}
              alt="How it works"
              className="w-full max-w-[920px] h-auto object-contain"
              draggable={false}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
            />
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default HowItWorks;

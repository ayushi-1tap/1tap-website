import { ArrowUp, ShieldCheck, Lightbulb, DollarSign } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const pillars = [
  {
    icon: ArrowUp,
    title: "Simplify Business Setup",
    description:
      "Make company formation in the UAE fast, transparent, and hassle-free, all online.",
    iconColor: "var(--icon-light-blue)",
  },
  {
    icon: ShieldCheck,
    title: "Enhance Compliance",
    description:
      "Provide ongoing support for VAT Registration, Accounting, and Corporate Tax Management.",
    iconColor: "var(--icon-green)",
  },
  {
    icon: Lightbulb,
    title: "Drive Innovation",
    description:
      "Leverage AI and Automation to deliver a seamless, cutting-edge user experience.",
    iconColor: "var(--icon-magenta)",
  },
  {
    icon: DollarSign,
    title: "Transparent Pricing",
    description:
      "No hidden fees or surprises - honest and transparent packages you can trust.",
    iconColor: "var(--icon-blue)",
  },
];

const CorePillars = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  return (
    <motion.section 
      ref={ref}
      className="w-full bg-[var(--color-bg-light)]"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="mx-auto w-full max-w-[85%] px-4 sm:px-6 lg:px-16 py-12 md:py-16">
        {/* Heading */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-[22px] sm:text-[28px] md:text-[34px] font-extrabold text-[#0B1B3A]">
            Our Core Pillars for Your Success
          </h2>
          <p className="mt-2  text-[rgba(15,23,42,0.60)]">
            We are built on four key principles designed to empower your
            entrepreneurial journey.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;

            return (
              <motion.div
                key={index}
                className="rounded-xl bg-white p-7 text-center
                           border border-[rgba(15,23,42,0.08)]
                           shadow-[0_10px_30px_rgba(15,23,42,0.06)]
                           transition hover:shadow-[0_14px_38px_rgba(15,23,42,0.09)]"
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50 }}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.4 + (index * 0.1),
                  ease: "easeOut"
                }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                {/* icon circle */}
                <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-[rgba(46,149,244,0.12)]">
                  <Icon className="h-5 w-5" style={{ color: pillar.iconColor }} />
                </div>

                <h3 className=" font-bold text-[#0B1B3A]">
                  {pillar.title}
                </h3>

                <p className="mt-3 text-sm leading-5 text-[rgba(15,23,42,0.62)] px-1">
                  {pillar.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
};

export default CorePillars;

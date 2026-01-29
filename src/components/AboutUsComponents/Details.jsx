import { ArrowRight } from "lucide-react";
import dashboardImg from "../../assets/dashboard.jpeg";
import { motion, useInView } from "framer-motion";
import { useRef } from "react"; 

const Details = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  return (
    <motion.section 
      ref={ref}
      className="w-full bg-[var(--color-bg-white)]"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="mx-auto w-full max-w-[85%] px-4 sm:px-6 lg:px-16 py-10 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10 lg:gap-14">
          {/* LEFT */}
          <motion.div 
            className="max-w-xl"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="font-semibold tracking-[0.18em] uppercase text-[var(--color-primary-600)]">
              ABOUT 1TAP
            </p>

            <h2 className="mt-4 text-[28px] sm:text-[36px] md:text-[44px] leading-[1.08] font-extrabold text-[#0B1B3A]">
              Revolutionizing the Business Setup Process in the UAE
            </h2>

            <p className="mt-4 text-sm md:text-[15px] leading-7 text-[rgba(15,23,42,0.72)]">
              Our mission is to simplify the complex process of company
              formation, compliance, and post-incorporation support through
              cutting-edge technology, transparency, and expert guidance.
              Whether you’re setting up a new business or expanding an existing
              one, 1TAP is your trusted partner for success in the UAE’s
              dynamic business landscape.
            </p>

            <a
              href="https://app.1tapbiz.com/signup"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center justify-center gap-2
                         rounded-lg px-5 py-3 text-sm font-semibold
                         border-2 border-[var(--color-primary-500)]
                         text-[var(--color-primary-600)] bg-transparent
                         hover:bg-[var(--color-primary-50)]
                         transition"
            >
              Sign-Up on Our Dashboard
              <ArrowRight className="h-4 w-4" />
            </a>
          </motion.div>

          {/* RIGHT */}
          <motion.div 
            className="w-full"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="mx-auto w-full max-w-[640px]">
              <div className="rounded-2xl bg-white border border-[rgba(15,23,42,0.10)] shadow-[0_18px_45px_rgba(15,23,42,0.12)] p-4 sm:p-5">
                <img
                  src={dashboardImg}
                  alt="Dashboard preview"
                  className="w-full h-auto rounded-xl"
                  draggable="false"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default Details;

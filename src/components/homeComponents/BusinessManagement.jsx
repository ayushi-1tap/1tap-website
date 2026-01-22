import { useState, useRef, useEffect } from "react";
import {
  UserPlus,
  Landmark,
  TrendingUp,
  BookOpen,
  Receipt,
  CreditCard,
  ArrowRight,
  Building2,
} from "lucide-react";
import QuoteModal from "../QuoteModal";
import { motion, useInView } from "framer-motion";

const BusinessManagement = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });
  const [animationKey, setAnimationKey] = useState(0);
  const [selectedService, setSelectedService] = useState(0);
  const [mobileOpenIndex, setMobileOpenIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (isInView) {
      setAnimationKey(prev => prev + 1);
    }
  }, [isInView]);

  const services = [
    {
      icon: Building2,
      name: "Company Set-up",
      description:
        "End-to-end business incorporation in Mainland, Free Zone, or Offshore jurisdictions. We handle all legal documentation, license approvals, and government coordination.",
      benefits: [
        "License selection & registration",
        "MOA legal documentation",
        "Trade name reservation",
        "Mainland & Free Zone options",
        "Virtual office solutions",
        "Local partner arrangements",
      ],
    },
    {
      icon: UserPlus,
      name: "Visa Services",
      description:
        "Complete visa processing for employees, shareholders, investors, and family members. Including all paperwork, medicals, residency approvals, E-Channel registration, and government liaison.",
      benefits: [
        "Employee visa processing",
        "Shareholder & investor visas",
        "Family member visas",
        "E-Channel registration",
        "Government liaison",
        "Medical coordination",
      ],
    },
    {
      icon: Landmark,
      name: "Bank Account Support",
      description:
        "Assistance with opening and managing digital business bank accounts in the UAE. Includes KYC preparation and pre-approval processing for quick access to funds.",
      benefits: [
        "Digital bank account setup",
        "KYC document preparation",
        "Pre-approval processing",
        "Quick fund access"

        ]      },
    {
      icon: TrendingUp,
      name: "Corporate Tax Planning",
      description:
        "Specialist tax advisory services to legally reduce liabilities, optimize your business structure, and navigate the UAE's competitive tax landscape.",
      benefits: [
        "Tax liability reduction",
        "Business structure optimization",
        "Advisory services",
        "UAE tax expertise",
      ],
    },
    {
      icon: BookOpen,
      name: "Bookkeeping & MIS",
      description:
        "Monthly accounting services, bookkeeping, and detailed Management Information System (MIS) reports to help track business performance and compliance.",
      benefits: [
        "Monthly accounting",
        "Detailed bookkeeping",
        "MIS reports",
        "Performance tracking",
      ],
    },
    {
      icon: Receipt,
      name: "Annual VAT Returns",
      description:
        "Annual VAT filing service for businesses exceeding the minimum turnover threshold (AED 150,000), ensuring timely and accurate submission to the FTA.",
      benefits: [
        "Annual VAT filing",
        "FTA submission",
        "Timely processing",
        "Accuracy guaranteed",
      ],
    },
    {
      icon: CreditCard,
      name: "Payroll and WPS",
      description:
        "Complete management of staff payroll, full WPS (Wages Protection System) compliance, and timely salary disbursement and auditing services.",
      benefits: [
        "Full payroll management",
        "WPS compliance",
        "Timely disbursement",
        "Auditing services",
      ],
    },
  ];

  const current = services[selectedService];
  const ActiveIcon = current.icon;

  return (
    <motion.section 
      ref={ref}
      className="w-full py-16 bg-[#F7FAFE]"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="md:max-w-[85%] max-w-[90%] mx-auto px-2 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="text-center md:mb-14 mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.h2 
            className="text-2xl md:text-5xl font-bold text-[var(--color-text-primary)]"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Your Complete Business Management Solution
          </motion.h2>
          <motion.p 
            className="mt-4 text-sm md:text-lg text-[var(--why-choose-secondary)] max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Whether you need a full package deal or annual service renewal, 1TAP
            manages everything end-to-end – saving you time, money, and effort.
          </motion.p>
        </motion.div>

        {/* Mobile: FAQ-style accordion */}
        <div className="lg:hidden space-y-3">
          {services.map((s, idx) => {
            const Icon = s.icon;
            const isActive = mobileOpenIndex === idx;

            return (
              <div
                key={s.name}
                className="rounded-xl border bg-white transition-all duration-300 ease-in-out overflow-hidden"
                style={{
                  borderColor: isActive
                    ? "var(--color-primary-100)"
                    : "rgba(212,228,250,0.5)",
                  boxShadow: isActive
                    ? "4px 16px 48px rgba(0,0,0,0.08)"
                    : "none",
                }}
              >
                <button
                  type="button"
                  onClick={() => setMobileOpenIndex(isActive ? null : idx)}
                  className="w-full text-left p-4 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: "var(--color-primary-50)" }}
                    >
                      <Icon className="w-5 h-5 text-[var(--color-primary-600)]" />
                    </div>
                    <span className="font-semibold text-[var(--color-text-primary)]">
                      {s.name}
                    </span>
                  </div>
                  <ArrowRight
                    className={`w-5 h-5 text-[var(--color-primary-600)] transition-transform duration-300 ${
                      isActive ? "rotate-90" : ""
                    }`}
                  />
                </button>

                {isActive && (
                  <div className="px-4 pb-4 pt-0">
                    <p className="text-sm leading-relaxed text-[var(--why-choose-secondary)] mb-4">
                      {s.description}
                    </p>
                    <div>
                      <div className="text-xs font-bold tracking-wider text-[var(--color-text-primary)] mb-3">
                        KEY BENEFITS
                      </div>
                      <ul className="space-y-2">
                        {s.benefits.map((b) => (
                          <li key={b} className="flex items-start gap-3">
                            <span className="mt-[6px] w-1.5 h-1.5 rounded-full bg-[var(--color-primary-600)] flex-shrink-0" />
                            <span className="text-sm text-[var(--why-choose-secondary)]">
                              {b}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Desktop: Side-by-side layout */}
        <div className="hidden lg:block overflow-hidden">
          <div className="grid lg:grid-cols-[3fr_4fr] items-stretch">
            {/* LEFT (stretches full height) */}
            <div className="h-full p-8 ">
              <div className="space-y-3 h-full">
                {services.map((s, idx) => {
                  const Icon = s.icon;
                  const isActive = idx === selectedService;

                  return (
                    <motion.button
                      key={`${s.name}-${animationKey}`}
                      type="button"
                      onClick={() => setSelectedService(idx)}
                      className="w-full text-left transition-all duration-300 ease-in-out"
                      initial={{ opacity: 0, x: -30 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                      transition={{ 
                        duration: 0.5, 
                        delay: 0.7 + (idx * 0.1),
                        ease: "easeOut"
                      }}
                      whileHover={{ x: 5 }}
                    >
                      {isActive ? (
                        <div
                          className="relative flex items-center gap-4 px-5 py-4 rounded-xl  border bg-white shadow-lg transition-all duration-300 ease-in-out transform scale-105 group"
                          style={{
                            borderColor: "var(--color-primary-100)",
                          }}
                        >
                          <span
                            className="absolute -left-1 top-4 h-11 w-[4px] rounded-l-xl"
                            style={{ background: "var(--color-primary-600)" }}
                          />
                          <div
                            className="w-11 h-11 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                            style={{ background: "var(--color-primary-50)" }}
                          >
                            <Icon className="w-5 h-5 text-[var(--color-primary-600)] transition-transform duration-300" />
                          </div>

                          <div className="flex-1">
                            <div className=" font-semibold text-[var(--color-text-primary)]">
                              {s.name}
                            </div>
                          </div>

                          <ArrowRight className="w-5 h-5 text-[var(--color-primary-600)] transition-transform duration-300 group-hover:translate-x-1" />
                        </div>
                      ) : (
                        <div className="flex items-center gap-4 px-2 py-3 transition-all duration-300 ease-in-out transform hover:translate-x-2 group">
                          <div
                            className="w-11 h-11 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                            style={{ background: "var(--color-primary-50)" }}
                          >
                            <Icon className="w-5 h-5 text-[var(--color-primary-600)] transition-transform duration-300" />
                          </div>

                          <div className=" font-semibold text-[var(--why-choose-secondary)] transition-colors duration-300 group-hover:text-[var(--color-primary-600)]">
                            {s.name}
                          </div>
                        </div>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* RIGHT (stretches full height) */}
            <motion.div 
              className="h-full p-8"
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <motion.div
                className="h-full rounded-2xl  p-8 lg:p-10"
                style={{
                  background: "white",
                  boxShadow: "4px 16px 48px rgba(0,0,0,0.08)",
                }}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center"
                  style={{ background: "var(--color-primary-50)" }}
                >
                  <ActiveIcon className="w-7 h-7 text-[var(--color-primary-600)]" />
                </div>

                <h3 className="mt-6 text-[28px] font-bold text-[var(--color-text-primary)]">
                  {current.name}
                </h3>

                <p className="mt-3  leading-relaxed text-[var(--why-choose-secondary)]">
                  {current.description}
                </p>

                <div className="mt-4">
                  <div className=" font-bold tracking-wider text-[var(--color-text-primary)]">
                    KEY BENEFITS
                  </div>

                  <ul className="mt-4 space-y-2.5">
                    {current.benefits.map((b) => (
                      <li key={b} className="flex items-start gap-3">
                        <span className="mt-[6px] w-1.5 h-1.5 rounded-full bg-[var(--color-primary-600)]" />
                        <span className=" text-[var(--why-choose-secondary)]">
                          {b}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Bottom CTA card (same as screenshot) */}
        <motion.div
          className="mt-8 rounded-2xl bg-[var(--color-bg-white)] px-8 py-10 text-center "
          style={{
            borderColor: "var(--color-blue-100)",
            boxShadow: "0 18px 45px rgba(0,0,0,0.05)",
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <h3 className="text-lg md:text-[24px] font-bold text-[var(--color-text-primary)]">
            Ready for Complete Business Automation?
          </h3>
          <p className="mt-2 text-sm md:text-base text-[var(--why-choose-secondary)]">
            Tell us your exact requirements and we&apos;ll craft a customized
            management package.
          </p>

          <div className="mt-6 flex justify-center">
            <button
              onClick={() => setIsModalOpen(true)}
              className="h-11 px-7 text-sm md:text-base rounded-md text-[var(--color-text-reverse)] font-semibold inline-flex items-center gap-2 transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 hover:shadow-lg group"
              style={{
                background:
                  "linear-gradient(92deg, var(--color-primary-500) 1.65%, var(--color-action) 98%)",
              }}
            >
              Get Your Personalized Quote{" "}
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Quote Modal */}
      <QuoteModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </motion.section>
  );
};

export default BusinessManagement;

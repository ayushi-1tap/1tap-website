/* eslint-disable react/prop-types */
import { Check, Plus } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { useCurrency } from "../../contexts/CurrencyContext";

const ExistingBusinessPricing = ({ onViewAddOn }) => {
  const { formatPrice } = useCurrency();

  const packages = [
    {
      badge: "OPERATIONAL SUPPORT",
      title: "Business Essentials",
      description:
        "All-inclusive services for ongoing compliance and license renewal.",
      priceKey: "business-essentials",
      priceAmount: 2241,
      features: [
        "License Renewal",
        "VAT Registration & Returns",
        "Corporate Tax Registration",
        "Renewal Reminders",
      ],
    },
    {
      badge: "CORE SERVICES FOR EVERY BUSINESS",
      title: "Business Compliance",
      description: "Streamlined compliance, accounting, and payroll support.",
      priceKey: "business-compliance",
      priceAmount: 4708,
      isRecommended: true,
      features: [
        {
          type: "heading",
          text: "Everything in Business Essentials Package, plus:",
        },
        { text: "Annual Accounting" },
        { text: "VAT Consultancy" },
        { text: "Payroll & WPS (up to 5)" },
      ],
    },
    {
      badge: "FULL SERVICE SUITE",
      title: "Business Elite",
      description: "Premium, end-to-end compliance, accounting, and payroll.",
      priceKey: "business-elite",
      priceAmount: 8610,
      features: [
        {
          type: "heading",
          text: "Everything in Business Compliance Package, plus:",
        },
        { text: "Monthly Accounting with MIS" },
        { text: "Advanced VAT Consultancy" },
        { text: "Payroll & WPS (up to 10)" },
      ],
    },
  ];

  return (
    <>
      <div className="w-full">
        {/* Mobile: Swipeable slider */}
        <div className="md:hidden -mx-4 px-4 pt-6 overflow-x-auto overflow-y-visible snap-x snap-mandatory scrollbar-hide">
          <div className="flex gap-4">
            {packages.map((pkg, index) => (
              <div
                key={index}
                className="relative flex flex-col h-full p-6 min-w-[85vw] snap-start border border-[rgba(15,23,42,0.12)] rounded-xl bg-white transition-all duration-300 ease-in-out transform hover:shadow-xl"
                style={
                  pkg.isRecommended
                    ? {
                        background:
                          "linear-gradient(-180deg, var(--color-primary-50) 0.4%, var(--color-bg-white) 60%)",
                      }
                    : {}
                }
              >
                {/* Recommended badge */}
                {pkg.isRecommended && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-30 ">
                    <span className="px-5 py-1.5 rounded-full text-xs font-bold tracking-widest text-white bg-[var(--color-primary-600)] border-2 border-white shadow-md">
                      RECOMMENDED
                    </span>
                  </div>
                )}

                {/* Badge */}
                <div className={`mb-6 ${pkg.isRecommended ? "mt-3" : "mt-2"}`}>
                  <span className="inline-flex rounded-full px-4 py-1.5 text-xs font-semibold border border-[rgba(46,149,244,0.25)] bg-[rgba(46,149,244,0.08)] text-[var(--color-primary-600)]">
                    {pkg.badge}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-[var(--color-text-primary)]">
                  {pkg.title}
                </h3>

                {/* Description */}
                <p className="mt-2 text-[var(--color-text-secondary)] max-w-[95%]">
                  {pkg.description}
                </p>

                {/* Price */}
                <div className="mt-6">
                  <div className="text-3xl font-extrabold text-[#0B1B3A]">
                    {formatPrice(pkg.priceAmount)}
                  </div>
                  <div className="mt-2 text-sm font-semibold text-[var(--color-primary-600)]">
                    Annual
                  </div>
                  <div className="text-xs text-[rgba(15,23,42,0.55)]">
                    + Government Fees
                  </div>
                </div>

                {/* Button */}
                <div className="mt-6">
                  <button className="w-full py-3 rounded-xl text-white font-semibold transition-all duration-300 ease-in-out transform hover:opacity-95 hover:scale-105 active:scale-95 hover:shadow-lg bg-[var(--color-primary-600)]">
                    Select
                  </button>
                </div>

                {/* Features */}
                <div className="mt-6 space-y-4">
                  {pkg.features.map((feature, idx) => {
                    if (typeof feature === "string") {
                      return (
                        <div key={idx} className="flex gap-3 group">
                          <div className="flex items-center rounded-full bg-[var(--color-primary-50)] p-1"><Check className="h-4 w-4 text-[var(--color-primary-600)] mt-0.5 flex-shrink-0 transition-transform duration-300 group-hover:scale-110" /></div>
                          <span className="text-sm text-[#0B1B3A] transition-colors duration-300 group-hover:text-[var(--color-primary-600)]">
                            {feature}
                          </span>
                        </div>
                      );
                    }

                    if (feature.type === "heading") {
                      return (
                        <div
                          key={idx}
                          className="font-semibold text-[var(--color-primary-600)]"
                        >
                          {feature.text}
                        </div>
                      );
                    }

                    return (
                      <div key={idx} className="flex gap-3 group">
                      <div className="flex items-center rounded-full bg-[var(--color-primary-50)] p-1"><Check className="h-4 w-4 text-[var(--color-primary-600)] mt-0.5 flex-shrink-0 transition-transform duration-300 group-hover:scale-110" /></div>
                        <span className="text-[#0B1B3A] transition-colors duration-300 group-hover:text-[var(--color-primary-600)]">
                          {feature.text}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: Grid */}
        <div className="hidden md:grid md:grid-cols-3 border border-[rgba(15,23,42,0.12)] overflow-visible bg-white">
          {packages.map((pkg, index) => (
            <div
              key={index}
              className={`relative flex flex-col h-full p-6 sm:p-8 md:p-10 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl ${
                index !== 0
                  ? "border-t md:border-t-0 md:border-l border-[rgba(15,23,42,0.12)]"
                  : ""
              } `}
              style={
                pkg.isRecommended
                  ? {
                      background:
                        "linear-gradient(-180deg, var(--color-primary-50) 0.4%, var(--color-bg-white) 60%)",
                    }
                  : {}
              }
            >
              {/* Recommended badge */}
              {pkg.isRecommended && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-30">
                  <span className="px-5 py-1.5 rounded-full text-xs font-bold tracking-widest text-white bg-[var(--color-primary-600)] border-2 border-white shadow-md">
                    RECOMMENDED
                  </span>
                </div>
              )}

              {/* Badge */}
              <div className={`mb-6 ${pkg.isRecommended ? "mt-3" : "mt-2"}`}>
                <span className="inline-flex rounded-full px-4 py-1.5 text-xs font-semibold border border-[rgba(46,149,244,0.25)] bg-[rgba(46,149,244,0.08)] text-[var(--color-primary-600)]">
                  {pkg.badge}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-[var(--color-text-primary)]">
                {pkg.title}
              </h3>

              {/* Description */}
              <p className="mt-2 text-[var(--color-text-secondary)] max-w-[95%]">
                {pkg.description}
              </p>

              {/* Price */}
              <div
                className={` ${index == 0 ? "mt-9 3xl:mt-3 " : "mt-6 md:mt-8"}`}
              >
                <div className="mt-6 md:mt-10 text-3xl md:text-4xl font-extrabold text-[#0B1B3A]">
                  {formatPrice(pkg.priceAmount)}
                </div>
                <div className="mt-2 text-sm md:text-base font-semibold text-[var(--color-primary-600)]">
                  Annual
                </div>
                <div className="text-xs md:text-sm text-[rgba(15,23,42,0.55)]">
                  + Government Fees
                </div>
              </div>

              {/* Button - after price */}
              <div className="mt-6">
                <a
                  href="https://app.1tapbiz.com/signup"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="w-full py-3 rounded-xl text-white font-semibold transition-all duration-300 ease-in-out transform hover:opacity-95 hover:scale-105 active:scale-95 hover:shadow-lg bg-[var(--color-primary-600)]">
                    Select
                  </button>
                </a>
              </div>

              {/* Features */}
              <div className={`mt-6 space-y-4 `}>
                {pkg.features.map((feature, idx) => {
                  if (typeof feature === "string") {
                    return (
                      <div key={idx} className="flex gap-3 group">
                        <div className="flex items-center rounded-full bg-[var(--color-primary-50)] p-1"><Check className="h-4 w-4 text-[var(--color-primary-600)] mt-0.5 flex-shrink-0 transition-transform duration-300 group-hover:scale-110" /></div>
                        <span className="text-[#0B1B3A] transition-colors duration-300 group-hover:text-[var(--color-primary-600)]">
                          {feature}
                        </span>
                      </div>
                    );
                  }

                  if (feature.type === "heading") {
                    return (
                      <div
                        key={idx}
                        className="font-semibold text-[var(--color-primary-600)]"
                      >
                        {feature.text}
                      </div>
                    );
                  }

                  return (
                    <div key={idx} className="flex gap-3 group">
                      <div className="flex items-center rounded-full bg-[var(--color-primary-50)] p-1"><Check className="h-4 w-4 text-[var(--color-primary-600)] mt-0.5 flex-shrink-0 transition-transform duration-300 group-hover:scale-110" /></div>
                      <span className=" text-[#0B1B3A] transition-colors duration-300 group-hover:text-[var(--color-primary-600)]">
                        {feature.text}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6 md:mt-10">
        <div
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 rounded-xl px-4 sm:px-6 py-4 sm:py-6"
          style={{
            background:
              "linear-gradient(90deg, var(--color-primary-50) 0%, var(--color-bg-white) 100%)",
            border: "1px solid rgba(46,149,244,0.25)",
          }}
        >
          {/* Left */}
          <div className="flex md:items-center gap-3">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-lg flex-shrink-0"
              style={{
                background: "rgba(12,120,220,0.15)",
              }}
            >
              <Plus className="h-4 w-4 text-[var(--color-primary-600)]" />
            </div>

            <div>
              <p className="text-sm font-semibold text-[var(--color-text-primary)]">
                Need VAT, Payroll, or Accounting later?
              </p>
              <p className="text-xs text-[var(--color-text-secondary)]">
                You can add specialized services to your plan at any time.
              </p>
              <button
                onClick={onViewAddOn}
                className="flex items-center gap-1  md:justify-center text-sm font-semibold text-[var(--color-primary-600)] hover:underline transition-all duration-300 group whitespace-nowrap md:hidden mt-4"
              >
                View Add-On Services
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={onViewAddOn}
            className="hidden md:flex items-center justify-center sm:justify-start gap-1 text-sm font-semibold text-[var(--color-primary-600)] hover:underline transition-all duration-300 group whitespace-nowrap"
          >
            View Add-On Services
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </>
  );
};

export default ExistingBusinessPricing;

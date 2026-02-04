import { useState, useRef, useEffect } from "react";
import { Building2, Briefcase, Plus } from "lucide-react";
import NewBusinessPricing from "./NewBusinessPricing";
import ExistingBusinessPricing from "./ExistingBusinessPricing";
import AddOnServices from "./AddOnServices";
import CurrencyDropdown from "./CurrencyDropdown";
import { useInView } from "framer-motion";

const PricingSection = () => {
  const [activeTab, setActiveTab] = useState("new");
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const isInView = useInView(headingRef, { once: true, margin: "-50px" });

  const tabs = [
    { id: "new", label: "New Business Packages", mobileLabel: "New Business", icon: Briefcase },
    { id: "existing", label: "Existing Business Packages", mobileLabel: "Existing Business", icon: Building2 },
    { id: "addon", label: "Add-On Packages", mobileLabel: "Add-On Services", icon: Plus },
  ];

  const handleViewAddOn = () => {
    setActiveTab("addon");
    // Scroll to top of the section
    setTimeout(() => {
      if (sectionRef.current) {
        sectionRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 100);
  };

  // Animation effect can be added here if needed in the future
  useEffect(() => {
    // Placeholder for future animations
  }, [isInView]);

  return (
    <section
      ref={sectionRef}
      className="w-full py-12 md:py-14 relative bg-[var(--color-bg-white)]"
    >
      <div className="relative max-w-[85%] md:max-w-[93%] 3xl:max-w-[85%] mx-auto ">
        {/* Header */}
        <div className="text-center mb-8" ref={headingRef}>
          <h1 className="text-2xl md:text-5xl lg:text-[56px] leading-tight font-bold mb-4">
       
            <span className="text-[var(--color-text-primary)]">
              Pricing That Grows With Your Business
            </span>
          </h1>
          <p className="text-sm md:text-xl text-[var(--color-text-secondary)] max-w-3xl mx-auto">
            Clear plans, transparent pricing, and add-ons when you need them.
            From launching your first venture to scaling an established
            enterprise.
          </p>
          {/* Currency Dropdown */}
          <div className="flex justify-center mt-6">
            <CurrencyDropdown />
          </div>
        </div>

        {/* Tab Navigation (segmented pill) */}
        <div className="flex justify-center md:mb-10 mb-4">
          <div className="flex gap-2 bg-[var(--color-bg-light)] p-2 rounded-full">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex md:flex-row flex-col items-center gap-2 px-4 py-2.5 rounded-full  text-sm font-medium transition-all duration-300 ease-in-out transform ${
                    isActive
                      ? "text-[var(--color-primary-600)] bg-white shadow-md scale-105"
                      : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:scale-105 active:scale-95"
                  }`}
                >
                  <Icon
                    className={`md:w-4 md:h-4 w-3 h-3 transition-transform duration-300 ${
                      isActive ? "scale-110" : ""
                    }`}
                  />
                  <span className="text-xs md:text-base">
                    <span className="md:hidden">{tab.mobileLabel}</span>
                    <span className="hidden md:inline">{tab.label}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="md:mt-20 mt-10">
          <div className="transition-all duration-500 ease-in-out">
            {activeTab === "new" && (
              <div className="animate-fadeIn">
                <NewBusinessPricing onViewAddOn={handleViewAddOn} />
              </div>
            )}
            {activeTab === "existing" && (
              <div className="animate-fadeIn">
                <ExistingBusinessPricing onViewAddOn={handleViewAddOn} />
              </div>
            )}
            {activeTab === "addon" && (
              <div className="animate-fadeIn">
                <AddOnServices />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;

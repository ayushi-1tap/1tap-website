import { useState } from "react";
import {
  Building2,
  BookOpen,
  Users,
  FileText,
  MessageSquare,
  TrendingUp,
  UserCheck,
  UserPlus,
} from "lucide-react";
import DropDownSelect from "./DropDownSelect";
import { useCurrency } from "../../contexts/CurrencyContext";

const AddOnServices = () => {
  const { formatPrice } = useCurrency();
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedOptions, setSelectedOptions] = useState({});

  const categories = [
    { id: "all", label: "All" },
    { id: "finance", label: "Finance" },
    { id: "compliance", label: "Compliance" },
    { id: "payroll", label: "Payroll" },
    { id: "visas", label: "Visas" },
  ];

  const services = [
    {
      id: 1,
      category: "visas",
      icon: UserCheck,
      iconColor: "#10b981",
      label: "ONE TIME",
      title: "Visa for Employee",
      description:
        "Complete visa processing service for company employees including paperwork and approvals.",
      priceAmount: 1000,
      priceSuffix: "/ employee",
    },
    {
      id: 2,
      category: "visas",
      icon: UserPlus,
      iconColor: "#059669",
      label: "ONE TIME",
      title: "Visa for Shareholder",
      description:
        "Facilitate visa issuance for shareholders including documentation and government liaison.",
      priceAmount: 1500,
      priceSuffix: "/ shareholder",
    },
    {
      id: 3,
      category: "compliance",
      icon: FileText,
      iconColor: "#d100d9",
      label: "HOURLY",
      title: "Tax Consultancy",
      description:
        "Expert tax planning and advisory services to reduce liabilities and stay compliant.",
      priceAmount: 299,
      priceSuffix: "/ hour",
    },
    {
      id: 4,
      category: "compliance",
      icon: MessageSquare,
      iconColor: "#f59e0b",
      label: "HOURLY",
      title: "VAT Consultancy",
      description:
        "Expert VAT advice and filing support for businesses to stay compliant with UAE regulations.",
      priceAmount: 299,
      priceSuffix: "/ hour",
    },
    {
      id: 5,
      category: "finance",
      icon: BookOpen,
      iconColor: "#0c78dc",
      label: "ANNUAL",
      title: "Books & Accounting",
      hasDropdown: true,
      dropdownOptions: [
        {
          label: "Annual accounting with MIS",
          description:
            "Annual bookkeeping and MIS reports to help track business performance and compliance.",
          priceAmount: 2050,
        },
        {
          label: "Monthly accounting with MIS",
          description:
            "Monthly bookkeeping and MIS reports to help track business performance and compliance.",
          priceAmount: 5900,
        },
      ],
    },
    {
      id: 6,
      category: "compliance",
      icon: TrendingUp,
      iconColor: "#9333ea",
      label: "ANNUAL",
      title: "VAT Returns",
      hasDropdown: true,
      dropdownOptions: [
        {
          label: "Turnover up to AED 150 Million",
          description:
            "Annual VAT filing service for businesses with turnover up to AED 150 Million.",
          priceAmount: 4999,
        },
        {
          label: "Any Turnover",
          description:
            "Annual VAT filing service for businesses with any turnover amount.",
          priceAmount: 4999,
        },
      ],
    },
    {
      id: 7,
      category: "payroll",
      icon: Users,
      iconColor: "#2563eb",
      label: "ANNUAL",
      title: "Payroll and WPS",
      description:
        "Manage staff payroll with full WPS compliance and timely salary disbursement services.",
      priceAmount: 99,
      priceSuffix: "/ employee",
    },
    {
      id: 8,
      category: "finance",
      icon: Building2,
      iconColor: "#1e40af",
      label: "ONE TIME",
      title: "Bank Account Support",
      description:
        "Assistance with opening and managing business bank accounts efficiently.",
      hasDropdown: true,
      dropdownOptions: [
        {
          label: "Digital",
          description:
            "Assistance with opening and managing digital business bank accounts efficiently.",
          priceAmount: 349,
        },
        {
          label: "Physical",
          description:
            "Assistance with opening and managing physical business bank accounts efficiently.",
          priceAmount: 999,
        },
        {
          label: "Digital + Physical",
          description:
            "Assistance with opening and managing both digital and physical business bank accounts efficiently.",
          priceAmount: 1299,
        },
      ],
    },
  ];

  const filteredServices =
    activeCategory === "all"
      ? services
      : services.filter((service) => service.category === activeCategory);

  return (
    <div>
      {/* Section Header */}
      <div className="text-center mb-6 md:mb-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] mb-2 md:mb-3 px-4">
          Tailored Add-On Services
        </h2>
        <p className="text-base sm:text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto px-4">
          Enhance your business setup with our specialized services. Choose
          exactly what you need, anytime.
        </p>
      </div>

      {/* Category Filters */}
      <div className="flex justify-center gap-2 sm:gap-3 mb-6 md:mb-10 flex-wrap px-4">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`px-4 sm:px-6 py-1.5 text-sm sm:text-base rounded-md font-medium transition-all duration-300 ease-in-out ${
              activeCategory === category.id
                ? "bg-[var(--color-primary-600)] text-white shadow-md"
                : "bg-white text-[var(--color-text-secondary)] border border-[rgba(46,149,244,0.26)] hover:bg-[var(--color-primary-50)]"
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Service Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {filteredServices.map((service) => {
          const Icon = service.icon;
          const serviceKey = `service-${service.id}`;
          const selectedOptionIndex = selectedOptions[serviceKey] || 0;
          const currentOption = service.hasDropdown
            ? service.dropdownOptions[selectedOptionIndex]
            : null;
          const displayDescription = currentOption
            ? currentOption.description
            : service.description;
          const displayPriceAmount = currentOption
            ? currentOption.priceAmount
            : service.priceAmount;
          const displayPriceSuffix = currentOption
            ? currentOption.priceSuffix || ""
            : service.priceSuffix || "";

          return (
            <div
              key={service.id}
              className="rounded-xl p-4 sm:p-6 border relative transition-all duration-300 ease-in-out transform hover:scale-[1.03] hover:shadow-xl group"
              style={{
                border: "1px solid rgba(46,149,244,0.26)",
                background: "rgba(255,255,255,0.9)",
                boxShadow: "0 8px 25px rgba(12,120,220,0.08)",
              }}
            >
              {/* Label Badge */}
              <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
                <span
                  className="px-2 py-1 rounded-full text-xs font-semibold"
                  style={{
                    background: "rgba(46,149,244,0.10)",
                    color: "var(--color-primary-600)",
                  }}
                >
                  {service.label}
                </span>
              </div>

              {/* Icon */}
              <div
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-3 sm:mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
                style={{
                  background: (() => {
                    if (service.iconColor === "var(--color-primary-600)") {
                      return "rgba(12,120,220,0.15)";
                    }
                    if (service.iconColor.startsWith("#")) {
                      // Convert hex to rgba with 15% opacity
                      const hex = service.iconColor.replace("#", "");
                      const r = parseInt(hex.substring(0, 2), 16);
                      const g = parseInt(hex.substring(2, 4), 16);
                      const b = parseInt(hex.substring(4, 6), 16);
                      return `rgba(${r},${g},${b},0.15)`;
                    }
                    return "rgba(46,149,244,0.15)";
                  })(),
                }}
              >
                <Icon
                  className="w-6 h-6 transition-transform duration-300"
                  style={{
                    color: service.iconColor,
                  }}
                />
              </div>

              {/* Title */}
              <h3 className="text-lg sm:text-xl font-bold text-[var(--color-text-primary)] mb-2">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] mb-3 sm:mb-4">
                {displayDescription}
              </p>

              {/* Custom Dropdown */}
              {service.hasDropdown && (
                <DropDownSelect
                  options={service.dropdownOptions}
                  selectedIndex={selectedOptionIndex}
                  onSelect={(index) =>
                    setSelectedOptions({
                      ...selectedOptions,
                      [serviceKey]: index,
                    })
                  }
                />
              )}

              {/* Price */}
              <div className="text-lg sm:text-xl font-medium text-[var(--color-primary-600)] mt-3 sm:mt-4">
                {formatPrice(displayPriceAmount, { suffix: displayPriceSuffix })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AddOnServices;

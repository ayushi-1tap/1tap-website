import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { useCurrency } from "../../contexts/CurrencyContext";

const CURRENCY_INFO = {
  AED: { name: "UAE Dirham", flag: "🇦🇪" },
  USD: { name: "US Dollar", flag: "🇺🇸" },
  // INR: { name: "Indian Rupee", flag: "🇮🇳" }, // commented out
  // GBP: { name: "British Pound", flag: "🇬🇧" }, // commented out
};

const CurrencyDropdown = () => {
  const { currency, updateCurrency, supportedCurrencies } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

 
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleCurrencySelect = (newCurrency) => {
    updateCurrency(newCurrency);
    setIsOpen(false);
  };

  const currentCurrencyInfo = CURRENCY_INFO[currency] || CURRENCY_INFO.USD;

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-[var(--color-text-secondary)]">
          PRICING IN:
        </label>
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-[rgba(15,23,42,0.12)] rounded-lg hover:border-[var(--color-primary-600)] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-600)] focus:ring-offset-2"
            aria-label="Select currency"
            aria-expanded={isOpen}
          >
            <span className="text-base font-semibold text-[var(--color-text-primary)]">
              {currency} ({currentCurrencyInfo.name})
            </span>
            <ChevronDown
              className={`w-4 h-4 text-[var(--color-text-secondary)] transition-transform duration-200 ${
                isOpen ? "transform rotate-180" : ""
              }`}
            />
          </button>

          {isOpen && (
            <div className="absolute top-full left-0 mt-1 w-full min-w-[200px] bg-white border border-[rgba(15,23,42,0.12)] rounded-lg shadow-lg z-50 overflow-hidden">
              {supportedCurrencies.map((curr) => {
                const info = CURRENCY_INFO[curr];
                const isSelected = curr === currency;
                return (
                  <button
                    key={curr}
                    onClick={() => handleCurrencySelect(curr)}
                    className={`w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-[var(--color-primary-50)] transition-colors duration-150 ${
                      isSelected
                        ? "bg-[var(--color-primary-50)] text-[var(--color-primary-600)] font-semibold"
                        : "text-[var(--color-text-primary)]"
                    }`}
                  >
                    {/* <span className="text-lg">{info.flag}</span> */}
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">{curr}</span>
                      <span className="text-xs text-[var(--color-text-secondary)]">
                        {info.name}
                      </span>
                    </div>
                    {isSelected && (
                      <span className="ml-auto text-[var(--color-primary-600)]">
                        ✓
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CurrencyDropdown;


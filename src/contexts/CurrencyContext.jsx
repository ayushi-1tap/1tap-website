
/* eslint-disable react/prop-types */
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

const CurrencyContext = createContext();


const BASE_PRICES = {
  // New Business Packages
  "incorporation-basic": 897,
  "founders-starter": 4708,
  "strategic-success": 8610,
  // Existing Business Packages
  "business-essentials": 2241,
  "business-compliance": 4708,
  "business-elite": 8610,
  // Add-On Services
  "visa-employee": 1000,
  "visa-shareholder": 1500,
  "tax-consultancy": 299,
  "vat-consultancy": 299,
  "books-annual": 2050,
  "books-monthly": 5900,
  "vat-returns-150m": 4999,
  "vat-returns-any": 4999,
  "payroll-wps": 99,
  "bank-digital": 349,
  "bank-physical": 999,
  "bank-both": 1299,
};

// Country to Currency mapping
const COUNTRY_TO_CURRENCY = {
  AE: "AED", // UAE
  US: "USD", // United States
};

// Supported currencies (only these show in dropdown)
const SUPPORTED_CURRENCIES = ["AED", "USD"];

// cache duration (only relevant if you keep localStorage caching)
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24h

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState("USD");
  const [exchangeRates, setExchangeRates] = useState({
    AED: 1,
    USD: 0.272479564, // AED -> USD (STRICT)
    USD_TO_AED: 3.67, // USD -> AED (STRICT)
  });

  // Detect country and set initial currency (frontend only)
  useEffect(() => {
    const detectAndSetCurrency = async () => {
      const sessionDetected = sessionStorage.getItem("currencyDetected");

      // If already detected in this session, use saved currency
      if (sessionDetected === "true") {
        const savedCurrency = localStorage.getItem("selectedCurrency");
        if (savedCurrency && SUPPORTED_CURRENCIES.includes(savedCurrency)) {
          setCurrency(savedCurrency);
          return;
        }
      }

      try {
        const response = await fetch("https://api.country.is");
        const data = await response.json();
        const countryCode = data?.country?.toUpperCase() || "US";
        const detectedCurrency = COUNTRY_TO_CURRENCY[countryCode] || "USD";

        const finalCurrency = SUPPORTED_CURRENCIES.includes(detectedCurrency)
          ? detectedCurrency
          : "USD";

        setCurrency(finalCurrency);
        localStorage.setItem("selectedCurrency", finalCurrency);
        sessionStorage.setItem("currencyDetected", "true");
      } catch (error) {
        console.error("Error detecting country:", error);

        const savedCurrency = localStorage.getItem("selectedCurrency");
        const fallbackCurrency =
          savedCurrency && SUPPORTED_CURRENCIES.includes(savedCurrency)
            ? savedCurrency
            : "USD";

        setCurrency(fallbackCurrency);
        localStorage.setItem("selectedCurrency", fallbackCurrency);
        sessionStorage.setItem("currencyDetected", "true");
      }
    };

    detectAndSetCurrency();
  }, []);

  /**
   * Static exchange rates with AED as base = 1
   * Using your STRICT values:
   * USD -> AED = 3.67
   * AED -> USD = 0.272479564
   */
  const fetchExchangeRates = useCallback(async () => {
    // Check cache first
    const cachedRates = localStorage.getItem("exchangeRates");
    const cacheTimestamp = localStorage.getItem("exchangeRatesTimestamp");

    if (cachedRates && cacheTimestamp) {
      const now = Date.now();
      const cacheAge = now - parseInt(cacheTimestamp, 10);

      if (cacheAge < CACHE_DURATION) {
        try {
          const rates = JSON.parse(cachedRates);
          // basic safety: ensure required keys exist
          if (
            typeof rates?.AED === "number" &&
            typeof rates?.USD === "number" &&
            typeof rates?.USD_TO_AED === "number"
          ) {
            setExchangeRates(rates);
            return;
          }
        } catch (error) {
          console.error("Error parsing cached rates:", error);
        }
      }
    }

    const staticRates = {
      AED: 1, // base
      USD: 0.272479564, // AED -> USD (STRICT)
      USD_TO_AED: 3.67, // USD -> AED (STRICT)
    };

    setExchangeRates(staticRates);
    localStorage.setItem("exchangeRates", JSON.stringify(staticRates));
    localStorage.setItem("exchangeRatesTimestamp", Date.now().toString());
  }, []);

  useEffect(() => {
    fetchExchangeRates();
  }, [fetchExchangeRates]);

  // Update currency and save
  const updateCurrency = useCallback((newCurrency) => {
    if (SUPPORTED_CURRENCIES.includes(newCurrency)) {
      setCurrency(newCurrency);
      localStorage.setItem("selectedCurrency", newCurrency);
    }
  }, []);

  /**
   * Convert USD-based amount to selected currency using AED base logic:
   * Step 1: USD -> AED  (usdAmount * USD_TO_AED)
   * Step 2: AED -> Currency
   *   - if AED: same
   *   - if USD: amountInAED * (AED->USD)
   * 
   * Special case: If amount is exactly 1 (discounted price), return "1" without conversion
   */
  const formatPrice = useCallback(
    (usdAmount, options = {}) => {
      if (usdAmount === null || usdAmount === undefined) return "";
      const num = Number(usdAmount);
      if (Number.isNaN(num)) return "";

      const {
        showCurrency = true,
        showDecimals = false,
        suffix = "",
        prefix = "",
      } = options;

      // Special case: discounted price of 1 should always show as "1" in selected currency
      if (num === 1) {
        const currencyLabel = showCurrency ? `${currency} ` : "";
        return `${currencyLabel}1${suffix ? ` ${suffix}` : ""}${
          prefix ? ` ${prefix}` : ""
        }`;
      }

      const USD_TO_AED =
        typeof exchangeRates?.USD_TO_AED === "number"
          ? exchangeRates.USD_TO_AED
          : 3.67;

      const AED_TO_USD =
        typeof exchangeRates?.USD === "number" ? exchangeRates.USD : 0.272479564;

      // USD -> AED (base)
      const amountInAED = num * USD_TO_AED;

      // AED -> selected currency
      let convertedAmount = amountInAED;
      if (currency === "USD") convertedAmount = amountInAED * AED_TO_USD;

      // Round to ensure consistent results (no decimal places for whole numbers)
      const roundedAmount = showDecimals 
        ? convertedAmount 
        : Math.round(convertedAmount);

      const formattedAmount = roundedAmount.toLocaleString("en-US", {
        minimumFractionDigits: showDecimals ? 2 : 0,
        maximumFractionDigits: showDecimals ? 2 : 0,
      });

      const currencyLabel = showCurrency ? `${currency} ` : "";

      return `${currencyLabel}${formattedAmount}${suffix ? ` ${suffix}` : ""}${
        prefix ? ` ${prefix}` : ""
      }`;
    },
    [currency, exchangeRates]
  );

  const getBasePrice = useCallback((key) => BASE_PRICES[key] || 0, []);

  const getFormattedPrice = useCallback(
    (key, options = {}) => {
      const basePrice = getBasePrice(key);
      return formatPrice(basePrice, options);
    },
    [getBasePrice, formatPrice]
  );

  const value = {
    currency,
    updateCurrency,
    exchangeRates,
    isLoadingRates: false,
    formatPrice,
    getBasePrice,
    getFormattedPrice,
    supportedCurrencies: SUPPORTED_CURRENCIES,
  };

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
};


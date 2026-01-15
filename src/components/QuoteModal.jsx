import { useState, useEffect } from "react";
import { X, Mail, ChevronDown } from "lucide-react";

const QuoteModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    countryCode: "+971",
  });
  const [countries, setCountries] = useState([]);
  const [isLoadingCountries, setIsLoadingCountries] = useState(true);
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);

  // Fetch countries from API
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setIsLoadingCountries(true);
        const response = await fetch(
          "https://restcountries.com/v3.1/all?fields=name,cca2,flag,idd"
        );
        const data = await response.json();

        // Map API data to our format
        const mappedCountries = data
          .filter((country) => country.idd?.root && country.idd?.suffixes?.[0])
          .map((country) => ({
            code: `${country.idd.root}${country.idd.suffixes[0]}`,
            flag: country.flag,
            country: country.name.common,
            cca2: country.cca2,
          }))
          .sort((a, b) => a.country.localeCompare(b.country));

        setCountries(mappedCountries);

        // Set default to UAE if available
        const uae = mappedCountries.find((c) => c.code === "+971");
        if (uae) {
          setFormData((prev) => ({ ...prev, countryCode: "+971" }));
        }
      } catch (error) {
        console.error("Error fetching countries:", error);
        // Fallback to a few common countries if API fails
        setCountries([
          { code: "+971", flag: "🇦🇪", country: "United Arab Emirates" },
          { code: "+1", flag: "🇺🇸", country: "United States" },
          { code: "+44", flag: "🇬🇧", country: "United Kingdom" },
          { code: "+91", flag: "🇮🇳", country: "India" },
        ]);
      } finally {
        setIsLoadingCountries(false);
      }
    };

    fetchCountries();
  }, []);

  // Handle Escape key to close modal
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const selectedCountry = countries.find(
    (c) => c.code === formData.countryCode
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    // You can add your API call here
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn"
      onClick={onClose}
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        backdropFilter: "blur(3px)",
      }}
    >
      <div
        className="relative w-full max-w-md rounded-2xl p-8 shadow-2xl bg-opacity-50"
        onClick={(e) => e.stopPropagation()}
        style={{
          background:
            "linear-gradient(135deg, #FFFFFF 0%, var(--color-primary-100) 100%)",
          border: "1px solid var(--color-primary-100)",
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[var(--color-text-primary)]/70 hover:text-[var(--color-text-primary)] transition-colors duration-200"
          aria-label="Close modal"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Title */}
        <h2
          className="text-2xl md:text-3xl font-bold mb-2"
          style={{ color: "var(--color-primary-600)" }}
        >
          Get Your Free Quote
        </h2>

        {/* Description */}
        <p className="text-sm md:text-base mb-6 text-[var(--why-choose-secondary)]">
          Enter your details to receive immediate pricing and setup information.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "var(--color-text-primary)" }}
            >
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Your Name"
              required
              className="w-full h-11 px-4 rounded-lg border outline-none transition-all duration-300 focus:ring-2 focus:scale-[1.02] focus:shadow-md placeholder:text-[var(--why-choose-secondary)]/60"
              style={{
                backgroundColor: "white",
                borderColor: "var(--color-primary-500)",
                color: "var(--color-text-primary)",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "var(--color-primary-600)";
                e.target.style.boxShadow = "0 0 0 2px rgba(12, 120, 220, 0.2)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "var(--color-primary-500)";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>

          {/* Business Email */}
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "var(--color-text-primary)" }}
            >
              Business Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="name@company.com"
              required
              className="w-full h-11 px-4 rounded-lg border outline-none transition-all duration-300 focus:ring-2 focus:scale-[1.02] focus:shadow-md placeholder:text-[var(--why-choose-secondary)]/60"
              style={{
                backgroundColor: "white",
                borderColor: "var(--color-primary-500)",
                color: "var(--color-text-primary)",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "var(--color-primary-600)";
                e.target.style.boxShadow = "0 0 0 2px rgba(12, 120, 220, 0.2)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "var(--color-primary-500)";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>

          {/* Phone Number */}
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "var(--color-text-primary)" }}
            >
              Phone Number
            </label>
            <div className="flex gap-2">
              {/* Country Code Dropdown */}
              <div className="relative z-50">
                <button
                  type="button"
                  onClick={() =>
                    setIsCountryDropdownOpen(!isCountryDropdownOpen)
                  }
                  disabled={isLoadingCountries}
                  className="h-11 min-w-[100px] flex items-center gap-2 rounded-lg border px-3 text-sm outline-none transition-all duration-300 hover:scale-[1.02] hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    backgroundColor: "white",
                    borderColor: "var(--color-primary-500)",
                    color: "var(--color-text-primary)",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "var(--color-primary-600)";
                    e.target.style.boxShadow =
                      "0 0 0 2px rgba(12, 120, 220, 0.2)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "var(--color-primary-500)";
                    e.target.style.boxShadow = "none";
                  }}
                >
                  <span className="text-base">
                    {selectedCountry?.flag || "🌍"}
                  </span>
                  <span className="text-xs">
                    {selectedCountry?.code || formData.countryCode}
                  </span>
                  <ChevronDown className="h-3 w-3 ml-auto" />
                </button>

                {isCountryDropdownOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-[40]"
                      onClick={() => setIsCountryDropdownOpen(false)}
                    />
                    <div
                      className="absolute top-full left-0 mt-1 z-[50] w-64 rounded-lg border shadow-lg max-h-40 overflow-y-auto"
                      style={{
                        backgroundColor: "white",
                        borderColor: "var(--color-primary-500)",
                      }}
                    >
                      {isLoadingCountries ? (
                        <div
                          className="px-3 py-4 text-sm text-center"
                          style={{ color: "var(--color-text-primary)" }}
                        >
                          Loading countries...
                        </div>
                      ) : countries.length > 0 ? (
                        countries.map((country) => (
                          <button
                            key={country.code}
                            type="button"
                            onClick={() => {
                              setFormData((prev) => ({
                                ...prev,
                                countryCode: country.code,
                              }));
                              setIsCountryDropdownOpen(false);
                            }}
                            className="w-full flex items-center gap-3 px-3 py-2 text-sm transition-colors duration-200 hover:bg-[var(--color-primary-50)]"
                            style={{ color: "var(--color-text-primary)" }}
                          >
                            <span className="text-base">{country.flag}</span>
                            <span className="text-xs min-w-[60px]">
                              {country.code}
                            </span>
                            <span className="flex-1 text-left text-xs truncate">
                              {country.country}
                            </span>
                          </button>
                        ))
                      ) : (
                        <div
                          className="px-3 py-4 text-sm text-center"
                          style={{ color: "var(--color-text-primary)" }}
                        >
                          No countries available
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>

              {/* Phone Input */}
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="050 123 4567"
                required
                className="flex-1 h-11 px-4 rounded-lg border outline-none transition-all duration-300 focus:ring-2 focus:scale-[1.02] focus:shadow-md placeholder:text-[var(--why-choose-secondary)]/60"
                style={{
                  backgroundColor: "white",
                  borderColor: "var(--color-primary-500)",
                  color: "var(--color-text-primary)",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "var(--color-primary-600)";
                  e.target.style.boxShadow =
                    "0 0 0 2px rgba(12, 120, 220, 0.2)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "var(--color-primary-500)";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full h-12 rounded-lg font-semibold text-white inline-flex items-center justify-center gap-2 transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 hover:shadow-lg group mt-6"
            style={{
              background:
                "linear-gradient(92deg, var(--color-primary-500) 1.65%, var(--color-action) 98%)",
            }}
          >
            Get Free Quote
            <Mail className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default QuoteModal;

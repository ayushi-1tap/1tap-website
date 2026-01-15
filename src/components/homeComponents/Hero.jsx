import { useState, useEffect } from "react";
import {
  ArrowRight,
  Crown,
  LayoutDashboard,
  Building2,
  Zap,
  ChevronDown,
} from "lucide-react";

const features = [
  {
    title: "100% Ownership",
    icon: Crown,
    iconColor: "var(--icon-magenta)",
    borderGradient: "linear-gradient(135deg, #d100d9, #ff6bff)",
  },

  {
    title: "Bank Pre-Approval",
    icon: Building2,
    iconColor: "var(--icon-green)",
    borderGradient: "linear-gradient(135deg, #43c478, #6dd89a)",
  },

  {
    title: "All In One Dashboard",
    icon: LayoutDashboard,
    iconColor: "var(--icon-light-blue)",
    borderGradient: "linear-gradient(135deg, #2e95f4, #5fb3ff)",
  },
  {
    title: "Same Day License",
    icon: Zap,
    iconColor: "var(--icon-blue)",
    borderGradient: "linear-gradient(135deg, #0c78dc, #3da5f0)",
  },
];

const Hero = () => {
  const [fullName, setFullName] = useState("");
  const [businessEmail, setBusinessEmail] = useState("");
  const [countryCode, setCountryCode] = useState("+971");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [countries, setCountries] = useState([]);
  const [isLoadingCountries, setIsLoadingCountries] = useState(true);

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
          setCountryCode("+971");
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

  const selectedCountry = countries.find((c) => c.code === countryCode);

  return (
    <section className="w-full bg-[var(--color-bg-white)]">
      {/* page padding */}
      <div className="w-full px-4 sm:px-6 lg:px-16 py-6 md:py-10">
        {/* panel (not full-page bg) */}
        <div className="relative overflow-hidden rounded-3xl bg-[var(--color-bg-white)] shadow-sm">
          {/* soft blue gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary-50)] via-white to-[var(--color-primary-50)]" />

          {/* subtle grid */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.65]"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(12,120,220,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(12,120,220,0.08) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />

          {/* glow blobs */}
          <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-[var(--color-primary-500)] opacity-[0.10] blur-3xl" />
          <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-[var(--color-primary-500)] opacity-[0.10] blur-3xl" />

          <div className="relative flex flex-col md:flex-row md:justify-between md:items-center p-4 md:p-8 md:px-16 md:py-20 gap-8 md:gap-0">
            {/* LEFT */}
            <div className="w-full md:max-w-[50%]">
              {/* trust pill */}
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-blue-100)] bg-white/70 px-3 py-2 text-xs md:py-2.5 md:text-sm text-[var(--color-text-primary)] backdrop-blur">
                <span className="flex -space-x-2">
                  <span className="h-4 w-4 md:h-5 md:w-5 rounded-full bg-[var(--color-blue-100)] border border-white" />
                  <span className="h-4 w-4 md:h-5 md:w-5 rounded-full bg-[var(--color-primary-100)] border border-white" />
                  <span className="h-4 w-4 md:h-5 md:w-5 rounded-full bg-[var(--color-primary-50)] border border-white" />
                </span>
                <span className="whitespace-nowrap">
                  Trusted by founders all around the world
                </span>
              </div>

              <h1 className="mt-4 md:mt-5 text-3xl md:text-[60px] leading-[1.1] md:leading-[1.05] font-semibold text-[var(--color-neutral-800)]">
                Setup or Run Your UAE Business{" "}
                <span className="text-[var(--color-primary-600)]">
                  100% Online.
                </span>
              </h1>

              <p className="mt-4 md:mt-5 font-medium text-sm md:text-base text-[#3C3C3C] max-w-lg">
                Setup your Business in the UAE Today! Experience the future of
                business setup. Our AIO WebApp simplifies the entire process
                from company formation and visa processing, ID Cards to instant
                bank account opening.
              </p>

              {/* smaller feature pills */}
              <div className="mt-6 md:mt-10 flex flex-wrap gap-2">
                {features.map((feature) => {
                  const IconComponent = feature.icon;
                  return (
                    <span
                      key={feature.title}
                      className="inline-block rounded-md p-[1px] border border-[var(--color-blue-100)] transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-md"
                    >
                      <span className="inline-flex items-center gap-2 rounded-md bg-opacity-50 bg-white/30 px-3 md:px-4 py-2 md:py-2.5 text-[var(--color-text-primary)] group">
                        <IconComponent
                          className="h-3.5 w-3.5 md:h-4 md:w-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
                          style={{ color: feature.iconColor }}
                        />
                        <span className="text-xs md:text-sm font-medium">
                          {feature.title}
                        </span>
                      </span>
                    </span>
                  );
                })}
              </div>

              {/* CTA row */}
              <div className="mt-6 md:mt-7 flex flex-col md:flex-row items-stretch md:items-center gap-3 md:gap-4 ">
                <a
                  href="https://app.1tapbiz.com/signup"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl
                             px-5 py-3 text-sm md:text-base font-medium
                             text-[var(--color-text-reverse)] hover:bg-[var(--color-primary-700)] transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 hover:shadow-lg group"
                  style={{
                    background:
                      "linear-gradient(92deg, var(--color-primary-500) 1.65%, var(--color-action) 98%)",
                  }}
                >
                  Start my Company{" "}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>

                <a
                  href="https://api.whatsapp.com/send/?phone=971503586038"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-center sm:text-left font-medium text-sm md:text-base text-[#3C3C3C] hover:text-[var(--color-primary-600)] transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 underline"
                >
                  Talk to an expert
                </a>
              </div>
            </div>

            {/* RIGHT: glass form */}
            <div className="w-full md:w-[40%] lg:flex">
              <div
                className="w-full rounded-2xl
                           border border-white/40 bg-[var(--color-primary-500)])
                           shadow-[0_10px_30px_rgba(12,120,220,0.14)]
                         p-5 md:p-6 lg:p-7"
              >
                <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold text-[var(--color-primary-600)]">
                  Start Your Business in the right Free Zone
                </h3>

                <div className="mt-5 space-y-4">
                  <div>
                    <label className="block text-[var(--color-neutral-800)]/70 mb-2">
                      Full name
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="E.g. John Carter"
                      className="h-10 w-full rounded-lg border border-[var(--color-primary-500)]
                                 bg-white/75 px-3 text-sm text-[var(--color-text-primary)]
                                 outline-none focus:ring-2 focus:ring-[var(--color-primary-600)]/20
                                 focus:border-[var(--color-primary-600)] transition-all duration-300 ease-in-out
                                 focus:scale-[1.02] focus:shadow-md"
                    />
                  </div>

                  <div>
                    <label className="block text-[var(--color-neutral-800)]/70 mb-2">
                      Business Email
                    </label>
                    <input
                      type="email"
                      value={businessEmail}
                      onChange={(e) => setBusinessEmail(e.target.value)}
                      placeholder="E.g. john@company.com"
                      className="h-10 w-full rounded-lg border border-[var(--color-primary-500)]
                                 bg-white/75 px-3 text-sm text-[var(--color-text-primary)]
                                 outline-none focus:ring-2 focus:ring-[var(--color-primary-600)]/20
                                 focus:border-[var(--color-primary-600)] transition-all duration-300 ease-in-out
                                 focus:scale-[1.02] focus:shadow-md"
                    />
                  </div>

                  <div>
                    <label className="block text-[var(--color-neutral-800)]/70 mb-2">
                      Phone number
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
                          className="h-10 min-w-[100px] flex items-center gap-2 rounded-lg border border-[var(--color-primary-500)]
                                     bg-white/75 px-3 text-sm text-[var(--color-text-primary)]
                                     outline-none focus:ring-2 focus:ring-[var(--color-primary-600)]/20
                                     focus:border-[var(--color-primary-600)] transition-all duration-300 ease-in-out
                                     hover:scale-[1.02] hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <span className="text-base">
                            {selectedCountry?.flag || "🌍"}
                          </span>
                          <span className="text-xs">
                            {selectedCountry?.code || countryCode}
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
                              className="absolute top-full left-0 mt-1 z-[50] w-64 rounded-lg border border-[var(--color-primary-500)]
                                          bg-white shadow-lg max-h-40 overflow-y-auto"
                            >
                              {isLoadingCountries ? (
                                <div className="px-3 py-4 text-sm text-[var(--color-text-primary)]/60 text-center">
                                  Loading countries...
                                </div>
                              ) : countries.length > 0 ? (
                                countries.map((country) => (
                                  <button
                                    key={country.code}
                                    type="button"
                                    onClick={() => {
                                      setCountryCode(country.code);
                                      setIsCountryDropdownOpen(false);
                                    }}
                                    className="w-full flex items-center gap-3 px-3 py-2 text-sm text-[var(--color-text-primary)]
                                               hover:bg-[var(--color-primary-50)] transition-colors duration-200"
                                  >
                                    <span className="text-base">
                                      {country.flag}
                                    </span>
                                    <span className="text-xs min-w-[60px]">
                                      {country.code}
                                    </span>
                                    <span className="flex-1 text-left text-xs truncate">
                                      {country.country}
                                    </span>
                                  </button>
                                ))
                              ) : (
                                <div className="px-3 py-4 text-sm text-[var(--color-text-primary)]/60 text-center">
                                  No countries available
                                </div>
                              )}
                            </div>
                          </>
                        )}
                      </div>

                      {/* Phone Number Input */}
                      <input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="081234 56789"
                        className="h-10 flex-1 rounded-lg border border-[var(--color-primary-500)]
                                   bg-white/75 px-3 text-sm text-[var(--color-text-primary)]
                                   outline-none focus:ring-2 focus:ring-[var(--color-primary-600)]/20
                                   focus:border-[var(--color-primary-600)] transition-all duration-300 ease-in-out
                                   focus:scale-[1.02] focus:shadow-md"
                      />
                    </div>
                  </div>

                  <button
                    className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl
                                px-4 py-3 text-sm font-medium
                                text-[var(--color-text-reverse)] hover:bg-[var(--color-primary-700)] transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 hover:shadow-lg group"
                    style={{
                      background:
                        "linear-gradient(92deg, var(--color-primary-500) 1.65%, var(--color-action) 98%)",
                    }}
                  >
                    Start my Company{" "}
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* spacing below like screenshot */}
        <div className="h-6" />
      </div>
    </section>
  );
};

export default Hero;

import { useMemo, useState, useEffect } from "react";
import {
  User,
  Phone,
  Mail,
  ArrowRight,
  ShieldCheck,
  ChevronDown,
} from "lucide-react";

const GetInTouch = () => {
  const [form, setForm] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
  });

  const [countryCode, setCountryCode] = useState("+971");
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [countries, setCountries] = useState([]);
  const [isLoadingCountries, setIsLoadingCountries] = useState(true);

  const [touched, setTouched] = useState({
    fullName: false,
    phoneNumber: false,
    email: false,
  });

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

  const errors = useMemo(() => {
    const e = {};
    if (!form.fullName.trim()) e.fullName = "Full Name is required.";
    if (!form.phoneNumber.trim()) e.phoneNumber = "Phone Number is required.";
    if (!form.email.trim()) e.email = "Email is required.";
    else if (!/^\S+@\S+\.\S+$/.test(form.email.trim()))
      e.email = "Please enter a valid email.";
    return e;
  }, [form]);

  const isValid = Object.keys(errors).length === 0;

  const onChange = (key) => (ev) =>
    setForm((p) => ({ ...p, [key]: ev.target.value }));

  const onBlur = (key) => () => setTouched((p) => ({ ...p, [key]: true }));

  const onSubmit = (e) => {
    e.preventDefault();
    setTouched({ fullName: true, phoneNumber: true, email: true });
    if (!isValid) return;

    const formData = {
      ...form,
      countryCode,
      fullPhoneNumber: `${countryCode} ${form.phoneNumber}`,
    };

    console.log("Submit:", formData);
  };

  const fieldBase =
    "w-full rounded-xl border bg-white px-11 py-3 text-sm text-[#0B1B3A] " +
    "placeholder:text-[rgba(15,23,42,0.45)] " +
    "shadow-[0_6px_18px_rgba(15,23,42,0.05)] " +
    "transition-all duration-200 " +
    "focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)] focus:border-transparent";

  const labelBase = "text-sm font-semibold text-[rgba(15,23,42,0.75)]";
  const helperBase = "mt-1 text-[12px]";

  return (
    <section className="w-full bg-[var(--color-bg-white)]">
      <div className="mx-auto w-full  px-4 sm:px-6 lg:px-16 py-12 md:pt-14">
        <div className="relative overflow-hidden rounded-3xl bg-white border border-[rgba(15,23,42,0.08)] shadow-[0_18px_55px_rgba(15,23,42,0.08)]">
          {/* soft gradient backdrop */}
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary-50)] via-white to-[var(--color-primary-50)]" />
          <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-[var(--color-primary-500)] opacity-[0.10] blur-3xl" />
          <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-[var(--color-primary-500)] opacity-[0.10] blur-3xl" />

          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 p-6 sm:p-8 lg:px-16 lg:py-12">
            {/* LEFT: copy */}
            <div className="flex flex-col justify-center md:pl-10">
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[rgba(15,23,42,0.10)] bg-white/70 px-3 py-1 text-[11px] font-semibold text-[rgba(15,23,42,0.70)]">
                <ShieldCheck className="h-4 w-4 text-[var(--color-primary-500)]" />
                Typically replies within 24 hours
              </div>

              <h2 className="mt-4 text-[26px]  md:text-[40px] font-extrabold leading-[1.1] text-[#0B1B3A]">
                Get in touch
              </h2>

              <p className="mt-3 max-w-xl text-sm md:text-lg text-[rgba(15,23,42,0.70)]">
                Share your details and we’ll help you choose the right setup,
                pricing, and timeline for your UAE business.
              </p>

              <ul className="mt-6 space-y-4 text-[rgba(15,23,42,0.70)]">
                <li className="flex text-lg items-start gap-3">
                  <span className=" mt-3 md:h-2 md:w-2 h-2 w-3 rounded-full bg-[var(--color-primary-500)]" />
                  Transparent guidance on license, jurisdiction, and costs.
                </li>
                <li className="flex items-start gap-3">
                  <span className=" mt-2 h-2 w-2 rounded-full bg-[var(--color-primary-500)]" />
                  Quick checklist of documents and next steps.
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-[var(--color-primary-500)]" />
                  Free initial consultation with our team.
                </li>
              </ul>
            </div>

            {/* RIGHT: form card */}
            <div className="flex items-center justify-center">
              <div className="w-full ">
                <form
                  onSubmit={onSubmit}
                  className="
                    group relative rounded-2xl bg-white/90 backdrop-blur
                    border border-[rgba(15,23,42,0.08)]
                    shadow-[0_18px_55px_rgba(15,23,42,0.10)]
                    p-5 sm:p-6
                  "
                >
                  <div className="mb-4">
                    <h3 className="text-base font-bold text-[#0B1B3A]">
                      Start a conversation
                    </h3>
                    <p className="mt-1 text-xs text-[rgba(15,23,42,0.60)]">
                      Fill the form and we’ll reach out shortly.
                    </p>
                  </div>

                  {/* Full Name */}
                  <div className="mb-4">
                    <label className={labelBase}>
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative mt-2">
                      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
                        <User className="h-4 w-4 text-[rgba(15,23,42,0.45)]" />
                      </span>
                      <input
                        type="text"
                        name="fullName"
                        value={form.fullName}
                        onChange={onChange("fullName")}
                        onBlur={onBlur("fullName")}
                        placeholder="Your full name"
                        className={`${fieldBase} ${
                          touched.fullName && errors.fullName
                            ? "border-red-300 ring-1 ring-red-200"
                            : "border-[rgba(15,23,42,0.10)] hover:border-[rgba(15,23,42,0.18)]"
                        }`}
                      />
                    </div>
                    {touched.fullName && errors.fullName ? (
                      <p className={`${helperBase} text-red-500`}>
                        {errors.fullName}
                      </p>
                    ) : (
                      <p className={`${helperBase} text-[rgba(15,23,42,0.55)]`}>
                        As per your passport or official ID.
                      </p>
                    )}
                  </div>

                  {/* Phone Number */}
                  <div className="mb-4">
                    <label className={labelBase}>
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <div className="flex gap-2 mt-2">
                      {/* Country Code Dropdown */}
                      <div className="relative z-50">
                        <button
                          type="button"
                          onClick={() =>
                            setIsCountryDropdownOpen(!isCountryDropdownOpen)
                          }
                          disabled={isLoadingCountries}
                          className={`h-[42px] min-w-[100px] flex items-center gap-2 rounded-xl border bg-white px-3 text-sm text-[#0B1B3A] shadow-[0_6px_18px_rgba(15,23,42,0.05)] transition-all duration-200 outline-none focus:ring-2 focus:ring-[var(--color-primary-500)] focus:border-transparent hover:border-[rgba(15,23,42,0.18)] disabled:opacity-50 disabled:cursor-not-allowed ${
                            touched.phoneNumber && errors.phoneNumber
                              ? "border-red-300 ring-1 ring-red-200"
                              : "border-[rgba(15,23,42,0.10)]"
                          }`}
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
                            <div className="absolute top-full left-0 mt-1 z-[50] w-64 rounded-lg border border-[rgba(15,23,42,0.10)] bg-white shadow-lg max-h-40 overflow-y-auto">
                              {isLoadingCountries ? (
                                <div className="px-3 py-4 text-sm text-[rgba(15,23,42,0.60)] text-center">
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
                                    className="w-full flex items-center gap-3 px-3 py-2 text-sm text-[#0B1B3A] hover:bg-[var(--color-primary-50)] transition-colors duration-200"
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
                                <div className="px-3 py-4 text-sm text-[rgba(15,23,42,0.60)] text-center">
                                  No countries available
                                </div>
                              )}
                            </div>
                          </>
                        )}
                      </div>

                      {/* Phone Number Input */}
                      <div className="relative flex-1">
                        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
                          <Phone className="h-4 w-4 text-[rgba(15,23,42,0.45)]" />
                        </span>
                        <input
                          type="tel"
                          name="phoneNumber"
                          value={form.phoneNumber}
                          onChange={onChange("phoneNumber")}
                          onBlur={onBlur("phoneNumber")}
                          placeholder="50 000 0000"
                          className={`${fieldBase} ${
                            touched.phoneNumber && errors.phoneNumber
                              ? "border-red-300 ring-1 ring-red-200"
                              : "border-[rgba(15,23,42,0.10)] hover:border-[rgba(15,23,42,0.18)]"
                          }`}
                        />
                      </div>
                    </div>
                    {touched.phoneNumber && errors.phoneNumber ? (
                      <p className={`${helperBase} text-red-500`}>
                        {errors.phoneNumber}
                      </p>
                    ) : (
                      <p className={`${helperBase} text-[rgba(15,23,42,0.55)]`}>
                        Include country code for faster response.
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="mb-5">
                    <label className={labelBase}>
                      Email <span className="text-red-500">*</span>
                    </label>
                    <div className="relative mt-2">
                      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
                        <Mail className="h-4 w-4 text-[rgba(15,23,42,0.45)]" />
                      </span>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={onChange("email")}
                        onBlur={onBlur("email")}
                        placeholder="you@company.com"
                        className={`${fieldBase} ${
                          touched.email && errors.email
                            ? "border-red-300 ring-1 ring-red-200"
                            : "border-[rgba(15,23,42,0.10)] hover:border-[rgba(15,23,42,0.18)]"
                        }`}
                      />
                    </div>
                    {touched.email && errors.email ? (
                      <p className={`${helperBase} text-red-500`}>
                        {errors.email}
                      </p>
                    ) : (
                      <p className={`${helperBase} text-[rgba(15,23,42,0.55)]`}>
                        We’ll only use this to contact you.
                      </p>
                    )}
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={!isValid}
                    className={`
                      w-full inline-flex items-center justify-center gap-2
                      rounded-xl px-4 py-3 text-sm font-semibold text-white
                      transition-all duration-200
                      shadow-[0_12px_30px_rgba(15,23,42,0.12)]
                      active:scale-[0.98]
                      ${
                        isValid
                          ? "hover:-translate-y-[1px] hover:shadow-[0_16px_38px_rgba(15,23,42,0.16)]"
                          : "opacity-60 cursor-not-allowed"
                      }
                    `}
                    style={{
                      background:
                        "linear-gradient(92deg, var(--color-primary-500) 1.65%, var(--color-action) 98%)",
                    }}
                  >
                    Submit
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </button>

                  {/* Footer note */}
                  <div className="mt-4 flex items-start gap-2 rounded-xl border border-[rgba(15,23,42,0.08)] bg-white px-3 py-2">
                    <ShieldCheck className="mt-0.5 h-4 w-4 text-[var(--color-primary-600)]" />
                    <p className="text-[11px] leading-4 text-[rgba(15,23,42,0.60)]">
                      Your information is kept private. No spam. Unsubscribe
                      anytime.
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* bottom accent bar */}
          <div
            className="relative h-2 w-full"
            style={{
              background:
                "linear-gradient(92deg, var(--color-primary-500) 1.65%, var(--color-action) 98%)",
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default GetInTouch;

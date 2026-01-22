import { useState, useEffect, useMemo, useRef } from "react";
import {
  ArrowRight,
  Crown,
  LayoutDashboard,
  Building2,
  Zap,
} from "lucide-react";
import intlTelInput from "intl-tel-input";
import { createLeadFromWebsite } from "../../utils/api";
import { motion } from "framer-motion";
import image3 from "../../assets/image 3.avif";
import dummyCustomer from "../../assets/dummy customer -1.avif";
import image2 from "../../assets/image 2.avif";

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
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const phoneInputRef = useRef(null);
  const itiRef = useRef(null);
  const [touched, setTouched] = useState({
    fullName: false,
    businessEmail: false,
    phoneNumber: false,
  });

  // Initialize intl-tel-input and detect user country
  useEffect(() => {
    if (!phoneInputRef.current) return;

    // Detect user country
    const detectCountry = async () => {
      try {
        const response = await fetch("https://api.country.is");
        const data = await response.json();
        const countryCode = data?.country || "AE"; // Fallback to AE
        return countryCode.toLowerCase();
      } catch (error) {
        console.error("Error detecting country:", error);
        return "ae"; // Fallback to AE
      }
    };

    const initIntlTelInput = async () => {
      const defaultCountry = await detectCountry();

      itiRef.current = intlTelInput(phoneInputRef.current, {
        initialCountry: defaultCountry,
        preferredCountries: ["ae", "us", "gb", "in"],
        utilsScript:
          "https://cdn.jsdelivr.net/npm/intl-tel-input@25.15.0/build/js/utils.js",
      });


      if (phoneInputRef.current) {
        phoneInputRef.current.addEventListener("countrychange", () => {
          if (phoneInputRef.current) {
            phoneInputRef.current.dispatchEvent(new Event("input"));
          }
        });
        
        // Sync state with input value on change (for validation)
        phoneInputRef.current.addEventListener("input", () => {
          if (phoneInputRef.current) {
            setPhoneNumber(phoneInputRef.current.value);
          }
        });
      }
    };

    initIntlTelInput();

    return () => {
      if (itiRef.current) {
        itiRef.current.destroy();
      }
    };
  }, []);

  // Validation logic
  const errors = useMemo(() => {
    const e = {};
    if (!fullName.trim()) {
      e.fullName = "Full Name is required.";
    } else if (fullName.trim().length < 2) {
      e.fullName = "Full Name must be at least 2 characters.";
    } else if (!/^[a-zA-Z\s'-]+$/.test(fullName.trim())) {
      e.fullName =
        "Full Name should only contain letters, spaces, hyphens, and apostrophes.";
    }

    if (!businessEmail.trim()) {
      e.businessEmail = "Business Email is required.";
    } else if (!/^\S+@\S+\.\S+$/.test(businessEmail.trim())) {
      e.businessEmail = "Please enter a valid email address.";
    }

    // Get the current value from input (most up-to-date) or fall back to state
    const currentInputValue = phoneInputRef.current?.value?.trim() || phoneNumber.trim();
    if (!currentInputValue) {
      e.phoneNumber = "Phone Number is required.";
    } else if (itiRef.current && phoneInputRef.current) {
      // Check if utils are loaded before using strict validation
      const utilsLoaded = window.intlTelInputUtils !== undefined;
      if (utilsLoaded) {
        // Use strict validation - isValidNumber() reads from the input element
        // Ensure we're checking the current input value
        if (!itiRef.current.isValidNumber()) {
          e.phoneNumber = "Please enter a valid phone number.";
        }
      } else {
        // Fallback: check if there are enough digits (at least 7)
        const digitsOnly = currentInputValue.replace(/\D/g, "");
        if (digitsOnly.length < 7) {
          e.phoneNumber = "Phone Number must be at least 7 digits.";
        }
      }
    } else {
      // Fallback validation if intl-tel-input isn't initialized yet
      const digitsOnly = currentInputValue.replace(/\D/g, "");
      if (digitsOnly.length < 7) {
        e.phoneNumber = "Phone Number must be at least 7 digits.";
      }
    }

    return e;
  }, [fullName, businessEmail, phoneNumber]);

  const isValid = Object.keys(errors).length === 0;

  // Helper function to parse full name
  const parseFullName = (fullNameValue) => {
    const parts = fullNameValue.trim().split(/\s+/).filter(Boolean);
    let firstName = null,
      middleName = null,
      lastName = null;

    switch (parts.length) {
      case 0:
        break;
      case 1:
        firstName = parts[0];
        break;
      case 2:
        [firstName, lastName] = parts;
        break;
      case 3:
        [firstName, middleName, lastName] = parts;
        break;
      default:
        // 4 or more: first two → firstName, last two → lastName, drop any extra
        firstName = parts.slice(0, 2).join(" ");
        lastName = parts.slice(-2).join(" ");
        break;
    }

    return {
      firstName,
      ...(middleName && { middleName }),
      ...(lastName && { lastName }),
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({
      fullName: true,
      businessEmail: true,
      phoneNumber: true,
    });

    if (!isValid) {
      console.log("Form validation failed:", errors);
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      const parsedName = parseFullName(fullName);

      // Get phone number and country code separately from intl-tel-input
      let phoneNumberValue = phoneNumber.trim();
      let countryCode = "+971"; // Default to UAE

      if (itiRef.current) {
        // Get country data to extract dial code
        const countryData = itiRef.current.getSelectedCountryData();
        if (countryData && countryData.dialCode) {
          countryCode = `+${countryData.dialCode}`;
        }

        // Get the full number in E.164 format and extract just the number part
        const fullNumber = itiRef.current.getNumber();
        if (fullNumber) {
          // Remove the country code prefix to get just the number
          const dialCode = countryData?.dialCode || "971";
          phoneNumberValue = fullNumber
            .replace(`+${dialCode}`, "")
            .replace(/\D/g, "");
        } else {
          // Fallback: use the input value and remove any country code if present
          phoneNumberValue = phoneNumber.replace(/\D/g, "");
        }
      } else {
        // Fallback if intl-tel-input isn't initialized
        phoneNumberValue = phoneNumber.replace(/\D/g, "");
      }

      const payload = {
        ...parsedName,
        email: businessEmail.trim(),
        phone: phoneNumberValue,
        countryCode: countryCode,
        source: "Website",
      };

      console.log("Hero Form Submitted:", payload);

      await createLeadFromWebsite(payload);

      setSubmitSuccess(true);
      console.log("Lead created successfully");

      // Reset form immediately after successful submission
      setFullName("");
      setBusinessEmail("");
      setPhoneNumber("");
      setTouched({
        fullName: false,
        businessEmail: false,
        phoneNumber: false,
      });

      // Reset intl-tel-input to default country
      if (itiRef.current && phoneInputRef.current) {
        itiRef.current.setCountry("ae"); // Reset to default country
        phoneInputRef.current.value = "";
      }

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitError(
        error.response?.data?.message ||
          "Failed to submit form. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.section 
      className="w-full bg-[var(--color-bg-white)]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* page padding */}
      <div className="w-full px-4 sm:px-6 lg:px-16 py-10">
        
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

          <div className="relative flex flex-col md:flex-row md:justify-between md:items-center p-4 md:p-8 3xl:px-16 3xl:py-20 gap-8 md:gap-0">
            {/* LEFT */}
            <motion.div 
              className="w-full md:max-w-[55%] 3xl:max-w-[50%]"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {/* trust pill */}
              <motion.div 
                className="inline-flex items-center gap-2 rounded-full border border-[var(--color-blue-100)] bg-white/70 px-3 py-2 text-xs md:py-2.5 md:text-sm text-[var(--color-text-primary)] backdrop-blur"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <span className="flex -space-x-2">
                  <img 
                    src={image3} 
                    alt="Customer" 
                    className="h-4 w-4 md:h-6 md:w-6 rounded-full border border-white object-cover" 
                  />
                  <img 
                    src={dummyCustomer} 
                    alt="Customer" 
                    className="h-4 w-4 md:h-6 md:w-6 rounded-full border border-white object-cover" 
                  />
                  <img 
                    src={image2} 
                    alt="Customer" 
                    className="h-4 w-4 md:h-6 md:w-6 rounded-full border border-white object-cover" 
                  />
                </span>
                <span className="whitespace-nowrap ">
                  Trusted by founders all around the world
                </span>
              </motion.div>

              <motion.h1 
                className="mt-4 md:mt-6 text-3xl md:text-[45px] 3xl:text-[64px] leading-[1.1] md:leading-[1.05] font-semibold text-[var(--color-neutral-800)]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                Setup or Run Your UAE Business the Smart Way. {" "}
                <motion.span 
                  className="text-[var(--color-primary-600)] relative"
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  transition={{ 
                    duration: 1.2, 
                    delay: 0.8,
                    ease: "easeInOut"
                  }}
                >
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1.2 }}
                  >
                    100% Online.
                  </motion.span>
             
                </motion.span>
              </motion.h1>

              <motion.p 
                className="mt-4 md:mt-5 font-medium text-sm md:text-base text-[#3C3C3C] max-w-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                Setup your Business in the UAE Today! Experience the future of
                business setup. Our AIO WebApp simplifies the entire process
                from company formation and visa processing, ID Cards to instant
                bank account opening.
              </motion.p>

              {/* smaller feature pills */}
              <div className="mt-6 md:mt-14 flex flex-wrap gap-2">
                {features.map((feature, index) => {
                  const IconComponent = feature.icon;
                  return (
                    <motion.span
                      key={feature.title}
                      className="inline-block rounded-md p-[1px] border border-[var(--color-blue-100)] transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-md"
                      initial={{ opacity: 0, x: -30, scale: 0.8 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      transition={{ 
                        duration: 0.6, 
                        delay: 0.7 + (index * 0.1),
                        ease: "easeOut"
                      }}
                      whileHover={{ scale: 1.05, y: -2 }}
                    >
                      <span className="inline-flex items-center gap-2 rounded-md bg-opacity-50 bg-white/30 px-3 md:px-4 py-2 md:py-2.5 text-[var(--color-text-primary)] group">
                        <motion.div
                          initial={{ opacity: 0, x: -20, rotate: -45 }}
                          animate={{ opacity: 1, x: 0, rotate: 0 }}
                          transition={{ 
                            duration: 0.5, 
                            delay: 0.9 + (index * 0.1),
                            ease: "easeOut"
                          }}
                        >
                          <IconComponent
                            className="h-3.5 w-3.5 md:h-4 md:w-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
                            style={{ color: feature.iconColor }}
                          />
                        </motion.div>
                        <span className="text-xs md:text-sm font-medium">
                          {feature.title}
                        </span>
                      </span>
                    </motion.span>
                  );
                })}
              </div>

              {/* CTA row */}
              <motion.div 
                className="mt-6 md:mt-7 flex flex-col md:flex-row items-stretch md:items-center gap-3 md:gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.1 }}
              >
                <motion.a
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
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start my Company{" "}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </motion.a>

                <motion.a
                  href="https://api.whatsapp.com/send/?phone=971503586038"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-center sm:text-left font-medium text-sm md:text-base text-[#3C3C3C] hover:text-[var(--color-primary-600)] transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 underline"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Talk to an expert
                </motion.a>
              </motion.div>
            </motion.div>

            {/* RIGHT: glass form */}
            <motion.div 
              className="w-full md:w-[40%] lg:flex"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            >
              <motion.div
                className="w-full rounded-2xl
                           border border-white/40 bg-[var(--color-primary-500)])
                           shadow-[0_10px_30px_rgba(12,120,220,0.14)]
                         p-5 md:p-6 lg:p-7"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold text-[var(--color-primary-600)]">
                  Start Your Business in the right Free Zone
                </h3>

                <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                  <div>
                    <label className="block text-[var(--color-neutral-800)]/70 mb-2">
                      Full name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      onBlur={() =>
                        setTouched((prev) => ({ ...prev, fullName: true }))
                      }
                      placeholder="E.g. John Carter"
                      className={`h-10 w-full rounded-lg border px-3 text-sm text-[var(--color-text-primary)]
                                 bg-white/75 outline-none transition-all duration-300 ease-in-out
                                 focus:ring-2 focus:ring-[var(--color-primary-600)]/20
                                 focus:border-[var(--color-primary-600)] focus:scale-[1.02] focus:shadow-md ${
                                   touched.fullName && errors.fullName
                                     ? "border-red-500 ring-1 ring-red-200"
                                     : "border-[var(--color-primary-500)]"
                                 }`}
                    />
                    {touched.fullName && errors.fullName && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-[var(--color-neutral-800)]/70 mb-2">
                      Business Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={businessEmail}
                      onChange={(e) => setBusinessEmail(e.target.value)}
                      onBlur={() =>
                        setTouched((prev) => ({ ...prev, businessEmail: true }))
                      }
                      placeholder="E.g. john@company.com"
                      className={`h-10 w-full rounded-lg border px-3 text-sm text-[var(--color-text-primary)]
                                 bg-white/75 outline-none transition-all duration-300 ease-in-out
                                 focus:ring-2 focus:ring-[var(--color-primary-600)]/20
                                 focus:border-[var(--color-primary-600)] focus:scale-[1.02] focus:shadow-md ${
                                   touched.businessEmail && errors.businessEmail
                                     ? "border-red-500 ring-1 ring-red-200"
                                     : "border-[var(--color-primary-500)]"
                                 }`}
                    />
                    {touched.businessEmail && errors.businessEmail && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.businessEmail}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-[var(--color-neutral-800)]/70 mb-2">
                      Phone number <span className="text-red-500">*</span>
                    </label>
                    <div className="w-full">
                      <input
                        ref={phoneInputRef}
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => {
                          // Filter out alphabets - only allow numbers, spaces, hyphens, parentheses, and plus
                          const filteredValue = e.target.value.replace(
                            /[^0-9\s\-()+]/g,
                            ""
                          );
                          setPhoneNumber(filteredValue);
                          // The input event listener will sync the formatted value from intl-tel-input
                        }}
                        onBlur={() => {
                          setTouched((prev) => ({
                            ...prev,
                            phoneNumber: true,
                          }));
                          // Sync state with intl-tel-input's formatted value
                          if (phoneInputRef.current && itiRef.current) {
                            const formattedValue = phoneInputRef.current.value;
                            setPhoneNumber(formattedValue);
                          }
                        }}
                        placeholder="081234 56789"
                        className={`h-10 w-full rounded-lg border pl-[52px] pr-3 text-sm text-[var(--color-text-primary)]
                                   bg-white/75 outline-none transition-all duration-300 ease-in-out
                                   focus:ring-2 focus:ring-[var(--color-primary-600)]/20
                                   focus:border-[var(--color-primary-600)] focus:scale-[1.02] focus:shadow-md ${
                                     touched.phoneNumber && errors.phoneNumber
                                       ? "border-red-500 ring-1 ring-red-200"
                                       : "border-[var(--color-primary-500)]"
                                   }`}
                      />
                    </div>
                    {touched.phoneNumber && errors.phoneNumber && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.phoneNumber}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={!isValid || isSubmitting}
                    className={`mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl
                                px-4 py-3 text-sm font-medium
                                text-[var(--color-text-reverse)] transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 hover:shadow-lg group ${
                                  isValid && !isSubmitting
                                    ? "hover:bg-[var(--color-primary-700)]"
                                    : "opacity-60 cursor-not-allowed"
                                }`}
                    style={{
                      background:
                        "linear-gradient(92deg, var(--color-primary-500) 1.65%, var(--color-action) 98%)",
                    }}
                  >
                    {isSubmitting ? "Submitting..." : "Start my Company"}{" "}
                    {!isSubmitting && (
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    )}
                  </button>
                  {submitSuccess && (
                    <p className="mt-2 text-xs text-green-600 text-center">
                      Form submitted successfully!
                    </p>
                  )}
                  {submitError && (
                    <p className="mt-2 text-xs text-red-500 text-center">
                      {submitError}
                    </p>
                  )}
                </form>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* spacing below like screenshot */}
        <div className="h-6" />
      </div>
    </motion.section>
  );
};

export default Hero;

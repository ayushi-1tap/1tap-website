import { useState, useEffect, useMemo, useRef } from "react";
import { X, Mail } from "lucide-react";
import intlTelInput from "intl-tel-input";
import { createLeadFromWebsite } from "../utils/api";

const QuoteModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
  });
  const phoneInputRef = useRef(null);
  const itiRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [touched, setTouched] = useState({
    fullName: false,
    email: false,
    phone: false,
  });

  // Initialize intl-tel-input and detect user country
  useEffect(() => {
    if (!phoneInputRef.current || !isOpen) return;

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
    };

    initIntlTelInput();

    return () => {
      if (itiRef.current) {
        itiRef.current.destroy();
      }
    };
  }, [isOpen]);

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

  // Validation logic
  const errors = useMemo(() => {
    const e = {};
    if (!formData.fullName.trim()) {
      e.fullName = "Full Name is required.";
    } else if (formData.fullName.trim().length < 2) {
      e.fullName = "Full Name must be at least 2 characters.";
    } else if (!/^[a-zA-Z\s'-]+$/.test(formData.fullName.trim())) {
      e.fullName =
        "Full Name should only contain letters, spaces, hyphens, and apostrophes.";
    }

    if (!formData.email.trim()) {
      e.email = "Business Email is required.";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email.trim())) {
      e.email = "Please enter a valid email address.";
    }

    // Get the actual value from the input element for validation
    const phoneInputValue = phoneInputRef.current?.value || formData.phone;
    if (!phoneInputValue || !phoneInputValue.trim()) {
      e.phone = "Phone Number is required.";
    } else if (itiRef.current) {
      // Check if utils are loaded before using strict validation
      const utilsLoaded = window.intlTelInputUtils !== undefined;
      if (utilsLoaded) {
        // Use strict validation only if utils are loaded
        if (!itiRef.current.isValidNumber()) {
          e.phone = "Please enter a valid phone number.";
        }
      } else {
        // Fallback: check if there are enough digits (at least 7)
        const digitsOnly = phoneInputValue.replace(/\D/g, "");
        if (digitsOnly.length < 7) {
          e.phone = "Phone Number must be at least 7 digits.";
        }
      }
    } else {
      // Fallback validation if intl-tel-input isn't initialized yet
      const digitsOnly = phoneInputValue.trim().replace(/\D/g, "");
      if (digitsOnly.length < 7) {
        e.phone = "Phone Number must be at least 7 digits.";
      }
    }

    return e;
  }, [formData]);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Filter out alphabets for phone number - only allow numbers, spaces, hyphens, parentheses, and plus
    const filteredValue =
      name === "phone" ? value.replace(/[^0-9\s\-()+]/g, "") : value;
    setFormData((prev) => ({
      ...prev,
      [name]: filteredValue,
    }));
  };

  const handleBlur = (field) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    // Sync state with intl-tel-input's formatted value for phone
    if (field === "phone" && phoneInputRef.current && itiRef.current) {
      const formattedValue = phoneInputRef.current.value;
      setFormData((prev) => ({ ...prev, phone: formattedValue }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({
      fullName: true,
      email: true,
      phone: true,
    });

    if (!isValid) {
      console.log("Quote Modal Form validation failed:", errors);
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      const parsedName = parseFullName(formData.fullName);

      // Get phone number and country code separately from intl-tel-input
      let phoneNumberValue = formData.phone.trim();
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
          phoneNumberValue = formData.phone.replace(/\D/g, "");
        }
      } else {
        // Fallback if intl-tel-input isn't initialized
        phoneNumberValue = formData.phone.replace(/\D/g, "");
      }

      const payload = {
        ...parsedName,
        email: formData.email.trim(),
        phone: phoneNumberValue,
        countryCode: countryCode,
        source: "Website",
      };

      console.log("Quote Modal Form Submitted:", payload);

      await createLeadFromWebsite(payload);

      setSubmitSuccess(true);
      console.log("Lead created successfully");

      // Reset form immediately after successful submission
      setFormData({
        fullName: "",
        email: "",
        phone: "",
      });
      setTouched({
        fullName: false,
        email: false,
        phone: false,
      });

      // Reset intl-tel-input to default country
      if (itiRef.current && phoneInputRef.current) {
        itiRef.current.setCountry("ae"); // Reset to default country
        phoneInputRef.current.value = "";
      }

      // Clear success message and close modal after 2 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
        onClose();
      }, 2000);
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
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full h-11 px-4 rounded-lg border outline-none transition-all duration-300 focus:ring-2 focus:scale-[1.02] focus:shadow-md placeholder:text-[var(--why-choose-secondary)]/60"
              style={{
                backgroundColor: "white",
                borderColor:
                  touched.fullName && errors.fullName
                    ? "#ef4444"
                    : "var(--color-primary-500)",
                color: "var(--color-text-primary)",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "var(--color-primary-600)";
                e.target.style.boxShadow = "0 0 0 2px rgba(12, 120, 220, 0.2)";
              }}
              onBlur={(e) => {
                handleBlur("fullName")();
                e.target.style.borderColor =
                  touched.fullName && errors.fullName
                    ? "#ef4444"
                    : "var(--color-primary-500)";
                e.target.style.boxShadow = "none";
              }}
            />
            {touched.fullName && errors.fullName && (
              <p className="mt-1 text-xs text-red-500">{errors.fullName}</p>
            )}
          </div>

          {/* Business Email */}
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "var(--color-text-primary)" }}
            >
              Business Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="name@company.com"
              className="w-full h-11 px-4 rounded-lg border outline-none transition-all duration-300 focus:ring-2 focus:scale-[1.02] focus:shadow-md placeholder:text-[var(--why-choose-secondary)]/60"
              style={{
                backgroundColor: "white",
                borderColor:
                  touched.email && errors.email
                    ? "#ef4444"
                    : "var(--color-primary-500)",
                color: "var(--color-text-primary)",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "var(--color-primary-600)";
                e.target.style.boxShadow = "0 0 0 2px rgba(12, 120, 220, 0.2)";
              }}
              onBlur={(e) => {
                handleBlur("email")();
                e.target.style.borderColor =
                  touched.email && errors.email
                    ? "#ef4444"
                    : "var(--color-primary-500)";
                e.target.style.boxShadow = "none";
              }}
            />
            {touched.email && errors.email && (
              <p className="mt-1 text-xs text-red-500">{errors.email}</p>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "var(--color-text-primary)" }}
            >
              Phone Number
            </label>
            <div className="w-full">
              <input
                ref={phoneInputRef}
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="050 123 4567"
                className="w-full h-11 pl-[52px] pr-4 rounded-lg border outline-none transition-all duration-300 focus:ring-2 focus:scale-[1.02] focus:shadow-md placeholder:text-[var(--why-choose-secondary)]/60"
                style={{
                  backgroundColor: "white",
                  borderColor:
                    touched.phone && errors.phone
                      ? "#ef4444"
                      : "var(--color-primary-500)",
                  color: "var(--color-text-primary)",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "var(--color-primary-600)";
                  e.target.style.boxShadow =
                    "0 0 0 2px rgba(12, 120, 220, 0.2)";
                }}
                onBlur={(e) => {
                  handleBlur("phone")();
                  e.target.style.borderColor =
                    touched.phone && errors.phone
                      ? "#ef4444"
                      : "var(--color-primary-500)";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>
            {touched.phone && errors.phone && (
              <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!isValid || isSubmitting}
            className={`w-full h-12 rounded-lg font-semibold text-white inline-flex items-center justify-center gap-2 transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 hover:shadow-lg group mt-6 ${
              isValid && !isSubmitting ? "" : "opacity-60 cursor-not-allowed"
            }`}
            style={{
              background:
                "linear-gradient(92deg, var(--color-primary-500) 1.65%, var(--color-action) 98%)",
            }}
          >
            {isSubmitting ? "Submitting..." : "Get Free Quote"}
            {!isSubmitting && (
              <Mail className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
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
      </div>
    </div>
  );
};

export default QuoteModal;

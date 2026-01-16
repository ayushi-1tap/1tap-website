import { useMemo, useState, useEffect, useRef } from "react";
import { User, Mail, ArrowRight, ShieldCheck } from "lucide-react";
import intlTelInput from "intl-tel-input";
import { createLeadFromWebsite } from "../utils/api";

const GetInTouch = () => {
  const [form, setForm] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const phoneInputRef = useRef(null);
  const itiRef = useRef(null);

  const [touched, setTouched] = useState({
    fullName: false,
    phoneNumber: false,
    email: false,
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
    };

    initIntlTelInput();

    return () => {
      if (itiRef.current) {
        itiRef.current.destroy();
      }
    };
  }, []);

  const errors = useMemo(() => {
    const e = {};
    if (!form.fullName.trim()) {
      e.fullName = "Full Name is required.";
    } else if (form.fullName.trim().length < 2) {
      e.fullName = "Full Name must be at least 2 characters.";
    } else if (!/^[a-zA-Z\s'-]+$/.test(form.fullName.trim())) {
      e.fullName =
        "Full Name should only contain letters, spaces, hyphens, and apostrophes.";
    }

    // Get the actual value from the input element for validation
    const phoneInputValue = phoneInputRef.current?.value || form.phoneNumber;
    if (!phoneInputValue || !phoneInputValue.trim()) {
      e.phoneNumber = "Phone Number is required.";
    } else if (itiRef.current) {
      // Check if utils are loaded before using strict validation
      const utilsLoaded = window.intlTelInputUtils !== undefined;
      if (utilsLoaded) {
        // Use strict validation only if utils are loaded
        if (!itiRef.current.isValidNumber()) {
          e.phoneNumber = "Please enter a valid phone number.";
        }
      } else {
        // Fallback: check if there are enough digits (at least 7)
        const digitsOnly = phoneInputValue.replace(/\D/g, "");
        if (digitsOnly.length < 7) {
          e.phoneNumber = "Phone Number must be at least 7 digits.";
        }
      }
    } else {
      // Fallback validation if intl-tel-input isn't initialized yet
      const digitsOnly = phoneInputValue.trim().replace(/\D/g, "");
      if (digitsOnly.length < 7) {
        e.phoneNumber = "Phone Number must be at least 7 digits.";
      }
    }

    if (!form.email.trim()) {
      e.email = "Email is required.";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) {
      e.email = "Please enter a valid email.";
    }
    return e;
  }, [form]);

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

  const onChange = (key) => (ev) => {
    let value = ev.target.value;
    // Filter out alphabets for phone number - only allow numbers, spaces, hyphens, parentheses, and plus
    if (key === "phoneNumber") {
      value = value.replace(/[^0-9\s\-()+]/g, "");
    }
    setForm((p) => ({ ...p, [key]: value }));
  };

  const onBlur = (key) => () => {
    setTouched((p) => ({ ...p, [key]: true }));
    // Sync state with intl-tel-input's formatted value for phone number
    if (key === "phoneNumber" && phoneInputRef.current && itiRef.current) {
      const formattedValue = phoneInputRef.current.value;
      setForm((p) => ({ ...p, phoneNumber: formattedValue }));
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setTouched({ fullName: true, phoneNumber: true, email: true });
    if (!isValid) return;

    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      const parsedName = parseFullName(form.fullName);

      // Get phone number and country code separately from intl-tel-input
      let phoneNumberValue = form.phoneNumber.trim();
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
          phoneNumberValue = form.phoneNumber.replace(/\D/g, "");
        }
      } else {
        // Fallback if intl-tel-input isn't initialized
        phoneNumberValue = form.phoneNumber.replace(/\D/g, "");
      }

      const payload = {
        ...parsedName,
        email: form.email.trim(),
        phone: phoneNumberValue,
        countryCode: countryCode,
        source: "Website",
      };

      console.log("GetInTouch Form Submitted:", payload);

      await createLeadFromWebsite(payload);

      setSubmitSuccess(true);
      console.log("Lead created successfully");

      // Reset form immediately after successful submission
      setForm({
        fullName: "",
        phoneNumber: "",
        email: "",
      });
      setTouched({
        fullName: false,
        phoneNumber: false,
        email: false,
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
                    <div className="relative mt-2">
                      <input
                        ref={phoneInputRef}
                        type="tel"
                        name="phoneNumber"
                        value={form.phoneNumber}
                        onChange={onChange("phoneNumber")}
                        onBlur={onBlur("phoneNumber")}
                        placeholder="50 000 0000"
                        className={`${fieldBase} pl-[52px] ${
                          touched.phoneNumber && errors.phoneNumber
                            ? "border-red-300 ring-1 ring-red-200"
                            : "border-[rgba(15,23,42,0.10)] hover:border-[rgba(15,23,42,0.18)]"
                        }`}
                      />
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
                    disabled={!isValid || isSubmitting}
                    className={`
                      w-full inline-flex items-center justify-center gap-2
                      rounded-xl px-4 py-3 text-sm font-semibold text-white
                      transition-all duration-200
                      shadow-[0_12px_30px_rgba(15,23,42,0.12)]
                      active:scale-[0.98]
                      ${
                        isValid && !isSubmitting
                          ? "hover:-translate-y-[1px] hover:shadow-[0_16px_38px_rgba(15,23,42,0.16)]"
                          : "opacity-60 cursor-not-allowed"
                      }
                    `}
                    style={{
                      background:
                        "linear-gradient(92deg, var(--color-primary-500) 1.65%, var(--color-action) 98%)",
                    }}
                  >
                    {isSubmitting ? "Submitting..." : "Submit"}
                    {!isSubmitting && (
                      <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
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

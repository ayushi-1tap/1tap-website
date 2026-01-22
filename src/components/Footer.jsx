/* eslint-disable react/prop-types */
import {
  MessageCircle,
  Calendar,
  Mail,
  Facebook,
  Linkedin,
  Instagram,
  Star,
} from "lucide-react";
import FooterLogo from "../assets/FooterLogo.svg";

const Footer = () => {
  const solutions = [
    {
      label: "Incorporation Basic Package",
      href: "https://1tapbiz.com/incorporation-package/",
    },
    { label: "Founder's Starter Package", href: "https://1tapbiz.com/founders-package/" },
    {
      label: "Strategic Success Package",
      href: "https://1tapbiz.com/strategic-success-package/",
    },
    {
      label: "Business Essentials Package",
      href: "https://1tapbiz.com/business-essentials-package/",
    },
    {
      label: "Business Compliance Package",
      href: "https://1tapbiz.com/business-compliance-package/",
    },
    {
      label: "Business Elite Package",
      href: "https://1tapbiz.com/business-elite-package/",
    },
  ];

  const resources = [
    { label: "Jurisdiction Guide", href: "https://1tapbiz.com/free-zones/" },
    { label: "Accounting & Tax", href: "https://1tapbiz.com/accounting-tax/" },
    { label: "Company Formation", href: "https://1tapbiz.com/company-formation/" },
    { label: "Free Zones", href: "https://1tapbiz.com/free-zones/" },
    { label: "FAQs", href: "https://1tapbiz.com/faqs/" },
    { label: "FAWRI - 60 MIN SETUP", href: "https://1tapbiz.com/fawri/" },
  ];

  const company = [
    { label: "About Us", href: "/about" },
    { label: "Contact Us", href: "/contact-us" },
    { label: "Careers", href: "https://1tapbiz.com/careers/" },
    { label: "Blog", href: "https://1tapbiz.com/our-blog/" },
    { label: "Privacy Policy", href: "https://1tapbiz.com/privacy-policy/" },
    { label: "Refund Policy", href: "https://1tapbiz.com/refund-policy/" },
    { label: "Terms & Conditions", href: "https://1tapbiz.com/terms-conditions/" },
  ];

  const socialLinks = [
    {
      name: "Facebook",
      icon: Facebook,
      href: "https://www.facebook.com/people/1TAP/61572038638080/",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: "https://www.linkedin.com/company/1tapsolutions/",
    },
    {
      name: "Instagram",
      icon: Instagram,
      href: "https://www.instagram.com/1tapbiz?igsh=MTYwemltY3B1aHZpYQ%3D%3D",
    },
  ];

  return (
    <footer className="w-full bg-white py-8 sm:py-10 md:py-14">
      <div className="max-w-[98%] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Rounded gradient container */}
        <div className="relative overflow-hidden rounded-[16px] md:rounded-[24px] bg-gradient-to-b from-[var(--footer-bg-from)] to-[var(--footer-bg-to)] px-4 sm:px-6 md:px-10 lg:px-14 py-8 sm:py-10 md:py-12">
          {/* Top content */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">
            {/* Brand + description + socials */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-3">
                <img src={FooterLogo} alt="1TAP" className="w-auto h-9 md:h-8" />
              </div>

              <p className="mt-4 md:mt-5 text-sm md:text-base leading-6 text-white/70 max-w-sm">
                1TAP simplifies your company setup in UAE, letting you manage the
                entire process with just a few clicks using innovative instant
                setup. Launch your global business effortlessly and with zero
                hassle.
              </p>

              <div className="mt-5 md:mt-6 flex items-center gap-2 sm:gap-3">
                {socialLinks.map((s) => {
                  const Icon = s.icon;
                  return (
                    <a
                      key={s.name}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.name}
                      className="h-9 w-9 rounded-lg bg-white/10 hover:bg-white/15 transition-colors flex items-center justify-center"
                    >
                      <Icon className="h-4 w-4 text-white/90" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Solutions */}
            <div>
              <p className="font-semibold tracking-widest text-white/80">
                SOLUTIONS
              </p>
              <ul className="mt-3 md:mt-4 space-y-2 md:space-y-3">
                {solutions.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm md:text-base text-white/65 hover:text-white transition-colors"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <p className="font-semibold tracking-widest text-white/80">
                RESOURCES
              </p>
              <ul className="mt-3 md:mt-4 space-y-2 md:space-y-3">
                {resources.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm md:text-base text-white/65 hover:text-white transition-colors"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company + buttons + rating */}
            <div className="flex flex-col">
              <p className="font-semibold tracking-widest text-white/80">
                COMPANY
              </p>

              <ul className="mt-3 md:mt-4 space-y-2 md:space-y-3">
                {company.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm md:text-base text-white/65 hover:text-white transition-colors"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>

              {/* Buttons */}
              <div className="mt-6 md:mt-8 space-y-2 md:space-y-3 max-w-full sm:max-w-[240px] w-full">
                <a
                  href="https://api.whatsapp.com/send/?phone=971503586038"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full h-10 rounded-[8px] bg-[var(--footer-btn-chat)] hover:opacity-95 transition-opacity flex items-center justify-center gap-2 text-white text-[14px] font-medium"
                >
                  <MessageCircle className="h-4 w-4" />
                  Chat Now
                </a>

                <a href="https://calendly.com/1tapbiz/consult" target="_blank" rel="noopener noreferrer" className="w-full h-10 rounded-[8px] bg-[var(--footer-btn-meet)] hover:opacity-95 transition-opacity flex items-center justify-center gap-2 text-white text-[14px] font-medium">
                  <Calendar className="h-4 w-4" />
                  Schedule a Meet
                </a>

                <a
                  href="mailto:hello@1tapbiz.com"
             
                  className="w-full h-10 rounded-[8px] bg-[var(--footer-btn-email)] hover:opacity-95 transition-opacity flex items-center justify-center gap-2 text-[#1f2329] text-[14px] font-semibold"
                >
                  <Mail className="h-4 w-4" />
                  Email Us
                </a>
              </div>

              {/* Rating */}
              <div className="mt-8 ml-auto text-right">
                <div className="flex justify-end gap-1">
                  {[1, 2, 3, 4].map((n) => (
                    <Star
                      key={n}
                      className="h-4 w-4 text-[var(--footer-star)] fill-[var(--footer-star)]"
                    />
                  ))}

                  {/* half filled star */}
                  <div className="relative h-4 w-4">
                    <Star
                      className="absolute inset-0 h-4 w-4 text-[var(--footer-star)] fill-[var(--footer-star)]"
                      style={{ clipPath: "inset(0 50% 0 0)" }}
                    />
                    <Star className="absolute inset-0 h-4 w-4 text-[var(--footer-star)]" />
                  </div>
                </div>

                <p className="mt-2 text-[11px] text-white/60">
                  4.5/5 based on Customers
                </p>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="mt-4 border-t border-white/10" />

          {/* Bottom line */}
          <div className="pt-4 md:pt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-3">
            <p className="text-xs sm:text-sm text-white/55">
              © 2025 All Rights Reserved.
            </p>

            <p className="text-xs sm:text-sm text-white/55 md:text-end md:flex-1">
              <span className="text-white/80 font-semibold">
                1TAP Tech Solutions Limited
              </span>{" "}
              | This platform offers systems for business setup at the click and
              is not affiliated with any UAE government body or authority.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

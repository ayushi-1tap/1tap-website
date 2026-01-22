import { useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { NavLink, Link } from "react-router-dom";
import logo from "../assets/Logo.svg";
import whatsapp from "../assets/WhatsAppIcon.svg";

const navPillClass = ({ isActive }) =>
  [
    "px-6 py-2 rounded-lg font-medium transition-colors whitespace-nowrap",
    isActive
      ? "bg-[var(--color-primary-600)] text-[var(--color-text-reverse)]"
      : "text-[var(--color-text-primary)] hover:text-[var(--color-primary-600)]",
  ].join(" ");

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-[var(--color-bg-white)] border-b shadow-md relative">
      <div className="w-full px-4 sm:px-6 md:px-10 h-16 md:h-20 flex items-center justify-between">
        {/* Left: Logo */}
        <Link to="/" className="flex items-center shrink-0">
          <img src={logo} alt="1TAP" className="w-auto h-8 sm:h-9 md:h-14" />
        </Link>

        {/* Center: Floating Nav Pills */}
        <div className="hidden md:flex flex-1 justify-center px-6">
          <div
            className="flex items-center gap-3.5 rounded-xl bg-[var(--color-bg-white)]
                    
                       shadow-md px-2 py-2 "
          >
            <NavLink to="/" end className={navPillClass}>
              Home
            </NavLink>
            <NavLink to="/pricing" className={navPillClass}>
              Pricing
            </NavLink>
            <NavLink to="/about" className={navPillClass}>
              About Us
            </NavLink>
            <NavLink to="/contact-us" className={navPillClass}>
              Contact Us
            </NavLink>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        <a
  href="https://api.whatsapp.com/send/?phone=971503586038"
  target="_blank"
  rel="noopener noreferrer"
  className="w-8 h-8 md:w-10 md:h-10 rounded-md flex items-center justify-center
             hover:bg-[var(--color-blue-100)] transition"
  aria-label="WhatsApp"
>
  <img src={whatsapp} alt="" className="w-6 h-6 md:w-8 md:h-8" />
</a>


          {/* show on desktop */}
          <Link
            to="https://app.1tapbiz.com/login"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center justify-center
                       h-9 px-4 rounded-md font-medium
                       border border-[var(--color-primary-500)]
                       text-[var(--color-primary-500)]
                       hover:text-[var(--color-primary-600)]
                       hover:border-[var(--color-primary-600)]
                       transition whitespace-nowrap"
          >
            Log in
          </Link>

          <Link
            to="https://app.1tapbiz.com/signup"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 sm:gap-2
                       h-8 md:h-9 px-3 sm:px-4 rounded-md text-sm sm:text-base
                       bg-[var(--color-primary-600)]
                       text-[var(--color-text-reverse)]
                       hover:bg-[var(--color-primary-700)]
                       transition whitespace-nowrap"
          >
            <span className="hidden md:inline">Sign up</span>
            <span className="md:hidden">Sign up</span>
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </Link>

          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden w-9 h-9 flex items-center justify-center"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? (
              <X className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--color-text-primary)]" />
            ) : (
              <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--color-text-primary)]" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b shadow-lg z-50">
          <div className="flex flex-col px-4 py-4 space-y-2">
            <NavLink
              to="/"
              end
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) =>
                `px-4 py-3 rounded-lg font-medium transition-colors ${
                  isActive
                    ? "bg-[var(--color-primary-600)] text-white"
                    : "text-[var(--color-text-primary)] hover:bg-[var(--color-primary-50)]"
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/pricing"
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) =>
                `px-4 py-3 rounded-lg font-medium transition-colors ${
                  isActive
                    ? "bg-[var(--color-primary-600)] text-white"
                    : "text-[var(--color-text-primary)] hover:bg-[var(--color-primary-50)]"
                }`
              }
            >
              Pricing
            </NavLink>
            <NavLink
              to="/about"
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) =>
                `px-4 py-3 rounded-lg font-medium transition-colors ${
                  isActive
                    ? "bg-[var(--color-primary-600)] text-white"
                    : "text-[var(--color-text-primary)] hover:bg-[var(--color-primary-50)]"
                }`
              }
            >
              About Us
            </NavLink>
            <NavLink
              to="/contact-us"
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) =>
                `px-4 py-3 rounded-lg font-medium transition-colors ${
                  isActive
                    ? "bg-[var(--color-primary-600)] text-white"
                    : "text-[var(--color-text-primary)] hover:bg-[var(--color-primary-50)]"
                }`
              }
            >
              Contact Us
            </NavLink>
            <Link
              to="/login"
              onClick={() => setIsMenuOpen(false)}
              className="px-4 py-3 rounded-lg font-medium border border-[var(--color-primary-500)] text-[var(--color-primary-500)] text-center hover:bg-[var(--color-primary-50)] transition"
            >
              Log in
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

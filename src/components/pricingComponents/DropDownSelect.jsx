/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

const DropDownSelect = ({ options, selectedIndex, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (index) => {
    onSelect(index);
    setIsOpen(false);
  };

  return (
    <div ref={wrapperRef} className="relative mb-4">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full px-3 py-2.5 rounded-lg text-xs text-left flex items-center justify-between transition-all"
        style={{
          border: "1px solid rgba(46,149,244,0.26)",
          background: "white",
        }}
      >
        <span className="text-[var(--color-text-primary)]">
          {typeof options[selectedIndex] === "string"
            ? options[selectedIndex]
            : options[selectedIndex].label}
        </span>

        <ChevronDown
          className={`w-4 h-4 text-[var(--color-text-secondary)] transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div
          className="absolute z-[100] w-full mt-1 rounded-lg shadow-lg overflow-hidden"
          style={{
            background: "white",
            border: "1px solid rgba(46,149,244,0.26)",
            boxShadow: "0 4px 12px rgba(12,120,220,0.15)",
          }}
        >
          {options.map((option, index) => {
            const optionLabel =
              typeof option === "string" ? option : option.label;

            return (
              <button
                key={index}
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => handleSelect(index)}
                className={`w-full px-3 py-2.5 text-xs text-left transition-all ${
                  selectedIndex === index
                    ? "bg-[rgba(46,149,244,0.15)] text-[var(--color-primary-600)] font-medium"
                    : "text-[var(--color-text-primary)] hover:bg-[rgba(46,149,244,0.08)]"
                }`}
              >
                {optionLabel}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DropDownSelect;

/* eslint-disable react/prop-types */
import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const FAQ = ({ faqs }) => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="w-full py-8 md:py-12 bg-[var(--color-bg-white)]">
      <div className="flex flex-col items-center justify-center px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-8 md:mb-14">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--color-text-primary)]">
            Frequently Asked Questions
          </h2>
          <p className="mt-2 md:mt-3 text-sm md:text-base text-[var(--why-choose-secondary)] max-w-3xl mx-auto px-4">
            Everything you need to know about setting up and running your
            business in the UAE.
          </p>
        </div>

        {/* Cards */}
        <div className="w-full flex flex-col md:flex-row md:justify-center md:gap-4 md:overflow-x-auto">
          {faqs.map((faq, idx) => {
            const isOpen = idx === openIndex;
            const qNo = String(idx + 1).padStart(2, "0");

            return (
              <button
                key={idx}
                onClick={() => setOpenIndex(idx)}
                className={`relative flex-shrink-0 rounded-2xl transition-all text-left mb-4 md:mb-0
                  ${
                    isOpen
                      ? "w-full md:w-[480px] p-6 md:p-10"
                      : "w-full md:w-[140px] p-4 md:p-6"
                  }
                `}
                style={{
                  background: isOpen
                    ? "var(--color-primary-600)"
                    : "var(--color-bg-light)",
                }}
              >
                {/* Icon */}
                <span
                  className={`absolute top-4 right-4 md:top-6 md:right-6 w-8 h-8 md:w-9 md:h-9 rounded-full
  flex items-center justify-center transition-colors
  ${isOpen ? "bg-white/20" : "bg-white"}`}
                >
                  {isOpen ? (
                    <Minus className="w-3.5 h-3.5 md:w-4 md:h-4 text-white" />
                  ) : (
                    <Plus className="w-3.5 h-3.5 md:w-4 md:h-4 text-[var(--color-text-secondary)]" />
                  )}
                </span>

                {isOpen ? (
                  <>
                    <span className="font-semibold text-xs md:text-sm text-white/70">
                      QUESTION {qNo}
                    </span>

                    <h3 className="mt-2 text-lg md:text-2xl font-bold text-white pr-8 md:pr-0">
                      {faq.question}
                    </h3>

                    <div className="my-3 md:my-4 h-px bg-white/20" />

                    <p className="text-white/85 leading-relaxed text-xs md:text-sm whitespace-pre-line pr-4 md:pr-0">
                      {faq.answer}
                    </p>
                  </>
                ) : (
                  <div className="h-full flex items-end md:items-end">
                    <div className="font-medium text-sm md:text-base text-[var(--color-text-primary)] md:hidden">
                      {faq.question}
                    </div>
                    <div
                      className="hidden md:block font-medium text-[var(--color-text-primary)]"
                      style={{
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                      }}
                    >
                      {faq.question}
                    </div>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
      {/* Still have questions card */}
      <div className="mt-8 md:mt-14 w-full max-w-[95%] sm:max-w-[85%] mx-auto px-4 sm:px-0">
        <div
          className="rounded-2xl px-4 sm:px-6 py-8 md:py-10 text-center"
          style={{
            background:
              "linear-gradient(5deg, var(--color-primary-100) 0.5%, var(--color-bg-light) 80%)",
          }}
        >
          <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-[var(--color-text-primary)]">
            Still have questions?
          </h3>

          <p className="mt-2 text-sm md:text-base text-[var(--why-choose-secondary)]">
            Our team is ready to provide personalized answers
          </p>

          <a href="https://api.whatsapp.com/send/?phone=971503586038" target="_blank" rel="noopener noreferrer"
            className="mt-4 md:mt-6 inline-flex items-center justify-center rounded-xl px-6 md:px-8 py-2.5 md:py-3 text-sm font-semibold text-white"
            style={{
              background:
                "linear-gradient(92deg, var(--color-primary-500) 1.65%, var(--color-action) 98%)",
            }}
          >
            Contact Us Today
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;

import { useState } from "react";
import {
  UserPlus,
  Landmark,
  TrendingUp,
  BookOpen,
  Receipt,
  CreditCard,
  ArrowRight,
} from "lucide-react";
import QuoteModal from "../QuoteModal";

const BusinessManagement = () => {
  const [selectedService, setSelectedService] = useState(0);
  const [mobileOpenIndex, setMobileOpenIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const services = [
    {
      icon: UserPlus,
      name: "Visa Services",
      description:
        "Complete visa processing for employees, shareholders, investors, and family members, including documentation, medicals, residency approvals, and government coordination.",
      benefits: [
        "Employee visa processing",
        "Shareholder & investor visas",
        "Family member visas",
        "E-Channel registration",
        "Government liaison",
        "Medical & biometrics coordination",
      ],
    },
    {
      icon: Landmark,
      name: "Bank Account Support",
      description:
        "End-to-end assistance for opening and maintaining corporate bank accounts, including documentation and bank coordination.",
      benefits: [
        "Corporate bank account opening",
        "Documentation preparation",
        "Bank follow-ups",
        "Relationship management support",
      ],
    },
    {
      icon: TrendingUp,
      name: "Corporate Tax Planning",
      description:
        "Support for corporate tax registration, planning, and compliance to ensure alignment with UAE corporate tax regulations.",
      benefits: [
        "Corporate tax registration",
        "Tax planning advisory",
        "Compliance management",
        "Regulatory guidance",
      ],
    },
    {
      icon: BookOpen,
      name: "Bookkeeping & MIS",
      description:
        "Accurate bookkeeping and structured MIS reporting to help track financial performance and stay audit-ready.",
      benefits: [
        "Monthly bookkeeping",
        "MIS & financial reporting",
        "Expense tracking",
        "Audit-ready records",
      ],
    },
    {
      icon: Receipt,
      name: "Annual VAT Returns",
      description:
        "Preparation, reconciliation, and filing of VAT returns in compliance with UAE VAT regulations.",
      benefits: [
        "VAT return filing",
        "Input-output reconciliation",
        "Document verification",
        "FTA compliance support",
      ],
    },
    {
      icon: CreditCard,
      name: "Payroll and WPS",
      description:
        "Payroll processing with full WPS compliance to ensure accurate and timely salary disbursement.",
      benefits: [
        "Payroll processing",
        "WPS compliance",
        "Salary transfers",
        "Employee payroll records",
      ],
    },
  ];

  const current = services[selectedService];
  const ActiveIcon = current.icon;

  return (
    <section className="w-full py-16 bg-[#F7FAFE]">
      <div className="md:max-w-[85%] max-w-[90%] mx-auto px-2 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center md:mb-14 mb-8">
          <h2 className="text-2xl md:text-5xl font-bold text-[var(--color-text-primary)]">
            Your Complete Business Management Solution
          </h2>
          <p className="mt-4 text-sm md:text-lg text-[var(--why-choose-secondary)] max-w-3xl mx-auto">
            Whether you need a full package deal or annual service renewal, 1TAP
            manages everything end-to-end – saving you time, money, and effort.
          </p>
        </div>

        {/* Mobile: FAQ-style accordion */}
        <div className="lg:hidden space-y-3">
          {services.map((s, idx) => {
            const Icon = s.icon;
            const isActive = mobileOpenIndex === idx;

            return (
              <div
                key={s.name}
                className="rounded-xl border bg-white transition-all duration-300 ease-in-out overflow-hidden"
                style={{
                  borderColor: isActive
                    ? "var(--color-primary-100)"
                    : "rgba(212,228,250,0.5)",
                  boxShadow: isActive
                    ? "4px 16px 48px rgba(0,0,0,0.08)"
                    : "none",
                }}
              >
                <button
                  type="button"
                  onClick={() => setMobileOpenIndex(isActive ? null : idx)}
                  className="w-full text-left p-4 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: "var(--color-primary-50)" }}
                    >
                      <Icon className="w-5 h-5 text-[var(--color-primary-600)]" />
                    </div>
                    <span className="font-semibold text-[var(--color-text-primary)]">
                      {s.name}
                    </span>
                  </div>
                  <ArrowRight
                    className={`w-5 h-5 text-[var(--color-primary-600)] transition-transform duration-300 ${
                      isActive ? "rotate-90" : ""
                    }`}
                  />
                </button>

                {isActive && (
                  <div className="px-4 pb-4 pt-0">
                    <p className="text-sm leading-relaxed text-[var(--why-choose-secondary)] mb-4">
                      {s.description}
                    </p>
                    <div>
                      <div className="text-xs font-bold tracking-wider text-[var(--color-text-primary)] mb-3">
                        KEY BENEFITS
                      </div>
                      <ul className="space-y-2">
                        {s.benefits.map((b) => (
                          <li key={b} className="flex items-start gap-3">
                            <span className="mt-[6px] w-1.5 h-1.5 rounded-full bg-[var(--color-primary-600)] flex-shrink-0" />
                            <span className="text-sm text-[var(--why-choose-secondary)]">
                              {b}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Desktop: Side-by-side layout */}
        <div className="hidden lg:block overflow-hidden">
          <div className="grid lg:grid-cols-[3fr_4fr] items-stretch">
            {/* LEFT (stretches full height) */}
            <div className="h-full p-8 ">
              <div className="space-y-3 h-full">
                {services.map((s, idx) => {
                  const Icon = s.icon;
                  const isActive = idx === selectedService;

                  return (
                    <button
                      key={s.name}
                      type="button"
                      onClick={() => setSelectedService(idx)}
                      className="w-full text-left transition-all duration-300 ease-in-out"
                    >
                      {isActive ? (
                        <div
                          className="relative flex items-center gap-4 px-5 py-4 rounded-xl  border bg-white shadow-lg transition-all duration-300 ease-in-out transform scale-105 group"
                          style={{
                            borderColor: "var(--color-primary-100)",
                          }}
                        >
                          <span
                            className="absolute -left-1 top-4 h-11 w-[4px] rounded-l-xl"
                            style={{ background: "var(--color-primary-600)" }}
                          />
                          <div
                            className="w-11 h-11 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                            style={{ background: "var(--color-primary-50)" }}
                          >
                            <Icon className="w-5 h-5 text-[var(--color-primary-600)] transition-transform duration-300" />
                          </div>

                          <div className="flex-1">
                            <div className=" font-semibold text-[var(--color-text-primary)]">
                              {s.name}
                            </div>
                          </div>

                          <ArrowRight className="w-5 h-5 text-[var(--color-primary-600)] transition-transform duration-300 group-hover:translate-x-1" />
                        </div>
                      ) : (
                        <div className="flex items-center gap-4 px-2 py-3 transition-all duration-300 ease-in-out transform hover:translate-x-2 group">
                          <div
                            className="w-11 h-11 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                            style={{ background: "var(--color-primary-50)" }}
                          >
                            <Icon className="w-5 h-5 text-[var(--color-primary-600)] transition-transform duration-300" />
                          </div>

                          <div className=" font-semibold text-[var(--why-choose-secondary)] transition-colors duration-300 group-hover:text-[var(--color-primary-600)]">
                            {s.name}
                          </div>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* RIGHT (stretches full height) */}
            <div className="h-full p-8 ">
              <div
                className="h-full rounded-2xl  p-8 lg:p-10"
                style={{
                  background: "white",
                  boxShadow: "4px 16px 48px rgba(0,0,0,0.08)",
                }}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center"
                  style={{ background: "var(--color-primary-50)" }}
                >
                  <ActiveIcon className="w-7 h-7 text-[var(--color-primary-600)]" />
                </div>

                <h3 className="mt-6 text-[28px] font-bold text-[var(--color-text-primary)]">
                  {current.name}
                </h3>

                <p className="mt-3  leading-relaxed text-[var(--why-choose-secondary)]">
                  {current.description}
                </p>

                <div className="mt-4">
                  <div className=" font-bold tracking-wider text-[var(--color-text-primary)]">
                    KEY BENEFITS
                  </div>

                  <ul className="mt-4 space-y-2.5">
                    {current.benefits.map((b) => (
                      <li key={b} className="flex items-start gap-3">
                        <span className="mt-[6px] w-1.5 h-1.5 rounded-full bg-[var(--color-primary-600)]" />
                        <span className=" text-[var(--why-choose-secondary)]">
                          {b}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA card (same as screenshot) */}
        <div
          className="mt-8 rounded-2xl bg-[var(--color-bg-white)] px-8 py-10 text-center "
          style={{
            borderColor: "var(--color-blue-100)",
            boxShadow: "0 18px 45px rgba(0,0,0,0.05)",
          }}
        >
          <h3 className="text-lg md:text-[24px] font-bold text-[var(--color-text-primary)]">
            Ready for Complete Business Automation?
          </h3>
          <p className="mt-2 text-sm md:text-base text-[var(--why-choose-secondary)]">
            Tell us your exact requirements and we&apos;ll craft a customized
            management package.
          </p>

          <div className="mt-6 flex justify-center">
            <button
              onClick={() => setIsModalOpen(true)}
              className="h-11 px-7 text-sm md:text-base rounded-md text-[var(--color-text-reverse)] font-semibold inline-flex items-center gap-2 transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 hover:shadow-lg group"
              style={{
                background:
                  "linear-gradient(92deg, var(--color-primary-500) 1.65%, var(--color-action) 98%)",
              }}
            >
              Get Your Personalized Quote{" "}
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>

      {/* Quote Modal */}
      <QuoteModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
};

export default BusinessManagement;

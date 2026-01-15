/* eslint-disable react/no-unknown-property */
import {
  X,
  ArrowRight,
  DollarSign,
  Zap,
  LayoutDashboard,
  CreditCard,
  Users,
  Globe,
  Check,
} from "lucide-react";

const WhyChoose = () => {
  const features = [
    {
      feature: "Pricing Transparency",
      traditional: "Hidden Fees & Surcharges Common",
      tapbiz: "Transparent, All-Inclusive Fixed Pricing",
      icon: DollarSign,
    },
    {
      feature: "Average Setup Speed",
      traditional: "Manual Processing (7-14 Days)",
      tapbiz: "Fully Automated & 24-Hour Setup",
      icon: Zap,
    },
    {
      feature: "Management Dashboard",
      traditional: "Paperwork, Emails & WhatsApp",
      tapbiz: "All-in-One Digital Portal (AIO)",
      icon: LayoutDashboard,
    },
    {
      feature: "Business Banking Integration",
      traditional: "Self-application (3-6 Weeks Wait)",
      tapbiz: "Guaranteed Bank Pre-Approval",
      icon: CreditCard,
    },
    {
      feature: "Client Service Model",
      traditional: "Shared Call Center Agents",
      tapbiz: "Dedicated Manager & AI Support",
      icon: Users,
    },
    {
      feature: "Physical Presence Requirement",
      traditional: "Often Required for Visa/Bank",
      tapbiz: "100% Remote Setup Available",
      icon: Globe,
    },
  ];

  return (
    <section
      className="w-full py-8"
      style={{
        background:
          "radial-gradient(120% 70% at 50% 0%, #FFFFFF 0%, #FFFFFF 55%, rgba(220, 237, 253, 0.55) 100%)",
      }}
    >
      <div className="md:max-w-[80%] max-w-[90%] mx-auto  lg:px-20">
        {/* Header */}
        <div className="text-center mb-10">
          <div
            className="inline-flex items-center gap-2 px-[21px] py-[9px] rounded-full border backdrop-blur"
            style={{
              border: "1px solid var(--why-choose-border)",
              background:
                "linear-gradient(135deg, var(--why-choose-bg-gradient-start) 0%, var(--why-choose-bg-gradient-end) 100%)",
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_85_979)">
                <path
                  d="M5.79651 9.04165C5.74443 8.83977 5.6392 8.65554 5.49178 8.50812C5.34436 8.3607 5.16013 8.25548 4.95826 8.2034L1.37951 7.28057C1.31845 7.26324 1.26471 7.22646 1.22645 7.17583C1.18818 7.12519 1.16748 7.06345 1.16748 6.99998C1.16748 6.93651 1.18818 6.87478 1.22645 6.82414C1.26471 6.7735 1.31845 6.73673 1.37951 6.7194L4.95826 5.79598C5.16006 5.74395 5.34424 5.63882 5.49166 5.49151C5.63907 5.34419 5.74434 5.16008 5.79651 4.95832L6.71934 1.37957C6.7365 1.31827 6.77323 1.26427 6.82394 1.2258C6.87466 1.18733 6.93656 1.1665 7.00022 1.1665C7.06387 1.1665 7.12577 1.18733 7.17649 1.2258C7.2272 1.26427 7.26394 1.31827 7.28109 1.37957L8.20334 4.95832C8.25542 5.16019 8.36064 5.34442 8.50806 5.49184C8.65548 5.63926 8.83972 5.74449 9.04159 5.79657L12.6203 6.71882C12.6819 6.73579 12.7362 6.77249 12.7748 6.82328C12.8135 6.87407 12.8345 6.93614 12.8345 6.99998C12.8345 7.06382 12.8135 7.1259 12.7748 7.17669C12.7362 7.22748 12.6819 7.26417 12.6203 7.28115L9.04159 8.2034C8.83972 8.25548 8.65548 8.3607 8.50806 8.50812C8.36064 8.65554 8.25542 8.83977 8.20334 9.04165L7.28051 12.6204C7.26335 12.6817 7.22662 12.7357 7.1759 12.7742C7.12519 12.8126 7.06329 12.8335 6.99963 12.8335C6.93598 12.8335 6.87407 12.8126 6.82336 12.7742C6.77265 12.7357 6.73591 12.6817 6.71876 12.6204L5.79651 9.04165Z"
                  stroke="var(--why-choose-primary)"
                  strokeWidth="1.16667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M11.6667 1.75V4.08333"
                  stroke="var(--why-choose-primary)"
                  strokeWidth="1.16667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12.8333 2.91675H10.5"
                  stroke="var(--why-choose-primary)"
                  strokeWidth="1.16667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2.33325 9.91675V11.0834"
                  stroke="var(--why-choose-primary)"
                  strokeWidth="1.16667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2.91667 10.5H1.75"
                  stroke="var(--why-choose-primary)"
                  strokeWidth="1.16667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_85_979">
                  <rect width="14" height="14" fill="white" />
                </clipPath>
              </defs>
            </svg>

            <span className="text-sm font-medium text-[var(--color-text-secondary)]">
              Why Choose 1TAP
            </span>
          </div>

          <h2 className="mt-5 text-2xl md:text-5xl font-bold text-[var(--color-text-primary)">
            The Digital Advantage
          </h2>
          <p className="mt-3 text-sm md:text-lg text-gray-500 max-w-2xl mx-auto">
            See how our proprietary AIO WebApp stacks up against outdated
            traditional setup providers and consulting agents.
          </p>
        </div>

        {/* Main Card */}
        <div
          className="rounded-3xl overflow-hidden bg-white"
          style={{
            border: "1px solid var(--color-primary-500)",
            boxShadow: "0 18px 55px rgba(12,120,220,0.12)",
          }}
        >
          {/* Desktop: Table Header */}
          <div
            className="hidden md:grid md:grid-cols-3 gap-4 px-8 py-5 border-b"
            style={{
              borderColor: "var(--color-blue-100)",
              background:
                "linear-gradient(90deg, rgba(220,237,253,0.45) 0%, #FFFFFF 70%)",
            }}
          >
            <div className="font-semibold tracking-wider text-gray-500 uppercase">
              Feature
            </div>

            <div className="flex items-center gap-2">
              <span className="font-semibold tracking-wider text-gray-500 uppercase">
                Traditional
              </span>
              <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-red-100 text-red-600">
                OLD
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-semibold tracking-wider text-gray-500 uppercase">
                1TAP
              </span>

              {/* NEW badge - exact Figma */}
              <span
                className="inline-flex items-center justify-center rounded-[4px] text-[10px] font-semibold text-white"
                style={{
                  height: "19.5px",
                  padding: "2.5px 8px",
                  background:
                    "linear-gradient(135deg, var(--why-choose-primary) 0%, var(--why-choose-accent) 100%)",
                }}
              >
                NEW
              </span>
            </div>
          </div>

          {/* Mobile: Card Layout */}
          <div className="md:hidden space-y-4 p-4">
            {features.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={index}
                  className="rounded-xl p-5 border transition-all duration-300 ease-in-out transform hover:shadow-md"
                  style={{
                    borderColor: "rgba(212,228,250,0.7)",
                    background:
                      "linear-gradient(90deg, var(--why-row-from) 0%, var(--why-row-to) 65%)",
                  }}
                >
                  {/* Feature Header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-10 h-10 rounded-xl border flex items-center justify-center flex-shrink-0"
                      style={{
                        border: "1px solid var(--why-choose-border)",
                        background:
                          "linear-gradient(135deg, var(--why-choose-bg-gradient-start) 0%, var(--why-choose-bg-gradient-end) 100%)",
                      }}
                    >
                      <Icon className="w-5 h-5 text-[var(--why-choose-primary)]" />
                    </div>
                    <span className="font-semibold text-[var(--color-text-primary)]">
                      {item.feature}
                    </span>
                  </div>

                  {/* Traditional */}
                  <div className="flex items-center gap-3 mb-3 pb-3 border-b border-gray-200">
                    <span
                      className="inline-flex items-center justify-center rounded-full flex-shrink-0"
                      style={{
                        width: 22,
                        height: 22,
                        background: "rgba(255, 76, 76, 0.12)",
                      }}
                    >
                      <X className="w-4 h-4 text-[#FF4C4C]" />
                    </span>
                    <div>
                      <div className="text-xs font-semibold text-gray-500 mb-1">
                        TRADITIONAL
                      </div>
                      <span className="text-sm text-gray-500">
                        {item.traditional}
                      </span>
                    </div>
                  </div>

                  {/* 1TAP */}
                  <div className="flex items-center gap-3">
                    <span
                      className="inline-flex items-center justify-center rounded-full flex-shrink-0"
                      style={{
                        width: 22,
                        height: 22,
                        background: "rgba(74, 64, 255, 0.10)",
                      }}
                    >
                      <Check className="w-4 h-4 text-[var(--why-choose-primary)]" />
                    </span>
                    <div>
                      <div className="text-xs font-semibold text-[var(--why-choose-primary)] mb-1 flex items-center gap-1">
                        1TAP
                        <span
                          className="inline-flex items-center justify-center rounded-[4px] text-[8px] font-semibold text-white px-1.5 py-0.5"
                          style={{
                            background:
                              "linear-gradient(135deg, var(--why-choose-primary) 0%, var(--why-choose-accent) 100%)",
                          }}
                        >
                          NEW
                        </span>
                      </div>
                      <span className="text-sm text-[var(--color-text-primary)] font-semibold">
                        {item.tapbiz}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Desktop: Table Rows */}
          <div className="hidden md:block">
            {features.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={index}
                  className="grid grid-cols-3 gap-4 px-8 py-7 border-b last:border-b-0 transition-all duration-300 ease-in-out transform hover:scale-[1.01] hover:shadow-md group"
                  style={{
                    borderColor: "rgba(212,228,250,0.7)",
                    background:
                      "linear-gradient(90deg, var(--why-row-from) 0%, var(--why-row-to) 65%)",
                  }}
                >
                  {/* Feature */}
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl border flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
                      style={{
                        border: "1px solid var(--why-choose-border)",
                        background:
                          "linear-gradient(135deg, var(--why-choose-bg-gradient-start) 0%, var(--why-choose-bg-gradient-end) 100%)",
                      }}
                    >
                      <Icon className="w-5 h-5 text-[var(--why-choose-primary)] transition-transform duration-300" />
                    </div>

                    <span className="font-semibold text-[var(--color-text-primary)]">
                      {item.feature}
                    </span>
                  </div>

                  {/* Traditional (X inside chip like screenshot) */}
                  <div className="flex items-center gap-3">
                    <span
                      className="inline-flex items-center justify-center rounded-full"
                      style={{
                        width: 22,
                        height: 22,
                        background: "rgba(255, 76, 76, 0.12)",
                      }}
                    >
                      <X className="w-4 h-4 text-[#FF4C4C]" />
                    </span>

                    <span className="text-gray-500">{item.traditional}</span>
                  </div>

                  {/* 1TAP (Check inside chip like screenshot) */}
                  <div className="flex items-center gap-3">
                    <span
                      className="inline-flex items-center justify-center rounded-full"
                      style={{
                        width: 22,
                        height: 22,
                        background: "rgba(74, 64, 255, 0.10)",
                      }}
                    >
                      <Check className="w-4 h-4 text-[var(--why-choose-primary)]" />
                    </span>

                    <span className="text-[var(--color-text-primary)] font-semibold">
                      {item.tapbiz}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA  */}
          <div
            className="md:p-8 p-4"
            style={{
              background:
                "linear-gradient(90deg, var(--why-row-from) 0%, var(--why-row-to) 65%)",
            }}
          >
            <div
              className="rounded-2xl overflow-hidden relative"
              style={{
                background:
                  "linear-gradient(90deg, #2E75E6 0%, #1E63D6 45%, #2B83E6 100%)",
              }}
            >
              {/* soft glow blobs like screenshot */}
              <div className="pointer-events-none absolute inset-0">
                <div
                  className="absolute -top-20 -left-24 w-72 h-72 rounded-full"
                  style={{
                    background: "rgba(255,255,255,0.14)",
                    filter: "blur(12px)",
                  }}
                />
                <div
                  className="absolute -bottom-28 -right-32 w-96 h-96 rounded-full"
                  style={{
                    background: "rgba(255,255,255,0.10)",
                    filter: "blur(18px)",
                  }}
                />
              </div>

              <div className="relative md:px-8 px-3 md:py-10 py-6 text-center text-white">
                <h3 className="text-lg md:text-xl font-semibold">
                  Ready to experience the digital advantage?
                </h3>

                <p className="mt-2 text-sm md:text-base text-white/75">
                  Join hundreds of entrepreneurs launching smarter, faster
                  businesses.
                </p>
                <div className="mt-5 flex flex-row gap-3 justify-center flex-wrap">
                  <a href="https://app.1tapbiz.com/signup" target="_blank" rel="noopener noreferrer" className="h-12 px-6 rounded-md bg-white text-[var(--color-primary-600)] font-semibold flex items-center justify-center gap-2 hover:bg-white/95 transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 hover:shadow-lg group">
                    Start Your Company{" "}
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </a>

                  <a href="https://api.whatsapp.com/send/?phone=971503586038" target="_blank" rel="noopener noreferrer" className="h-12 md:px-6 px-8 rounded-md border border-white bg-transparent text-white font-semibold flex items-center justify-center gap-2 hover:bg-white/10 transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 group">
                    Talk to an expert{" "}
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                </div>

                <p className="mt-4 text-sm text-white/65">
                  No credit card required • Setup in 24 hours • 100% online
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="h-2" />
      </div>
    </section>
  );
};

export default WhyChoose;

import { FileText, LayoutDashboard, Zap, ArrowRight } from "lucide-react";
import worldMap from "../../assets/Map.svg";

const Welcome = () => {
  const features = [
    {
      icon: FileText,
      label: "TAX EFFICIENCY",
      title: "23% → 0%",
      description: "Switch to 0% Personal Income Tax in Dubai.",
    },
    {
      icon: LayoutDashboard,
      label: "AIO DASHBOARD",
      title: "All-In-One",
      description: "Manage visas, licenses, and banking instantly.",
    },
    {
      icon: Zap,
      label: "SPEED",
      title: "24 Hours",
      description: "Get your trade license issued in record time.",
    },
  ];

  return (
    <section className="w-full py-14 relative overflow-hidden bg-[var(--color-bg-white)]">
      {/* soft blue gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary-50)] via-white to-[var(--color-primary-50)]" />

      {/* subtle grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.65]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(12,120,220,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(12,120,220,0.08) 1px, transparent 1px)",
        }}
      />

      {/* glow blobs */}
      <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-[var(--color-primary-500)] opacity-[0.10] blur-3xl" />
      <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-[var(--color-primary-500)] opacity-[0.10] blur-3xl" />

      {/* Map SVG background */}
      <img
        src={worldMap}
        alt=""
        className="pointer-events-none absolute -bottom-56 w-full 
             opacity-50"
        draggable={false}
      />

      <div className="relative md:max-w-[80%] max-w-[90%] mx-auto px-2 sm:px-6 ">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-[rgba(46,149,244,0.10)]">
            <span className=" font-medium text-[var(--color-primary-600)]">
              Your Founder Journey Starts Here
            </span>
          </div>

          <h2 className="mt-5 text-2xl md:text-5xl lg:text-6xl font-bold text-[var(--color-text-primary)]">
            Welcome,{" "}
            <span className="text-[var(--color-primary-600)]">
              Future Founder
            </span>
          </h2>

          <p className="mt-4 text-sm md:text-lg text-gray-500 max-w-2xl mx-auto">
            Did you know the global tax rate outside the UAE often exceeds 23%,
            while the UAE starts at just 0–9%? With 1TAP, secure 100% ownership
            and complete end-to-end solutions to start and scale your business.
          </p>
        </div>

        {/* Map + Cards */}
        <div className="relative mt-8 w-full">
          {/* Feature cards row */}
          <div className="relative grid md:grid-cols-3 gap-6 lg:gap-7">
            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <div
                  key={index}
                  className="rounded-2xl p-7 border transition-all duration-300 ease-in-out transform hover:scale-[1.03] hover:shadow-xl group"
                  style={{
                    border: "1px solid rgba(46,149,244,0.26)",
                    background: "rgba(255,255,255,0.3)",
                    boxShadow: "0 18px 45px rgba(12,120,220,0.10)",
                  }}
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
                    style={{
                      background: "rgba(12,120,220,0.12)",
                      border: "1px solid rgba(12,120,220,0.20)",
                    }}
                  >
                    <Icon className="w-5 h-5 text-[var(--color-primary-600)] transition-transform duration-300" />
                  </div>

                  <div className="font-semibold tracking-wider text-[rgba(95,107,133,0.95)] uppercase">
                    {feature.label}
                  </div>

                  <div className="mt-2  md:text-[26px] font-bold text-[var(--color-primary-600)]">
                    {feature.title}
                  </div>

                  <p className="mt-2  font-medium text-[rgba(95,107,133,0.9)] leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* CTA */}
          <div className="relative mt-10 flex justify-center">
            <a href="https://app.1tapbiz.com/signup" target="_blank" rel="noopener noreferrer"
              className="h-11 px-6 rounded-md text-white font-semibold  inline-flex items-center gap-2 transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 hover:shadow-xl group"
              style={{
                background: "var(--color-primary-600)",
                boxShadow: "0 14px 30px rgba(12,120,220,0.22)",
              }}
            >
              See Your Dashboard in Action{" "}
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Welcome;

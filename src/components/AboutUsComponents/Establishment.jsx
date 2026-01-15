import {
    Percent,
    Building2,
    Globe,
    Building,
    TrendingUp,
    FileCheck,
  } from "lucide-react";
  
  const reasons = [
    {
      icon: Percent,
      title: "0% Corporate & Income Tax",
      description:
        "Enjoy one of the world&apos;s most favorable tax environments, maximizing your profits and fueling growth.",
    },
    {
      icon: Building2,
      title: "100% Foreign Ownership",
      description:
        "Maintain full control of your business with 100% foreign ownership available in UAE Free Zones.",
    },
    {
      icon: Globe,
      title: "Strategic Global Hub",
      description:
        "Positioned at the crossroads of Europe, Asia, and Africa, providing unmatched access to global markets.",
    },
    {
      icon: Building,
      title: "World-Class Infrastructure",
      description:
        "Benefit from state-of-the-art ports, airports, and digital infrastructure that powers global trade.",
    },
    {
      icon: TrendingUp,
      title: "Stable & Pro-Business Economy",
      description:
        "Operate with confidence in a politically stable and economically diverse environment that supports innovation.",
    },
    {
      icon: FileCheck,
      title: "Easy Visa Processing",
      description:
        "Streamlined processes for investor and employee visas, making it simple to build your team in the UAE.",
    },
  ];
  
  const Establishment = () => {
    return (
      <section className="w-full bg-white">
        <div className="mx-auto w-full max-w-[85%] px-4 sm:px-6 lg:px-10 py-10 md:py-14">
          {/* Heading + subheading (like SS) */}
          <div className="text-center">
            <h2 className="text-[20px] sm:text-[24px] md:text-[28px] font-extrabold text-[#0B1B3A]">
              Why Establish Your Business in the UAE?
            </h2>
  
            <p className="mx-auto mt-2 max-w-3xl leading-5 text-[rgba(15,23,42,0.60)]">
              The United Arab Emirates is more than a location; it&apos;s a launchpad
              for global success. Discover the strategic advantages that make the UAE
              the world&apos;s premier business hub.
            </p>
          </div>
  
          {/* Grid (flat cards, no icons, same spacing) */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {reasons.map((item, idx) => (
              <div
                key={idx}
                className="
                  rounded-lg bg-[var(--color-bg-light)]
                  border border-[rgba(15,23,42,0.06)]
                  px-6 py-5
                  shadow-[0_10px_26px_rgba(15,23,42,0.04)]
                "
              >
                <h3 className="text-lg font-semibold text-[#0B1B3A]">
                  {item.title}
                </h3>
  
                <p className="mt-4 text-[rgba(15,23,42,0.58)]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default Establishment;
  
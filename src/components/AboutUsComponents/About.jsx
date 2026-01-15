import { ArrowRight } from "lucide-react";

const About = () => {
  return (
    <section className="w-full bg-[var(--color-bg-white)]">
      <div className="w-full px-4 sm:px-6 lg:px-16 py-6 md:py-10">
        <div className="relative overflow-hidden rounded-3xl bg-white shadow-sm">
          {/* soft gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary-50)] via-white to-[var(--color-primary-50)]" />

          {/* glow blobs */}
          <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-[var(--color-primary-500)] opacity-[0.10] blur-3xl" />
          <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-[var(--color-primary-500)] opacity-[0.10] blur-3xl" />

          {/* content */}
          <div className="relative flex flex-col items-center text-center px-4 sm:px-10 md:px-16 py-12 md:py-20">
            <h1 className="max-w-6xl text-[34px] sm:text-[44px] md:text-[60px] leading-[1.08] font-semibold text-[#0B1B3A]">
              Your All-In-One Platform for{" "}
              <span className="text-[var(--color-primary-600)] font-semibold decoration-[var(--color-primary-200)]">
                Business Setup in the UAE
              </span>
            </h1>

            <p className="mt-5 max-w-3xl text-sm md:text-lg font-medium text-[rgba(15,23,42,0.70)] leading-relaxed">
              Welcome to 1TapBiz, the leading BizTech solution for entrepreneurs,
              startups, and SMEs. We make company formation in Dubai and the UAE
              fast, transparent, and hassle-free.
              <br />
              Launch your dream business today.
            </p>

            <a
              href="https://app.1tapbiz.com/signup"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl
                         px-7 py-3.5 text-sm sm:text-base font-medium text-white
                         shadow-md hover:shadow-lg transition-all duration-300
                         ease-in-out transform hover:scale-[1.03] active:scale-[0.98] group"
              style={{
                background:
                  "linear-gradient(92deg, var(--color-primary-500) 1.65%, var(--color-action) 98%)",
              }}
            >
              Create Your Account
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </div>

   
      </div>
    </section>
  );
};

export default About;

import { ArrowRight } from "lucide-react";

const contactOptions = [
  {
    title: "Call Us",
    description: "Speak with an account manager immediately.",
    cta: "Call Now",
    href: "tel:+971503586038",
  },
  {
    title: "Email Us",
    description: "Send us your requirements for a detailed response.",
    cta: "Email Us",
    href: "mailto:info@1tapbiz.com",
  },
  {
    title: "Live Chat",
    description: "Connect with us instantly via WhatsApp.",
    cta: "Start Chat",
    href: "https://api.whatsapp.com/send/?phone=971503586038",
  },
];

const Contact = () => {
  return (
    <section className="w-full bg-[var(--color-bg-light)]">
      <div className="mx-auto max-w-[80%] px-4 sm:px-6 lg:px-12 py-12">
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-[20px] md:text-[28px] font-extrabold text-[#0B1B3A]">
            Ready to Start Your UAE Business Journey?
          </h2>

          <p className="mt-2  text-[rgba(15,23,42,0.60)] max-w-xl mx-auto">
            Our experts are here to help. Get in touch for a free consultation
            and let’s turn your business vision into a reality.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {contactOptions.map((item, index) => (
            <div
              key={index}
              className="
                rounded-lg bg-white py-6 px-8 text-center
                border border-[rgba(15,23,42,0.06)]
                shadow-[0_8px_20px_rgba(15,23,42,0.05)]
              "
            >
              <h3 className="  text-lg font-semibold text-[#0B1B3A]">
                {item.title}
              </h3>

              <p className="mt-2  text-[rgba(15,23,42,0.60)]">
                {item.description}
              </p>

              <a
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  item.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                className="
                  mt-3 inline-flex items-center gap-1.5
                  text-sm font-medium text-[#2563EB]
                  hover:underline
                "
              >
                {item.cta}
                <ArrowRight className="h-3 w-3" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;

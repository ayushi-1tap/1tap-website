import FAQ from "../FAQ";

const pricingFaqs = [
  {
    question: "What services does 1TAP offer for business setup in the UAE?",
    answer:
      "1TAP provides a comprehensive range of services to simplify the business setup process in the UAE. This includes business incorporation, VAT registration, license renewals, document preparation, and consultancy services. Additionally, 1TAP’s digital platform offers streamlined processes for regulatory compliance, bookkeeping, and ongoing management of your business in the UAE.",
  },
  {
    question: "How does 1TAP ensure the security of my documents and data?",
    answer:
      "1TAP prioritizes the security of your data through advanced encryption and robust data protection measures. Our platform complies with international data security standards to safeguard your documents and personal information. Regular security audits and access control protocols ensure that only authorized personnel can access your data.",
  },
  {
    question: "Can I manage multiple businesses through the 1TAP dashboard?",
    answer:
      "Yes, the 1TAP dashboard is designed to accommodate users managing multiple businesses. You can access a centralized view of all your businesses, track individual business activities, and receive updates on each business’s compliance and setup status, all from a single platform.",
  },
  {
    question: "How do I track the progress of my business setup?",
    answer:
      "Through the 1TAP dashboard, you can track the status of your business setup in real-time. Our system provides step-by-step updates on key milestones, documentation requirements, and any pending tasks, ensuring that you are always informed of your setup’s progress.",
  },
  {
    question: "Is 1TAP compliant with UAE business regulations?",
    answer:
      "Yes, 1TAP operates in full compliance with UAE business regulations and adheres to the latest laws governing business setups. Our team of experts stays updated on regulatory changes to ensure that our services align with local legal requirements, providing you with a secure and compliant setup experience.",
  },
];

const PricingFAQ = () => {
  return <FAQ faqs={pricingFaqs} />;
};

export default PricingFAQ;

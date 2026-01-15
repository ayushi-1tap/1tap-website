import FAQ from "../FAQ";

const homeFaqs = [
    {
        question: "Is the UAE still 0% tax for foreign businesses?",
        answer:
         "Yes, largely. The UAE implemented a Federal Corporate Tax (CT) of 9% starting June 2023. However, businesses registered in UAE Free Zones (like those set up by 1TAP) can still benefit from a 0% CT rate on qualifying income.\n\nKey Distinction: To qualify for 0% CT, your revenue must be considered 'Qualifying Income,' meaning your business activities must adhere to Free Zone regulations (mostly foreign trade, non-mainland activities, and meeting economic substance requirements). The 9% rate applies primarily to mainland companies with profits exceeding AED 375,000 (approx. $102,000). We ensure your structure is optimized for maximum tax efficiency."
      },
      {
        question: "How does my current company structure affect my tax liability?",
        answer:
         "This is the most critical factor for savings. Tax laws treat entity types drastically differently:\n\nCorporation (LLC/Pvt Ltd): Income is subject to Corporate Tax in the current country (e.g., UK 25%, US ~27%). Your savings are realized by moving this liability to the UAE's 0% Free Zone status.\n\nSole Proprietor/Partnership: Income is typically treated as 'pass-through,' meaning it is taxed at the individual's Personal Income Tax (PIT) rate, often reaching 35% - 55% in high-income brackets globally. By setting up a UAE Free Zone entity, you move this business income out of your high PIT bracket. [Image of Tax difference between Corporate and Personal Income]\n\nThe savings for high-earning sole proprietors are often dramatically higher due to the UAE's 0% personal income tax policy on salaries, dividends, and other forms of personal income.",
      },
      {
        question: "How can 1TAP promise 24-hour setup and management?",
        answer:
          "Our speed is driven by technology. We replace traditional, manual agent processing with our All-in-One (AIO) WebApp. This platform uses direct API integrations with government and Free Zone authorities.\n\n24-Hour Setup: This includes initial documentation and provisional license issuance, getting you legally established fast. The AIO WebApp then acts as your dedicated digital management hub for all subsequent requirements: visa applications, annual renewal filings, and mandated documentation (e.g., ESR, UBO). This drastically reduces the time, cost, and risk associated with compliance.",
      },
      {
        question: "Is UAE bank account guaranteed?",
        answer:
          "While no company can guarantee a final account opening (as the ultimate decision rests with the bank's compliance department), 1TAP provides Guaranteed Bank Pre-Approval.\n\nWe use our established relationships and systems to ensure all necessary KYC, compliance requirements, and documentary evidence are prepared and submitted perfectly the first time. We pre-vet your profile, significantly reducing the standard 3-6 week bank account processing time and drastically lowering the chance of rejection, which is a major pain point for new setups.",
      },
   
      {
        question: "Do I need to visit Dubai to set up or manage my company?",
        answer:
          "No. Our services are designed for 100% remote setup. All documentation, government registration, and communication are handled digitally through our AIO WebApp.\n\nException (Visa): If you opt for a residency visa, a single, short visit (typically 5 days or less) to the UAE is required for the mandated entry stamp and medical check. All subsequent management—including visa renewals, accounting, and compliance—can be managed remotely via our platform.",
      },
];

const HomeFAQ = () => {
  return <FAQ faqs={homeFaqs} />;
};

export default HomeFAQ;

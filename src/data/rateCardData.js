export const rateCardData = {
    header: {
        title: "NOVA WEALTH LLP",
        subtitle: "SME & GROUP WEALTH ADVISORY",
        effectiveDate: "Rate Card | 2026",
        targetSegments: "Entrepreneurs · Chamas · SACCOs · SMEs"
    },
    approach: {
        title: "OUR APPROACH TO GROUP & BUSINESS WEALTH",
        content: "Nova Wealth LLP understands that groups, SACCOs, and growing businesses have unique and often complex wealth advisory needs, from pooled investment governance to business succession and staff benefits. Our SME & Group Advisory practice is built around structured, institution-grade advice tailored to the scale and ambitions of Kenya's entrepreneurial and collective investment sector."
    },
    sections: [
        {
            id: 1,
            title: "SECTION 1 — CLIENT SEGMENT OVERVIEW",
            type: "table",
            headers: ["Feature", "Chama (Investment Group)", "SACCO (Credit Union)", "SME / Entrepreneur"],
            rows: [
                ["Typical Profile", "Registered groups, 10–50 members pooling resources", "Deposit-taking or non-deposit SACCOs, member base 50–50,000", "Business owners, startups to medium enterprises, KES 5M–500M turnover"],
                ["Pooled / Business Assets", "KES 500,000 – 20,000,000", "KES 10,000,000 – 1,000,000,000", "KES 1,000,000 – 50,000,000 (surplus)"],
                ["Primary Advisory Needs", "Group investment strategy, property advisory, governance", "Investment policy, liquidity management, member financial literacy", "Cash flow optimization, pension setup, business succession, director personal advisory"],
                ["Onboarding Fee", "KES 10,000", "KES 30,000", "KES 20,000"]
            ]
        },
        {
            id: 2,
            title: "SECTION 2 — ADVISORY RETAINER FEES",
            subtitle: "Retainer fees are confirmed in the signed Engagement Letter. Final fees within the ranges below are determined by group size, number of assets under advisory, complexity of reporting, and depth of governance support required.",
            type: "table",
            headers: ["Client Type", "Quarterly Retainer (KES)", "Semi-Annual (KES)", "Annual Retainer (KES)"],
            rows: [
                ["Chama — up to 20 members", "30,000 – 60,000", "55,000 – 110,000", "100,000 – 200,000"],
                ["Chama — 21 to 50 members", "60,000 – 100,000", "110,000 – 180,000", "200,000 – 350,000"],
                ["SACCO — Small (under 500 members)", "80,000 – 150,000", "150,000 – 270,000", "280,000 – 520,000"],
                ["SACCO — Medium (500–2,000 members)", "150,000 – 250,000", "280,000 – 450,000", "500,000 – 850,000"],
                ["SME — Small (turnover KES 5M–50M)", "50,000 – 100,000", "90,000 – 180,000", "170,000 – 350,000"],
                ["SME — Medium (turnover KES 50M–500M)", "100,000 – 200,000", "180,000 – 360,000", "350,000 – 700,000"]
            ]
        },
        {
            id: 3,
            title: "SECTION 3 — WHAT IS INCLUDED IN YOUR RETAINER",
            type: "checklist",
            headers: ["Service Component", "Chama", "SACCO", "SME"],
            rows: [
                ["Group / Business Investment Strategy", true, true, true],
                ["Unlimited Advisory Consultations", true, true, true],
                ["Risk Profile Assessment", true, true, true],
                ["Portfolio Monitoring & Rebalancing Guidance", true, true, true],
                ["Quarterly Strategy Review Meeting", true, true, true],
                ["Written Performance Report (per billing period)", true, true, true],
                ["Investment Policy Statement (IPS)", true, true, true],
                ["Governance & Constitution Advisory", true, false, false],
                ["Member Financial Literacy Sessions (2/yr)", true, true, false],
                ["Liquidity & Dividend Strategy", false, true, false],
                ["Regulatory Compliance Guidance (SASRA etc.)", false, true, false],
                ["Business Succession Planning", false, false, true],
                ["Director Personal Advisory (1 director)", false, false, true],
                ["Business Cash Flow & Treasury Optimization", false, false, true],
                ["Occupational Pension / Staff Benefits Setup", false, false, true]
            ]
        },
        {
            id: 4,
            title: "SECTION 4 — PORTFOLIO PERFORMANCE FEE",
            subtitle: "Nova Wealth earns a performance fee only when the portfolio delivers measurable net growth. This fee is calculated independently and is payable only after verified, positive performance, never on paper gains or unrealized appreciation alone.",
            type: "performance_table",
            headers: ["Segment", "Performance Fee", "Billing Cycle", "How It Works"],
            rows: [
                ["Chama", "8% of net growth", "Annual (January)", "Calculated on group pooled portfolio. Growth excludes new member contributions made during the period."],
                ["SACCO", "5% of net growth", "Annual", "Benchmarked against agreed IPS targets. Calculated on investable portfolio, excluding member loan book."],
                ["SME / Entrepreneur", "7% of net growth", "Annual", "Applied on company investable surplus portfolio, net of working capital and capex adjustments."]
            ],
            formula: "Performance Fee = Rate × (Closing Portfolio Value − Opening Value − Net New Contributions / Capital Injections)",
            note: "No growth = no performance fee. Performance fees are subject to independent verification and require client sign-off before invoicing."
        },
        {
            id: 5,
            title: "SECTION 5 — INSTITUTIONAL COMMISSION DISCLOSURE",
            subtitle: "Nova Wealth LLP may receive commissions from vetted financial institutions when clients access their products through our referral. These commissions are paid by the institution, not by the client, and are fully disclosed in writing before any product recommendation. Our advice remains independent and solely in the best interests of the client.",
            type: "table",
            headers: ["Partner / Product", "Commission Range", "Disclosure Policy"],
            rows: [
                ["Group Life & General Insurance", "0.5% – 2.0%", "Disclosed in writing before any product recommendation. Client / group retains full right to decline."],
                ["Unit Trusts & Money Market Funds", "0.5% – 1.5%", "Commission paid by the fund manager, not deducted from client funds."],
                ["Bank Products — Term Deposits, Group Loans", "0.5% – 1.0%", "Disclosed prior to referral. No obligation to use recommended institution."],
                ["Pension & Umbrella Schemes (for SME staff)", "0.5% – 1.5%", "Annual commission statement provided to client each January."],
                ["Real Estate / Property Referrals", "1.0% – 3.0%", "Commission paid by developer or agent. No cost or obligation to client."],
                ["Structured Products & Private Placements", "0.8% – 2.0%", "Disclosed in writing. Only recommended where suitable per client risk profile."]
            ]
        },
        {
            id: 6,
            title: "SECTION 6 — SPECIALIST & PROJECT-BASED SERVICES",
            subtitle: "The following services are available as standalone engagements or add-ons for retainer clients requiring specialist deliverables beyond standard advisory scope.",
            type: "table",
            headers: ["Service", "Fee (KES)", "Notes"],
            rows: [
                ["Investment Policy Statement (IPS) — standalone", "30,000 – 80,000", "Governance document with risk profiling and asset allocation framework. For Chama, SACCO, or SME."],
                ["Financial Wellness Workshop (per session)", "15,000 – 50,000", "Group education session for Chama members, SACCO staff, or company employees."],
                ["Business Valuation Advisory", "80,000 – 250,000", "For SMEs pre-sale, merger, or succession. Scope-dependent."],
                ["Occupational Pension Scheme Setup", "40,000 – 100,000", "Setup advisory for SMEs establishing umbrella or standalone staff pension."],
                ["Chama / SACCO Governance Review", "25,000 – 60,000", "Constitution alignment, committee roles, dividend and loan policy review."],
                ["Hourly Advisory (ad-hoc)", "5,000 – 12,000 / hr", "Minimum 1 hour. For issues outside retainer scope. Invoiced same day."]
            ]
        },
        {
            id: 7,
            title: "SECTION 7 — HOW TO GET STARTED",
            type: "list",
            items: [
                "Step 1 — Complimentary Discovery Call (45 mins): We understand your group structure, business goals, and advisory needs.",
                "Step 2 — Custom Proposal & Fee Agreement: Written proposal with specific fees, scope, and expected deliverables.",
                "Step 3 — Onboarding & Entity Verification: Engagement Letter signed, onboarding fee paid, KYC and entity documentation submitted.",
                "Step 4 — Advisory Kicks Off: First strategy session within 5 business days. Investment Policy Statement drafted within 30 days."
            ]
        },
        {
            id: 8,
            title: "SECTION 8 — PAYMENT TERMS & CONDITIONS",
            type: "props_table",
            headers: ["Term", "Detail"],
            rows: [
                ["Retainer Fees", "Payable upfront at start of each period. Annual retainers may be split 50/50 (Jan & Jul) by agreement."],
                ["Performance Fee", "Invoiced in January for the preceding year. Due within 30 days. Subject to independent portfolio verification."],
                ["Project / One-Off Fees", "50% upfront on engagement; 50% on delivery. Scope changes billed separately."],
                ["Onboarding Fee", "Non-refundable. Covers KYC, entity verification, risk profiling, and onboarding documentation."],
                ["Late Payment", "2% per month after 7-day grace period. Services may be paused after 30 days of non-payment."],
                ["Payment Methods", "Bank transfer (EFT), M-Pesa Paybill, cheque, or direct debit (with authorisation). KES or USD."],
                ["Signatory Requirements", "For Chamas and SACCOs, payment mandates must align with the group's authorised signatories."],
                ["VAT", "All fees are exclusive of VAT at 16% where applicable."]
            ]
        }
    ],
    footer: {
        vatNote: "All fees are exclusive of VAT at 16% where applicable under Kenya Revenue Authority guidelines.",
        validity: "This rate card is effective January 2025 and supersedes all prior rate cards. Fees subject to review with 60 days' written notice.",
        contact: "NOVA WEALTH LLP | Nairobi, Kenya | info@novawealth.co.ke | www.novawealth.co.ke"
    }
};

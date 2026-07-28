export const SAMPLE_PROFILES = [
  {
    id: "profile-1",
    entityType: "INDIVIDUAL", // INDIVIDUAL or BUSINESS
    applicantName: "Jean Paul Habimana",
    nidOrTin: "1199880012345678",
    phone: "+250 788 123 456",
    tradeCategory: "Retail Merchant (Electronics & Supplies)",
    location: "Nyarugenge, Nyabugogo Market, Kigali",
    registrationType: "Individual Sole Proprietor",
    crbStatus: "THIN_FILE", // THIN_FILE, CLEAN, ACTIVE_DEFAULT
    crbStatusText: "Thin File (No Prior Bank Loans Recorded)",
    score: 780,
    riskGrade: "Grade A",
    riskBadgeClass: "badge-prime",
    maxLoanLimitRwf: 1500000,
    dailyRepaymentCapRwf: 18500, // 15% max daily revenue
    monthlyVolumeRwf: 4200000,
    avgDailyFloatRwf: 145000,
    cashflowVelocityScore: 94,
    stabilityIndexScore: 88,
    supplierDisciplineScore: 92,
    utilityComplianceScore: 90,
    retainedFloatScore: 85,
    aiConfidencePercent: 96.4,
    historyDays: 90,
    memoSummary: "Applicant processes strong, high-frequency daily MOMO Pay transactions. Demonstrates outstanding supplier payment discipline to verified wholesalers (Bralirwa & Sulfo). Clean CRB status with zero active default history.",
    citations: [
      { id: "TXN-884920", date: "2026-07-26", desc: "MOMO Pay Receipt (Merchant #88392)", amountRwf: 125000, type: "INFLOW" },
      { id: "TXN-884918", date: "2026-07-25", desc: "Wholesale Supplier Payout (Bralirwa Ltd)", amountRwf: 320000, type: "OUTFLOW" },
      { id: "TXN-884910", date: "2026-07-24", desc: "WASAC Water Utility Bill Payment", amountRwf: 14500, type: "UTILITY" },
      { id: "TXN-884902", date: "2026-07-22", desc: "EUCL Electricity Cashpower Purchase", amountRwf: 25000, type: "UTILITY" }
    ],
    dailyHeatmap: [
      120, 140, 180, 210, 190, 250, 310,
      130, 150, 190, 220, 200, 280, 330,
      110, 160, 175, 205, 195, 260, 320,
      140, 165, 185, 230, 210, 290, 340
    ]
  },
  {
    id: "profile-2",
    entityType: "BUSINESS",
    applicantName: "Akagera Hardware Ltd",
    nidOrTin: "RDB-TIN: 109876543",
    phone: "+250 788 999 888",
    tradeCategory: "Construction Materials & Hardware Wholesale",
    location: "Kicukiro, Gikondo Industrial Zone, Kigali",
    registrationType: "RDB Registered Limited Liability Company",
    crbStatus: "CLEAN",
    crbStatusText: "Clean (1 Past Equipment Loan Paid On-Time at Urwego Bank)",
    score: 810,
    riskGrade: "Grade A Prime",
    riskBadgeClass: "badge-prime",
    maxLoanLimitRwf: 12500000,
    dailyRepaymentCapRwf: 120000,
    monthlyVolumeRwf: 28500000,
    avgDailyFloatRwf: 1250000,
    cashflowVelocityScore: 98,
    stabilityIndexScore: 94,
    supplierDisciplineScore: 96,
    utilityComplianceScore: 95,
    retainedFloatScore: 91,
    aiConfidencePercent: 98.2,
    historyDays: 180,
    memoSummary: "High-tier commercial enterprise. Exceptional daily cashflow volume exceeding 28M RWF/mo. Excellent past credit record on TransUnion CRB with full on-time repayment history.",
    citations: [
      { id: "TXN-991040", date: "2026-07-27", desc: "Contractor Invoice MoMo Pay (#99302)", amountRwf: 1850000, type: "INFLOW" },
      { id: "TXN-991022", date: "2026-07-24", desc: "Cimerwa Cement Distributor Settlement", amountRwf: 3500000, type: "OUTFLOW" },
      { id: "TXN-991010", date: "2026-07-20", desc: "RRA Quarterly Tax Declaration Payout", amountRwf: 450000, type: "UTILITY" }
    ],
    dailyHeatmap: [
      400, 450, 520, 600, 580, 720, 850,
      420, 480, 550, 620, 610, 780, 890,
      390, 470, 530, 610, 590, 740, 860,
      430, 490, 560, 640, 630, 800, 920
    ]
  },
  {
    id: "profile-3",
    entityType: "INDIVIDUAL",
    applicantName: "Eric Mugisha",
    nidOrTin: "1200180055443322",
    phone: "+250 783 456 789",
    tradeCategory: "Transportation (Kigali Moto-Taxi Rider)",
    location: "Gasabo, Remera Corner, Kigali",
    registrationType: "FERWACOTAMO Cooperative Registered Rider",
    crbStatus: "THIN_FILE",
    crbStatusText: "Thin File (No Bank Account or Prior Bank Loans)",
    score: 685,
    riskGrade: "Grade B Approved",
    riskBadgeClass: "badge-moderate",
    maxLoanLimitRwf: 350000,
    dailyRepaymentCapRwf: 3800,
    monthlyVolumeRwf: 580000,
    avgDailyFloatRwf: 18000,
    cashflowVelocityScore: 78,
    stabilityIndexScore: 72,
    supplierDisciplineScore: 75,
    utilityComplianceScore: 80,
    retainedFloatScore: 68,
    aiConfidencePercent: 91.5,
    historyDays: 60,
    memoSummary: "Consistent daily passenger ride income via MoMo transfers. Low average daily float, but reliable micro-deposit velocity. Suitable for 30-day working capital micro-loan.",
    citations: [
      { id: "TXN-44120", date: "2026-07-27", desc: "Passenger Fare Transfer", amountRwf: 2000, type: "INFLOW" },
      { id: "TXN-44118", date: "2026-07-26", desc: "SP Fuel Station MoMo Pay", amountRwf: 5000, type: "OUTFLOW" },
      { id: "TXN-44105", date: "2026-07-25", desc: "Cooperative Daily Membership Fee", amountRwf: 1000, type: "OUTFLOW" }
    ],
    dailyHeatmap: [
      40, 45, 50, 60, 55, 70, 85,
      42, 48, 52, 62, 58, 75, 88,
      38, 46, 51, 61, 56, 72, 84,
      43, 49, 54, 65, 60, 78, 90
    ]
  },
  {
    id: "profile-4",
    entityType: "INDIVIDUAL",
    applicantName: "Alexis Kayiranga",
    nidOrTin: "1199380077665544",
    phone: "+250 782 111 222",
    tradeCategory: "Informal Electronics Repair",
    location: "Kicukiro, Sonatubes, Kigali",
    registrationType: "Individual Informal Trader",
    crbStatus: "ACTIVE_DEFAULT",
    crbStatusText: "Flagged Active Default (1 Unpaid Loan at Cogebanque from 2024)",
    score: 410,
    riskGrade: "Grade D Flagged",
    riskBadgeClass: "badge-default",
    maxLoanLimitRwf: 0,
    dailyRepaymentCapRwf: 0,
    monthlyVolumeRwf: 1100000,
    avgDailyFloatRwf: 8000,
    cashflowVelocityScore: 45,
    stabilityIndexScore: 40,
    supplierDisciplineScore: 35,
    utilityComplianceScore: 50,
    retainedFloatScore: 25,
    aiConfidencePercent: 88.0,
    historyDays: 30,
    memoSummary: "UNDERWRITING REJECTED. TransUnion CRB query flagged an active defaulted bank loan (COG-2024-884) with 450,000 RWF outstanding. High cash flow volatility and low wallet float.",
    citations: [
      { id: "TXN-11090", date: "2026-07-20", desc: "MOMO Pay Transfer Receipt", amountRwf: 45000, type: "INFLOW" },
      { id: "TXN-11088", date: "2026-07-18", desc: "Personal Cash-Out at MoMo Agent", amountRwf: 40000, type: "OUTFLOW" }
    ],
    dailyHeatmap: [
      10, 0, 5, 20, 0, 30, 40,
      0, 15, 0, 25, 0, 35, 50,
      5, 0, 10, 0, 20, 0, 30,
      0, 10, 0, 15, 0, 25, 40
    ]
  }
];

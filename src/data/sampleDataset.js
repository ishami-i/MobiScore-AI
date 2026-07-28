/**
 * Master Sample Dataset for Rwandan MSMEs & Mobile Money Statements
 */

export const APPLICANT_PROFILES = [
  {
    id: "APP-101",
    entityType: "INDIVIDUAL",
    name: "Jean Paul Habimana",
    nidOrTin: "1199880012345678",
    phone: "+250 788 123 456",
    category: "Retail Electronics & Hardware",
    location: "Nyarugenge, Nyabugogo Market, Kigali",
    crbStatus: "THIN_FILE",
    crbStatusText: "Thin File (No Bank Account or Prior Bank Loans)",
    transactions: [
      { txId: "FT-29440570415", date: "2026-07-26 10:58:26", type: "MONEY_RECEIVED", amount: 125000, senderName: "Eric NZAYISENGA", category: "Customer Payment Inflow" },
      { txId: "TX-29440520601", date: "2026-07-25 14:20:10", type: "MERCHANT_PAYMENT", amount: 320000, merchantName: "Bralirwa Distributor Ltd", category: "Wholesale Supplier Payout" },
      { txId: "TX-29440520602", date: "2026-07-24 09:15:00", type: "UTILITY", amount: 14500, merchantName: "WASAC Water Utility", category: "Utility Bill" },
      { txId: "FT-29440570418", date: "2026-07-23 16:45:12", type: "MONEY_RECEIVED", amount: 210000, senderName: "Alice MUREKATETE", category: "Customer Payment Inflow" },
      { txId: "FT-29440570420", date: "2026-07-22 11:30:00", type: "MONEY_RECEIVED", amount: 185000, senderName: "Jean de Dieu Nshimiyimana", category: "Customer Payment Inflow" },
      { txId: "TX-29440520609", date: "2026-07-20 15:10:44", type: "MONEY_SENT", amount: 45000, recipientName: "Sulfo Rwanda Ltd", category: "Supplier Payout" }
    ],
    sampleSmsText: `You have received 125000 RWF from Eric NZAYISENGA (250780335364) at 2026-07-26 10:58:26. Balance: 34921 RWF. FT Id: 29440570415.`
  },
  {
    id: "APP-102",
    entityType: "BUSINESS",
    name: "Akagera Hardware Ltd",
    nidOrTin: "RDB-TIN: 109876543",
    phone: "+250 788 999 888",
    category: "Construction & Wholesale Hardware",
    location: "Kicukiro, Gikondo Industrial Zone, Kigali",
    crbStatus: "CLEAN",
    crbStatusText: "Clean (1 Past Equipment Loan Paid On-Time at Urwego Bank)",
    transactions: [
      { txId: "FT-88301920", date: "2026-07-27 08:30:00", type: "MONEY_RECEIVED", amount: 2500000, senderName: "Kigali Building Contractors", category: "Commercial Sale" },
      { txId: "TX-88301925", date: "2026-07-25 12:00:00", type: "MERCHANT_PAYMENT", amount: 4500000, merchantName: "Cimerwa Cement Factory", category: "Raw Materials" },
      { txId: "FT-88301930", date: "2026-07-24 17:10:00", type: "MONEY_RECEIVED", amount: 1800000, senderName: "Musanze Housing Cooperative", category: "Commercial Sale" }
    ],
    sampleSmsText: `TxId:88301925*S* Your payment of 4,500,000 RWF to Cimerwa Cement Factory 1879709 was completed at 2026-07-25 12:00:00. Balance: 12,500,000 RWF. Fee: 0 RWF.`
  },
  {
    id: "APP-103",
    entityType: "INDIVIDUAL",
    name: "Eric Mugisha",
    nidOrTin: "1200180055443322",
    phone: "+250 783 456 789",
    category: "Transportation (Moto-Taxi)",
    location: "Gasabo, Remera Corner, Kigali",
    crbStatus: "THIN_FILE",
    crbStatusText: "Thin File (No Prior Bank Accounts or Loans)",
    transactions: [
      { txId: "FT-33201", date: "2026-07-27 09:12:00", type: "MONEY_RECEIVED", amount: 2500, senderName: "Passenger A", category: "Fare Payment" },
      { txId: "FT-33202", date: "2026-07-27 10:45:00", type: "MONEY_RECEIVED", amount: 3000, senderName: "Passenger B", category: "Fare Payment" },
      { txId: "TX-33205", date: "2026-07-26 18:20:00", type: "MERCHANT_PAYMENT", amount: 5000, merchantName: "SP Fuel Station Remera", category: "Fuel Purchase" }
    ],
    sampleSmsText: `You have received 2500 RWF from Passenger A (250783111222) at 2026-07-27 09:12:00. Balance: 18500 RWF.`
  },
  {
    id: "APP-104",
    entityType: "INDIVIDUAL",
    name: "Alexis Kayiranga",
    nidOrTin: "1199380077665544",
    phone: "+250 782 111 222",
    category: "Electronics Repair",
    location: "Kicukiro, Sonatubes, Kigali",
    crbStatus: "ACTIVE_DEFAULT",
    crbStatusText: "Flagged Active Default (1 Unpaid Loan at Cogebanque from 2024)",
    transactions: [
      { txId: "TX-99001", date: "2026-07-20 14:00:00", type: "MONEY_RECEIVED", amount: 45000, senderName: "Client X", category: "Repair Service" },
      { txId: "TX-99002", date: "2026-07-18 16:30:00", type: "WITHDRAWAL", amount: 40000, recipientName: "MoMo Agent Cashout", category: "Cashout" }
    ],
    sampleSmsText: `*165*S*40000 RWF transferred to Cash Agent (250788990011) at 2026-07-18 16:30:00. Fee: 400 RWF. Balance: 8000 RWF.`
  }
];

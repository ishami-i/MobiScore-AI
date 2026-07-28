# MobiScore-AI

> **AI-Powered Alternative Credit Scoring Platform for MSMEs Using Mobile Money Transaction Analysis**

![Platform Status](https://img.shields.io/badge/Platform-Production_Ready-emerald)
![Tech Stack](https://img.shields.io/badge/Stack-React_%7C_Python_%7C_FastAPI_%7C_XGBoost-blue)
![Location](https://img.shields.io/badge/Market-Rwanda_%7C_East_Africa-amber)
![License](https://img.shields.io/badge/License-MIT-purple)

---

## 📌 Overview

**MobiScore-AI** is an intelligent financial technology platform that enables commercial banks, microfinance institutions (MFIs), Umurenge SACCOs, fintech companies, and loan guarantee providers to assess the creditworthiness of Micro, Small, and Medium Enterprises (MSMEs) using **Mobile Money transaction history** instead of traditional physical collateral.

The platform ingests uploaded Mobile Money statements (PDF, CSV, Excel, JSON, or SMS text records), extracts transaction data, computes financial analytics, applies machine learning models, and generates explainable credit scores (0–1000) and downloadable reports to support lending decisions.

---

## 🎯 Problem Statement

In Rwanda and across East Africa, over **75% of MSMEs and informal micro-merchants fail to access bank loans** because they lack traditional physical collateral (such as registered land titles or titled buildings).

At the same time, these businesses process millions of RWF in daily sales and supplier payments through Mobile Money services such as **MTN MoMo Business (`*182*8*1*Code#`)** and **Airtel e-Kaash Business**.

**MobiScore-AI** transforms these digital transaction histories into reliable alternative financial evidence, allowing lenders to evaluate loan applications fairly, quickly, and accurately.

---

## 🚀 Key Features

* **Multi-Format Document Ingestion**: Upload official Mobile Money statements in PDF, CSV, Excel (`.xlsx`), JSON, or raw SMS transaction records.
* **Multimodal Parsing & OCR**: Automatic PDF table extraction, OCR processing for scanned receipts, and regex-based SMS message parsing.
* **Intelligent Transaction Classification**: Categorizes transactions into Money Received, Money Sent, Merchant Payments, Wholesale Supplier Outflows, Utility Bills (WASAC/EUCL), and RRA Tax Declarations.
* **Financial Analytics Engine**: Computes daily/monthly revenue velocity, net cash flow, average daily float, revenue volatility, and best selling periods.
* **Customer Behavior & Concentration Risk**: Tracks unique vs. returning customers, customer retention rates, and top customer revenue concentration risks.
* **Fraud & Anomaly Audit Engine**: Detects artificial transaction volume inflation, circular loop payments, duplicate transactions, and suspicious spikes.
* **Explainable ML Credit Scoring (0–1000)**: Generates credit scores, Probability of Default (PD) predictions, and SHAP-based feature importance breakdowns.
* **Downloadable Reports**: Exports PDF Credit Assessment Reports and transaction summary CSV files.

---

## 🔄 Platform Workflow

```text
┌─────────────────────────┐       ┌──────────────────────────┐       ┌────────────────────────┐
│  1. Upload Statement    │  ───> │  2. AI Parsing & Audit   │  ───> │  3. Credit Scoring     │
│  (PDF, CSV, Excel, SMS) │       │  (OCR, Schema Norm, Fraud)│       │  (Scale 0 - 1000)      │
└─────────────────────────┘       └──────────────────────────┘       └────────────────────────┘
                                                                                 │
                                                                                 ▼
┌─────────────────────────┐       ┌──────────────────────────┐       ┌────────────────────────┐
│  6. Disbursal via MoMo  │  <─── │  5. Human Officer Signoff│  <─── │  4. Lender Dashboard   │
│  (Instant API Transfer) │       │  (Ethics Sign-Off Check) │       │  (SHAP, Risk Flags, PDF│
└─────────────────────────┘       └──────────────────────────┘       └────────────────────────┘
```

1. **Statement Submission**: Business owner uploads their official Mobile Money statement.
2. **Data Extraction & Validation**: The parser normalizes transaction records into a standard schema.
3. **Financial Analysis**: Revenue velocity, cash flow stability, and customer retention metrics are calculated.
4. **Machine Learning Credit Scoring**: XGBoost/LightGBM model predicts credit score (0-1000) and default risk.
5. **Fraud Detection Check**: Identifies suspicious transaction spikes, duplicates, or circular loops.
6. **Lender Underwriting & Approval**: Loan officer reviews the credit memo, verifies TransUnion CRB status, performs human sign-off, and approves loan disbursal.

---

## 📑 Supported Input Formats

* **PDF Statements**: Official multi-page MTN MoMo / Airtel e-Kaash statements.
* **CSV Spreadsheets**: Raw transaction export files.
* **Excel Files (`.xlsx`)**: Structured merchant collection sheets.
* **JSON Exports**: Direct digital wallet API data exports.
* **SMS Messages**: Unstructured SMS notifications (Money Sent, Money Received, Merchant Payment).

---

## 📊 Credit Score Rating Tiers (Scale: 0 – 1000)

| Score Range | Rating Tier | Default Risk | Loan Eligibility |
| :--- | :--- | :--- | :--- |
| **850 – 1000** | **Excellent** | Very Low (~1.8%) | Prime Micro-Loan (Up to 50% Monthly Revenue) |
| **700 – 849** | **Good** | Low (~4.2%) | Standard Approval (Up to 35% Monthly Revenue) |
| **550 – 699** | **Fair** | Moderate (~11.5%) | Restricted Approval (Up to 20% Monthly Revenue) |
| **400 – 549** | **High Risk** | High (~28.4%) | Requires Additional Manual Review / Collateral |
| **Below 400** | **Very High Risk** | Very High (~62.0%) | Underwriting Rejected |

---

## 🛠️ Technology Stack

### Backend & AI Processing
* **Python**: Core data science & backend logic.
* **FastAPI / Django REST Framework**: Enterprise RESTful API services.
* **PostgreSQL**: Relational database for transactions, users, and audit logs.
* **Redis & Celery**: Background task queue for statement processing.

### Machine Learning & Analytics
* **Scikit-learn, XGBoost, LightGBM, CatBoost**: Predictive credit risk & default probability models.
* **Pandas & NumPy**: High-performance data manipulation.
* **SHAP (SHapley Additive exPlanations)**: Explainable AI model outputs.

### Frontend
* **React + Vite**: Responsive, high-graphic user interface.
* **Tailwind CSS & Vanilla CSS**: Dark mode glassmorphism UI.
* **Lucide React**: Modern iconography.

---

## 📁 Project Structure

```text
MobiScore-AI/
├── backend/                  # FastAPI REST API services
│   ├── app/
│   │   ├── api/              # Endpoint routes
│   │   ├── core/             # Configuration & security
│   │   └── models/           # Database models
├── frontend/                 # React + Vite application
│   ├── src/
│   │   ├── components/       # UI components & dashboards
│   │   ├── data/             # Sample datasets & fixtures
│   │   └── services/         # Parsers, Financial Engine, ML Scoring
├── ml/                       # Machine learning pipelines & notebooks
│   ├── models/               # Trained XGBoost/LightGBM models
│   └── training/             # Model training scripts
├── parser/                   # PDF, OCR, CSV, and SMS extraction engines
├── reports/                  # PDF & CSV credit report generators
├── docs/                     # API documentation & architecture diagrams
└── README.md                 # Project documentation
```

---

## 🌍 Vision & Future Impact

Our vision for **MobiScore-AI** is to expand financial inclusion across Africa by enabling lenders to evaluate micro-businesses based on **real economic performance** rather than physical collateral assets. 

By combining Mobile Money alternative data with explainable artificial intelligence, MobiScore-AI empowers underserved MSMEs to access working capital, grow sustainably, and drive economic development across Rwanda and the broader continent.

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.
# MobiScore-AI

> AI-Powered Alternative Credit Scoring Platform for MSMEs Using Mobile Money Transaction Analysis

## Overview

MobiScore-AI is an intelligent financial technology platform that enables banks, SACCOs, microfinance institutions, fintech companies, and loan guarantee providers to assess the creditworthiness of Micro, Small, and Medium Enterprises (MSMEs) using Mobile Money transaction history instead of traditional collateral.

The platform analyzes uploaded Mobile Money statements (PDF or CSV), extracts transaction data, computes financial metrics, applies machine learning models, and generates explainable credit scores and downloadable reports to support lending decisions.

---

## Problem Statement

Many MSMEs in Rwanda have healthy businesses but struggle to access financing because they lack physical assets required as collateral.

At the same time, many businesses process most of their sales and payments through Mobile Money services such as MTN MoMo Business and Airtel e-Kaash Business.

MobiScore-AI transforms these digital transaction histories into reliable financial insights that lenders can use to evaluate loan applications more fairly and efficiently.

---

## Key Features

* Upload Mobile Money statements (PDF, CSV, Excel, JSON)
* Automatic PDF table extraction and OCR support
* SMS transaction parsing
* Intelligent transaction classification
* Financial analytics dashboard
* AI-powered credit scoring (0–1000)
* Probability of Default (PD) prediction
* Fraud and anomaly detection
* Cash flow analysis
* Revenue trend analysis
* Customer behavior insights
* Loan recommendation engine
* Downloadable PDF credit reports
* Exportable transaction summaries
* Explainable AI using feature importance

---

## Workflow

1. Business owner registers an account.
2. Business owner uploads a Mobile Money transaction statement.
3. The platform validates and extracts transaction data.
4. Transactions are cleaned and standardized.
5. Financial metrics are calculated.
6. Machine learning models generate a credit score.
7. Fraud detection checks for suspicious behavior.
8. A lender dashboard displays business insights.
9. The lender downloads a comprehensive credit assessment report and makes an informed loan decision.

---

## Supported Inputs

* PDF statements
* CSV exports
* Excel spreadsheets (.xlsx)
* JSON transaction exports
* Mobile Money SMS transaction records

Example transaction types include:

* Money received
* Money sent
* Merchant payments
* Merchant collections
* Cash withdrawals
* Deposits
* Utility payments
* Airtime purchases
* Loan repayments
* Failed transactions
* Reversed transactions

---

## Credit Score Factors

The scoring engine evaluates multiple indicators, including:

* Revenue consistency
* Monthly income
* Cash flow stability
* Transaction frequency
* Customer diversity
* Average account balance
* Business longevity
* Revenue growth
* Spending behavior
* Seasonal trends
* Financial discipline
* Fraud indicators

The final score ranges from **0 to 1000**.

| Score     | Rating         |
| --------- | -------------- |
| 850–1000  | Excellent      |
| 700–849   | Good           |
| 550–699   | Fair           |
| 400–549   | High Risk      |
| Below 400 | Very High Risk |

---

## Generated Reports

The platform produces downloadable reports for lenders, including:

* Business profile
* Financial summary
* Cash flow analysis
* Revenue trends
* Customer insights
* Credit score
* Risk level
* Probability of default
* Recommended loan amount
* Recommended repayment period
* AI-generated explanation of the score
* Fraud alerts

---

## Technology Stack

### Backend

* Python
* FastAPI or Django REST Framework
* PostgreSQL
* Redis
* Celery

### Machine Learning

* Scikit-learn
* XGBoost
* LightGBM
* CatBoost
* Pandas
* NumPy
* SHAP

### Document Processing

* OCR
* PDF parsing
* CSV parsing
* SMS parsing

### Frontend

* React
* TypeScript
* Tailwind CSS
* Recharts or Chart.js

### Deployment

* Docker
* Kubernetes
* Nginx
* AWS, Azure, or Google Cloud

---

## Project Structure

```text
MobiScore-AI/
├── backend/
├── frontend/
├── ml/
├── parser/
├── reports/
├── docs/
├── datasets/
├── tests/
├── docker/
├── scripts/
├── README.md
└── LICENSE
```

---

## Future Enhancements

* Open Banking integration
* Real-time Mobile Money APIs
* Accounting software integration
* Tax record integration
* Mobile application
* Multi-country support across Africa
* Multi-language support
* Advanced portfolio risk analytics

---

## Vision

Our vision is to expand financial inclusion by enabling lenders to assess businesses based on real financial performance rather than physical collateral. By leveraging Mobile Money transaction data and explainable artificial intelligence, MobiScore-AI empowers underserved MSMEs to access financing, grow sustainably, and contribute to economic development across Rwanda and the broader African continent.
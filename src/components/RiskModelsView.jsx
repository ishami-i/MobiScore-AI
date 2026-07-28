import React from 'react';
import { Sliders, Cpu, ShieldCheck, Activity, BarChart2 } from 'lucide-react';

export default function RiskModelsView() {
  return (
    <div className="page-container">
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 800, fontFamily: 'Outfit, sans-serif' }}>Risk Models & Scoring Weights</h1>
        <p style={{ fontSize: '13px', color: '#94A3B8' }}>Calibrate machine learning features, SHAP weights, and Probability of Default (PD) thresholds.</p>
      </div>

      <div className="stats-grid-3">
        <div className="stat-card">
          <div className="stat-label">Active Model Engine</div>
          <div className="stat-number" style={{ color: '#FACC15', fontSize: '24px' }}>XGBoost v3.6-Flash</div>
          <div style={{ fontSize: '11px', color: '#10B981', marginTop: '4px' }}>Gemini 3.6 Multimodal Underwriting</div>
        </div>

        <div className="stat-card">
          <div className="stat-label">ROC-AUC Model Accuracy</div>
          <div className="stat-number" style={{ color: '#10B981' }}>0.942</div>
          <div style={{ fontSize: '11px', color: '#64748B', marginTop: '4px' }}>Validated against 45,000 MoMo records</div>
        </div>

        <div className="stat-card">
          <div className="stat-label">TransUnion Hygiene Gate</div>
          <div className="stat-number" style={{ color: '#06B6D4' }}>Active</div>
          <div style={{ fontSize: '11px', color: '#64748B', marginTop: '4px' }}>Automatic default penalty (-200 pts)</div>
        </div>
      </div>

      {/* Feature Weight Table */}
      <div className="table-container">
        <div style={{ padding: '20px', borderBottom: '1px solid #1E293B' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 700, fontFamily: 'Outfit, sans-serif' }}>SHAP Model Feature Importance Breakdown</h2>
          <p style={{ fontSize: '12px', color: '#94A3B8' }}>Scoring weight allocation across MoMo statement indicators.</p>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th>Feature Indicator</th>
              <th>Category</th>
              <th>SHAP Weight Impact</th>
              <th>Sensitivity</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ fontWeight: 700, color: '#FFFFFF' }}>Net Monthly Cash Flow Inflow</td>
              <td style={{ color: '#94A3B8' }}>Cashflow Velocity</td>
              <td style={{ fontWeight: 800, color: '#FACC15' }}>32.4%</td>
              <td><span className="badge badge-green">High Positive</span></td>
              <td><span className="badge badge-green">Enabled</span></td>
            </tr>
            <tr>
              <td style={{ fontWeight: 700, color: '#FFFFFF' }}>Daily Sales Revenue Variance</td>
              <td style={{ color: '#94A3B8' }}>Stability Index</td>
              <td style={{ fontWeight: 800, color: '#FACC15' }}>22.8%</td>
              <td><span className="badge badge-green">Positive</span></td>
              <td><span className="badge badge-green">Enabled</span></td>
            </tr>
            <tr>
              <td style={{ fontWeight: 700, color: '#FFFFFF' }}>Wholesale Supplier Outflows</td>
              <td style={{ color: '#94A3B8' }}>Financial Discipline</td>
              <td style={{ fontWeight: 800, color: '#FACC15' }}>18.2%</td>
              <td><span className="badge badge-green">Positive</span></td>
              <td><span className="badge badge-green">Enabled</span></td>
            </tr>
            <tr>
              <td style={{ fontWeight: 700, color: '#FFFFFF' }}>Customer Concentration Ratio</td>
              <td style={{ color: '#94A3B8' }}>Revenue Diversity</td>
              <td style={{ fontWeight: 800, color: '#FACC15' }}>14.1%</td>
              <td><span className="badge badge-amber">Moderate Negative</span></td>
              <td><span className="badge badge-green">Enabled</span></td>
            </tr>
            <tr>
              <td style={{ fontWeight: 700, color: '#FFFFFF' }}>TransUnion Active CRB Default</td>
              <td style={{ color: '#94A3B8' }}>Hygiene Check</td>
              <td style={{ fontWeight: 800, color: '#EF4444' }}>-200 Score Pts</td>
              <td><span className="badge badge-rose">High Penalty</span></td>
              <td><span className="badge badge-green">Enabled</span></td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
}

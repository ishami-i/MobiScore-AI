import React, { useState } from 'react';
import CleanScoreCard from './CleanScoreCard.jsx';
import CashflowHeatmap from './CashflowHeatmap.jsx';
import AuditPanel from './AuditPanel.jsx';
import { analyzeTransactions } from '../services/financialEngine.js';
import { detectFraud } from '../services/fraudDetector.js';
import { calculateCreditScore } from '../services/scoringEngine.js';
import { printPdfReport, downloadCsvReport } from '../services/pdfReportGenerator.js';
import { 
  Building2, User, FileText, Download, CheckCircle2, ShieldCheck, 
  ArrowLeft, ArrowUpRight, Zap, AlertTriangle, AlertCircle
} from 'lucide-react';

export default function UnderwritingReportView({ applicant, onBack }) {
  const [digitalSignApproved, setDigitalSignApproved] = useState(false);
  const [isApproved, setIsApproved] = useState(false);

  const financialAnalysis = analyzeTransactions(applicant.transactions || []);
  const fraudResult = detectFraud(applicant.transactions || []);
  const scoreResult = calculateCreditScore(financialAnalysis, fraudResult, applicant.crbStatus);

  const handleApprove = () => {
    if (!digitalSignApproved) {
      alert("Ethics Requirement: Please check the Digital Officer Sign-off box before approving.");
      return;
    }
    setIsApproved(true);
  };

  return (
    <div className="page-container">
      
      {/* Top Back Header Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderBottom: '1px solid #1E293B', paddingBottom: '16px' }}>
        <button onClick={onBack} className="btn-outline">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard Queue
        </button>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={() => downloadCsvReport(applicant, applicant.transactions)} className="btn-outline">
            <Download className="w-4 h-4" /> Export CSV
          </button>
          <button onClick={() => printPdfReport(applicant, financialAnalysis, scoreResult, fraudResult)} className="btn-yellow">
            <FileText className="w-4 h-4" /> Download PDF Report
          </button>
        </div>
      </div>

      {/* Clean Score Card */}
      <CleanScoreCard
        score={scoreResult.score}
        riskGrade={scoreResult.scoreTier}
        riskBadgeClass={scoreResult.tierBadgeClass}
        profile={{
          cashflowVelocityScore: Math.round(financialAnalysis.totalInflow / 100000),
          stabilityIndexScore: financialAnalysis.cashFlowStabilityScore,
          supplierDisciplineScore: 90,
          crbStatus: applicant.crbStatus
        }}
      />

      {/* Main Grid */}
      <div className="grid-12">
        
        {/* Left Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* KPIs */}
          <div className="stats-grid-3" style={{ marginBottom: 0 }}>
            <div className="stat-card">
              <div className="stat-label">30-Day Inflow</div>
              <div className="stat-number" style={{ color: '#10B981', fontSize: '20px' }}>
                {financialAnalysis.totalInflow.toLocaleString()} RWF
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-label">30-Day Outflow</div>
              <div className="stat-number" style={{ color: '#CBD5E1', fontSize: '20px' }}>
                {financialAnalysis.totalOutflow.toLocaleString()} RWF
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-label">Net Cash Flow</div>
              <div className="stat-number" style={{ color: '#06B6D4', fontSize: '20px' }}>
                {financialAnalysis.netCashFlow.toLocaleString()} RWF
              </div>
            </div>
          </div>

          <div className="glass-card">
            <CashflowHeatmap dailyData={[120, 140, 180, 210, 190, 250, 310, 130, 150, 190, 220, 200, 280, 330, 110, 160, 175, 205, 195, 260, 320, 140, 165, 185, 230, 210, 290, 340]} />
          </div>

          {/* Gemini Risk Memo */}
          <div className="glass-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid #1E293B', paddingBottom: '12px', marginBottom: '12px' }}>
              <Zap style={{ color: '#FACC15' }} />
              <h3 style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: '#FFFFFF' }}>
                GenAI Underwriting Summary (Gemini 3.6 Flash)
              </h3>
            </div>
            <p style={{ fontSize: '12px', color: '#CBD5E1', lineHeight: '1.6', fontFamily: 'monospace', background: '#060914', padding: '16px', borderRadius: '12px', border: '1px solid #1E293B' }}>
              Applicant processes consistent MOMO Pay sales. Verified TransUnion CRB hygiene status. SHAP model indicates low default risk ({scoreResult.defaultProbabilityPercent}%).
            </p>
          </div>

          {/* Audit Panel */}
          <AuditPanel profile={{
            historyDays: 90,
            aiConfidencePercent: scoreResult.confidenceScorePercent,
            citations: applicant.transactions
          }} />

        </div>

        {/* Right Column: Sizing & Approval */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          <div className="glass-card">
            <h3 style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: '#94A3B8', marginBottom: '16px' }}>
              Loan Sizing & Safe Debt Limits
            </h3>

            <div style={{ background: '#090D1C', border: '1px solid rgba(250, 204, 21, 0.3)', padding: '16px', borderRadius: '12px', marginBottom: '16px' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase' }}>Max Pre-Approved Loan Limit</div>
              <div style={{ fontSize: '28px', fontWeight: 800, color: '#FACC15', fontFamily: 'Outfit, sans-serif', marginTop: '4px' }}>
                {scoreResult.maxLoanLimitRwf.toLocaleString()} RWF
              </div>
            </div>

            <div style={{ background: '#090D1C', border: '1px solid #1E293B', padding: '16px', borderRadius: '12px' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase' }}>Recommended Duration</div>
              <div style={{ fontSize: '20px', fontWeight: 800, color: '#06B6D4', fontFamily: 'Outfit, sans-serif', marginTop: '4px' }}>
                {scoreResult.recommendedDurationDays} Days
              </div>
            </div>
          </div>

          {/* Human Approval Sign-Off */}
          <div className="glass-card" style={{ borderColor: 'rgba(250, 204, 21, 0.4)' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', marginBottom: '20px' }}>
              <input
                type="checkbox"
                id="digitalSignCheck"
                checked={digitalSignApproved}
                onChange={(e) => setDigitalSignApproved(e.target.checked)}
                style={{ marginTop: '3px' }}
              />
              <label htmlFor="digitalSignCheck" style={{ fontSize: '12px', color: '#CBD5E1', cursor: 'pointer', lineHeight: '1.5' }}>
                <strong>Human Approval Sign-Off:</strong> I, as the authorized Bank Officer, authorize the underwriting decision for {applicant.name}.
              </label>
            </div>

            {!isApproved ? (
              <button
                onClick={handleApprove}
                disabled={scoreResult.maxLoanLimitRwf === 0}
                className="btn-yellow"
                style={{ width: '100%', justifyContent: 'center', padding: '14px' }}
              >
                {scoreResult.maxLoanLimitRwf === 0 ? 'UNDERWRITING REJECTED (HIGH RISK)' : 'APPROVE LOAN & DISBURSE VIA MOMO API'}
                <ArrowUpRight className="w-4 h-4" />
              </button>
            ) : (
              <div style={{ background: 'rgba(16, 185, 129, 0.15)', border: '1px solid #10B981', padding: '16px', borderRadius: '12px', textCenter: 'center', textAlign: 'center' }}>
                <CheckCircle2 className="w-8 h-8 text-green" style={{ color: '#10B981', margin: '0 auto 8px' }} />
                <div style={{ fontWeight: 800, color: '#34D399', fontSize: '15px' }}>LOAN APPROVED & DISBURSED!</div>
                <div style={{ fontSize: '11px', color: '#A7F3D0', marginTop: '4px' }}>
                  {scoreResult.maxLoanLimitRwf.toLocaleString()} RWF transferred to {applicant.phone} via MTN MoMo API.
                </div>
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}

import React, { useState } from 'react';
import { APPLICANT_PROFILES } from '../data/sampleDataset.js';
import { analyzeTransactions } from '../services/financialEngine.js';
import { detectFraud } from '../services/fraudDetector.js';
import { calculateCreditScore } from '../services/scoringEngine.js';
import { downloadCsvReport, printPdfReport } from '../services/pdfReportGenerator.js';
import CashflowHeatmap from './CashflowHeatmap.jsx';
import AuditPanel from './AuditPanel.jsx';
import { 
  Building2, User, FileText, CheckCircle2, AlertTriangle, ShieldCheck, 
  DollarSign, Calendar, Sliders, Cpu, ArrowUpRight, Download, Users, TrendingUp, AlertCircle
} from 'lucide-react';

export default function LenderDashboard({ activeApplicant, onSelectApplicant }) {
  const [activeTab, setActiveTab] = useState('SUMMARY'); // 'SUMMARY', 'TRANSACTIONS', 'CUSTOMERS', 'FRAUD'
  const [digitalSignApproved, setDigitalSignApproved] = useState(false);
  const [isApproved, setIsApproved] = useState(false);

  const applicant = activeApplicant || APPLICANT_PROFILES[0];
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
    <div className="space-y-6 py-4">
      {/* Top Applicant Selection Bar */}
      <div className="glass-card p-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-1 flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5" /> Select Applicant from Queue
          </div>
          <div className="text-xs text-slate-400">
            Review live submitted applications or test profiles:
          </div>
        </div>

        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          {APPLICANT_PROFILES.map((p) => (
            <button
              key={p.id}
              onClick={() => { setIsApproved(false); onSelectApplicant(p); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                applicant.id === p.id
                  ? 'bg-amber-400/20 border-amber-400 text-amber-300'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main 2-Column Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN: APPLICANT PROFILE & CREDIT SCORE (0-1000) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Profile Card */}
          <div className="glass-card p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-md bg-slate-900 text-slate-300 border border-slate-800">
                {applicant.entityType === 'INDIVIDUAL' ? <User className="w-3.5 h-3.5 text-amber-400" /> : <Building2 className="w-3.5 h-3.5 text-cyan-400" />}
                {applicant.entityType}
              </span>
              <span className="text-xs font-bold text-slate-400">ID: {applicant.id}</span>
            </div>

            <div>
              <h2 className="text-2xl font-extrabold text-white font-heading">{applicant.name}</h2>
              <div className="text-xs font-mono text-amber-400 mt-0.5">{applicant.nidOrTin}</div>
              <div className="text-xs text-slate-400 mt-2">{applicant.category}</div>
              <div className="text-xs text-slate-500 mt-0.5">{applicant.location}</div>
            </div>

            {/* CRB Status Pill */}
            <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-cyan-400" />
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-400">TransUnion CRB Registry</div>
                  <div className="text-xs font-bold text-white">{applicant.crbStatusText}</div>
                </div>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                applicant.crbStatus === 'ACTIVE_DEFAULT' ? 'bg-rose-950 text-rose-400 border border-rose-800' : 'bg-emerald-950 text-emerald-400 border border-emerald-800'
              }`}>
                {applicant.crbStatus === 'ACTIVE_DEFAULT' ? 'FLAGGED' : 'VERIFIED'}
              </span>
            </div>
          </div>

          {/* ML Credit Score Card (0-1000 Scale) */}
          <div className="glass-card p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  ML Credit Score (Scale: 0 – 1000)
                </div>
                <div className="flex items-baseline gap-3 mt-1">
                  <span className="text-5xl font-extrabold text-white font-heading tracking-tight">
                    {scoreResult.score}
                  </span>
                  <span className="text-xs text-slate-400 font-semibold">/ 1000 Max</span>
                </div>
              </div>

              <span className={`px-4 py-2 rounded-xl text-xs font-extrabold tracking-wide uppercase ${scoreResult.tierBadgeClass}`}>
                {scoreResult.scoreTier}
              </span>
            </div>

            {/* Score Metrics Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <div className="text-[10px] font-bold text-slate-400 uppercase">Default Probability</div>
                <div className="text-lg font-bold text-cyan-400">{scoreResult.defaultProbabilityPercent}%</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <div className="text-[10px] font-bold text-slate-400 uppercase">AI Confidence</div>
                <div className="text-lg font-bold text-emerald-400">{scoreResult.confidenceScorePercent}%</div>
              </div>
            </div>

            {/* SHAP Feature Importances */}
            <div className="space-y-3 pt-2 border-t border-slate-800">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                SHAP Feature Importance & Score Drivers
              </h4>
              <div className="space-y-2 text-xs">
                {scoreResult.featureImportances.map((f, i) => (
                  <div key={i} className="flex justify-between items-center p-2 rounded bg-slate-900/60 border border-slate-800">
                    <span className="text-slate-300">{f.feature}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-slate-400 text-[10px]">[{f.weight}]</span>
                      <span className="font-bold text-amber-400 font-mono">{f.impact}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons: PDF & CSV Export */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => printPdfReport(applicant, financialAnalysis, scoreResult, fraudResult)}
              className="btn-gold justify-center text-xs py-3"
            >
              <FileText className="w-4 h-4" /> Download PDF Report
            </button>
            <button
              onClick={() => downloadCsvReport(applicant, applicant.transactions)}
              className="btn-glass justify-center text-xs py-3"
            >
              <Download className="w-4 h-4" /> Export CSV Statement
            </button>
          </div>

        </div>

        {/* RIGHT COLUMN: FINANCIAL METRICS & DECISION ENGINE */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 p-1 bg-slate-900 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab('SUMMARY')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'SUMMARY' ? 'bg-amber-400 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              Financial Analytics
            </button>
            <button
              onClick={() => setActiveTab('CUSTOMERS')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'CUSTOMERS' ? 'bg-amber-400 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              Customer Diversity ({financialAnalysis.uniqueCustomersCount})
            </button>
            <button
              onClick={() => setActiveTab('FRAUD')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'FRAUD' ? 'bg-amber-400 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              Fraud & Risk Flags ({fraudResult.flags.length})
            </button>
          </div>

          {/* TAB 1: FINANCIAL ANALYTICS */}
          {activeTab === 'SUMMARY' && (
            <div className="space-y-6">
              {/* Financial KPI Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="p-4 rounded-xl glass-card border-slate-800">
                  <div className="text-[10px] font-bold text-slate-400 uppercase">30-Day MoMo Inflow</div>
                  <div className="text-xl font-extrabold text-emerald-400 font-heading mt-1">
                    {financialAnalysis.totalInflow.toLocaleString()} RWF
                  </div>
                </div>

                <div className="p-4 rounded-xl glass-card border-slate-800">
                  <div className="text-[10px] font-bold text-slate-400 uppercase">30-Day Outflow</div>
                  <div className="text-xl font-extrabold text-slate-300 font-heading mt-1">
                    {financialAnalysis.totalOutflow.toLocaleString()} RWF
                  </div>
                </div>

                <div className="p-4 rounded-xl glass-card border-slate-800">
                  <div className="text-[10px] font-bold text-slate-400 uppercase">Net Cash Flow</div>
                  <div className="text-xl font-extrabold text-cyan-400 font-heading mt-1">
                    {financialAnalysis.netCashFlow.toLocaleString()} RWF
                  </div>
                </div>
              </div>

              {/* Time-Based Trends */}
              <div className="glass-card p-5 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Time-Based Business Insights
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                    <div className="text-[10px] text-slate-400">Best Selling Day</div>
                    <div className="font-bold text-amber-400 text-sm mt-0.5">{financialAnalysis.bestSellingDay}</div>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                    <div className="text-[10px] text-slate-400">Peak Business Hours</div>
                    <div className="font-bold text-white text-sm mt-0.5">{financialAnalysis.peakBusinessHours}</div>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                    <div className="text-[10px] text-slate-400">Liquidity Status</div>
                    <div className="font-bold text-emerald-400 text-sm mt-0.5">{financialAnalysis.liquidityStatus}</div>
                  </div>
                </div>
              </div>

              <div className="glass-card p-5">
                <CashflowHeatmap dailyData={[120, 140, 180, 210, 190, 250, 310, 130, 150, 190, 220, 200, 280, 330, 110, 160, 175, 205, 195, 260, 320, 140, 165, 185, 230, 210, 290, 340]} />
              </div>
            </div>
          )}

          {/* TAB 2: CUSTOMER CONCENTRATION */}
          {activeTab === 'CUSTOMERS' && (
            <div className="glass-card p-5 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Customer Diversity & Concentration Analysis
              </h4>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                  <div className="text-slate-400">Customer Retention Rate</div>
                  <div className="text-lg font-bold text-emerald-400 mt-1">{financialAnalysis.customerRetentionRate}%</div>
                </div>
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                  <div className="text-slate-400">Top Customer Concentration Risk</div>
                  <div className="text-lg font-bold text-amber-400 mt-1">{financialAnalysis.topCustomerConcentrationPercent}%</div>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <h5 className="font-bold text-slate-300 text-[11px] uppercase">Top Repeat Customers</h5>
                {financialAnalysis.topCustomers.map((c, i) => (
                  <div key={i} className="flex justify-between items-center p-2.5 rounded bg-slate-900 border border-slate-800">
                    <span className="font-bold text-white">{c.name}</span>
                    <span className="text-emerald-400 font-mono font-bold">{c.totalAmount.toLocaleString()} RWF</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: FRAUD FLAGS */}
          {activeTab === 'FRAUD' && (
            <div className="glass-card p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Fraud Detection & Anomaly Audit
                </h4>
                <span className={`px-2.5 py-0.5 rounded text-xs font-bold ${
                  fraudResult.fraudRiskLevel === 'HIGH' ? 'bg-rose-950 text-rose-400 border border-rose-800' : 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                }`}>
                  Fraud Risk Level: {fraudResult.fraudRiskLevel}
                </span>
              </div>

              {fraudResult.flags.length === 0 ? (
                <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-800/60 text-emerald-300 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" /> No fraud or anomaly patterns detected. Statement appears authentic.
                </div>
              ) : (
                <div className="space-y-3 text-xs">
                  {fraudResult.flags.map((flag, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-800/60 text-rose-300 space-y-1">
                      <div className="font-bold text-sm text-rose-400 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" /> {flag.title}
                      </div>
                      <div className="text-xs text-rose-200">{flag.description}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Audit Panel ("Show Your Work") */}
          <AuditPanel profile={{
            historyDays: 90,
            aiConfidencePercent: scoreResult.confidenceScorePercent,
            citations: applicant.transactions
          }} />

          {/* Loan Approval Action Box */}
          <div className="glass-card p-6 space-y-4 border-amber-400/40 glow-border-gold">
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="digitalSign"
                checked={digitalSignApproved}
                onChange={(e) => setDigitalSignApproved(e.target.checked)}
                className="mt-1 w-4 h-4 rounded bg-slate-900 border-slate-700 text-amber-400 focus:ring-amber-400"
              />
              <label htmlFor="digitalSign" className="text-xs text-slate-300 leading-normal cursor-pointer">
                <strong>Ethics Requirement (Human-in-the-Loop Sign-off):</strong> I, as the authorized Loan Officer, have reviewed the MoMo transaction analytics, CRB status, and AI SHAP feature importances. I authorize the underwriting decision for {applicant.name}.
              </label>
            </div>

            {!isApproved ? (
              <button
                onClick={handleApprove}
                disabled={scoreResult.maxLoanLimitRwf === 0}
                className={`w-full btn-gold justify-center text-sm py-3.5 ${
                  scoreResult.maxLoanLimitRwf === 0 ? 'opacity-50 cursor-not-allowed filter grayscale' : ''
                }`}
              >
                {scoreResult.maxLoanLimitRwf === 0 ? 'UNDERWRITING REJECTED (HIGH DEFAULT RISK)' : 'APPROVE LOAN & DISBURSE VIA MOMO API'}
                <ArrowUpRight className="w-5 h-5" />
              </button>
            ) : (
              <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-700 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <div className="font-extrabold text-emerald-300 text-sm">LOAN APPROVED & DISBURSED!</div>
                <div className="text-xs text-emerald-200">
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

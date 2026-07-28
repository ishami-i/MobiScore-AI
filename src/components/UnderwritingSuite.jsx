import React, { useState } from 'react';
import CreditGauge from './CreditGauge.jsx';
import CashflowHeatmap from './CashflowHeatmap.jsx';
import RadarChart from './RadarChart.jsx';
import AuditPanel from './AuditPanel.jsx';
import { 
  Building2, User, CheckCircle2, AlertTriangle, ShieldCheck, 
  DollarSign, Calendar, Sliders, Cpu, ArrowUpRight, Zap 
} from 'lucide-react';

export default function UnderwritingSuite({ activeProfile, onSelectProfile, onOpenSandbox }) {
  const [tenureDays, setTenureDays] = useState(30);
  const [isApproved, setIsApproved] = useState(false);
  const [digitalSignApproved, setDigitalSignApproved] = useState(false);

  // Calculated Repayment Math
  const loanLimit = activeProfile.maxLoanLimitRwf;
  const interestRate = 0.08; // 8% monthly micro-loan rate
  const totalRepayRwf = Math.round(loanLimit * (1 + interestRate));
  const dailyInstallmentRwf = Math.round(totalRepayRwf / tenureDays);

  const handleApprove = () => {
    if (!digitalSignApproved) {
      alert("Ethics Requirement: Please check the Digital Officer Sign-off box before approving.");
      return;
    }
    setIsApproved(true);
  };

  return (
    <div className="space-y-6 py-2">
      {/* Top Selector Quick-Bar */}
      <div className="glass-card p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-1 flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5" /> Quick-Load Rwandan Test Profiles
          </div>
          <div className="text-xs text-slate-400">
            Select an applicant to evaluate their MoMo statement & CRB status:
          </div>
        </div>

        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          {onSelectProfile && (
            <>
              <button
                onClick={() => { setIsApproved(false); onSelectProfile('profile-1'); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                  activeProfile.id === 'profile-1'
                    ? 'bg-amber-400/20 border-amber-400 text-amber-300'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                👤 Jean Paul (Retail)
              </button>
              <button
                onClick={() => { setIsApproved(false); onSelectProfile('profile-2'); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                  activeProfile.id === 'profile-2'
                    ? 'bg-amber-400/20 border-amber-400 text-amber-300'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                🏢 Akagera Ltd (Hardware)
              </button>
              <button
                onClick={() => { setIsApproved(false); onSelectProfile('profile-3'); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                  activeProfile.id === 'profile-3'
                    ? 'bg-amber-400/20 border-amber-400 text-amber-300'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                🏍️ Eric (Moto Rider)
              </button>
              <button
                onClick={() => { setIsApproved(false); onSelectProfile('profile-4'); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                  activeProfile.id === 'profile-4'
                    ? 'bg-rose-500/20 border-rose-500 text-rose-300'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                ⚠️ Alexis (Default Flag)
              </button>
            </>
          )}

          <button
            onClick={onOpenSandbox}
            className="btn-glass text-xs py-1.5 px-3 border-amber-400/40 text-amber-300 ml-auto"
          >
            <Sliders className="w-3.5 h-3.5" /> Risk Sandbox
          </button>
        </div>
      </div>

      {/* Main 2-Column Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN: IDENTITY & CREDIT SCORE ENGINE */}
        <div className="lg:col-span-5 space-y-6">
          {/* Identity Card */}
          <div className="glass-card p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-md bg-slate-800 text-slate-300">
                {activeProfile.entityType === 'INDIVIDUAL' ? <User className="w-3.5 h-3.5 text-amber-400" /> : <Building2 className="w-3.5 h-3.5 text-cyan-400" />}
                {activeProfile.registrationType}
              </span>
              <span className="text-xs font-bold text-slate-400">ID: {activeProfile.id}</span>
            </div>

            <div>
              <h2 className="text-2xl font-extrabold text-white font-heading">{activeProfile.applicantName}</h2>
              <div className="text-xs font-mono text-amber-400 mt-0.5">{activeProfile.nidOrTin}</div>
              <div className="text-xs text-slate-400 mt-2">{activeProfile.tradeCategory}</div>
              <div className="text-xs text-slate-500 mt-0.5">{activeProfile.location}</div>
            </div>

            {/* CRB Status Pill */}
            <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-cyan-400" />
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-400">TransUnion CRB Gateway</div>
                  <div className="text-xs font-bold text-white">{activeProfile.crbStatus}</div>
                </div>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                activeProfile.crbStatus === 'ACTIVE_DEFAULT' ? 'bg-rose-950 text-rose-400 border border-rose-800' : 'bg-emerald-950 text-emerald-400 border border-emerald-800'
              }`}>
                {activeProfile.crbStatus === 'ACTIVE_DEFAULT' ? 'FLAGGED' : 'VERIFIED CLEAN'}
              </span>
            </div>
          </div>

          {/* Interactive Credit Gauge */}
          <div className="glass-card p-6 text-center space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Hybrid MoMoScore Engine (300 – 850)
            </h3>

            <CreditGauge
              score={activeProfile.score}
              riskGrade={activeProfile.riskGrade}
              riskBadgeClass={activeProfile.riskBadgeClass}
            />

            <div className="pt-2 grid grid-cols-2 gap-3 text-left border-t border-slate-800">
              <div className="p-2.5 rounded-lg bg-slate-900/80">
                <div className="text-[10px] text-slate-400 uppercase font-bold">Monthly MoMo Inflow</div>
                <div className="text-sm font-bold text-emerald-400">{activeProfile.monthlyVolumeRwf.toLocaleString()} RWF</div>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900/80">
                <div className="text-[10px] text-slate-400 uppercase font-bold">Average Daily Float</div>
                <div className="text-sm font-bold text-cyan-400">{activeProfile.avgDailyFloatRwf.toLocaleString()} RWF</div>
              </div>
            </div>
          </div>

          {/* Factor Radar Component */}
          <div className="glass-card p-6">
            <RadarChart profile={activeProfile} />
          </div>
        </div>

        {/* RIGHT COLUMN: ANALYTICS, UNDERWRITING & APPROVAL */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Heatmap Card */}
          <div className="glass-card p-6">
            <CashflowHeatmap dailyData={activeProfile.dailyHeatmap} />
          </div>

          {/* GenAI Executive Credit Risk Memo (100% English) */}
          <div className="glass-card p-6 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  GenAI Executive Underwriting Memo (Gemini 3.6 Flash)
                </h3>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-400/10 text-amber-400 border border-amber-400/30">
                English Officer Format
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed font-mono bg-slate-950/60 p-4 rounded-xl border border-slate-800">
              {activeProfile.memoSummary}
            </p>
          </div>

          {/* Responsible Lending Constraints & Loan Sizing */}
          <div className="glass-card p-6 space-y-5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Responsible Lending Constraints & Sizing
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-900 border border-amber-400/30">
                <div className="text-xs font-bold text-slate-400 uppercase">Max Pre-Approved Loan Limit</div>
                <div className="text-2xl font-extrabold text-amber-400 font-heading mt-1">
                  {activeProfile.maxLoanLimitRwf.toLocaleString()} RWF
                </div>
                <div className="text-[10px] text-slate-500 mt-1">Calculated via MoMo Debt-Service Capacity</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                <div className="text-xs font-bold text-slate-400 uppercase">Safe Daily Repayment Cap (15%)</div>
                <div className="text-2xl font-extrabold text-cyan-400 font-heading mt-1">
                  {activeProfile.dailyRepaymentCapRwf.toLocaleString()} RWF / day
                </div>
                <div className="text-[10px] text-slate-500 mt-1">Prevents Borrower Over-Indebtedness</div>
              </div>
            </div>

            {/* Tenure Selector */}
            {activeProfile.maxLoanLimitRwf > 0 && (
              <div className="space-y-3 pt-2">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-slate-300">Select Loan Tenure:</span>
                  <span className="text-amber-400 font-mono">Daily Installment: {dailyInstallmentRwf.toLocaleString()} RWF/day</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {[14, 30, 60, 90].map((d) => (
                    <button
                      key={d}
                      onClick={() => setTenureDays(d)}
                      className={`py-2 rounded-lg text-xs font-bold border transition-all ${
                        tenureDays === d
                          ? 'bg-amber-400/20 border-amber-400 text-amber-300'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      {d} Days
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Audit Panel ("Show Your Work") */}
          <AuditPanel profile={activeProfile} />

          {/* Human Approval Action Bar */}
          <div className="glass-card p-6 space-y-4 border-amber-400/30 glow-border-gold">
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="officerSign"
                checked={digitalSignApproved}
                onChange={(e) => setDigitalSignApproved(e.target.checked)}
                className="mt-1 w-4 h-4 rounded bg-slate-900 border-slate-700 text-amber-400 focus:ring-amber-400"
              />
              <label htmlFor="officerSign" className="text-xs text-slate-300 leading-normal cursor-pointer">
                <strong>Ethics Requirement (Human-in-the-Loop Sign-off):</strong> I, as the authorized Bank Credit Officer, have reviewed the MoMo statement analytics, TransUnion CRB status, and Gemini risk memo. I authorize the underwriting decision for {activeProfile.applicantName}.
              </label>
            </div>

            {!isApproved ? (
              <button
                onClick={handleApprove}
                disabled={activeProfile.maxLoanLimitRwf === 0}
                className={`w-full btn-gold justify-center text-base py-3.5 ${
                  activeProfile.maxLoanLimitRwf === 0 ? 'opacity-50 cursor-not-allowed filter grayscale' : ''
                }`}
              >
                {activeProfile.maxLoanLimitRwf === 0 ? 'UNDERWRITING REJECTED (CRB FLAG)' : 'APPROVE LOAN & DISBURSE VIA MOMO API'}
                <ArrowUpRight className="w-5 h-5" />
              </button>
            ) : (
              <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-700 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <div className="font-extrabold text-emerald-300 text-base">
                  LOAN APPROVED & DISBURSED!
                </div>
                <div className="text-xs text-emerald-200">
                  {loanLimit.toLocaleString()} RWF has been transferred to {activeProfile.phone} via MTN MoMo Payout API. Reference: #MOMO-DISBURSE-99201.
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}

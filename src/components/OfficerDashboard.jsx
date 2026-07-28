import React, { useState } from 'react';
import CleanScoreCard from './CleanScoreCard.jsx';
import CashflowHeatmap from './CashflowHeatmap.jsx';
import AuditPanel from './AuditPanel.jsx';
import SandboxModal from './SandboxModal.jsx';
import { SAMPLE_PROFILES } from '../data/sampleProfiles.js';
import { 
  Building2, User, FileText, Upload, CheckCircle2, ShieldCheck, 
  Search, Sliders, LogOut, ArrowRight, ArrowUpRight, Zap, PlusCircle, ListFilter
} from 'lucide-react';

export default function OfficerDashboard({ officerUser, onSignOut }) {
  const [activeMenu, setActiveMenu] = useState('QUEUE'); // 'QUEUE', 'NEW_INTAKE', 'REVIEW_APPLICANT'
  const [selectedProfile, setSelectedProfile] = useState(SAMPLE_PROFILES[0]);
  const [isSandboxOpen, setIsSandboxOpen] = useState(false);
  const [digitalSignApproved, setDigitalSignApproved] = useState(false);
  const [isApproved, setIsApproved] = useState(false);

  // Intake Form State
  const [newEntity, setNewEntity] = useState('INDIVIDUAL');
  const [newName, setNewName] = useState('');
  const [newNid, setNewNid] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newCategory, setNewCategory] = useState('Retail Trader');
  const [statementUploaded, setStatementUploaded] = useState(false);

  const handleReviewProfile = (profile) => {
    setSelectedProfile(profile);
    setIsApproved(false);
    setDigitalSignApproved(false);
    setActiveMenu('REVIEW_APPLICANT');
  };

  const handleCreateIntake = (e) => {
    e.preventDefault();
    if (!statementUploaded) {
      alert("Please upload the customer's official MTN MoMo PDF or CSV statement file.");
      return;
    }
    // Create new profile & navigate to underwriting review
    const createdProfile = {
      id: `profile-${Date.now()}`,
      entityType: newEntity,
      applicantName: newName || 'New Applicant',
      nidOrTin: newNid || '1199990000000000',
      phone: newPhone || '+250 788 000 000',
      tradeCategory: newCategory,
      location: 'Kigali Branch Walk-In',
      registrationType: newEntity === 'INDIVIDUAL' ? 'Individual Sole Proprietor' : 'Registered Business',
      crbStatus: 'THIN_FILE',
      crbStatusText: 'Thin File (No Bank Account or Prior Bank Loans)',
      score: 750,
      riskGrade: 'Grade A Prime',
      riskBadgeClass: 'badge-prime',
      maxLoanLimitRwf: 1200000,
      dailyRepaymentCapRwf: 15000,
      monthlyVolumeRwf: 3800000,
      avgDailyFloatRwf: 110000,
      cashflowVelocityScore: 90,
      stabilityIndexScore: 85,
      supplierDisciplineScore: 88,
      utilityComplianceScore: 90,
      retainedFloatScore: 80,
      aiConfidencePercent: 95.8,
      historyDays: 90,
      memoSummary: `Walk-in statement ingested for ${newName}. High cash flow velocity detected. Clean CRB record with zero default history.`,
      citations: [
        { id: 'TXN-NEW-01', date: '2026-07-27', desc: 'MTN MoMo Merchant Inflow', amountRwf: 95000, type: 'INFLOW' }
      ],
      dailyHeatmap: Array(28).fill(150)
    };

    handleReviewProfile(createdProfile);
  };

  const handleApproveLoan = () => {
    if (!digitalSignApproved) {
      alert("Ethics Requirement: Please check the Digital Officer Sign-off box before approving.");
      return;
    }
    setIsApproved(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      
      {/* Top Officer Navigation Header */}
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-xl border-b border-slate-800 px-6 py-3.5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-400 text-slate-950 font-extrabold flex items-center justify-center font-heading">
              M
            </div>
            <div>
              <div className="font-extrabold text-base text-white font-heading">MoMoScore Bank Suite</div>
              <div className="text-xs text-slate-400 flex items-center gap-2">
                <span>Agent: <strong className="text-white">{officerUser.employeeId}</strong></span>
                <span>•</span>
                <span>Branch: <strong className="text-amber-400">{officerUser.branch}</strong></span>
              </div>
            </div>
          </div>

          {/* Navigation Menu Tabs */}
          <div className="flex items-center gap-2 p-1 bg-slate-950 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveMenu('QUEUE')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMenu === 'QUEUE'
                  ? 'bg-amber-400 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <ListFilter className="w-3.5 h-3.5" /> Pending Queries Queue
            </button>

            <button
              onClick={() => setActiveMenu('NEW_INTAKE')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMenu === 'NEW_INTAKE'
                  ? 'bg-amber-400 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <PlusCircle className="w-3.5 h-3.5" /> New Intake & Upload MoMo Statement
            </button>

            <button
              onClick={() => setIsSandboxOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-amber-300 hover:text-amber-200"
            >
              <Sliders className="w-3.5 h-3.5" /> Risk Sandbox
            </button>
          </div>

          {/* Sign Out Button */}
          <button
            onClick={onSignOut}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-rose-400 transition-colors"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-6 py-6 space-y-6">

        {/* MENU VIEW 1: PENDING QUERIES QUEUE */}
        {activeMenu === 'QUEUE' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-white font-heading">Incoming Loan Queries & Applications</h1>
                <p className="text-xs text-slate-400">Review pending online submissions or walk-in applicants</p>
              </div>

              <button
                onClick={() => setActiveMenu('NEW_INTAKE')}
                className="btn-gold text-xs"
              >
                <PlusCircle className="w-4 h-4" /> Ingest New MoMo Statement
              </button>
            </div>

            {/* Applications Table */}
            <div className="glass-card overflow-hidden border border-slate-800">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-900/80 text-slate-400 uppercase font-bold border-b border-slate-800">
                  <tr>
                    <th className="p-4">Applicant Name</th>
                    <th className="p-4">Entity Type</th>
                    <th className="p-4">NID / TIN</th>
                    <th className="p-4">Monthly Revenue</th>
                    <th className="p-4">CRB Hygiene Status</th>
                    <th className="p-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-medium">
                  {SAMPLE_PROFILES.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-900/40 transition-colors">
                      <td className="p-4">
                        <div className="font-bold text-white text-sm">{p.applicantName}</div>
                        <div className="text-slate-500 text-[11px]">{p.tradeCategory}</div>
                      </td>
                      <td className="p-4">
                        <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
                          {p.entityType === 'INDIVIDUAL' ? <User className="w-3 h-3 text-amber-400" /> : <Building2 className="w-3 h-3 text-cyan-400" />}
                          {p.entityType}
                        </span>
                      </td>
                      <td className="p-4 font-mono text-slate-300">{p.nidOrTin}</td>
                      <td className="p-4 font-bold text-emerald-400">{p.monthlyVolumeRwf.toLocaleString()} RWF</td>
                      <td className="p-4">
                        <span className={`px-2.5 py-1 rounded text-[10px] font-bold ${
                          p.crbStatus === 'ACTIVE_DEFAULT'
                            ? 'bg-rose-950 text-rose-400 border border-rose-800'
                            : 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                        }`}>
                          {p.crbStatus === 'ACTIVE_DEFAULT' ? 'FLAGGED DEFAULT' : 'CLEAN / THIN FILE'}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => handleReviewProfile(p)}
                          className="btn-gold text-xs py-1.5 px-3"
                        >
                          Underwrite & Review <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* MENU VIEW 2: NEW WALK-IN INTAKE & STATEMENT UPLOAD */}
        {activeMenu === 'NEW_INTAKE' && (
          <div className="max-w-3xl mx-auto space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-white font-heading">New Walk-In Intake & Statement Upload</h1>
              <p className="text-xs text-slate-400">Ingest an official MTN MoMo PDF or CSV statement brought by the customer</p>
            </div>

            <form onSubmit={handleCreateIntake} className="glass-card p-6 space-y-5 border border-slate-800">
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setNewEntity('INDIVIDUAL')}
                  className={`p-3.5 rounded-xl border flex items-center gap-3 transition-all ${
                    newEntity === 'INDIVIDUAL'
                      ? 'border-amber-400 bg-amber-400/10 text-white'
                      : 'border-slate-800 bg-slate-900 text-slate-400'
                  }`}
                >
                  <User className="w-5 h-5 text-amber-400" />
                  <div className="text-left">
                    <div className="font-bold text-xs">Individual / Sole Trader</div>
                    <div className="text-[10px] text-slate-500">Registered under NID</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setNewEntity('BUSINESS')}
                  className={`p-3.5 rounded-xl border flex items-center gap-3 transition-all ${
                    newEntity === 'BUSINESS'
                      ? 'border-amber-400 bg-amber-400/10 text-white'
                      : 'border-slate-800 bg-slate-900 text-slate-400'
                  }`}
                >
                  <Building2 className="w-5 h-5 text-cyan-400" />
                  <div className="text-left">
                    <div className="font-bold text-xs">Registered Business / Coop</div>
                    <div className="text-[10px] text-slate-500">Registered under RDB TIN</div>
                  </div>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    {newEntity === 'INDIVIDUAL' ? 'Personal Full Name *' : 'Business / Coop Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Claudine Mukamana"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    {newEntity === 'INDIVIDUAL' ? '16-Digit National ID (NID) *' : 'RDB Tax ID (TIN) *'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="1199770012345678"
                    value={newNid}
                    onChange={(e) => setNewNid(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">MTN Phone Number *</label>
                  <input
                    type="text"
                    required
                    placeholder="+250 788 555 444"
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Trade Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-amber-400"
                  >
                    <option value="Retail Merchant">Retail Merchant / Boutique</option>
                    <option value="Market Produce Vendor">Market Produce Vendor</option>
                    <option value="Transportation / Moto">Transportation (Moto Rider)</option>
                    <option value="Hardware Wholesale">Hardware Wholesale</option>
                  </select>
                </div>
              </div>

              {/* Upload Dropzone */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Upload Official MTN MoMo PDF / CSV Statement (Brought by Customer)
                </label>
                <div
                  onClick={() => setStatementUploaded(true)}
                  className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
                    statementUploaded
                      ? 'border-emerald-500 bg-emerald-500/10'
                      : 'border-slate-800 bg-slate-900 hover:border-amber-400/50'
                  }`}
                >
                  {statementUploaded ? (
                    <div className="space-y-1">
                      <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                      <div className="font-bold text-emerald-400 text-xs">Official_MTN_MoMo_Statement.pdf Ingested!</div>
                      <div className="text-[10px] text-slate-400">Gemini 3.6 Flash ready for parsing.</div>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <Upload className="w-8 h-8 text-amber-400 mx-auto" />
                      <div className="font-bold text-white text-xs">Click to Browse or Drop Official Statement</div>
                      <div className="text-[10px] text-slate-400">Accepts official MTN PDF exports or CSV log files.</div>
                    </div>
                  )}
                </div>
              </div>

              <button type="submit" className="w-full btn-gold justify-center text-sm py-3">
                Run Gemini AI Underwriting <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

        {/* MENU VIEW 3: UNDERWRITING DECISION & REPORT VIEW */}
        {activeMenu === 'REVIEW_APPLICANT' && selectedProfile && (
          <div className="space-y-6">
            {/* Header Navigation Back Button */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => setActiveMenu('QUEUE')}
                className="btn-glass text-xs"
              >
                ← Back to Pending Queries Queue
              </button>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">Underwriting Applicant:</span>
                <span className="font-bold text-white text-sm">{selectedProfile.applicantName}</span>
              </div>
            </div>

            {/* Clean Score Card (No Speedometer!) */}
            <CleanScoreCard
              score={selectedProfile.score}
              riskGrade={selectedProfile.riskGrade}
              riskBadgeClass={selectedProfile.riskBadgeClass}
              profile={selectedProfile}
            />

            {/* Main 2-Column Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Column: Analytics & Heatmap */}
              <div className="lg:col-span-7 space-y-6">
                <div className="glass-card p-5 border border-slate-800">
                  <CashflowHeatmap dailyData={selectedProfile.dailyHeatmap} />
                </div>

                {/* Executive Memo */}
                <div className="glass-card p-5 space-y-2 border border-slate-800">
                  <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
                    <Zap className="w-4 h-4 text-amber-400" />
                    <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                      GenAI Credit Risk Executive Summary (Gemini 3.6 Flash)
                    </h3>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed font-mono bg-slate-950/80 p-3.5 rounded-xl border border-slate-800">
                    {selectedProfile.memoSummary}
                  </p>
                </div>

                {/* Audit Panel */}
                <AuditPanel profile={selectedProfile} />
              </div>

              {/* Right Column: Loan Sizing & Human Sign-Off */}
              <div className="lg:col-span-5 space-y-6">
                <div className="glass-card p-5 space-y-4 border border-slate-800">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Loan Sizing & Safe Debt Limits
                  </h3>

                  <div className="p-4 rounded-xl bg-slate-900 border border-amber-400/30">
                    <div className="text-xs font-bold text-slate-400 uppercase">Max Pre-Approved Loan Limit</div>
                    <div className="text-2xl font-extrabold text-amber-400 font-heading mt-1">
                      {selectedProfile.maxLoanLimitRwf.toLocaleString()} RWF
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="text-xs font-bold text-slate-400 uppercase">Safe Daily Repayment Cap (15%)</div>
                    <div className="text-xl font-extrabold text-cyan-400 font-heading mt-1">
                      {selectedProfile.dailyRepaymentCapRwf.toLocaleString()} RWF / day
                    </div>
                  </div>
                </div>

                {/* Human Approval Box */}
                <div className="glass-card p-5 space-y-4 border-amber-400/40 glow-border-gold">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="officerCheck"
                      checked={digitalSignApproved}
                      onChange={(e) => setDigitalSignApproved(e.target.checked)}
                      className="mt-1 w-4 h-4 rounded bg-slate-900 border-slate-700 text-amber-400 focus:ring-amber-400"
                    />
                    <label htmlFor="officerCheck" className="text-xs text-slate-300 leading-normal cursor-pointer">
                      <strong>Human Approval Sign-Off:</strong> I, as the authorized Bank Credit Officer ({officerUser.employeeId}), authorize the credit limit decision for {selectedProfile.applicantName}.
                    </label>
                  </div>

                  {!isApproved ? (
                    <button
                      onClick={handleApproveLoan}
                      disabled={selectedProfile.maxLoanLimitRwf === 0}
                      className={`w-full btn-gold justify-center text-sm py-3 ${
                        selectedProfile.maxLoanLimitRwf === 0 ? 'opacity-50 cursor-not-allowed filter grayscale' : ''
                      }`}
                    >
                      {selectedProfile.maxLoanLimitRwf === 0 ? 'LOAN REJECTED (CRB DEFAULT)' : 'APPROVE LOAN & DISBURSE VIA MOMO API'}
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-700 text-center space-y-2">
                      <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                      <div className="font-extrabold text-emerald-300 text-sm">LOAN APPROVED & DISBURSED!</div>
                      <div className="text-[11px] text-emerald-200">
                        {selectedProfile.maxLoanLimitRwf.toLocaleString()} RWF transferred to {selectedProfile.phone} via MTN MoMo API.
                      </div>
                    </div>
                  )}
                </div>

              </div>

            </div>
          </div>
        )}

      </main>

      {/* Sandbox Modal */}
      <SandboxModal
        isOpen={isSandboxOpen}
        onClose={() => setIsSandboxOpen(false)}
      />

    </div>
  );
}

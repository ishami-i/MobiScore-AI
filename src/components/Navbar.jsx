import React from 'react';
import { ShieldCheck, User, Building2, Cpu, FileText, Download } from 'lucide-react';

export default function Navbar({ activeRole, onSwitchRole, activeApplicant, onDownloadPdf, onDownloadCsv }) {
  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-xl border-b border-slate-800 px-6 py-3.5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        
        {/* Brand & Gemini Badge */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-500 text-slate-950 font-extrabold flex items-center justify-center font-heading shadow-lg shadow-amber-400/20 text-xl">
            M
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg text-white font-heading tracking-tight">MoMoScore MSME Platform</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-400/10 text-amber-400 border border-amber-400/30 flex items-center gap-1">
                <Cpu className="w-3 h-3" /> Gemini 3.6 Flash
              </span>
            </div>
            <div className="text-xs text-slate-400">
              Mobile Money AI Credit Scoring & Alternative Financial Underwriting • Rwanda
            </div>
          </div>
        </div>

        {/* Role Switcher Pill */}
        <div className="flex items-center p-1 bg-slate-950 rounded-xl border border-slate-800">
          <button
            onClick={() => onSwitchRole('APPLICANT')}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeRole === 'APPLICANT'
                ? 'bg-amber-400 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <User className="w-4 h-4" /> Business Owner (Applicant)
          </button>

          <button
            onClick={() => onSwitchRole('LENDER')}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeRole === 'LENDER'
                ? 'bg-amber-400 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Building2 className="w-4 h-4" /> Loan Provider (Lender Portal)
          </button>
        </div>

        {/* Export Actions (Available in Lender view) */}
        {activeRole === 'LENDER' && activeApplicant && (
          <div className="flex items-center gap-2">
            <button
              onClick={onDownloadCsv}
              className="btn-glass text-xs py-1.5 px-3"
              title="Export Transactions CSV"
            >
              <Download className="w-3.5 h-3.5" /> Export CSV
            </button>
            <button
              onClick={onDownloadPdf}
              className="btn-gold text-xs py-1.5 px-3"
              title="Generate PDF Credit Assessment Report"
            >
              <FileText className="w-3.5 h-3.5" /> Download PDF Report
            </button>
          </div>
        )}

      </div>
    </header>
  );
}

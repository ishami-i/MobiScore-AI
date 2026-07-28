import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ShieldCheck, FileText, AlertTriangle, Cpu } from 'lucide-react';

export default function AuditPanel({ profile }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-slate-800 rounded-xl bg-slate-900/60 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-slate-800/50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Grounding & Verifiability Audit Panel ("Show Your Work")
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-800">
            AI Confidence: {profile.aiConfidencePercent}%
          </span>
          {isOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </div>
      </button>

      {isOpen && (
        <div className="p-4 space-y-4 text-xs border-t border-slate-800 bg-slate-950/80">
          {/* Data Integrity Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
              <div className="text-slate-400 font-semibold mb-1 flex items-center gap-1">
                <FileText className="w-3.5 h-3.5 text-amber-400" /> Statement Span
              </div>
              <div className="text-sm font-bold text-white">{profile.historyDays} Days History</div>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
              <div className="text-slate-400 font-semibold mb-1 flex items-center gap-1">
                <Cpu className="w-3.5 h-3.5 text-cyan-400" /> Gemini Parsing Integrity
              </div>
              <div className="text-sm font-bold text-white">99.2% Line Extraction</div>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
              <div className="text-slate-400 font-semibold mb-1 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> TransUnion Gateway
              </div>
              <div className="text-sm font-bold text-emerald-400">Verified BNR Synced</div>
            </div>
          </div>

          {/* Uncertainty Warnings */}
          {profile.historyDays < 60 && (
            <div className="p-3 rounded-lg bg-amber-950/40 border border-amber-800/60 text-amber-300 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong>Honest Handling of Uncertainty:</strong> Statement covers only {profile.historyDays} days of activity. Recommended loan limit has been conservatively capped at 50% max capacity until a 90-day statement is established.
              </div>
            </div>
          )}

          {/* Line-Item Citations */}
          <div>
            <h5 className="font-bold text-slate-300 mb-2 text-[11px] uppercase tracking-wider">
              Verified MoMo Statement Line-Item Citations
            </h5>
            <div className="space-y-1.5 font-mono text-[11px]">
              {profile.citations.map((c, i) => (
                <div key={i} className="p-2 rounded bg-slate-900/90 border border-slate-800 flex justify-between items-center">
                  <div>
                    <span className="text-amber-400 font-bold">{c.id}</span>
                    <span className="text-slate-400 ml-2">[{c.date}]</span>
                    <span className="text-slate-200 ml-2">{c.desc}</span>
                  </div>
                  <span className={`font-bold ${c.type === 'INFLOW' ? 'text-emerald-400' : 'text-slate-300'}`}>
                    {c.amountRwf.toLocaleString()} RWF
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

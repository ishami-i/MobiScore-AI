import React from 'react';

export default function RadarChart({ profile }) {
  const factors = [
    { label: 'Revenue Velocity', score: profile.cashflowVelocityScore },
    { label: 'Cashflow Stability', score: profile.stabilityIndexScore },
    { label: 'Supplier Discipline', score: profile.supplierDisciplineScore },
    { label: 'Utility & Tax', score: profile.utilityComplianceScore },
    { label: 'Wallet Float', score: profile.retainedFloatScore }
  ];

  return (
    <div className="w-full">
      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
        Scoring Pillars & Factor Breakdown
      </h4>
      <div className="space-y-3">
        {factors.map((f, i) => (
          <div key={i} className="space-y-1">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-slate-300">{f.label}</span>
              <span className="text-amber-400 font-bold">{f.score} / 100</span>
            </div>
            <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 rounded-full transition-all duration-1000"
                style={{ width: `${f.score}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

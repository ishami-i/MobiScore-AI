import React from 'react';

export default function CreditGauge({ score, riskGrade, riskBadgeClass }) {
  // Score range: 300 to 850
  const minScore = 300;
  const maxScore = 850;
  const clampedScore = Math.max(minScore, Math.min(maxScore, score));
  const percentage = (clampedScore - minScore) / (maxScore - minScore);
  
  // Angle: -120 to +120 degrees (total 240 deg arc)
  const angle = -120 + percentage * 240;

  // Arc path math
  const radius = 110;
  const strokeWidth = 16;
  const center = 140;

  return (
    <div className="relative flex flex-col items-center justify-center p-4">
      {/* SVG Radial Gauge */}
      <svg width="280" height="200" viewBox="0 0 280 200" className="overflow-visible">
        <defs>
          <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#EF4444" />
            <stop offset="35%" stopColor="#F59E0B" />
            <stop offset="70%" stopColor="#06B6D4" />
            <stop offset="100%" stopColor="#10B981" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Background Track Arc */}
        <path
          d="M 44.5 190 A 110 110 0 1 1 235.5 190"
          fill="none"
          stroke="rgba(255, 255, 255, 0.08)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />

        {/* Color Gradient Track Arc */}
        <path
          d="M 44.5 190 A 110 110 0 1 1 235.5 190"
          fill="none"
          stroke="url(#gaugeGradient)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          filter="url(#glow)"
        />

        {/* Needle Indicator */}
        <g transform={`translate(${center}, 140) rotate(${angle})`}>
          <line
            x1="0"
            y1="0"
            x2="0"
            y2="-90"
            stroke="#F8FAFC"
            strokeWidth="4"
            strokeLinecap="round"
            style={{ transition: 'transform 1s ease-out' }}
          />
          <circle r="9" fill="#FACC15" stroke="#0F172A" strokeWidth="3" />
        </g>
      </svg>

      {/* Numerical Score Display */}
      <div className="-mt-12 text-center">
        <div className="text-5xl font-extrabold tracking-tight font-heading text-white">
          {clampedScore}
        </div>
        <div className="text-xs uppercase tracking-widest text-slate-400 font-semibold mt-1">
          MoMoScore Range: 300 – 850
        </div>
        
        {/* Risk Grade Badge */}
        <div className="mt-3">
          <span className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase ${riskBadgeClass}`}>
            <span className="w-2 h-2 rounded-full bg-current animate-ping"></span>
            {riskGrade}
          </span>
        </div>
      </div>
    </div>
  );
}

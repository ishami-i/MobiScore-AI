import React from 'react';
import { ShieldCheck, TrendingUp, Award, Layers } from 'lucide-react';

export default function CleanScoreCard({ score, riskGrade, riskBadgeClass, profile }) {
  return (
    <div className="glass-card" style={{ marginBottom: '24px' }}>
      {/* Top Banner Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #1E293B', paddingBottom: '20px', marginBottom: '20px' }}>
        <div>
          <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: '#94A3B8', marginBottom: '4px' }}>
            Calculated Credit Score
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
            <span style={{ fontSize: '48px', fontWeight: 800, fontFamily: 'Outfit, sans-serif', color: '#FFFFFF' }}>
              {score}
            </span>
            <span style={{ fontSize: '12px', color: '#94A3B8', fontWeight: 600 }}>
              / 850 Max Range
            </span>
          </div>
        </div>

        <div>
          <span className={`badge ${score >= 700 ? 'badge-green' : 'badge-rose'}`} style={{ fontSize: '13px', padding: '8px 16px' }}>
            {riskGrade}
          </span>
        </div>
      </div>

      {/* 4 Clean Metric Cards */}
      <div className="stats-grid-4" style={{ marginBottom: 0 }}>
        <div style={{ background: '#090D1C', border: '1px solid #1E293B', padding: '14px', borderRadius: '12px' }}>
          <div style={{ fontSize: '10px', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase' }}>Revenue Velocity</div>
          <div style={{ fontSize: '18px', fontWeight: 800, color: '#10B981', marginTop: '4px' }}>+{profile.cashflowVelocityScore || 120} / 250</div>
          <div style={{ fontSize: '10px', color: '#64748B', marginTop: '2px' }}>MOMO Pay Inflows</div>
        </div>

        <div style={{ background: '#090D1C', border: '1px solid #1E293B', padding: '14px', borderRadius: '12px' }}>
          <div style={{ fontSize: '10px', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase' }}>Cashflow Stability</div>
          <div style={{ fontSize: '18px', fontWeight: 800, color: '#06B6D4', marginTop: '4px' }}>+{profile.stabilityIndexScore || 85} / 100</div>
          <div style={{ fontSize: '10px', color: '#64748B', marginTop: '2px' }}>Daily Revenue Variance</div>
        </div>

        <div style={{ background: '#090D1C', border: '1px solid #1E293B', padding: '14px', borderRadius: '12px' }}>
          <div style={{ fontSize: '10px', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase' }}>Supplier Discipline</div>
          <div style={{ fontSize: '18px', fontWeight: 800, color: '#FACC15', marginTop: '4px' }}>+{profile.supplierDisciplineScore || 90} / 100</div>
          <div style={{ fontSize: '10px', color: '#64748B', marginTop: '2px' }}>Wholesale Repayments</div>
        </div>

        <div style={{ background: '#090D1C', border: '1px solid #1E293B', padding: '14px', borderRadius: '12px' }}>
          <div style={{ fontSize: '10px', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase' }}>CRB Hygiene Status</div>
          <div style={{ fontSize: '18px', fontWeight: 800, color: profile.crbStatus === 'ACTIVE_DEFAULT' ? '#EF4444' : '#10B981', marginTop: '4px' }}>
            {profile.crbStatus === 'ACTIVE_DEFAULT' ? '-200 Flagged' : '+50 Clean'}
          </div>
          <div style={{ fontSize: '10px', color: '#64748B', marginTop: '2px' }}>TransUnion Registry</div>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { APPLICANT_PROFILES } from '../data/sampleDataset.js';
import { 
  Search, Bell, ChevronRight, Download
} from 'lucide-react';

export default function AgentDashboard({ onSelectApplicant, onNewAnalysis }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');

  return (
    <div className="page-container">
      
      {/* Top Search & Header Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 800, fontFamily: 'Outfit, sans-serif' }}>Dashboard</h1>
          <p style={{ fontSize: '13px', color: '#94A3B8' }}>Institutional Underwriting Queue & Portfolio Risk</p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ position: 'relative', width: '280px' }}>
            <Search className="w-4 h-4" style={{ position: 'absolute', left: '12px', top: '12px', color: '#64748B' }} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search NID, Name, or ID..."
              className="form-input"
              style={{ paddingLeft: '36px' }}
            />
          </div>

          <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#0D1226', border: '1px solid #1E293B', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', cursor: 'pointer' }}>
            <Bell className="w-4 h-4 text-muted" style={{ margin: 'auto', color: '#94A3B8' }} />
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#FACC15', position: 'absolute', top: '10px', right: '10px' }}></span>
          </div>
        </div>
      </div>

      {/* 3 SIDE-BY-SIDE BOX CARDS (EXACT SCREEN 3 MOCKUP MATCH) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '32px' }}>
        
        {/* Box 1: Pending Queries */}
        <div style={{ background: '#0D1226', border: '1px solid #1E293B', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', justifyBetween: 'space-between', minHeight: '130px' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: '#94A3B8', letterSpacing: '0.05em', marginBottom: '8px' }}>
            Pending Queries
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span style={{ fontSize: '36px', fontWeight: 800, fontFamily: 'Outfit, sans-serif', color: '#FFFFFF' }}>124</span>
            <span className="badge badge-green">↗ +12%</span>
          </div>
          <div style={{ fontSize: '11px', color: '#64748B', marginTop: '6px' }}>Applications awaiting underwriting review</div>
        </div>

        {/* Box 2: Avg Processing Time */}
        <div style={{ background: '#0D1226', border: '1px solid #1E293B', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', justifyBetween: 'space-between', minHeight: '130px' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: '#94A3B8', letterSpacing: '0.05em', marginBottom: '8px' }}>
            Avg Processing Time
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span style={{ fontSize: '36px', fontWeight: 800, fontFamily: 'Outfit, sans-serif', color: '#FFFFFF' }}>
              4.2 <span style={{ fontSize: '14px', color: '#94A3B8', fontWeight: 400 }}>hrs</span>
            </span>
            <span className="badge badge-green">↘ -0.5h</span>
          </div>
          <div style={{ fontSize: '11px', color: '#64748B', marginTop: '6px' }}>Gemini AI automated decision turnaround</div>
        </div>

        {/* Box 3: Risk Flags */}
        <div style={{ background: '#0D1226', border: '1px solid #1E293B', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', justifyBetween: 'space-between', minHeight: '130px' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: '#94A3B8', letterSpacing: '0.05em', marginBottom: '8px' }}>
            Risk Flags
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span style={{ fontSize: '36px', fontWeight: 800, fontFamily: 'Outfit, sans-serif', color: '#EF4444' }}>18</span>
            <span style={{ fontSize: '11px', color: '#FCA5A5', fontWeight: 600 }}>Requires manual review</span>
          </div>
          <div style={{ fontSize: '11px', color: '#64748B', marginTop: '6px' }}>CRB defaults or anomaly alerts</div>
        </div>

      </div>

      {/* Credit Queue Table */}
      <div className="table-container">
        
        <div style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #1E293B' }}>
          <div>
            <h2 style={{ fontSize: '16px', fontWeight: 700, fontFamily: 'Outfit, sans-serif' }}>Credit Queue</h2>
            <p style={{ fontSize: '12px', color: '#94A3B8' }}>Recent loan applications pending underwriting analysis.</p>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => setFilterStatus('ALL')}
              className={filterStatus === 'ALL' ? 'btn-yellow' : 'btn-outline'}
              style={{ fontSize: '11px', padding: '6px 12px' }}
            >
              All
            </button>
            <button
              onClick={() => setFilterStatus('HIGH_RISK')}
              className={filterStatus === 'HIGH_RISK' ? 'btn-yellow' : 'btn-outline'}
              style={{ fontSize: '11px', padding: '6px 12px' }}
            >
              High Risk
            </button>
          </div>
        </div>

        {/* Table */}
        <table className="table">
          <thead>
            <tr>
              <th>Applicant</th>
              <th>National ID / TIN</th>
              <th>Submitted Date</th>
              <th>Risk Score</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {APPLICANT_PROFILES.map((app) => (
              <tr key={app.id} onClick={() => onSelectApplicant(app)} style={{ cursor: 'pointer' }}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#1E293B', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '12px', color: '#F8FAFC' }}>
                      {app.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, color: '#FFFFFF', fontSize: '14px' }}>{app.name}</div>
                      <div style={{ fontSize: '11px', color: '#64748B' }}>{app.category}</div>
                    </div>
                  </div>
                </td>

                <td style={{ fontFamily: 'monospace', color: '#CBD5E1' }}>{app.nidOrTin}</td>

                <td style={{ color: '#94A3B8' }}>Oct 24, 2026</td>

                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ height: '6px', width: '100px', background: '#1E293B', borderRadius: '4px', overflow: 'hidden' }}>
                      <div
                        style={{
                          height: '100%',
                          borderRadius: '4px',
                          backgroundColor: app.crbStatus === 'ACTIVE_DEFAULT' ? '#EF4444' : '#10B981',
                          width: `${(app.transactions.length * 30)}%`
                        }}
                      ></div>
                    </div>
                    <span style={{ fontFamily: 'monospace', fontWeight: 800, color: '#FACC15' }}>
                      {app.crbStatus === 'ACTIVE_DEFAULT' ? '410' : '780'}
                    </span>
                  </div>
                </td>

                <td>
                  <span className={app.crbStatus === 'ACTIVE_DEFAULT' ? 'badge badge-rose' : 'badge badge-green'}>
                    {app.crbStatus === 'ACTIVE_DEFAULT' ? 'FLAGGED' : 'PENDING REVIEW'}
                  </span>
                </td>

                <td style={{ textAlign: 'right' }}>
                  <button
                    onClick={(e) => { e.stopPropagation(); onSelectApplicant(app); }}
                    className="btn-outline"
                    style={{ padding: '6px 12px' }}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>

    </div>
  );
}

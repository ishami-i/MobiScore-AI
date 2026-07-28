import React, { useState } from 'react';
import { 
  Building2, Users, ShieldCheck, Plus, TrendingUp, Cpu, 
  DollarSign, Activity, Lock, Search, ChevronRight, CheckCircle2, Sliders
} from 'lucide-react';

export default function SuperAdminDashboard({ onSignOut }) {
  const [institutions, setInstitutions] = useState([
    { id: 'INST-01', name: 'Bank of Kigali (BK)', code: 'BK_KIGALI', plan: 'Enterprise Unlimited', activeAgents: 450, totalUnderwrittenRwf: 24500000000, status: 'ACTIVE' },
    { id: 'INST-02', name: 'I&M Bank Rwanda', code: 'IM_BANK', plan: 'Enterprise Tier 1', activeAgents: 280, totalUnderwrittenRwf: 12800000000, status: 'ACTIVE' },
    { id: 'INST-03', name: 'Equity Bank Rwanda', code: 'EQUITY_RW', plan: 'Enterprise Tier 1', activeAgents: 310, totalUnderwrittenRwf: 15400000000, status: 'ACTIVE' },
    { id: 'INST-04', name: 'Cogebanque', code: 'COGEBANQUE', plan: 'Growth Tier', activeAgents: 120, totalUnderwrittenRwf: 4200000000, status: 'ACTIVE' },
    { id: 'INST-05', name: 'Urwego Microfinance', code: 'URWEGO_MFI', plan: 'MFI Specialized', activeAgents: 180, totalUnderwrittenRwf: 6800000000, status: 'ACTIVE' }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newBankName, setNewBankName] = useState('');
  const [newBankCode, setNewBankCode] = useState('');
  const [newPlan, setNewPlan] = useState('Enterprise Tier 1');

  const handleAddInstitution = (e) => {
    e.preventDefault();
    if (!newBankName) return;
    const created = {
      id: `INST-0${institutions.length + 1}`,
      name: newBankName,
      code: newBankCode || newBankName.toUpperCase().replace(/\s+/g, '_'),
      plan: newPlan,
      activeAgents: 1,
      totalUnderwrittenRwf: 0,
      status: 'ACTIVE'
    };
    setInstitutions([...institutions, created]);
    setNewBankName('');
    setShowAddModal(false);
  };

  return (
    <div className="page-container">
      
      {/* Top Super Admin Header */}
      <div style={{ display: 'flex', justifyBetween: 'space-between', alignItems: 'center', marginBottom: '32px', borderBottom: '1px solid #1E293B', paddingBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#0D1226', border: '1px solid #1E293B', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>
            👑
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h1 style={{ fontSize: '24px', fontWeight: 800, fontFamily: 'Outfit, sans-serif' }}>MoMoScore Product Owner Portal</h1>
              <span className="badge badge-amber">Super Admin Master</span>
            </div>
            <p style={{ fontSize: '12px', color: '#94A3B8', marginTop: '2px' }}>Global B2B SaaS Management & Financial Institution Licensing</p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={() => setShowAddModal(true)} className="btn-yellow">
            <Plus className="w-4 h-4" /> Onboard Institution
          </button>
          <button onClick={onSignOut} className="btn-outline">
            Sign Out
          </button>
        </div>
      </div>

      {/* Global SaaS Platform Metrics */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">Total Capital Underwritten</div>
          <div className="stat-number" style={{ color: '#FACC15' }}>63.7 Billion RWF</div>
          <div style={{ fontSize: '11px', color: '#10B981', marginTop: '4px' }}>+24% YoY across licensed banks</div>
        </div>

        <div className="stat-card">
          <div className="stat-label">Active Licensed Institutions</div>
          <div className="stat-number">{institutions.length} <span style={{ fontSize: '13px', color: '#94A3B8', fontWeight: 400 }}>Banks</span></div>
          <div style={{ fontSize: '11px', color: '#64748B', marginTop: '4px' }}>BK, I&M, Equity, Urwego, SACCOs</div>
        </div>

        <div className="stat-card">
          <div className="stat-label">Licensed Bank Employees</div>
          <div className="stat-number" style={{ color: '#06B6D4' }}>1,340 <span style={{ fontSize: '13px', color: '#94A3B8', fontWeight: 400 }}>Agents</span></div>
          <div style={{ fontSize: '11px', color: '#64748B', marginTop: '4px' }}>Active credit underwriters in Rwanda</div>
        </div>
      </div>

      {/* Table */}
      <div className="table-container">
        <div style={{ padding: '20px', borderBottom: '1px solid #1E293B' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 700, fontFamily: 'Outfit, sans-serif' }}>Licensed Financial Institutions</h2>
          <p style={{ fontSize: '12px', color: '#94A3B8' }}>Manage tenant subscriptions and active employee seats.</p>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th>Institution Name</th>
              <th>Tenant Code</th>
              <th>SaaS Subscription Plan</th>
              <th>Active Employees</th>
              <th>Total Underwritten</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {institutions.map((inst) => (
              <tr key={inst.id}>
                <td style={{ fontWeight: 700, color: '#FFFFFF', fontSize: '14px' }}>{inst.name}</td>
                <td style={{ fontFamily: 'monospace', color: '#CBD5E1' }}>{inst.code}</td>
                <td style={{ color: '#FACC15', fontWeight: 700 }}>{inst.plan}</td>
                <td style={{ fontWeight: 700 }}>{inst.activeAgents} Agents</td>
                <td style={{ color: '#10B981', fontWeight: 800 }}>
                  {inst.totalUnderwrittenRwf > 0 ? `${(inst.totalUnderwrittenRwf / 1000000000).toFixed(1)} Billion RWF` : '0 RWF'}
                </td>
                <td>
                  <span className="badge badge-green">{inst.status}</span>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <button className="btn-outline" style={{ padding: '6px 12px' }}>
                    Manage Seats
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showAddModal && (
        <div className="modal-backdrop">
          <div className="modal-box">
            <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '20px' }}>Onboard New Financial Institution</h3>
            
            <form onSubmit={handleAddInstitution}>
              <div className="form-group">
                <label className="form-label">Institution / Bank Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. BPR Atlas"
                  value={newBankName}
                  onChange={(e) => setNewBankName(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">System Tenant Code *</label>
                <input
                  type="text"
                  placeholder="e.g. BPR_ATLAS"
                  value={newBankCode}
                  onChange={(e) => setNewBankCode(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">SaaS License Plan</label>
                <select
                  value={newPlan}
                  onChange={(e) => setNewPlan(e.target.value)}
                  className="form-input"
                >
                  <option value="Enterprise Unlimited">Enterprise Unlimited</option>
                  <option value="Enterprise Tier 1">Enterprise Tier 1</option>
                  <option value="Growth Tier">Growth Tier</option>
                </select>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
                <button type="button" onClick={() => setShowAddModal(false)} className="btn-outline">
                  Cancel
                </button>
                <button type="submit" className="btn-yellow">
                  Provision Bank Tenant
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

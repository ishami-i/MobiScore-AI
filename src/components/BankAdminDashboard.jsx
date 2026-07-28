import React, { useState } from 'react';
import { 
  Users, Building2, UserPlus, Shield, Sliders, CheckCircle2, 
  Search, Lock, MapPin, Activity, Plus 
} from 'lucide-react';

export default function BankAdminDashboard({ bankUser, onSignOut }) {
  const [employees, setEmployees] = useState([
    { id: 'AGT-8492', name: 'Aimable Nshimyumuremyi', email: 'a.nshimiye@bk.rw', branch: 'Kigali Main Branch', role: 'Credit Underwriter', queriesProcessed: 142, status: 'ACTIVE' },
    { id: 'AGT-8493', name: 'Divine Uwase', email: 'd.uwase@bk.rw', branch: 'Remera Branch', role: 'Loan Agent', queriesProcessed: 98, status: 'ACTIVE' },
    { id: 'AGT-8494', name: 'Patrick Habiyaremye', email: 'p.habiyaremye@bk.rw', branch: 'Musanze Branch', role: 'Senior Underwriter', queriesProcessed: 210, status: 'ACTIVE' },
    { id: 'AGT-8495', name: 'Grace Ishimwe', email: 'g.ishimwe@bk.rw', branch: 'Huye Branch', role: 'Credit Risk Officer', queriesProcessed: 76, status: 'ACTIVE' }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [branch, setBranch] = useState('Kigali Main Branch');
  const [role, setRole] = useState('Credit Underwriter');

  const handleAddEmployee = (e) => {
    e.preventDefault();
    if (!name || !email) return;
    const newEmp = {
      id: `AGT-${8496 + employees.length}`,
      name,
      email,
      branch,
      role,
      queriesProcessed: 0,
      status: 'ACTIVE'
    };
    setEmployees([...employees, newEmp]);
    setName('');
    setEmail('');
    setShowAddModal(false);
  };

  return (
    <div className="page-container">
      
      {/* Top Header */}
      <div style={{ display: 'flex', justifyBetween: 'space-between', itemsCenter: 'center', marginBottom: '32px', borderBottom: '1px solid #1E293B', paddingBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#0D1226', border: '1px solid #1E293B', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>
            🏛️
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h1 style={{ fontSize: '24px', fontWeight: 800, fontFamily: 'Outfit, sans-serif' }}>
                {bankUser ? bankUser.bankName : 'Bank of Kigali'} Institutional Admin
              </h1>
              <span className="badge badge-amber">Bank Admin Panel</span>
            </div>
            <p style={{ fontSize: '12px', color: '#94A3B8', marginTop: '2px' }}>Employee Seat Provisioning & Branch Management</p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={() => setShowAddModal(true)} className="btn-yellow">
            <UserPlus className="w-4 h-4" /> Provision Employee Seat
          </button>
          <button onClick={onSignOut} className="btn-outline">
            Sign Out
          </button>
        </div>
      </div>

      {/* Overview Metrics */}
      <div className="stats-grid-3">
        <div className="stat-card">
          <div className="stat-label">Active Bank Employees</div>
          <div className="stat-number">{employees.length} <span style={{ fontSize: '13px', color: '#94A3B8', fontWeight: 400 }}>Agents</span></div>
          <div style={{ fontSize: '11px', color: '#64748B', marginTop: '6px' }}>Licensed under Enterprise Subscription</div>
        </div>

        <div className="stat-card">
          <div className="stat-label">Branch Locations</div>
          <div className="stat-number" style={{ color: '#06B6D4' }}>4 <span style={{ fontSize: '13px', color: '#94A3B8', fontWeight: 400 }}>Branches</span></div>
          <div style={{ fontSize: '11px', color: '#64748B', marginTop: '6px' }}>Kigali Main, Remera, Musanze, Huye</div>
        </div>

        <div className="stat-card">
          <div className="stat-label">Total Queries Underwritten</div>
          <div className="stat-number" style={{ color: '#FACC15' }}>526 <span style={{ fontSize: '13px', color: '#94A3B8', fontWeight: 400 }}>Statements</span></div>
          <div style={{ fontSize: '11px', color: '#10B981', marginTop: '6px' }}>Avg Decision Time: &lt; 2.5 seconds</div>
        </div>
      </div>

      {/* Directory Table */}
      <div className="table-container">
        <div style={{ padding: '20px', borderBottom: '1px solid #1E293B' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 700, fontFamily: 'Outfit, sans-serif' }}>Bank Employee Directory</h2>
          <p style={{ fontSize: '12px', color: '#94A3B8' }}>Manage employee access, employee IDs, and assigned branch locations.</p>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Employee Full Name</th>
              <th>Corporate Email</th>
              <th>Assigned Branch</th>
              <th>System Role</th>
              <th>Statements Processed</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id}>
                <td style={{ fontFamily: 'monospace', fontWeight: 800, color: '#FACC15' }}>{emp.id}</td>
                <td style={{ fontWeight: 700, color: '#FFFFFF', fontSize: '14px' }}>{emp.name}</td>
                <td style={{ color: '#94A3B8' }}>{emp.email}</td>
                <td style={{ color: '#CBD5E1' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <MapPin className="w-3.5 h-3.5" style={{ color: '#06B6D4' }} /> {emp.branch}
                  </div>
                </td>
                <td style={{ fontWeight: 600 }}>{emp.role}</td>
                <td style={{ color: '#10B981', fontWeight: 800 }}>{emp.queriesProcessed} Statements</td>
                <td>
                  <span className="badge badge-green">{emp.status}</span>
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
            <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '20px' }}>Provision Bank Employee Access</h3>
            
            <form onSubmit={handleAddEmployee}>
              <div className="form-group">
                <label className="form-label">Employee Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Divine Uwase"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Corporate Bank Email *</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. d.uwase@bk.rw"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Assigned Branch Location</label>
                <select
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  className="form-input"
                >
                  <option value="Kigali Main Branch">Kigali Main Branch</option>
                  <option value="Remera Branch">Remera Branch</option>
                  <option value="Musanze Branch">Musanze Branch</option>
                  <option value="Huye Branch">Huye Branch</option>
                </select>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
                <button type="button" onClick={() => setShowAddModal(false)} className="btn-outline">
                  Cancel
                </button>
                <button type="submit" className="btn-yellow">
                  Create Employee Access
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

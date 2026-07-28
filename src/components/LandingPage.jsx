import React, { useState } from 'react';
import { 
  Building2, Lock, ShieldCheck, Zap, ArrowRight, Shield, 
  Crown, UserCheck, X, CheckCircle2 
} from 'lucide-react';

export default function LandingPage({ onLoginSuccess }) {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [userRole, setUserRole] = useState('AGENT'); // 'SUPER_ADMIN', 'BANK_ADMIN', 'AGENT'
  const [selectedBank, setSelectedBank] = useState('BANK_OF_KIGALI');
  const [employeeId, setEmployeeId] = useState('AGT-8492');
  const [password, setPassword] = useState('••••••••••••');

  const banks = [
    { id: 'BANK_OF_KIGALI', name: 'BANK OF KIGALI' },
    { id: 'IM_BANK', name: 'I&M BANK' },
    { id: 'EQUITY_BANK', name: 'EQUITY BANK' },
    { id: 'COGEBANQUE', name: 'COGEBANQUE' }
  ];

  const handleAuthenticate = (e) => {
    e.preventDefault();
    const bankObj = banks.find(b => b.id === selectedBank) || banks[0];
    onLoginSuccess({
      role: userRole,
      employeeId,
      bankName: bankObj.name,
      branch: 'Kigali Main Branch'
    });
  };

  return (
    <div className="app-container">
      
      {/* Top Header Navigation */}
      <header className="navbar">
        <div className="brand-box">
          <div className="brand-icon">M</div>
          <span className="brand-title">MoMoScore Enterprise</span>
        </div>

        <div className="nav-menu">
          <a href="#solution" className="nav-link">Solution</a>
          <a href="#security" className="nav-link">Security</a>
          <a href="#contact" className="nav-link">Contact</a>
        </div>

        <button
          onClick={() => setShowLoginModal(true)}
          className="btn-yellow"
        >
          Banker Login
        </button>
      </header>

      {/* Main Hero Section */}
      <main style={{ flex: 1 }}>
        <div className="hero-container">
          {/* Hero Left */}
          <div>
            <h1 className="hero-title">
              Institutional <span className="text-yellow">AI Underwriting</span> for Rwanda.
            </h1>

            <p className="hero-subtitle">
              Empower your financial institution with precise, alternative credit scoring powered by MTN MoMo data. Make lending decisions faster, safer, and with unprecedented accuracy.
            </p>

            <div className="hero-actions">
              <button
                onClick={() => setShowLoginModal(true)}
                className="btn-yellow"
              >
                Banker Login
              </button>
              <button
                onClick={() => setShowLoginModal(true)}
                className="btn-outline"
              >
                Request Access
              </button>
            </div>
          </div>

          {/* Hero Right Card */}
          <div className="glass-card" style={{ position: 'relative', minHeight: '300px', display: 'flex', flexDirection: 'column', justifyBetween: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <span style={{ fontSize: '11px', color: '#94A3B8', fontWeight: 700, textTransform: 'uppercase' }}>
                MoMoScore Enterprise Suite
              </span>
              <span className="badge badge-green">Live BNR Sync</span>
            </div>

            <div style={{ textCenter: 'center', margin: 'auto 0', textAlign: 'center' }}>
              <div style={{ fontSize: '56px', fontWeight: 800, fontFamily: 'Outfit, sans-serif' }}>
                845 <span style={{ fontSize: '14px', color: '#94A3B8' }}>/ 1000</span>
              </div>
              <div style={{ color: '#FACC15', fontWeight: 700, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Grade A Prime Underwriting
              </div>
            </div>

            <div style={{ position: 'absolute', bottom: '20px', right: '20px', background: '#060914', border: '1px solid #1E293B', padding: '8px 16px', borderRadius: '10px', display: 'flex', itemsCenter: 'center', gap: '8px' }}>
              <Zap className="w-4 h-4 text-yellow" style={{ color: '#FACC15' }} />
              <div>
                <div style={{ fontSize: '9px', textTransform: 'uppercase', color: '#94A3B8', fontWeight: 700 }}>Decision Time</div>
                <div style={{ fontSize: '13px', fontWeight: 800, fontFamily: 'monospace' }}>&lt; 2.5s</div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div style={{ textAlign: 'center', margin: '40px 0 20px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 800 }}>
            Unlocking the Power of <span className="text-yellow">Alternative Data</span>
          </h2>
          <p style={{ fontSize: '13px', color: '#94A3B8', marginTop: '6px' }}>
            Automated financial evidence extraction from MTN MoMo & Airtel e-Kaash.
          </p>
        </div>

        <div className="feature-grid">
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <div className="feature-title">Unmatched Efficiency</div>
            <div className="feature-desc">Automate the entire assessment pipeline. Ingest millions of data points instantly.</div>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <div className="feature-title">MTN MoMo Integration</div>
            <div className="feature-desc">Direct ingestion of official MTN Mobile Money statements for real-time cash flow analysis.</div>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🔍</div>
            <div className="feature-title">Predictive Accuracy</div>
            <div className="feature-desc">Deep learning algorithms identify complex risk patterns and circular transfers.</div>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🛡️</div>
            <div className="feature-title">Institutional Security</div>
            <div className="feature-desc">End-to-end encryption and audit trails ensure absolute compliance with Rwandan data laws.</div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid #1E293B', padding: '24px 32px', fontSize: '12px', color: '#94A3B8', textAlign: 'center' }}>
        © 2026 MoMoScore Enterprise. Secure Underwriting Environment.
      </footer>

      {/* LOGIN MODAL */}
      {showLoginModal && (
        <div className="modal-backdrop">
          <div className="modal-box">
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Shield style={{ color: '#FACC15' }} />
                <span style={{ fontWeight: 800, fontSize: '16px' }}>MoMoScore Authentication</span>
              </div>
              <button onClick={() => setShowLoginModal(false)} style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer' }}>
                <X />
              </button>
            </div>

            {/* Role Switcher */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '20px' }}>
              <button
                type="button"
                onClick={() => setUserRole('SUPER_ADMIN')}
                className={userRole === 'SUPER_ADMIN' ? 'btn-yellow' : 'btn-outline'}
                style={{ fontSize: '11px', padding: '8px', justifyContent: 'center' }}
              >
                Super Admin
              </button>

              <button
                type="button"
                onClick={() => setUserRole('BANK_ADMIN')}
                className={userRole === 'BANK_ADMIN' ? 'btn-yellow' : 'btn-outline'}
                style={{ fontSize: '11px', padding: '8px', justifyContent: 'center' }}
              >
                Bank Admin
              </button>

              <button
                type="button"
                onClick={() => setUserRole('AGENT')}
                className={userRole === 'AGENT' ? 'btn-yellow' : 'btn-outline'}
                style={{ fontSize: '11px', padding: '8px', justifyContent: 'center' }}
              >
                Bank Officer
              </button>
            </div>

            <form onSubmit={handleAuthenticate}>
              {userRole !== 'SUPER_ADMIN' && (
                <div className="form-group">
                  <label className="form-label">Select Your Institution</label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    {banks.map((b) => (
                      <button
                        key={b.id}
                        type="button"
                        onClick={() => setSelectedBank(b.id)}
                        className={selectedBank === b.id ? 'btn-yellow' : 'btn-outline'}
                        style={{ fontSize: '10px', padding: '8px', justifyContent: 'center' }}
                      >
                        {b.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="form-group">
                <label className="form-label">Employee ID / Email</label>
                <input
                  type="text"
                  required
                  value={employeeId}
                  onChange={(e) => setEmployeeId(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input"
                />
              </div>

              <button type="submit" className="btn-yellow" style={{ width: '100%', justifyContent: 'center', marginTop: '12px' }}>
                Authenticate Role Workspace <ArrowRight className="w-4 h-4" />
              </button>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}

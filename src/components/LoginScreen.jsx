import React, { useState } from 'react';
import { Shield, Building2, Crown, UserCheck, ArrowRight, Lock } from 'lucide-react';

export default function LoginScreen({ onLoginSuccess }) {
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
    <div style={{ minHeight: '100vh', backgroundColor: '#070913', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      
      <div className="modal-box" style={{ maxWidth: '480px', padding: '36px' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div className="brand-icon" style={{ margin: '0 auto 16px', width: '48px', height: '48px', fontSize: '24px' }}>
            M
          </div>
          <h1 style={{ fontSize: '22px', fontWeight: 800, fontFamily: 'Outfit, sans-serif', color: '#FFFFFF' }}>
            MobiScore Enterprise
          </h1>
          <p style={{ fontSize: '12px', color: '#94A3B8', marginTop: '4px' }}>
            Institutional AI Credit Underwriting Portal
          </p>
        </div>

        {/* Role Selector */}
        <div style={{ marginBottom: '24px' }}>
          <label className="form-label" style={{ textAlign: 'center', marginBottom: '10px' }}>
            Select Access Portal
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
            <button
              type="button"
              onClick={() => setUserRole('SUPER_ADMIN')}
              className={userRole === 'SUPER_ADMIN' ? 'btn-yellow' : 'btn-outline'}
              style={{ fontSize: '11px', padding: '10px 4px', justifyContent: 'center', flexDirection: 'column', gap: '4px' }}
            >
              <Crown className="w-4 h-4" />
              <span>Super Admin</span>
            </button>

            <button
              type="button"
              onClick={() => setUserRole('BANK_ADMIN')}
              className={userRole === 'BANK_ADMIN' ? 'btn-yellow' : 'btn-outline'}
              style={{ fontSize: '11px', padding: '10px 4px', justifyContent: 'center', flexDirection: 'column', gap: '4px' }}
            >
              <Building2 className="w-4 h-4" />
              <span>Bank Admin</span>
            </button>

            <button
              type="button"
              onClick={() => setUserRole('AGENT')}
              className={userRole === 'AGENT' ? 'btn-yellow' : 'btn-outline'}
              style={{ fontSize: '11px', padding: '10px 4px', justifyContent: 'center', flexDirection: 'column', gap: '4px' }}
            >
              <UserCheck className="w-4 h-4" />
              <span>Bank Officer</span>
            </button>
          </div>
        </div>

        <form onSubmit={handleAuthenticate}>
          
          {/* Bank Selector for Bank Admin / Agent */}
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
                    style={{ fontSize: '10px', padding: '10px', justifyContent: 'center' }}
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

          <button
            type="submit"
            className="btn-yellow"
            style={{ width: '100%', justifyContent: 'center', padding: '14px', marginTop: '12px' }}
          >
            Authenticate Portal <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '11px', color: '#64748B' }}>
          Protected by BNR compliance & NCSA encrypted protocols.
        </div>

      </div>

    </div>
  );
}

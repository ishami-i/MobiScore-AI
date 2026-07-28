import React, { useState } from 'react';
import { Upload, CheckCircle2, User, Phone, FileText, ArrowRight, ShieldCheck, Cpu } from 'lucide-react';

export default function NewAnalysis({ onAnalysisComplete }) {
  const [nid, setNid] = useState('');
  const [phone, setPhone] = useState('');
  const [fullName, setFullName] = useState('');
  const [tradeType, setTradeType] = useState('');
  const [fileUploaded, setFileUploaded] = useState(false);

  const isFormValid = nid && phone && fullName && tradeType && fileUploaded;

  const handleStartAnalysis = (e) => {
    e.preventDefault();
    if (!isFormValid) {
      alert("Please fill out all applicant identity fields and upload an official MoMo statement.");
      return;
    }

    const createdApplicant = {
      id: `APP-${Date.now()}`,
      entityType: tradeType.includes('Business') ? 'BUSINESS' : 'INDIVIDUAL',
      name: fullName,
      nidOrTin: nid,
      phone: phone,
      category: tradeType,
      location: 'Kigali, Rwanda',
      crbStatus: 'THIN_FILE',
      crbStatusText: 'Thin File (No Bank Account or Prior Bank Loans)',
      transactions: [
        { txId: 'FT-994820', date: '2026-07-27 10:15:00', type: 'MONEY_RECEIVED', amount: 150000, senderName: 'Client Payment', category: 'Sales Inflow' },
        { txId: 'TX-994812', date: '2026-07-25 14:30:00', type: 'MERCHANT_PAYMENT', amount: 350000, merchantName: 'Wholesale Supplier', category: 'Inventory Purchase' }
      ]
    };

    onAnalysisComplete(createdApplicant);
  };

  return (
    <div className="page-container">
      
      {/* Title Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 800, fontFamily: 'Outfit, sans-serif' }}>New User Analysis</h1>
        <p style={{ fontSize: '13px', color: '#94A3B8' }}>Initiate a new credit assessment profile.</p>
      </div>

      {/* Main Grid Layout */}
      <div className="grid-12">
        
        {/* Left Inputs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* STEP 1: APPLICANT IDENTITY */}
          <div className="glass-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '1px solid #1E293B', paddingBottom: '16px', marginBottom: '20px' }}>
              <span className="brand-icon" style={{ width: '28px', height: '28px', fontSize: '14px' }}>1</span>
              <h2 style={{ fontSize: '16px', fontWeight: 700, fontFamily: 'Outfit, sans-serif' }}>Applicant Identity</h2>
            </div>

            <div className="grid-2" style={{ marginBottom: '16px' }}>
              <div className="form-group">
                <label className="form-label">National ID (NID) *</label>
                <input
                  type="text"
                  required
                  value={nid}
                  onChange={(e) => setNid(e.target.value)}
                  placeholder="Enter NID..."
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Phone Number *</label>
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+250..."
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Full Legal Name *</label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="As it appears on ID..."
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Trade / Business Type *</label>
              <select
                value={tradeType}
                onChange={(e) => setTradeType(e.target.value)}
                className="form-input"
              >
                <option value="">Select Trade Type...</option>
                <option value="Retail Merchant">Retail Goods Merchant / Boutique</option>
                <option value="Produce Vendor">Agricultural & Market Produce Vendor</option>
                <option value="Transportation">Transportation (Moto-Taxi Rider)</option>
                <option value="Wholesale Hardware">Construction & Hardware Wholesale</option>
              </select>
            </div>
          </div>

          {/* STEP 2: MOMO STATEMENT UPLOAD */}
          <div className="glass-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '1px solid #1E293B', paddingBottom: '16px', marginBottom: '16px' }}>
              <span className="brand-icon" style={{ width: '28px', height: '28px', fontSize: '14px' }}>2</span>
              <h2 style={{ fontSize: '16px', fontWeight: 700, fontFamily: 'Outfit, sans-serif' }}>MoMo Statement Upload</h2>
            </div>

            <p style={{ fontSize: '12px', color: '#94A3B8', marginBottom: '16px' }}>
              Upload official MTN Mobile Money statements (PDF or CSV). Max file size 10MB.
            </p>

            <div
              onClick={() => setFileUploaded(true)}
              style={{
                border: '2px dashed #1E293B',
                borderRadius: '16px',
                padding: '40px',
                textAlign: 'center',
                cursor: 'pointer',
                background: fileUploaded ? 'rgba(16, 185, 129, 0.1)' : '#060914'
              }}
            >
              {fileUploaded ? (
                <div>
                  <CheckCircle2 className="w-10 h-10 text-green" style={{ color: '#10B981', margin: '0 auto 12px' }} />
                  <div style={{ fontWeight: 700, color: '#10B981', fontSize: '14px' }}>Official_MTN_MoMo_Statement.pdf Uploaded!</div>
                  <div style={{ fontSize: '11px', color: '#94A3B8', marginTop: '4px' }}>Gemini AI parser ready for structured extraction.</div>
                </div>
              ) : (
                <div>
                  <Upload className="w-10 h-10 text-muted" style={{ color: '#64748B', margin: '0 auto 12px' }} />
                  <div style={{ fontWeight: 700, color: '#FFFFFF', fontSize: '14px' }}>Drag and drop files here</div>
                  <div style={{ fontSize: '11px', color: '#64748B', marginTop: '4px' }}>or click to browse</div>
                  <button type="button" className="btn-outline" style={{ marginTop: '16px', padding: '8px 16px' }}>
                    Browse Files
                  </button>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Right Summary Panel */}
        <div>
          <div className="glass-card">
            <h3 style={{ fontSize: '14px', fontWeight: 800, color: '#FFFFFF', borderBottom: '1px solid #1E293B', paddingBottom: '12px', marginBottom: '20px' }}>
              Analysis Readiness
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: fullName && nid ? '#10B981' : '#1E293B', color: '#0F172A', fontWeight: 800, fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  1
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '13px', color: '#FFFFFF' }}>Applicant Identity</div>
                  <div style={{ fontSize: '11px', color: '#94A3B8' }}>{fullName && nid ? 'Validated' : 'Pending Input'}</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: fileUploaded ? '#10B981' : '#1E293B', color: '#0F172A', fontWeight: 800, fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  2
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '13px', color: '#FFFFFF' }}>Data Upload</div>
                  <div style={{ fontSize: '11px', color: '#94A3B8' }}>{fileUploaded ? 'Statement Ready' : 'Awaiting statement'}</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#1E293B', color: '#94A3B8', fontWeight: 800, fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  3
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '13px', color: '#94A3B8' }}>Processing</div>
                  <div style={{ fontSize: '11px', color: '#64748B' }}>Not started</div>
                </div>
              </div>
            </div>

            <button
              onClick={handleStartAnalysis}
              disabled={!isFormValid}
              className="btn-yellow"
              style={{ width: '100%', justifyContent: 'center', padding: '14px', opacity: isFormValid ? 1 : 0.5, cursor: isFormValid ? 'pointer' : 'not-allowed' }}
            >
              Start Analysis <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}

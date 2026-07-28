import React, { useState, useRef } from 'react';
import { Upload, CheckCircle2, FileText, ArrowRight, Zap, RefreshCw } from 'lucide-react';

export default function NewAnalysis({ onAnalysisComplete }) {
  const [nid, setNid] = useState('');
  const [phone, setPhone] = useState('');
  const [fullName, setFullName] = useState('');
  const [tradeType, setTradeType] = useState('');
  const [requestedAmount, setRequestedAmount] = useState('');
  const [requestedDuration, setRequestedDuration] = useState('30');
  const [loanPurpose, setLoanPurpose] = useState('');
  const [fileUploaded, setFileUploaded] = useState(false);
  const [fileName, setFileName] = useState('');
  const fileInputRef = useRef(null);

  const isFormValid = nid.trim() !== '' && phone.trim() !== '' && fullName.trim() !== '' && tradeType !== '' && fileUploaded;

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setFileUploaded(true);
    }
  };

  const handleFillDemoData = () => {
    setNid('1199880012345678');
    setPhone('+250788123456');
    setFullName('Jean Paul Habimana');
    setTradeType('Retail Merchant / Boutique');
    setRequestedAmount('300,000');
    setRequestedDuration('60');
    setLoanPurpose('Working Capital / Stock Inventory');
    setFileUploaded(true);
    setFileName('Official_MTN_MoMo_Statement.pdf');
  };

  const handleClearForm = () => {
    setNid('');
    setPhone('');
    setFullName('');
    setTradeType('');
    setRequestedAmount('');
    setRequestedDuration('30');
    setLoanPurpose('');
    setFileUploaded(false);
    setFileName('');
  };

  const handleStartAnalysis = (e) => {
    e.preventDefault();
    if (!isFormValid) {
      alert("Please fill out all applicant identity fields (NID, Phone, Full Name, Trade Type) and upload an official MoMo statement.");
      return;
    }

    const isIndividual = tradeType.includes('Individual') || tradeType.includes('Informal');

    const createdApplicant = {
      id: `APP-${Date.now()}`,
      entityType: isIndividual ? 'INDIVIDUAL' : 'BUSINESS',
      name: fullName,
      nidOrTin: nid,
      phone: phone,
      category: tradeType,
      requestedAmount: requestedAmount || '300,000',
      requestedDuration: requestedDuration || '60',
      loanPurpose: loanPurpose || (isIndividual ? 'Personal Emergency / Cashflow' : 'Working Capital'),
      location: 'Kigali, Rwanda',
      crbStatus: 'CLEAN',
      crbStatusText: 'Verified Clean CRB Hygiene Status',
      transactions: [
        { txId: 'FT-994820', date: '2026-07-27 10:15:00', type: 'MONEY_RECEIVED', amount: 350000, senderName: 'Salary / Client Inflow', category: 'Sales Inflow' },
        { txId: 'TX-994812', date: '2026-07-25 14:30:00', type: 'MERCHANT_PAYMENT', amount: 120000, merchantName: 'Merchant Vendor', category: 'Expense' }
      ]
    };

    onAnalysisComplete(createdApplicant);
  };

  return (
    <div className="page-container">
      
      {/* Title Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 800, fontFamily: 'Outfit, sans-serif' }}>New User Analysis</h1>
          <p style={{ fontSize: '13px', color: '#94A3B8' }}>Supports BOTH Individuals / Sole Traders & Registered MSMEs.</p>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button type="button" onClick={handleClearForm} className="btn-outline" style={{ fontSize: '11px' }}>
            <RefreshCw className="w-3.5 h-3.5" /> Clear Form
          </button>
          <button type="button" onClick={handleFillDemoData} className="btn-yellow" style={{ fontSize: '11px' }}>
            <Zap className="w-3.5 h-3.5 text-yellow" /> Auto-Fill Demo Profile
          </button>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid-12">
        
        {/* Left Inputs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* STEP 1: APPLICANT IDENTITY */}
          <div className="glass-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '1px solid #1E293B', paddingBottom: '16px', marginBottom: '20px' }}>
              <span className="brand-icon" style={{ width: '28px', height: '28px', fontSize: '14px' }}>1</span>
              <h2 style={{ fontSize: '16px', fontWeight: 700, fontFamily: 'Outfit, sans-serif' }}>Applicant Identity (Individual or Business)</h2>
            </div>

            <div className="grid-2" style={{ marginBottom: '16px' }}>
              <div className="form-group">
                <label className="form-label">National ID (NID) / RDB TIN *</label>
                <input
                  type="text"
                  required
                  value={nid}
                  onChange={(e) => setNid(e.target.value)}
                  placeholder="Enter NID or TIN..."
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
                  placeholder="+250 788..."
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Full Legal Name / Business Name *</label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Applicant name or business name..."
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Applicant Category / Business Type *</label>
              <select
                value={tradeType}
                onChange={(e) => setTradeType(e.target.value)}
                className="form-input"
              >
                <option value="">Select Category...</option>
                <option value="Individual / Salaried Worker">👤 Individual / Salaried Worker (Personal Income)</option>
                <option value="Informal Worker / Gig Economy">👤 Informal Worker / Gig Economy Worker</option>
                <option value="Transportation (Moto-Taxi)">🏍️ Transportation (Moto-Taxi / Bus Driver)</option>
                <option value="Produce & Market Vendor">🌾 Agricultural Produce & Market Vendor</option>
                <option value="Retail Merchant / Boutique">🛍️ Retail Goods Merchant / Boutique</option>
                <option value="Hardware & Construction">🔨 Construction & Hardware Wholesale</option>
                <option value="Food & Restaurant Service">🍽️ Food Service (Restaurant / Cafe)</option>
                <option value="Registered Cooperative / MSME">🏢 Registered MSME / Cooperative (RDB TIN)</option>
              </select>
            </div>
          </div>

          {/* STEP 2: LOAN APPLICATION PARAMETERS */}
          <div className="glass-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '1px solid #1E293B', paddingBottom: '16px', marginBottom: '20px' }}>
              <span className="brand-icon" style={{ width: '28px', height: '28px', fontSize: '14px' }}>2</span>
              <h2 style={{ fontSize: '16px', fontWeight: 700, fontFamily: 'Outfit, sans-serif' }}>Loan Request Details</h2>
            </div>

            <div className="grid-2" style={{ marginBottom: '16px' }}>
              <div className="form-group">
                <label className="form-label">Requested Loan Amount (RWF)</label>
                <input
                  type="text"
                  value={requestedAmount}
                  onChange={(e) => setRequestedAmount(e.target.value)}
                  placeholder="e.g. 300,000"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Requested Duration (Days)</label>
                <select
                  value={requestedDuration}
                  onChange={(e) => setRequestedDuration(e.target.value)}
                  className="form-input"
                >
                  <option value="30">30 Days (1 Month)</option>
                  <option value="60">60 Days (2 Months)</option>
                  <option value="90">90 Days (3 Months)</option>
                  <option value="180">180 Days (6 Months)</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Loan Purpose</label>
              <select
                value={loanPurpose}
                onChange={(e) => setLoanPurpose(e.target.value)}
                className="form-input"
              >
                <option value="">Select Loan Purpose...</option>
                <optgroup label="Personal Purposes (Individual Applicants)">
                  <option value="Personal Emergency / Cashflow">Personal Emergency / Cashflow Support</option>
                  <option value="School Fees & Education">School Fees & Education Expenses</option>
                  <option value="Medical & Healthcare">Medical & Healthcare Expenses</option>
                  <option value="Home Maintenance & Rent">Home Maintenance / Rent Payment</option>
                </optgroup>
                <optgroup label="Business Purposes (Merchants & MSMEs)">
                  <option value="Working Capital / Stock Inventory">Working Capital / Stock Inventory</option>
                  <option value="Agricultural Produce Purchase">Agricultural & Farm Produce Purchase</option>
                  <option value="Equipment Purchase & Repair">Equipment Purchase / Repair</option>
                  <option value="Store Expansion & Renovation">Store Expansion & Renovation</option>
                </optgroup>
              </select>
            </div>
          </div>

          {/* STEP 3: MOMO STATEMENT UPLOAD */}
          <div className="glass-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '1px solid #1E293B', paddingBottom: '16px', marginBottom: '16px' }}>
              <span className="brand-icon" style={{ width: '28px', height: '28px', fontSize: '14px' }}>3</span>
              <h2 style={{ fontSize: '16px', fontWeight: 700, fontFamily: 'Outfit, sans-serif' }}>MoMo Statement Upload</h2>
            </div>

            <p style={{ fontSize: '12px', color: '#94A3B8', marginBottom: '16px' }}>
              Upload official MTN Mobile Money statements (PDF, CSV, XLSX). Max file size 10MB.
            </p>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept=".pdf,.csv,.xlsx,.json"
              style={{ display: 'none' }}
            />

            <div
              onClick={() => fileInputRef.current?.click()}
              style={{
                border: '2px dashed #1E293B',
                borderRadius: '16px',
                padding: '36px',
                textAlign: 'center',
                cursor: 'pointer',
                background: fileUploaded ? 'rgba(16, 185, 129, 0.1)' : '#060914'
              }}
            >
              {fileUploaded ? (
                <div>
                  <CheckCircle2 className="w-10 h-10" style={{ color: '#10B981', margin: '0 auto 12px' }} />
                  <div style={{ fontWeight: 700, color: '#10B981', fontSize: '14px' }}>{fileName || 'Statement_Uploaded.pdf'} Uploaded!</div>
                  <div style={{ fontSize: '11px', color: '#94A3B8', marginTop: '4px' }}>Click to select a different statement file.</div>
                </div>
              ) : (
                <div>
                  <Upload className="w-10 h-10" style={{ color: '#64748B', margin: '0 auto 12px' }} />
                  <div style={{ fontWeight: 700, color: '#FFFFFF', fontSize: '14px' }}>Click to select or drag and drop statement file</div>
                  <div style={{ fontSize: '11px', color: '#64748B', marginTop: '4px' }}>Supports PDF, CSV, Excel, and JSON</div>
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
          <div className="glass-card" style={{ position: 'sticky', top: '24px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 800, color: '#FFFFFF', borderBottom: '1px solid #1E293B', paddingBottom: '12px', marginBottom: '20px' }}>
              Analysis Readiness
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: fullName.trim() && nid.trim() ? '#10B981' : '#1E293B', color: '#0F172A', fontWeight: 800, fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  1
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '13px', color: '#FFFFFF' }}>Applicant Identity</div>
                  <div style={{ fontSize: '11px', color: '#94A3B8' }}>{fullName.trim() && nid.trim() ? 'Validated' : 'Pending Input'}</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: requestedAmount ? '#10B981' : '#1E293B', color: '#0F172A', fontWeight: 800, fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  2
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '13px', color: '#FFFFFF' }}>Loan Request</div>
                  <div style={{ fontSize: '11px', color: '#94A3B8' }}>{requestedAmount ? `${requestedAmount} RWF (${requestedDuration} Days)` : 'Optional'}</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: fileUploaded ? '#10B981' : '#1E293B', color: '#0F172A', fontWeight: 800, fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  3
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '13px', color: '#FFFFFF' }}>Statement Upload</div>
                  <div style={{ fontSize: '11px', color: '#94A3B8' }}>{fileUploaded ? 'Statement Ready' : 'Awaiting statement'}</div>
                </div>
              </div>
            </div>

            <button
              onClick={handleStartAnalysis}
              disabled={!isFormValid}
              className="btn-yellow"
              style={{
                width: '100%',
                justifyContent: 'center',
                padding: '14px',
                fontSize: '14px',
                fontWeight: 800,
                opacity: isFormValid ? 1 : 0.4,
                cursor: isFormValid ? 'pointer' : 'not-allowed'
              }}
            >
              Start Underwriting Analysis <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}

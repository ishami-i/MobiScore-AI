import React, { useState } from 'react';
import { Upload, FileText, CheckCircle2, ShieldCheck, User, Building2, FileSpreadsheet, ArrowRight, MessageSquare } from 'lucide-react';
import { parseSmsText } from '../services/smsParser.js';

export default function ApplicantPortal({ onApplicationSubmit }) {
  const [uploadFormat, setUploadFormat] = useState('PDF'); // 'PDF', 'CSV', 'EXCEL', 'JSON', 'SMS'
  const [entityType, setEntityType] = useState('INDIVIDUAL');
  const [applicantName, setApplicantName] = useState('Jean Paul Habimana');
  const [nidOrTin, setNidOrTin] = useState('1199880012345678');
  const [phone, setPhone] = useState('+250 788 123 456');
  const [category, setCategory] = useState('Retail Merchant');
  const [smsInput, setSmsInput] = useState('*165*S*1000 RWF transferred to JUVENS HAKIZIMANA (250780335364) at 2026-07-28 08:49:10. Fee: 20 RWF. Balance: 441 RWF.');
  const [consentGranted, setConsentGranted] = useState(true);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!consentGranted) {
      alert('Please grant consent to process your Mobile Money statement.');
      return;
    }

    let parsedTx = [];
    if (uploadFormat === 'SMS' && smsInput) {
      const parsed = parseSmsText(smsInput);
      if (parsed) parsedTx.push(parsed);
    }

    const newApplication = {
      id: `APP-${Date.now()}`,
      entityType,
      name: applicantName,
      nidOrTin,
      phone,
      category,
      location: 'Kigali, Rwanda',
      crbStatus: 'THIN_FILE',
      crbStatusText: 'Thin File (No Prior Bank Loans)',
      transactions: parsedTx.length > 0 ? parsedTx : [
        { txId: "FT-29440570415", date: "2026-07-26 10:58:26", type: "MONEY_RECEIVED", amount: 125000, senderName: "Eric NZAYISENGA", category: "Customer Payment Inflow" },
        { txId: "TX-29440520601", date: "2026-07-25 14:20:10", type: "MERCHANT_PAYMENT", amount: 320000, merchantName: "Bralirwa Distributor Ltd", category: "Wholesale Supplier Payout" },
        { txId: "TX-29440520602", date: "2026-07-24 09:15:00", type: "UTILITY", amount: 14500, merchantName: "WASAC Water Utility", category: "Utility Bill" }
      ]
    };

    onApplicationSubmit(newApplication);
    setIsSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto py-6 space-y-8">
      {/* Header Banner */}
      <div className="glass-card p-8 text-center space-y-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-400/10 text-amber-400 border border-amber-400/30">
          🌐 Business Owner / MSME Loan Application Portal
        </span>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight font-heading text-white">
          Apply for Financing with Your Mobile Money Statement
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm leading-relaxed">
          Upload your official MTN MoMo Business or Airtel e-Kaash transaction statement to establish alternative creditworthiness without traditional collateral.
        </p>
      </div>

      {!isSubmitted ? (
        <form onSubmit={handleSubmit} className="glass-card p-6 md:p-8 space-y-6">
          
          {/* Entity Type Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              1. Select Business Entity Type
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setEntityType('INDIVIDUAL')}
                className={`p-4 rounded-xl border flex items-center gap-3 transition-all ${
                  entityType === 'INDIVIDUAL'
                    ? 'border-amber-400 bg-amber-400/10 text-white shadow-lg shadow-amber-400/10'
                    : 'border-slate-800 bg-slate-900/50 text-slate-400 hover:border-slate-700'
                }`}
              >
                <User className="w-6 h-6 text-amber-400" />
                <div className="text-left">
                  <div className="font-bold text-sm">Individual Sole Proprietor</div>
                  <div className="text-xs text-slate-400">Registered under Personal NID</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setEntityType('BUSINESS')}
                className={`p-4 rounded-xl border flex items-center gap-3 transition-all ${
                  entityType === 'BUSINESS'
                    ? 'border-amber-400 bg-amber-400/10 text-white shadow-lg shadow-amber-400/10'
                    : 'border-slate-800 bg-slate-900/50 text-slate-400 hover:border-slate-700'
                }`}
              >
                <Building2 className="w-6 h-6 text-cyan-400" />
                <div className="text-left">
                  <div className="font-bold text-sm">Registered Business / Cooperative</div>
                  <div className="text-xs text-slate-400">Registered under RDB TIN</div>
                </div>
              </button>
            </div>
          </div>

          {/* Applicant Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                {entityType === 'INDIVIDUAL' ? 'Personal Full Name *' : 'Business / Cooperative Name *'}
              </label>
              <input
                type="text"
                required
                value={applicantName}
                onChange={(e) => setApplicantName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                {entityType === 'INDIVIDUAL' ? '16-Digit National ID (NID) *' : 'RDB Tax ID (TIN) *'}
              </label>
              <input
                type="text"
                required
                value={nidOrTin}
                onChange={(e) => setNidOrTin(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">Mobile Money Phone Number *</label>
              <input
                type="text"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">Commercial Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-amber-400"
              >
                <option value="Retail Merchant">Retail Merchant / Boutique</option>
                <option value="Produce Vendor">Agricultural / Produce Vendor</option>
                <option value="Transportation">Transportation (Moto-Taxi)</option>
                <option value="Hardware Wholesale">Hardware & Construction Wholesale</option>
              </select>
            </div>
          </div>

          {/* Statement Format Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              2. Select Upload Statement Format
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {['PDF', 'CSV', 'EXCEL', 'JSON', 'SMS'].map((fmt) => (
                <button
                  key={fmt}
                  type="button"
                  onClick={() => setUploadFormat(fmt)}
                  className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                    uploadFormat === fmt
                      ? 'bg-amber-400/20 border-amber-400 text-amber-300'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  {fmt === 'PDF' && 'PDF Document'}
                  {fmt === 'CSV' && 'CSV Spreadsheet'}
                  {fmt === 'EXCEL' && 'Excel (.xlsx)'}
                  {fmt === 'JSON' && 'JSON Export'}
                  {fmt === 'SMS' && 'SMS Messages'}
                </button>
              ))}
            </div>
          </div>

          {/* Format Specific Uploader */}
          {uploadFormat !== 'SMS' ? (
            <div>
              <div
                onClick={() => setFileUploaded(true)}
                className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
                  fileUploaded
                    ? 'border-emerald-500 bg-emerald-500/10'
                    : 'border-slate-800 bg-slate-900/40 hover:border-amber-400/50 hover:bg-slate-900'
                }`}
              >
                {fileUploaded ? (
                  <div className="space-y-2">
                    <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                    <div className="font-bold text-emerald-400 text-sm">Official_MoMo_Statement.{uploadFormat.toLowerCase()} Uploaded!</div>
                    <div className="text-xs text-slate-400">Gemini 3.6 Flash ready to extract structured transactions.</div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Upload className="w-10 h-10 text-amber-400 mx-auto" />
                    <div className="font-bold text-white text-sm">Upload Official MTN MoMo / Airtel Business Statement ({uploadFormat})</div>
                    <div className="text-xs text-slate-400">Drag & drop your downloaded statement file here.</div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4 text-amber-400" /> Paste MoMo SMS Transaction Messages
              </label>
              <textarea
                rows={4}
                value={smsInput}
                onChange={(e) => setSmsInput(e.target.value)}
                placeholder="Paste SMS notifications here..."
                className="w-full p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-white font-mono text-xs focus:outline-none focus:border-amber-400"
              />
            </div>
          )}

          {/* Consent Checkbox */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-3">
            <input
              type="checkbox"
              id="consentCheck"
              checked={consentGranted}
              onChange={(e) => setConsentGranted(e.target.checked)}
              className="mt-1 w-4 h-4 rounded bg-slate-900 border-slate-700 text-amber-400 focus:ring-amber-400"
            />
            <label htmlFor="consentCheck" className="text-xs text-slate-300 leading-relaxed cursor-pointer">
              <strong>Consent Authorization:</strong> I explicitly authorize the processing of my uploaded Mobile Money transaction statement for the purpose of credit evaluation and loan underwriting under the Rwandan Law Relating to the Protection of Personal Data (NCSA).
            </label>
          </div>

          <button type="submit" className="w-full btn-gold justify-center text-base py-3.5">
            Submit Statement for AI Credit Assessment <ArrowRight className="w-5 h-5" />
          </button>
        </form>
      ) : (
        /* Confirmation Screen */
        <div className="glass-card p-8 text-center space-y-6">
          <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto animate-bounce" />
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-white font-heading">Application Submitted & Analyzed!</h2>
            <p className="text-slate-400 max-w-lg mx-auto text-sm">
              Your Mobile Money statement has been processed. Registered financial institutions can now review your credit score and loan eligibility.
            </p>
          </div>

          <div className="pt-4 flex justify-center gap-4">
            <button
              onClick={() => setIsSubmitted(false)}
              className="btn-glass text-xs"
            >
              Upload Another Statement
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

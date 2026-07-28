import React, { useState } from 'react';
import { Upload, CheckCircle2, User, Building2, Shield, ArrowRight } from 'lucide-react';

export default function BorrowerPortal({ onSelectProfile }) {
  const [entityType, setEntityType] = useState('INDIVIDUAL');
  const [name, setName] = useState('');
  const [nidOrTin, setNidOrTin] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('Retail Trader');
  const [fileUploaded, setFileUploaded] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4">
      {/* Banner */}
      <div className="glass-card p-8 text-center space-y-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-400/10 text-amber-400 border border-amber-400/30">
          🌐 Online Borrower Self-Service Portal
        </span>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight font-heading text-white">
          Apply for a Business Loan with Your MoMo Statement
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm leading-relaxed">
          No land titles or traditional bank credit history required. Submit your personal or business MTN MoMo statement online for instant AI credit evaluation.
        </p>
      </div>

      {!isSubmitted ? (
        <form onSubmit={handleSubmit} className="glass-card p-6 md:p-8 space-y-6">
          {/* Entity Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              1. Select Entity Type
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
                  <div className="font-bold text-sm">Individual / Sole Trader</div>
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
                  <div className="font-bold text-sm">Registered Business / Coop</div>
                  <div className="text-xs text-slate-400">Registered under RDB TIN</div>
                </div>
              </button>
            </div>
          </div>

          {/* Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                {entityType === 'INDIVIDUAL' ? 'Personal Full Name *' : 'Business / Cooperative Name *'}
              </label>
              <input
                type="text"
                required
                placeholder={entityType === 'INDIVIDUAL' ? 'e.g. Jean Paul Habimana' : 'e.g. Akagera Hardware Ltd'}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                {entityType === 'INDIVIDUAL' ? '16-Digit National ID (NID) *' : 'RDB Tax Identification Number (TIN) *'}
              </label>
              <input
                type="text"
                required
                placeholder={entityType === 'INDIVIDUAL' ? '1199880012345678' : '109876543'}
                value={nidOrTin}
                onChange={(e) => setNidOrTin(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">Phone Number (MTN MoMo) *</label>
              <input
                type="text"
                required
                placeholder="+250 788 000 000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">Trade / Commercial Activity</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-amber-400"
              >
                <option value="Retail Merchant">Retail Merchant / Boutique</option>
                <option value="Market Produce Vendor">Market Produce Vendor</option>
                <option value="Transportation / Moto">Transportation (Moto-Taxi)</option>
                <option value="Hardware Wholesale">Hardware & Construction Wholesale</option>
                <option value="Restaurant / Cafe">Restaurant / Food Service</option>
              </select>
            </div>
          </div>

          {/* Statement Uploader */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              2. Upload Official MTN MoMo Statement (PDF / CSV / Text)
            </label>
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
                  <div className="font-bold text-emerald-400 text-sm">Official_MoMo_Statement_90Days.pdf Uploaded!</div>
                  <div className="text-xs text-slate-400">Gemini 3.6 Flash ready to parse transactions.</div>
                </div>
              ) : (
                <div className="space-y-2">
                  <Upload className="w-10 h-10 text-amber-400 mx-auto" />
                  <div className="font-bold text-white text-sm">Click to Upload or Drag & Drop Statement</div>
                  <div className="text-xs text-slate-400">Supports official MTN MoMo PDF statement exports, CSV files, or text logs.</div>
                </div>
              )}
            </div>
          </div>

          {/* Submit */}
          <button type="submit" className="w-full btn-gold justify-center text-base py-3.5">
            Submit Application for AI Underwriting <ArrowRight className="w-5 h-5" />
          </button>
        </form>
      ) : (
        /* Confirmation Screen */
        <div className="glass-card p-8 text-center space-y-6">
          <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto animate-bounce" />
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-white font-heading">Application Submitted Successfully!</h2>
            <p className="text-slate-400 max-w-lg mx-auto text-sm">
              Your MoMo statement has been ingested into the Bank Review Queue. Loan officers at Kigali Main Branch can now evaluate your **MoMoScore**.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 max-w-md mx-auto text-left text-xs space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-400">Applicant:</span>
              <span className="font-bold text-white">{name || 'Jean Paul Habimana'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">NID / TIN:</span>
              <span className="font-bold text-white">{nidOrTin || '1199880012345678'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Status:</span>
              <span className="font-bold text-amber-400">Pending Bank Officer Approval</span>
            </div>
          </div>

          <div className="pt-4 flex justify-center gap-4">
            <button
              onClick={() => setIsSubmitted(false)}
              className="btn-glass text-xs"
            >
              Submit Another Application
            </button>
            <button
              onClick={() => onSelectProfile('profile-1')}
              className="btn-gold text-xs"
            >
              View Application in Bank Suite <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

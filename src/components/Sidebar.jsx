import React from 'react';
import { 
  Plus, LayoutDashboard, ListFilter, Sliders, ShieldCheck, 
  FileText, HelpCircle, LogOut 
} from 'lucide-react';

export default function Sidebar({ activeTab, onSelectTab, onNewAnalysis, onSignOut }) {
  return (
    <aside className="sidebar">
      
      <div>
        {/* Brand Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingBottom: '20px' }}>
          <div className="brand-icon">M</div>
          <div>
            <div style={{ fontWeight: 800, fontSize: '16px', color: '#FFFFFF', fontFamily: 'Outfit, sans-serif' }}>MoMoScore</div>
            <div style={{ fontSize: '11px', color: '#94A3B8' }}>Institutional Portal</div>
          </div>
        </div>

        {/* Primary CTA Button */}
        <button onClick={onNewAnalysis} className="btn-yellow" style={{ width: '100%', justifyCenter: 'center', padding: '12px' }}>
          <Plus className="w-4 h-4" /> New Analysis
        </button>

        {/* Navigation Menu Links */}
        <nav className="sidebar-menu">
          <button
            onClick={() => onSelectTab('DASHBOARD')}
            className={`sidebar-item ${activeTab === 'DASHBOARD' ? 'active' : ''}`}
          >
            <LayoutDashboard className="w-4 h-4" /> Dashboard
          </button>

          <button
            onClick={() => onSelectTab('QUEUE')}
            className={`sidebar-item ${activeTab === 'QUEUE' ? 'active' : ''}`}
          >
            <ListFilter className="w-4 h-4" /> Credit Queue
          </button>

          <button
            onClick={() => onSelectTab('RISK_MODELS')}
            className={`sidebar-item ${activeTab === 'RISK_MODELS' ? 'active' : ''}`}
          >
            <Sliders className="w-4 h-4" /> Risk Models
          </button>

          <button
            onClick={() => onSelectTab('AUDIT')}
            className={`sidebar-item ${activeTab === 'AUDIT' ? 'active' : ''}`}
          >
            <ShieldCheck className="w-4 h-4" /> Audit Trail
          </button>

          <button
            onClick={() => onSelectTab('REPORTS')}
            className={`sidebar-item ${activeTab === 'REPORTS' ? 'active' : ''}`}
          >
            <FileText className="w-4 h-4" /> Reports
          </button>
        </nav>
      </div>

      {/* Bottom Actions */}
      <div style={{ borderTop: '1px solid #1E293B', paddingTop: '16px' }}>
        <button
          onClick={() => alert("MoMoScore Enterprise Support: Contact support@momoscore.rw")}
          className="sidebar-item"
        >
          <HelpCircle className="w-4 h-4" /> Support
        </button>

        <button
          onClick={onSignOut}
          className="sidebar-item"
          style={{ color: '#FCA5A5' }}
        >
          <LogOut className="w-4 h-4" /> Sign Out
        </button>
      </div>

    </aside>
  );
}

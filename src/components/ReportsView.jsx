import React from 'react';
import { FileText, Download, TrendingUp, CheckCircle2 } from 'lucide-react';
import { APPLICANT_PROFILES } from '../data/sampleDataset.js';

export default function ReportsView() {
  return (
    <div className="page-container">
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 800, fontFamily: 'Outfit, sans-serif' }}>Institutional Portfolio Reports</h1>
        <p style={{ fontSize: '13px', color: '#94A3B8' }}>Download executive credit assessment summaries, CSV data feeds, and loan portfolio analytics.</p>
      </div>

      <div className="table-container">
        <div style={{ padding: '20px', borderBottom: '1px solid #1E293B', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '16px', fontWeight: 700, fontFamily: 'Outfit, sans-serif' }}>Generated Credit Assessment Reports</h2>
            <p style={{ fontSize: '12px', color: '#94A3B8' }}>Download official PDF memos or export CSV data sheets for core banking systems.</p>
          </div>
          <button className="btn-yellow" onClick={() => alert("Exporting all portfolio data to CSV...")}>
            <Download className="w-4 h-4" /> Export All Portfolio CSV
          </button>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th>Applicant Name</th>
              <th>Category</th>
              <th>Score Grade</th>
              <th>Calculated Score</th>
              <th>Report Status</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {APPLICANT_PROFILES.map((app) => (
              <tr key={app.id}>
                <td style={{ fontWeight: 700, color: '#FFFFFF', fontSize: '14px' }}>{app.name}</td>
                <td style={{ color: '#94A3B8' }}>{app.category}</td>
                <td>
                  <span className={`badge ${app.crbStatus === 'ACTIVE_DEFAULT' ? 'badge-rose' : 'badge-green'}`}>
                    {app.crbStatus === 'ACTIVE_DEFAULT' ? 'Grade D (High Risk)' : 'Grade A (Prime)'}
                  </span>
                </td>
                <td style={{ fontFamily: 'monospace', fontWeight: 800, color: '#FACC15' }}>
                  {app.crbStatus === 'ACTIVE_DEFAULT' ? '410' : '780'} / 850
                </td>
                <td>
                  <span className="badge badge-green">Ready to Download</span>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <button className="btn-outline" style={{ padding: '6px 12px' }} onClick={() => alert(`Downloading PDF report for ${app.name}...`)}>
                    <FileText className="w-3.5 h-3.5" /> Download PDF
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

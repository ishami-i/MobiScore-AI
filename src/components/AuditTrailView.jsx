import React from 'react';
import { ShieldCheck, Activity, Lock, Database } from 'lucide-react';

export default function AuditTrailView() {
  const auditLogs = [
    { id: 'LOG-9941', timestamp: '2026-07-28 14:22:10', officer: 'Aimable Nshimyumuremyi', action: 'LOAN APPROVAL & DISBURSAL', applicant: 'Jean Paul Habimana', details: 'Approved 2,400,000 RWF via MoMo API', status: 'SUCCESS' },
    { id: 'LOG-9940', timestamp: '2026-07-28 13:45:05', officer: 'Divine Uwase', action: 'CRB HYGIENE CHECK', applicant: 'Eric Mugisha', details: 'TransUnion Registry check return clean file', status: 'SUCCESS' },
    { id: 'LOG-9939', timestamp: '2026-07-28 12:10:30', officer: 'System AI Engine', action: 'MOMO STATEMENT INGESTION', applicant: 'Akagera Hardware Ltd', details: 'Parsed 420 transactions from PDF', status: 'SUCCESS' },
    { id: 'LOG-9938', timestamp: '2026-07-28 10:18:44', officer: 'Patrick Habiyaremye', action: 'FRAUD FLAG REVIEW', applicant: 'Alexis Kayiranga', details: 'Circular transfer detected (-200 pts applied)', status: 'FLAGGED' }
  ];

  return (
    <div className="page-container">
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 800, fontFamily: 'Outfit, sans-serif' }}>System Audit Trail</h1>
        <p style={{ fontSize: '13px', color: '#94A3B8' }}>Tamper-proof compliance logs for BNR regulatory auditing & NCSA data privacy protection.</p>
      </div>

      <div className="table-container">
        <div style={{ padding: '20px', borderBottom: '1px solid #1E293B' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 700, fontFamily: 'Outfit, sans-serif' }}>Real-Time System Execution Logs</h2>
          <p style={{ fontSize: '12px', color: '#94A3B8' }}>Every underwriting decision, human sign-off, and statement intake event is recorded.</p>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th>Log ID</th>
              <th>Timestamp</th>
              <th>Performing Agent</th>
              <th>Action Executed</th>
              <th>Target Applicant</th>
              <th>Details</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {auditLogs.map((log) => (
              <tr key={log.id}>
                <td style={{ fontFamily: 'monospace', fontWeight: 800, color: '#FACC15' }}>{log.id}</td>
                <td style={{ color: '#94A3B8', fontSize: '12px' }}>{log.timestamp}</td>
                <td style={{ fontWeight: 700, color: '#FFFFFF' }}>{log.officer}</td>
                <td style={{ fontWeight: 600, color: '#06B6D4' }}>{log.action}</td>
                <td style={{ fontWeight: 700, color: '#FFFFFF' }}>{log.applicant}</td>
                <td style={{ color: '#CBD5E1', fontSize: '12px' }}>{log.details}</td>
                <td>
                  <span className={`badge ${log.status === 'SUCCESS' ? 'badge-green' : 'badge-rose'}`}>
                    {log.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

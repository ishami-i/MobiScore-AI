/**
 * Client-Side Credit Assessment Report PDF & CSV Exporter
 */

export function downloadCsvReport(applicant, transactions = []) {
  if (!transactions || transactions.length === 0) return;

  const headers = ['Transaction ID', 'Date', 'Type', 'Amount (RWF)', 'Sender/Recipient', 'Status', 'Category'];
  const rows = transactions.map(t => [
    t.txId || 'N/A',
    t.date || 'N/A',
    t.type || 'N/A',
    t.amount || 0,
    `"${t.senderName || t.recipientName || t.merchantName || 'N/A'}"`,
    t.status || 'SUCCESS',
    `"${t.category || 'General'}"`
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `MoMoScore_CreditReport_${applicant.name.replace(/\s+/g, '_')}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function printPdfReport(applicant, analysis, scoreResult, fraudResult) {
  const printWindow = window.open('', '_blank');
  if (!printWindow) return;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Credit Assessment Report - ${applicant.name}</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 40px; color: #1e293b; line-height: 1.5; }
        .header { border-bottom: 2px solid #e2e8f0; padding-bottom: 20px; margin-bottom: 20px; display: flex; justify-content: space-between; }
        .title { font-size: 24px; font-weight: bold; color: #0f172a; }
        .subtitle { color: #64748b; font-size: 14px; }
        .score-box { background: #f8fafc; border: 1px solid #cbd5e1; padding: 20px; border-radius: 8px; margin-bottom: 20px; text-align: center; }
        .score-number { font-size: 48px; font-weight: bold; color: #0284c7; }
        .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px; }
        .card { border: 1px solid #e2e8f0; padding: 15px; border-radius: 8px; }
        .card-title { font-size: 12px; text-transform: uppercase; color: #64748b; font-weight: bold; margin-bottom: 5px; }
        .card-value { font-size: 20px; font-weight: bold; color: #0f172a; }
        table { width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 12px; }
        th, td { border: 1px solid #e2e8f0; padding: 8px; text-align: left; }
        th { background: #f1f5f9; }
      </style>
    </head>
    <body>
      <div class="header">
        <div>
          <div class="title">MoMoScore Institutional Credit Assessment</div>
          <div class="subtitle">Rwanda Financial Ecosystem • Alternative Credit Data Report</div>
        </div>
        <div style="text-align: right;">
          <div>Date: ${new Date().toLocaleDateString()}</div>
          <div>Report ID: #RPT-${Date.now().toString().substring(5)}</div>
        </div>
      </div>

      <div class="score-box">
        <div class="card-title">CREDIT SCORE (RANGE 0 - 1000)</div>
        <div class="score-number">${scoreResult.score}</div>
        <div style="font-weight: bold; text-transform: uppercase; margin-top: 5px;">Rating: ${scoreResult.scoreTier} | Default Risk: ${scoreResult.defaultProbabilityPercent}%</div>
      </div>

      <div class="grid">
        <div class="card">
          <div class="card-title">Applicant Profile</div>
          <div><strong>Name:</strong> ${applicant.name}</div>
          <div><strong>NID/TIN:</strong> ${applicant.nidOrTin}</div>
          <div><strong>Phone:</strong> ${applicant.phone}</div>
          <div><strong>Category:</strong> ${applicant.category}</div>
        </div>
        <div class="card">
          <div class="card-title">Loan Recommendation</div>
          <div><strong>Max Approved Limit:</strong> ${scoreResult.maxLoanLimitRwf.toLocaleString()} RWF</div>
          <div><strong>Recommended Duration:</strong> ${scoreResult.recommendedDurationDays} Days</div>
          <div><strong>AI Confidence:</strong> ${scoreResult.confidenceScorePercent}%</div>
        </div>
      </div>

      <div class="card" style="margin-bottom: 20px;">
        <div class="card-title">Financial Performance Summary</div>
        <table>
          <tr><th>Metric</th><th>Value (RWF)</th></tr>
          <tr><td>Total 30-Day MoMo Inflow</td><td>${analysis.totalInflow.toLocaleString()} RWF</td></tr>
          <tr><td>Total 30-Day Outflow</td><td>${analysis.totalOutflow.toLocaleString()} RWF</td></tr>
          <tr><td>Net Cash Flow</td><td>${analysis.netCashFlow.toLocaleString()} RWF</td></tr>
          <tr><td>Average Monthly Revenue</td><td>${analysis.avgMonthlyRevenue.toLocaleString()} RWF</td></tr>
          <tr><td>Cash Flow Stability Score</td><td>${analysis.cashFlowStabilityScore} / 100</td></tr>
          <tr><td>Customer Retention Rate</td><td>${analysis.customerRetentionRate}%</td></tr>
        </table>
      </div>

      <div class="card">
        <div class="card-title">Fraud & Anomaly Audit</div>
        <div>Status: <strong>${fraudResult.isClean ? 'Clean / Low Risk' : 'Audit Flags Present'}</strong></div>
        ${fraudResult.flags.map(f => `<div style="color: #dc2626; margin-top: 5px;">⚠️ <strong>${f.title}:</strong> ${f.description}</div>`).join('')}
      </div>

      <script>
        window.onload = function() { window.print(); }
      </script>
    </body>
    </html>
  `;

  printWindow.document.write(html);
  printWindow.document.close();
}

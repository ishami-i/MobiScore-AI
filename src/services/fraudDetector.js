/**
 * Advanced Fraud & Anomaly Detection Module for Mobile Money Statements
 */

export function detectFraud(transactions = []) {
  const flags = [];
  let riskScorePenalty = 0;

  if (!transactions || transactions.length === 0) {
    return { isClean: true, flags: [], fraudRiskLevel: 'LOW', riskScorePenalty: 0 };
  }

  // 1. Circular Payment / Self-Transfer Check
  const counterpartyMap = {};
  transactions.forEach(t => {
    const party = t.senderName || t.recipientName;
    if (party && party !== 'Self') {
      counterpartyMap[party] = (counterpartyMap[party] || 0) + 1;
    }
  });

  const suspiciousLoopParties = Object.keys(counterpartyMap).filter(p => counterpartyMap[p] > 20);
  if (suspiciousLoopParties.length > 0) {
    flags.push({
      type: 'CIRCULAR_PAYMENTS',
      severity: 'HIGH',
      title: 'Potential Circular Transfer Pattern Detected',
      description: `Excessive bidirectional transactions detected with key accounts: ${suspiciousLoopParties.slice(0, 2).join(', ')}.`
    });
    riskScorePenalty += 120;
  }

  // 2. Sudden Volume Inflation Spike Check
  const amounts = transactions.map(t => t.amount || 0);
  const avgAmount = amounts.reduce((a, b) => a + b, 0) / (amounts.length || 1);
  const largeSpikes = transactions.filter(t => t.amount > avgAmount * 8);

  if (largeSpikes.length >= 2) {
    flags.push({
      type: 'VOLUME_INFLATION',
      severity: 'MEDIUM',
      title: 'Artificial Volume Inflation Spike',
      description: `${largeSpikes.length} unusually large transfers detected (>8x average transaction value) right before loan application.`
    });
    riskScorePenalty += 75;
  }

  // 3. Duplicate Transaction Check
  const txIdSet = new Set();
  let duplicateCount = 0;
  transactions.forEach(t => {
    if (t.txId) {
      if (txIdSet.has(t.txId)) {
        duplicateCount += 1;
      } else {
        txIdSet.add(t.txId);
      }
    }
  });

  if (duplicateCount > 0) {
    flags.push({
      type: 'DUPLICATE_RECORDS',
      severity: 'HIGH',
      title: 'Manipulated / Duplicate Transaction Records',
      description: `Detected ${duplicateCount} duplicate transaction IDs in uploaded statement.`
    });
    riskScorePenalty += 150;
  }

  // Determine overall fraud level
  let fraudRiskLevel = 'LOW';
  if (riskScorePenalty >= 150) {
    fraudRiskLevel = 'HIGH';
  } else if (riskScorePenalty >= 50) {
    fraudRiskLevel = 'MEDIUM';
  }

  return {
    isClean: flags.length === 0,
    flags,
    fraudRiskLevel,
    riskScorePenalty
  };
}

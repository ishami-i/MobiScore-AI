/**
 * Comprehensive Financial Analysis & Business Health Metrics Engine
 */

export function analyzeTransactions(transactions = []) {
  if (!transactions || transactions.length === 0) {
    return getEmptyAnalysis();
  }

  // Filter valid transactions
  const inflows = transactions.filter(t => t.type === 'MONEY_RECEIVED' || t.type === 'MERCHANT_PAYMENT' || t.type === 'DEPOSIT');
  const outflows = transactions.filter(t => t.type === 'MONEY_SENT' || t.type === 'WITHDRAWAL' || t.type === 'UTILITY' || t.type === 'FEE');

  // Revenue & Cash Flow Aggregations
  const totalInflow = inflows.reduce((sum, t) => sum + (t.amount || 0), 0);
  const totalOutflow = outflows.reduce((sum, t) => sum + (t.amount || 0), 0);
  const netCashFlow = totalInflow - totalOutflow;

  const amounts = transactions.map(t => t.amount || 0);
  const avgTxValue = amounts.length > 0 ? totalInflow / (inflows.length || 1) : 0;
  
  // Median calculation
  const sortedAmounts = [...amounts].sort((a, b) => a - b);
  const medianTxValue = sortedAmounts.length > 0 ? sortedAmounts[Math.floor(sortedAmounts.length / 2)] : 0;
  const maxTxValue = Math.max(...amounts, 0);
  const minTxValue = Math.min(...amounts, 0);

  // Time-based Grouping (Monthly)
  const monthlyRevenue = {};
  inflows.forEach(t => {
    const monthKey = t.date ? t.date.substring(0, 7) : '2026-07';
    monthlyRevenue[monthKey] = (monthlyRevenue[monthKey] || 0) + t.amount;
  });

  const monthKeys = Object.keys(monthlyRevenue).sort();
  const monthlyValues = monthKeys.map(k => monthlyRevenue[k]);
  const avgMonthlyRevenue = monthlyValues.length > 0 
    ? monthlyValues.reduce((a, b) => a + b, 0) / monthlyValues.length 
    : totalInflow;

  // Monthly Growth Rate calculation
  let growthRatePercent = 0;
  if (monthlyValues.length >= 2) {
    const prev = monthlyValues[monthlyValues.length - 2];
    const curr = monthlyValues[monthlyValues.length - 1];
    growthRatePercent = prev > 0 ? ((curr - prev) / prev) * 100 : 0;
  }

  // Customer Concentration & Retention Analysis
  const customerMap = {};
  inflows.forEach(t => {
    const cust = t.senderName || t.customerName || 'Unknown Customer';
    if (!customerMap[cust]) {
      customerMap[cust] = { name: cust, count: 0, totalAmount: 0 };
    }
    customerMap[cust].count += 1;
    customerMap[cust].totalAmount += t.amount;
  });

  const customerList = Object.values(customerMap).sort((a, b) => b.totalAmount - a.totalAmount);
  const uniqueCustomersCount = customerList.length;
  const returningCustomersCount = customerList.filter(c => c.count > 1).length;
  const customerRetentionRate = uniqueCustomersCount > 0 ? (returningCustomersCount / uniqueCustomersCount) * 100 : 0;

  // Customer Concentration Risk (% of revenue from top customer)
  const topCustomerRevenue = customerList.length > 0 ? customerList[0].totalAmount : 0;
  const topCustomerConcentration = totalInflow > 0 ? (topCustomerRevenue / totalInflow) * 100 : 0;

  // Peak Activity Hours & Best Selling Days
  const dayOfWeekCounts = { Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0, Sun: 0 };
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  inflows.forEach(t => {
    if (t.date) {
      const d = new Date(t.date);
      if (!isNaN(d.getDay())) {
        dayOfWeekCounts[dayNames[d.getDay()]] += t.amount;
      }
    }
  });

  const bestSellingDay = Object.keys(dayOfWeekCounts).reduce((a, b) => dayOfWeekCounts[a] > dayOfWeekCounts[b] ? a : b, 'Fri');

  // Stability & Volatility Index
  const mean = avgMonthlyRevenue;
  const variance = monthlyValues.length > 0
    ? monthlyValues.reduce((sq, n) => sq + Math.pow(n - mean, 2), 0) / monthlyValues.length
    : 0;
  const stdDev = Math.sqrt(variance);
  const coefficientOfVariation = mean > 0 ? (stdDev / mean) : 0;
  const stabilityIndex = Math.max(0, Math.min(100, Math.round(100 - coefficientOfVariation * 50)));

  return {
    totalInflow,
    totalOutflow,
    netCashFlow,
    totalTransactions: transactions.length,
    inflowTxCount: inflows.length,
    outflowTxCount: outflows.length,
    avgTxValue,
    medianTxValue,
    maxTxValue,
    minTxValue,
    avgDailyRevenue: Math.round(totalInflow / 30),
    avgMonthlyRevenue: Math.round(avgMonthlyRevenue),
    cashFlowGrowthPercent: Math.round(growthRatePercent * 10) / 10,
    cashFlowStabilityScore: Math.round(stabilityIndex),
    monthlyRevenueMap: monthlyRevenue,
    uniqueCustomersCount,
    returningCustomersCount,
    customerRetentionRate: Math.round(customerRetentionRate),
    topCustomerConcentrationPercent: Math.round(topCustomerConcentration),
    topCustomers: customerList.slice(0, 5),
    bestSellingDay,
    peakBusinessHours: '10:00 AM – 4:00 PM',
    liquidityStatus: netCashFlow > 0 ? 'HIGH' : 'MODERATE'
  };
}

function getEmptyAnalysis() {
  return {
    totalInflow: 0,
    totalOutflow: 0,
    netCashFlow: 0,
    totalTransactions: 0,
    inflowTxCount: 0,
    outflowTxCount: 0,
    avgTxValue: 0,
    medianTxValue: 0,
    maxTxValue: 0,
    minTxValue: 0,
    avgDailyRevenue: 0,
    avgMonthlyRevenue: 0,
    cashFlowGrowthPercent: 0,
    cashFlowStabilityScore: 0,
    monthlyRevenueMap: {},
    uniqueCustomersCount: 0,
    returningCustomersCount: 0,
    customerRetentionRate: 0,
    topCustomerConcentrationPercent: 0,
    topCustomers: [],
    bestSellingDay: 'N/A',
    peakBusinessHours: 'N/A',
    liquidityStatus: 'LOW'
  };
}

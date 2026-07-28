/**
 * SMS Transaction Parser Engine for MTN MoMo & Airtel e-Kaash (Rwanda)
 * Extracts structured transaction fields from unstructured SMS text snippets.
 */

export function parseSmsText(smsText) {
  if (!smsText || typeof smsText !== 'string') return null;

  const text = smsText.trim();

  // 1. Money Sent Pattern
  // e.g., *165*S*1000 RWF transferred to JUVENS HAKIZIMANA (250780335364) at 2026-07-28 08:49:10. Fee: 20 RWF. Balance: 441 RWF.
  const sentMatch = text.match(/(?:transferred|sent)\s+([0-9,]+)\s*RWF\s+to\s+([A-Z\s]+)\s*\(([^)]+)\)\s+at\s+([0-9\s:-]+)\.\s*Fee:\s*([0-9,]+)\s*RWF\.\s*Balance:\s*([0-9,]+)\s*RWF/i);
  if (sentMatch) {
    return {
      txId: `SMS-${Date.now()}-${Math.floor(Math.random()*1000)}`,
      type: 'MONEY_SENT',
      amount: parseFloat(sentMatch[1].replace(/,/g, '')),
      recipientName: sentMatch[2].trim(),
      recipientPhone: sentMatch[3].trim(),
      senderName: 'Self',
      date: sentMatch[4].trim(),
      fee: parseFloat(sentMatch[5].replace(/,/g, '')),
      balance: parseFloat(sentMatch[6].replace(/,/g, '')),
      status: 'SUCCESS',
      category: 'P2P Transfer Out'
    };
  }

  // 2. Money Received Pattern
  // e.g., You have received 10000 RWF from Eric NZAYISENGA (********391) at 2026-07-26 10:58:26. Balance: 34921 RWF. FT Id: 29440570415.
  const receiveMatch = text.match(/received\s+([0-9,]+)\s*RWF\s+from\s+([A-Z\s]+)\s*\(([^)]+)\)\s+at\s+([0-9\s:-]+)\.\s*Balance:\s*([0-9,]+)\s*RWF\.\s*(?:FT\s*Id:\s*([0-9]+))?/i);
  if (receiveMatch) {
    return {
      txId: receiveMatch[6] ? `FT-${receiveMatch[6]}` : `SMS-${Date.now()}`,
      type: 'MONEY_RECEIVED',
      amount: parseFloat(receiveMatch[1].replace(/,/g, '')),
      senderName: receiveMatch[2].trim(),
      senderPhone: receiveMatch[3].trim(),
      recipientName: 'Self',
      date: receiveMatch[4].trim(),
      fee: 0,
      balance: parseFloat(receiveMatch[5].replace(/,/g, '')),
      status: 'SUCCESS',
      category: 'Customer Payment Inflow'
    };
  }

  // 3. Merchant Payment Pattern
  // e.g., TxId:29440520601*S* Your payment of 2,400 RWF to SONNYSAFIA Ltd 1879709 was completed at 2026-07-26 10:55:51. Balance: 24,921 RWF. Fee: 0 RWF.
  const merchantMatch = text.match(/(?:TxId:([0-9]+).*)?payment\s+of\s+([0-9,]+)\s*RWF\s+to\s+([A-Z0-9\s]+?)\s+was\s+completed\s+at\s+([0-9\s:-]+)\.\s*Balance:\s*([0-9,]+)\s*RWF\.\s*Fee:\s*([0-9,]+)\s*RWF/i);
  if (merchantMatch) {
    return {
      txId: merchantMatch[1] ? `TX-${merchantMatch[1]}` : `SMS-${Date.now()}`,
      type: 'MERCHANT_PAYMENT',
      amount: parseFloat(merchantMatch[2].replace(/,/g, '')),
      merchantName: merchantMatch[3].trim(),
      senderName: 'Self',
      date: merchantMatch[4].trim(),
      balance: parseFloat(merchantMatch[5].replace(/,/g, '')),
      fee: parseFloat(merchantMatch[6].replace(/,/g, '')),
      status: 'SUCCESS',
      category: 'Merchant Sales / Purchase'
    };
  }

  // Generic fallback parser for unknown SMS format
  const amountMatch = text.match(/([0-9,]+)\s*RWF/i);
  return {
    txId: `GEN-${Date.now()}`,
    type: text.toLowerCase().includes('received') ? 'MONEY_RECEIVED' : 'MONEY_SENT',
    amount: amountMatch ? parseFloat(amountMatch[1].replace(/,/g, '')) : 0,
    senderName: 'Parsed Sender',
    date: new Date().toISOString().replace('T', ' ').substring(0, 19),
    fee: 0,
    balance: 0,
    status: 'SUCCESS',
    category: 'General Transaction'
  };
}

// Updated JavaScript with proper UK CGT cost handling
document.getElementById('csvFile').addEventListener('change', handleFile);

function handleFile(event) {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = function(e) {
    const text = e.target.result;
    processCSV(text);
  };

  reader.readAsText(file);
}

function processCSV(csvContent) {
  // Parse CSV with comma separator
  const lines = csvContent.split('\n');
  const headers = lines[0].split(',');
  const transactions = lines.slice(1)
    .filter(line => line.trim() !== '')
    .map(line => {
      const values = line.split(',');
      return {
        date: values[0],
        operation: values[1],
        price: parseFloat(values[2]) || 0,
        shares: parseFloat(values[3]) || 0,
        amount: parseFloat(values[4]) || 0,
        cost: parseFloat(values[5]) || 0
      };
    });

  // Calculate holdings and gains with full precision
  let sharePool = 0;  // Total shares held
  let costPool = 0;   // Total cost of held shares (Section 104 pool)
  const results = [];

  transactions.forEach(trans => {
    const result = {
      date: trans.date,
      operation: trans.operation
    };

    if (trans.operation.toLowerCase() === 'buy') {
      // For buys, add shares and total cost (amount + transaction cost) to pool
      sharePool += trans.shares;
      costPool += trans.amount + trans.cost;
      
      result.actualShares = sharePool;
      result.poolCost = costPool;
      result.avgCost = sharePool > 0 ? costPool / sharePool : 0;
      result.proceeds = 0;
      result.allowableCost = 0;
      result.gain = 0;

    } else if (trans.operation.toLowerCase() === 'sell') {
      const avgCostPerShare = sharePool > 0 ? costPool / sharePool : 0;
      // For sells, allowable cost includes proportional pool cost plus transaction cost
      const poolCostForShares = trans.shares * avgCostPerShare;
      const allowableCost = poolCostForShares + trans.cost;
      
      result.actualShares = sharePool;
      result.poolCost = costPool;
      result.avgCost = avgCostPerShare;
      result.proceeds = trans.amount;
      result.allowableCost = allowableCost;
      result.gain = trans.amount - allowableCost;

      // Update pool after sale (only remove the pool cost portion, not transaction cost)
      sharePool -= trans.shares;
      costPool -= poolCostForShares;

      // Prevent floating-point precision issues
      if (Math.abs(sharePool) < 1e-10) sharePool = 0;
      if (Math.abs(costPool) < 1e-10) costPool = 0;
    }

    results.push(result);
  });

  // Format output CSV with 8 decimal places for all numbers
  const outputHeaders = [
    'Date',
    'Operation',
    'Number of Actual Shares',
    'Pool of Actual Cost',
    'Average Cost Per Share',
    'Disposal Proceeds (2)',
    'Allowable Expenditure Allowable Cost (1)',
    'Chargable Gain'
  ];

  const csvRows = [outputHeaders.join(',')];
  results.forEach(r => {
    const row = [
      r.date,
      r.operation,
      r.actualShares.toFixed(8),
      r.poolCost.toFixed(8),
      r.avgCost.toFixed(8),
      r.proceeds.toFixed(8),
      r.allowableCost.toFixed(8),
      r.gain.toFixed(8)
    ];
    csvRows.push(row.join(','));
  });

  const output = csvRows.join('\n');
  document.getElementById('output').textContent = output;
  window.csvOutput = output; // Store for download
}

function downloadResults() {
  if (!window.csvOutput) {
    alert('Please upload a CSV file first');
    return;
  }

  const blob = new Blob([window.csvOutput], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'capital_gains_calculation.csv';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
}
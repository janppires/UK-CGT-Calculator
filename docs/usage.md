# Usage Instructions for UK-CGT-Calculator

This guide explains how to use the UK Capital Gains Tax Calculator to process stock transactions and calculate gains/losses according to UK tax rules.

## Overview
The calculator takes a CSV file with stock transaction data as input and outputs a CSV with calculated capital gains/losses using the Section 104 pool method. It supports fractional shares (up to 8 decimal places) and includes transaction costs in the calculations.

## Requirements
- A modern web browser (e.g., Chrome, Firefox, Edge)
- A CSV file with your stock transactions

## Input CSV Format
The input CSV must have the following headers (comma-separated):

```
Date,Operation,Price (GBP),Shares,Amount (GBP),Cost (GBP)
```

- **Date**: Transaction date (e.g., `2023-01-01`)
- **Operation**: Either `Buy` or `Sell` (case-insensitive)
- **Price (GBP)**: Price per share in GBP
- **Shares**: Number of shares (can be fractional, up to 8 decimal places)
- **Amount (GBP)**: Total transaction amount (price × shares)
- **Cost (GBP)**: Transaction costs (e.g., broker fees, stamp duty)

### Example Input
```
Date,Operation,Price (GBP),Shares,Amount (GBP),Cost (GBP)
2023-01-01,Buy,10,100.12345678,1001.23456789,20.12345678
2023-06-01,Buy,12,50.98765432,611.85185185,15.55555555
2023-12-01,Sell,15,75.11111111,1126.66666667,10.98765432
```

Save this as `input.csv` (or similar).

## How to Use
1. **Open the Tool**:
   - Clone or download the repository from GitHub.
   - Open `src/index.html` in a web browser.

2. **Upload Your CSV**:
   - Click the "Choose File" button.
   - Select your prepared CSV file (e.g., `input.csv`).

3. **View Results**:
   - The calculated results will display on the page immediately after uploading.
   - The output shows the pool status and gains/losses for each transaction.

4. **Download Results**:
   - Click the "Download Results" button to save the output as a CSV file (`capital_gains_calculation.csv`).

## Output CSV Format
The output CSV contains the following headers:
```
Date,Operation,Number of Actual Shares,Pool of Actual Cost,Average Cost Per Share,Disposal Proceeds (2),Allowable Expenditure Allowable Cost (1),Chargable Gain
```

- **Number of Actual Shares**: Total shares in the pool before/after the transaction
- **Pool of Actual Cost**: Total cost of shares in the pool
- **Average Cost Per Share**: Pool cost divided by pool shares
- **Disposal Proceeds (2)**: Amount received from sales
- **Allowable Expenditure Allowable Cost (1)**: Cost deducted from proceeds (pool cost + transaction cost for sells)
- **Chargable Gain**: Proceeds minus allowable cost (for sells)

### Example Output
For the example input above:
```
Date,Operation,Number of Actual Shares,Pool of Actual Cost,Average Cost Per Share,Disposal Proceeds (2),Allowable Expenditure Allowable Cost (1),Chargable Gain
2023-01-01,Buy,100.12345678,1021.35802467,10.19830735,0.00000000,0.00000000,0.00000000
2023-06-01,Buy,151.11111110,1648.76543207,10.90594143,0.00000000,0.00000000,0.00000000
2023-12-01,Sell,151.11111110,1648.76543207,10.90594143,1126.66666667,830.51245685,296.15420982
```


## Notes
- All numeric fields in the output are shown with 8 decimal places for precision.
- Transaction costs are added to the pool for buys and treated as allowable expenditure for sells, per UK CGT rules.
- See [uk-cgt-rules.md](uk-cgt-rules.md) for details on the implemented tax calculations.

## Troubleshooting
- **File not loading**: Ensure your CSV uses commas as separators and matches the required headers.
- **No output**: Check that your CSV has valid numeric values and no empty lines at the end.

For more examples, see the [examples/](examples/) directory.
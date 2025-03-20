# UK Capital Gains Tax Rules Implemented in UK-CGT-Calculator

This document outlines the UK Capital Gains Tax (CGT) rules implemented in the **UK-CGT-Calculator**, based on HMRC guidelines as of March 20, 2025. The calculator uses the **Section 104 pool method** for share pooling, which is the standard approach for most individual investors in the UK.

## Overview of UK CGT for Shares
In the UK, CGT is payable on the profit (gain) made when you sell or dispose of shares, after accounting for allowable costs. For shares of the same class in the same company, the "share pooling" rules apply to calculate gains, unless specific matching rules (e.g., same-day or bed-and-breakfasting) take precedence. This calculator implements the Section 104 pool method, which is used when no special matching rules apply.

## Section 104 Pool Method
The Section 104 pool is a method to track the cost of shares held over time, averaging the acquisition costs across all shares in the pool. Here's how it works in the calculator:

### 1. Buy Transactions
- **Shares Added**: The number of shares purchased is added to the pool.
- **Cost Added**: The total cost of acquisition is added to the pool, including:
  - The purchase price (price per share × number of shares, i.e., `Amount (GBP)`).
  - Incidental costs of acquisition (e.g., broker fees, stamp duty), recorded as `Cost (GBP)` in the input CSV.
- **Pool Update**: The pool tracks:
  - `Number of Actual Shares`: Total shares in the pool.
  - `Pool of Actual Cost`: Total cost of all shares in the pool.
  - `Average Cost Per Share`: Pool cost divided by pool shares.

### 2. Sell Transactions
- **Shares Removed**: The number of shares sold is subtracted from the pool.
- **Allowable Costs Calculated**:
  - **Pool Cost Portion**: The proportional cost from the pool is calculated as `shares sold × average cost per share`. This represents the base cost of the shares being disposed of.
  - **Incidental Costs of Disposal**: The transaction costs for the sale (e.g., broker fees), recorded as `Cost (GBP)` in the input CSV, are added to the allowable costs.
  - Total `Allowable Expenditure Allowable Cost (1)` = Pool cost portion + Disposal costs.
- **Gain Calculation**:
  - `Disposal Proceeds (2)`: The amount received from the sale (`Amount (GBP)`).
  - `Chargable Gain`: Proceeds minus allowable costs (`Disposal Proceeds (2)` - `Allowable Expenditure Allowable Cost (1)`).
- **Pool Update**: After the sale:
  - Subtract the pool cost portion (not the disposal costs) from `Pool of Actual Cost`.
  - Subtract the sold shares from `Number of Actual Shares`.

### Example Calculation
#### Input

```
Date,Operation,Price (GBP),Shares,Amount (GBP),Cost (GBP)
2023-01-01,Buy,10,100.12345678,1001.23456789,20.12345678
2023-06-01,Buy,12,50.98765432,611.85185185,15.55555555
2023-12-01,Sell,15,75.11111111,1126.66666667,10.98765432
```


#### Step-by-Step
1. **First Buy (2023-01-01)**:
   - Shares: 100.12345678
   - Pool Cost: 1001.23456789 + 20.12345678 = 1021.35802467
   - Avg Cost: 1021.35802467 / 100.12345678 = 10.19830735

2. **Second Buy (2023-06-01)**:
   - Shares: 100.12345678 + 50.98765432 = 151.11111110
   - Pool Cost: 1021.35802467 + 611.85185185 + 15.55555555 = 1648.76543207
   - Avg Cost: 1648.76543207 / 151.11111110 = 10.90594143

3. **Sell (2023-12-01)**:
   - Shares Sold: 75.11111111
   - Pool Cost Portion: 75.11111111 × 10.90594143 = 819.52480253
   - Allowable Cost: 819.52480253 + 10.98765432 = 830.51245685
   - Proceeds: 1126.66666667
   - Gain: 1126.66666667 - 830.51245685 = 296.15420982
   - Updated Pool:
     - Shares: 151.11111110 - 75.11111111 = 76.00000000
     - Cost: 1648.76543207 - 819.52480253 = 829.24062954

#### Output
```
Date,Operation,Number of Actual Shares,Pool of Actual Cost,Average Cost Per Share,Disposal Proceeds (2),Allowable Expenditure Allowable Cost (1),Chargable Gain
2023-01-01,Buy,100.12345678,1021.35802467,10.19830735,0.00000000,0.00000000,0.00000000
2023-06-01,Buy,151.11111110,1648.76543207,10.90594143,0.00000000,0.00000000,0.00000000
2023-12-01,Sell,151.11111110,1648.76543207,10.90594143,1126.66666667,830.51245685,296.15420982
```


## Implemented Rules
- **Section 104 Pool**: Maintains a single pool of shares and costs, updated with each transaction.
- **Allowable Costs**:
  - For buys: Purchase price + acquisition costs (e.g., fees) are pooled.
  - For sells: Proportional pool cost + disposal costs (e.g., fees) are deducted from proceeds.
- **Precision**: All calculations use full floating-point precision internally, with output rounded to 8 decimal places.
- **No Matching Rules**: This version does not implement same-day or bed-and-breakfasting rules (see Limitations).

## Limitations
- **Basic Pooling Only**: Does not handle special matching rules:
  - **Same-day rule**: Shares bought and sold on the same day.
  - **Bed-and-breakfast rule**: Shares sold and repurchased within 30 days.
- **Single Stock**: Assumes all transactions are for the same class of shares in one company.
- **No Tax Rates**: Calculates gains but does not apply tax rates or allowances (e.g., Annual Exempt Amount).

## References
- [HMRC Capital Gains Manual](https://www.gov.uk/hmrc-internal-manuals/capital-gains-manual)
- [Shares and Capital Gains Tax (HS284)](https://www.gov.uk/government/publications/shares-and-capital-gains-tax-hs284-self-assessment-helpsheet)

For usage instructions, see [usage.md](usage.md).
# UK-CGT-Calculator

A JavaScript-based tool to calculate UK Capital Gains Tax for stock transactions using the Section 104 pool method.

## Features
- Processes CSV files with stock transactions
- Calculates capital gains/losses per UK CGT rules
- Supports fractional shares (up to 8 decimal places)
- Includes transaction costs in calculations

## Usage
1. Upload a CSV file with headers: `Date,Operation,Price (GBP),Shares,Amount (GBP),Cost (GBP)`
2. View results on-screen or download as a CSV

See [docs/usage.md](docs/usage.md) for detailed instructions.

## Example
Input: [examples/sample-input.csv](examples/sample-input.csv)  
Output: [examples/sample-output.csv](examples/sample-output.csv)

## License
MIT License
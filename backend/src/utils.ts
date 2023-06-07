interface IHouseRisk {
  currentValue: number;
  loanAmount: number;
}

export const calculateRisk = (house: IHouseRisk): number => {
  const { currentValue, loanAmount } = house;
  let risk = loanAmount / currentValue; // Calculate initial risk
  if (loanAmount > 0.5 * currentValue) {
    risk += 0.1; // Increase risk by 10% if loanAmount is more than 50% of currentValue
  }
  // Ensure risk value is between 0 and 1
  risk = Math.max(0, Math.min(1, risk));
  return risk;
};

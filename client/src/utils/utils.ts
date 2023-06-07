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

export const validateNumericInput = (e: {
  key: string;
  keyCode: number;
  preventDefault: () => void;
}) => {
  const isValidInput =
    /^[0-9.]$/.test(e.key) || // Numeric characters and decimal point
    e.keyCode === 8 || // Backspace
    e.keyCode === 37 || // Left arrow
    e.keyCode === 39; // Right arrow
  if (!isValidInput) {
    e.preventDefault();
  }
};

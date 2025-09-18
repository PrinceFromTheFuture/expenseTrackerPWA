export function formatAmountInAgorot(agorot: number, showSymbol?: boolean): string {
  // Convert agorot to dollars
  const shekels = (agorot / 100).toFixed(2); // Ensure two decimal places

  // Format with commas and a decimal point
  if (!showSymbol) {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(parseFloat(shekels));
  } else {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "ILS",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(parseFloat(shekels));
  }
}

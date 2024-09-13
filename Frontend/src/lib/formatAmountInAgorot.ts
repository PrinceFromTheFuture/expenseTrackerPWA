export function formatAmountInAgorot(agorot: number): string {
  // Convert agorot to dollars
  const shekels = (agorot / 100).toFixed(2); // Ensure two decimal places

  // Format with commas and a decimal point
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "ILS",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(parseFloat(shekels));
}

// Example usage
const amountInCents = 9937454;
console.log(formatAmountInAgorot(amountInCents)); // Output: $99,374.54

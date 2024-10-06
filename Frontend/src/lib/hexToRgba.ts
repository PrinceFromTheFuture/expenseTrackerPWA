function hexToRgba(hex: string, opacity: number) {
  // Remove the hash (#) if present
  hex = hex.replace(/^#/, "");

  // Parse r, g, b values from hex code
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);

  // Return the rgba string
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}
export default hexToRgba;

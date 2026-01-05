/**
 * Formats price in Indian currency format
 * @param price - Price in rupees (number)
 * @param transactionType - Type of transaction (Sale, Rent, Lease)
 * @returns Formatted price string
 */
export function formatPrice(price: number, transactionType: string): string {
  if (!price || price === 0) {
    return "Price on request"
  }

  // For Rent and Lease, show monthly price
  if (transactionType === "Rent" || transactionType === "Lease") {
    if (price >= 100000) {
      // For large amounts, show in Lakhs
      const lakhs = price / 100000
      return `₹${lakhs.toFixed(lakhs % 1 === 0 ? 0 : 1)}L/month`
    }
    return `₹${price.toLocaleString("en-IN")}/month`
  }

  // For Sale, show in Crores or Lakhs
  if (price >= 10000000) {
    // Show in Crores
    const crores = price / 10000000
    return `₹${crores.toFixed(crores % 1 === 0 ? 0 : 1)}Cr`
  } else if (price >= 100000) {
    // Show in Lakhs
    const lakhs = price / 100000
    return `₹${lakhs.toFixed(lakhs % 1 === 0 ? 0 : 1)}L`
  }

  // For smaller amounts, show full price with commas
  return `₹${price.toLocaleString("en-IN")}`
}


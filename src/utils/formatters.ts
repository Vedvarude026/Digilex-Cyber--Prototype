/**
 * Formats numbers in Indian Rupee notation (Cr / L / K)
 */
export function formatINR(value: number, formatType: 'compact' | 'full' = 'compact'): string {
  if (value === 0) return '₹0';
  
  if (formatType === 'full') {
    // Standard Indian Numbering System formatting (1,00,000)
    const valStr = Math.round(value).toString();
    const lastThree = valStr.substring(valStr.length - 3);
    const otherNumbers = valStr.substring(0, valStr.length - 3);
    const formatted = otherNumbers !== '' 
      ? otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + lastThree 
      : lastThree;
    return `₹${formatted}`;
  }

  // Compact notation (Cr for Crore = 10,00,000 / 10M, L for Lakh = 1,00,000 / 100k)
  if (value >= 10000000) {
    const crValue = value / 10000000;
    return `₹${crValue.toFixed(2)} Cr`;
  } else if (value >= 100000) {
    const lakhValue = value / 100000;
    return `₹${lakhValue.toFixed(2)} L`;
  } else if (value >= 1000) {
    const kValue = value / 1000;
    return `₹${kValue.toFixed(1)} K`;
  }
  
  return `₹${value.toLocaleString('en-IN')}`;
}

export function getRiskColorClass(level: string): {
  bg: string;
  text: string;
  border: string;
  badge: string;
} {
  switch (level.toUpperCase()) {
    case 'CRITICAL':
    case 'FIX IMMEDIATELY':
    case 'FIX FIRST':
      return {
        bg: 'bg-rose-500/20',
        text: 'text-rose-400',
        border: 'border-rose-500/30',
        badge: 'bg-rose-500/20 text-rose-400 border-rose-500/30 border'
      };
    case 'HIGH':
    case 'HIGH PRIORITY':
      return {
        bg: 'bg-amber-500/20',
        text: 'text-amber-400',
        border: 'border-amber-500/30',
        badge: 'bg-amber-500/20 text-amber-400 border-amber-500/30 border'
      };
    case 'MEDIUM':
    case 'RECOMMENDED':
      return {
        bg: 'bg-[#C5A059]/15',
        text: 'text-[#C5A059]',
        border: 'border-[#C5A059]/30',
        badge: 'bg-[#C5A059]/15 text-[#C5A059] border-[#C5A059]/30 border'
      };
    case 'LOW':
    case 'LOWER PRIORITY':
    case 'MONITOR':
    default:
      return {
        bg: 'bg-[#C5A059]/15',
        text: 'text-[#C5A059]',
        border: 'border-[#C5A059]/30',
        badge: 'bg-[#C5A059]/15 text-[#C5A059] border-[#C5A059]/30 border'
      };
  }
}

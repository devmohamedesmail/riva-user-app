export const calculateDiscount = (
  price: number,
  sale_price?: number | null,
  on_sale?: boolean
): number => {
  if (on_sale && sale_price && price > 0) {
    const discount = ((price - sale_price) / price) * 100;
    return Math.round(discount);
  }

  return 0;
};
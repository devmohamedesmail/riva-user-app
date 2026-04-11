import { Product } from "@/@types/stores";
export const getPriceRange = (item: Product) => {
    if (!item.attributes) return null;

    let prices: number[] = [];

    item.attributes.forEach(attr => {
        attr.values.forEach(v => {
            if (v.price) prices.push(v.price);
        });
    });

    if (!prices.length) return null;

    const min = Math.min(...prices);
    const max = Math.max(...prices);

    return { min, max };
};
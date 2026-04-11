import { Product } from "@/@types/stores";

type PriceResult = {
    displayPrice: number;
    originalPrice: number | null;
    minPrice: number;
    maxPrice: number;
    hasAttributes: boolean;
    startsFrom: boolean;
};

export const getProductPrice = (item: Product): PriceResult => {
    const hasAttributes =
        !!item.attributes?.length &&
        item.attributes.some(attr => (attr.values?.length ?? 0) > 0);

    // extract all attribute prices
    const prices: number[] =
        item.attributes?.flatMap(attr =>
            attr.values.map(v => v.price)
        ) ?? [];

    const hasPrices = prices.length > 0;

    const minPrice = hasPrices ? Math.min(...prices) : item.price;
    const maxPrice = hasPrices ? Math.max(...prices) : item.price;

    let displayPrice = item.price;
    let originalPrice: number | null = null;

    // attributes price range overrides base price
    if (hasAttributes && hasPrices) {
        displayPrice = minPrice;
    }

    // sale overrides everything
    if (item.on_sale && item.sale_price) {
        originalPrice = item.price;
        displayPrice = item.sale_price;
    }

    return {
        displayPrice,
        originalPrice,
        minPrice,
        maxPrice,
        hasAttributes,
        startsFrom: hasAttributes,
    };
};
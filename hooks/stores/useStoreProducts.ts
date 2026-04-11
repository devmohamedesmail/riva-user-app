import { config } from '@/constants/config'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useState, useMemo } from 'react'

interface Product {
    id: number;
    name: string;
    image: string;
    description: string;
    price: number;
    on_sale: boolean;
    sale_price: number | null;
    stock: number;
    business_id: number;
    category_id: number;
}
export const useStoreProducts = (storeId: string) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const { data , isLoading } = useQuery({
        queryKey: ["store-products"],
        queryFn: async () => {
            const response = await axios.get(`${config.URL}/stores/${storeId}/products`)
            return response.data.data
        }
    })

    const filteredProducts = useMemo(() => {
        if (!data) return [];
        let filtered = data;

        if (searchQuery.trim()) {
            filtered = filtered.filter(
                (product: Product) =>
                    product?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    product?.description
                        ?.toLowerCase()
                        .includes(searchQuery.toLowerCase())
            );
        }

        if (selectedCategory !== null) {
            filtered = filtered.filter(
                (product: Product) => product.category_id === selectedCategory
            );
        }

        return filtered;
    }, [data, searchQuery, selectedCategory]);
    return {
        filteredProducts,
        searchQuery,
        selectedCategory,
        setSearchQuery,
        setSelectedCategory,
        isLoading
    }
}

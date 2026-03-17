import { config } from '@/constants/config'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { usePlace } from './usePlace'
import { useState,useMemo } from 'react'

export const useStores = (storeTypeId: number) => {
    const { selectedPlace } = usePlace()
    const [searchQuery, setSearchQuery] = useState("");
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["stores", storeTypeId, selectedPlace?.id],
        queryFn: () => axios.get(`${config.URL}/store-types/get-stores?place_id=${selectedPlace?.id}&store_type_id=${storeTypeId}`).then((res) => res.data.data),
    })


    const filteredStores = useMemo(() => {
            if (!data) return [];
            if (!searchQuery.trim()) return data;
    
            const query = searchQuery.toLowerCase();
    
            return data.filter((store: any) => {
                const name = store?.name?.toLowerCase() || "";
                const address = store?.address?.toLowerCase() || "";
    
                return name.includes(query) || address.includes(query);
            });
        }, [data, searchQuery]);
    return {
        data,
        isLoading,
        error,
        refetch,
        searchQuery,
        setSearchQuery,
        filteredStores
    }
}

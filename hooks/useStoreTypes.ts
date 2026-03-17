import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { usePlace } from './usePlace';
import { config } from '@/constants/config';
export const useStoreTypes = () => {
    const { selectedPlace } = usePlace()
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["store-types", selectedPlace?.id],
        queryFn: () => axios.get(`${config.URL}/places/storetype/${selectedPlace?.id}`).then((res) => res.data),
    })

    return { data, isLoading, error, refetch }
}
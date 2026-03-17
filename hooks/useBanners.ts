import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { usePlace } from './usePlace';
import { config } from '@/constants/config';

export const useBanners = () => {
    
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["banners"],
        queryFn: () => axios.get(`${config.URL}/banners`).then((res) => res.data.data),
    })

    return { data, isLoading, error, refetch }
}

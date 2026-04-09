import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { config } from '@/constants/config';

export interface Banner {
  id: number;
  image: string;
  title: string;
  slug: string;
  content: string;
  is_published: boolean;
}

export const useBanners = () => {
    
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["banners"],
        queryFn: () => axios.get(`${config.URL}/banners`).then((res) => res.data.data),
    })

    return { data, isLoading, error, refetch }
}

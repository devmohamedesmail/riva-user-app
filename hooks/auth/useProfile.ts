import { config } from '@/constants/config';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

export default function useProfile() {
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["profile"],
        queryFn: async () => {
            const token = await SecureStore.getItemAsync('token');
            if (!token) return null;
            const response = await axios.get(`${config.URL}/auth/get-profile`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            return response.data;
        }
    });
    return { data, isLoading, error, refetch };
}



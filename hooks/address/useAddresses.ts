import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { config } from '@/constants/config';
import { useAuth } from '../auth/useAuth';

export const useAddresses = () => {
    const { auth } = useAuth();
    const queryClient = useQueryClient();

    const getHeaders = () => {
        if (!auth?.token) return {};
        return {
            Authorization: `Bearer ${auth.token}`,
        };
    };

    // Queries
    const useAddressesQuery = () => {
        return useQuery({
            queryKey: ['addresses'],
            queryFn: async () => {
                const response = await axios.get(`${config.URL}/address`, {
                    headers: getHeaders(),
                });
                return response.data.data;
            },
            enabled: !!auth?.token, // Only fetch if token is available
        });
    };

    const useAddressQuery = (id: number | null) => {
        return useQuery({
            queryKey: ['address', id],
            queryFn: async () => {
                if (!id) return null;
                const response = await axios.get(`${config.URL}/address/${id}`, {
                    headers: getHeaders(),
                });
                return response.data.data;
            },
            enabled: !!auth?.token && !!id,
        });
    };

    // Mutations
    const useCreateAddress = () => {
        return useMutation({
            mutationFn: async (data: {
                address: string;
                area_id?: number | null;
                latitude?: number | null;
                longitude?: number | null;
                phone?: string | null;
            }) => {
                const response = await axios.post(`${config.URL}/address/create`, data, {
                    headers: getHeaders(),
                });
                return response.data;
            },
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['addresses'] });
            },
        });
    };

    const useUpdateAddress = () => {
        return useMutation({
            mutationFn: async ({ id, data }: { 
                id: number; 
                data: {
                    address: string;
                    area_id?: number | null;
                    latitude?: number | null;
                    longitude?: number | null;
                    phone?: string | null;
                }
            }) => {
                const response = await axios.put(`${config.URL}/address/${id}`, data, {
                    headers: getHeaders(),
                });
                return response.data;
            },
            onSuccess: (_, variables) => {
                queryClient.invalidateQueries({ queryKey: ['addresses'] });
                queryClient.invalidateQueries({ queryKey: ['address', variables.id] });
            },
        });
    };

    const useDeleteAddress = () => {
        return useMutation({
            mutationFn: async (id: number) => {
                const response = await axios.delete(`${config.URL}/address/${id}`, {
                    headers: getHeaders(),
                });
                return response.data;
            },
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['addresses'] });
            },
        });
    };

    return {
        useAddressesQuery,
        useAddressQuery,
        useCreateAddress,
        useUpdateAddress,
        useDeleteAddress,
    };
};

import { useQuery } from '@tanstack/react-query'
import React from 'react'
import axios from 'axios'
import { config } from '@/constants/config';
import { usePlace } from '@/hooks/place/usePlace';


export default function useOffers() {
    const {selectedPlace}=usePlace();
    const {data,isLoading,isError,error,refetch}=useQuery({
        queryKey:['offers',selectedPlace?.id],
        queryFn:async()=>{
            const response = await axios.get(`${config.URL}/products/sale/products?place_id=${selectedPlace?.id}`);
            return response.data.data;
        },
        enabled:!!selectedPlace?.id
        
    })
  return {data,isLoading,isError,error,refetch}
}

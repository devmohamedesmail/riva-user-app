import { config } from '@/constants/config'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'

export const useStoreReviews = (id:string) => {
    const {data , isLoading, error,refetch}=useQuery({
        queryKey:['store-reviews',id],
        queryFn:()=>axios.get(`${config.URL}/reviews/store/${id}`).then((res)=>res.data.data),
    })
  return {data , isLoading,error,refetch}
}

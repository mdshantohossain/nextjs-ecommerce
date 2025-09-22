import { API_URL } from '@/config/api'
import { useQuery } from '@tanstack/react-query'

export default function useExclusiveProducts() {
  return useQuery({
    queryKey: ['exclusive-products'],
    queryFn: async () => {
      const response = await fetch(API_URL + '/get-exclusive-products')
      return response.json();
    },
  })
}

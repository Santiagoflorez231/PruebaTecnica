import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../client';
import type { ProductDetail } from '../types/productDetail';

export const useProductDetail = (productId: string) => {
  return useQuery({
    queryKey: ['product-detail', productId],
    queryFn: async (): Promise<ProductDetail> => {
      const response = await apiClient.get<ProductDetail[]>(`/${productId}`);
      return response[0]; 
    },
    enabled: !!productId,
    retry: 2, 
    retryDelay: 1000,
  });
};

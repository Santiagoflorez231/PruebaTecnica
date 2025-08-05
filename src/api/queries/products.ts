import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import type { ProductDisplay, ProductsQueryParams } from '../types';

const transformProduct = (product: any): ProductDisplay => {
  const firstItem = product.items?.[0];
  
  let image = '';
  let images: string[] = [];
  
  if (firstItem?.images && firstItem.images.length > 0) {
    image = firstItem.images[0].imageUrl;
    images = firstItem.images.map((img: any) => img.imageUrl);
  }
  
  let price = 0;
  let listPrice = 0;
  let available = false;
  
  if (firstItem?.sellers && firstItem.sellers.length > 0) {
    const offer = firstItem.sellers[0].commertialOffer;
    price = offer.Price || 0;
    listPrice = offer.ListPrice || 0;
    available = offer.IsAvailable || false;
  }

  return {
    id: product.productId,
    name: product.productName,
    brand: product.brand,
    description: product.description || product.metaTagDescription,
    image: image,
    images: images,
    price: price,
    listPrice: listPrice > price ? listPrice : undefined,
    available: available,
    color_variants: [],
    category: product.categories?.[0]?.replace(/\//g, '') || '',
    material: '',
    created_at: product.releaseDate,
  };
};

const fetchProducts = async (params?: ProductsQueryParams): Promise<any[]> => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  
  try {
    const queryParams = new URLSearchParams();
    
    if (params?.search) {
      queryParams.append('search', params.search);
    }
    
    if (params?.limit) {
      queryParams.append('limit', params.limit.toString());
    }
    
    if (params?.sort) {
      queryParams.append('sort', params.sort);
      if (params.order) {
        queryParams.append('order', params.order);
      }
    }
    
    const url = queryParams.toString() ? `${baseUrl}?${queryParams.toString()}` : baseUrl;
    const response = await axios.get(url);
    
    return Array.isArray(response.data) ? response.data : [];
    
  } catch (error) {
    console.error('Error fetching products from API:', error);
    throw new Error('No se pudieron cargar los productos, inténtalo de nuevo más tarde.');
  }
};

export const useProducts = (params?: ProductsQueryParams) => {
  return useQuery({
    queryKey: ['products', params],
    queryFn: async (): Promise<ProductDisplay[]> => {
      const data = await fetchProducts(params);
      return data.map(transformProduct);
    },
    staleTime: 5 * 60 * 1000,
  });
};

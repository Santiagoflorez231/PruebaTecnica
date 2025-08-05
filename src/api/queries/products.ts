import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import type { Product, ProductDisplay, ProductsQueryParams } from '../types';

// Transformar producto de la API real de Vélez a formato de la vitrina
const transformProduct = (product: any): ProductDisplay => {
  // Basado en el análisis de los datos reales de la API de Vélez:
  // - Los arrays 'items' están vacíos en los datos proporcionados
  // - Los precios están directamente en el producto (price, listPrice)
  // - Las imágenes se construyen a partir del linkText y siguen un patrón específico
  // - Los datos están en el nivel superior del producto
  
  // Construir URL de imagen basada en el patrón real de Vélez
  let image = '';
  let images: string[] = [];
  
  if (product.linkText) {
    const baseUrl = 'https://api-frontend-production.up.railway.app/api/products';
    
    // Extraer el código del producto del linkText
    const productCode = product.linkText.split('-').slice(1).join('-'); // "1039322-00"
    
    // Determinar el tipo de producto para la URL
    let productType = 'Producto';
    if (product.productName.toLowerCase().includes('polo')) productType = 'Polo';
    else if (product.productName.toLowerCase().includes('morral')) productType = 'Morral';
    else if (product.productName.toLowerCase().includes('cinturon')) productType = 'Cinturon';
    else if (product.productName.toLowerCase().includes('manos libres')) productType = 'Manos-libres';
    
    // Construir URL de imagen siguiendo el patrón real
    image = `${baseUrl}/293401/${productCode}-01-${productType}.jpg`;
    images = [image];
  }
  
  // Los precios están directamente en el producto (confirmado por datos reales)
  const price = product.price || 0;
  const listPrice = product.listPrice || 0;
  const available = product.available !== undefined ? product.available : true;
  
  // Las variantes de color no están disponibles en los datos actuales (items está vacío)
  const colorVariants: any[] = [];

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
    color_variants: colorVariants,
    category: product.categories?.[0]?.replace(/\//g, '') || product.brand,
    material: product['MATERIAL EXTERNO']?.[0] || product['COMPOSICIÓN']?.[0],
    created_at: product.releaseDate,
  };
};

// Función para hacer petición real a la API de la prueba técnica
const fetchProducts = async (params?: ProductsQueryParams): Promise<any[]> => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL || 'https://api-frontend-production.up.railway.app/api/products';
  
  try {
    // Construir parámetros de consulta según la API de la prueba técnica
    const queryParams = new URLSearchParams();
    
    if (params?.search) {
      queryParams.append('search', params.search);
    }
    
    if (params?.limit) {
      queryParams.append('limit', params.limit.toString());
    }
    
    // Ordenamiento según la API
    if (params?.sort) {
      queryParams.append('sort', params.sort);
      if (params.order) {
        queryParams.append('order', params.order);
      }
    }
    
    const url = queryParams.toString() ? `${baseUrl}?${queryParams.toString()}` : baseUrl;
    
    console.log('Fetching from API:', url);
    
    const response = await axios.get(url);
    
    // La API puede devolver diferentes estructuras
    const products = Array.isArray(response.data) ? response.data : 
                    response.data.products || response.data.data || [];
    
    console.log('API Response:', products.length, 'products');
    
    return products;
    
  } catch (error) {
    console.error('Error fetching products from API:', error);
    throw new Error('No se pudieron cargar los productos de la API. Verifique la conexión.');
  }
};

// Query para obtener todos los productos desde la API real
export const useProducts = (params?: ProductsQueryParams) => {
  return useQuery({
    queryKey: ['products', params],
    queryFn: async (): Promise<ProductDisplay[]> => {
      const data = await fetchProducts(params);
      
      // Transformar los productos de la API real al formato esperado por el componente
      return data.map(transformProduct);
    },
    staleTime: 5 * 60 * 1000, // 5 minutos
    gcTime: 10 * 60 * 1000, // 10 minutos
    retry: 3, // Reintentar 3 veces si falla
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

// Query para obtener un producto específico desde la API real
export const useProduct = (id: string) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: async (): Promise<ProductDisplay | undefined> => {
      // Buscar producto específico por ID
      const data = await fetchProducts({ search: id });
      const product = data.find(p => p.productId === id);
      return product ? transformProduct(product) : undefined;
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 3,
  });
};

// Query para buscar productos en la API real
export const useSearchProducts = (searchTerm: string) => {
  return useQuery({
    queryKey: ['products', 'search', searchTerm],
    queryFn: async (): Promise<ProductDisplay[]> => {
      const data = await fetchProducts({ search: searchTerm });
      return data.map(transformProduct);
    },
    enabled: !!searchTerm && searchTerm.length > 2,
    staleTime: 2 * 60 * 1000, // 2 minutos para búsquedas
    gcTime: 5 * 60 * 1000,
    retry: 2, // Menos reintentos para búsquedas
  });
};

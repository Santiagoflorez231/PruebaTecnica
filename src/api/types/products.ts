export interface Product {
  productId: string;
  productName: string;
  brand: string;
  brandId: number;
  brandImageUrl?: string | null;
  linkText: string;
  productReference: string;
  productReferenceCode: string;
  categoryId: string;
  productTitle: string;
  metaTagDescription: string;
  releaseDate: string;
  categories: string[];
  link: string;
  description: string;
  price: number;
  listPrice: number;
  available: boolean;
  image: string;
}

export interface ProductDisplay {
  id: string;
  name: string;
  brand: string;
  description: string;
  image: string;
  images: string[];
  price: number;
  listPrice?: number;
  available: boolean;
  color_variants?: ColorVariant[];
  category?: string;
  material?: string;
  created_at?: string;
}

export interface ColorVariant {
  id: number;
  color: string;
  hex_code?: string;
  images?: string[];
}

export type ProductsResponse = Product[];

export interface ProductsQueryParams {
  search?: string; 
  category?: string;
  brand?: string;
  page?: number;
  limit?: number;
  sort?: 'name' | 'price' | 'brand';
  order?: 'asc' | 'desc';
}

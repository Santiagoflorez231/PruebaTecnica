export interface ProductImage {
  imageId: string;
  imageLabel: string;
  imageTag: string;
  imageUrl: string;
  imageText: string;
  imageLastModified: string;
}

export interface ProductVariation {
  field: {
    id: number;
    name: string;
    isActive: boolean;
    position: number;
    type: string;
  };
  values: Array<{
    id: string;
    name: string;
    position: number;
  }>;
}

export interface CommercialOffer {
  Price: number;
  ListPrice: number;
  PriceWithoutDiscount: number;
  FullSellingPrice: number;
  AvailableQuantity: number;
  IsAvailable: boolean;
  GetInfoErrorMessage?: string;
  PaymentOptions?: {
    installmentOptions: any[];
    paymentSystems: any[];
  };
}

export interface ProductSeller {
  sellerId: string;
  sellerName: string;
  addToCartLink: string;
  sellerDefault: boolean;
  commertialOffer: CommercialOffer;
}

export interface ProductItem {
  itemId: string;
  name: string;
  nameComplete: string;
  ean: string;
  images: ProductImage[];
  Color?: string[];
  Talla?: string[];
  variations: string[];
  sellers: ProductSeller[];
}

export interface ProductDetail {
  productId: string;
  productName: string;
  brand: string;
  brandId: number;
  description: string;
  metaTagDescription: string;
  categories: string[];
  items: ProductItem[];
  skuSpecifications: ProductVariation[];
  allSpecifications: string[];
  [key: string]: any; 
}

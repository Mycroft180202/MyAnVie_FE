export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    images: string[];
    thumbnailUrl?: string;
    category: string;
    categoryName?: string;
    stockQuantity: number;
    isActive?: boolean;
    createdAt?: string;
    updatedAt?: string;
    color?: string;
    size?: string;
  }
  
  export interface CreateProductData {
    name: string;
    description: string;
    price: number;
    images: string[];
    category: string;
    stockQuantity: number;
    color?: string;
    size?: string;
  }
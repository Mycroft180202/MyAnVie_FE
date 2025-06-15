export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  thumbnailUrl: string;
  categoryId: string;
  categoryName: string;
  subCategoryId?: string;
  subCategoryName?: string;
  color?: string;
  size?: string;
  stock: number;
  sku: string;
  createdAt: string;
  updatedAt: string;
} 
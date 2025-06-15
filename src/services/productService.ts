import axios from 'axios';
import { API_URL } from '../config/api';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  thumbnailUrl: string;
  categoryId: string;
  categoryName: string;
  subCategoryId: string;
  subCategoryName: string;
  color?: string;
  size?: string;
  stock: number;
  sku: string;
  createdAt: string;
  updatedAt: string;
}

export const productService = {
  getProducts: async (): Promise<Product[]> => {
    try {
      const response = await axios.get(`${API_URL}/products`);
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  getProductById: async (id: string): Promise<Product> => {
    try {
      const response = await axios.get(`${API_URL}/products/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  },

  // getProductsByCategory và getProductsBySubCategory sẽ bị xóa hoặc thay đổi nếu cần
  // getProductsByCategory: async (categoryId: string): Promise<Product[]> => {
  //   try {
  //     const response = await axios.get(`${API_URL}/products/category/${categoryId}`);
  //     return response.data;
  //   } catch (error) {
  //     console.error('Error fetching products by category:', error);
  //     throw error;
  //   }
  // },

  // getProductsBySubCategory: async (subCategoryId: string): Promise<Product[]> => {
  //   try {
  //     const response = await axios.get(`${API_URL}/products/subcategory/${subCategoryId}`);
  //     return response.data;
  //   } catch (error) {
  //     console.error('Error fetching products by subcategory:', error);
  //     throw error;
  //   }
  // },
}; 
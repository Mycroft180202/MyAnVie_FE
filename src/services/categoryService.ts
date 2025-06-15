import axios from 'axios';
import { API_URL } from '../config/api';

export interface Category {
  id: string;
  name: string;
  description: string;
}

export interface SubCategory {
  id: string;
  name: string;
  description: string;
  categoryId: string;
  categoryName: string;
}

export const categoryService = {
  async getCategories(): Promise<Category[]> {
    try {
      const response = await axios.get<Category[]>(`${API_URL}/categories`);
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  },

  async getSubCategories(): Promise<SubCategory[]> {
    try {
      const response = await axios.get<SubCategory[]>(`${API_URL}/SubCategories`);
      return response.data;
    } catch (error) {
      console.error('Error fetching subcategories:', error);
      throw error;
    }
  }
}; 
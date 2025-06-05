// src/services/productService.ts
import { api } from '../config/api';
import { Product, CreateProductData } from '../types/product';

interface ProductResponse {
  data: Product[];
  totalPages: number;
  currentPage: number;
}

interface ProductFilters {
  page?: number;
  limit?: number;
  sortBy?: string;
  priceRange?: string;
  search?: string;
}

const productService = {
  async getAllProducts({
    page = 1,
    limit = 9,
    sortBy,
    priceRange,
    search,
  }: ProductFilters = {}): Promise<ProductResponse> {
    try {
      const params = new URLSearchParams();
      params.append('page', page.toString());
      params.append('limit', limit.toString());
      if (sortBy) params.append('sort', sortBy);
      if (priceRange) params.append('priceRange', priceRange);
      if (search) params.append('search', search);

      const response = await api.get(`/products?${params.toString()}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  async getProductsByCategory(
    category: string,
    {
      page = 1,
      limit = 9,
      sortBy,
      priceRange,
      search,
    }: ProductFilters = {}
  ): Promise<ProductResponse> {
    try {
      const params = new URLSearchParams();
      params.append('category', category);
      params.append('page', page.toString());
      params.append('limit', limit.toString());
      if (sortBy) params.append('sort', sortBy);
      if (priceRange) params.append('priceRange', priceRange);
      if (search) params.append('search', search);

      const response = await api.get(`/products?${params.toString()}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching products by category:', error);
      throw error;
    }
  },

  async getProductById(id: string): Promise<Product> {
    try {
      const response = await api.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  },
  
  async getFeaturedProducts(limit: number = 8): Promise<Product[]> {
    try {
      const response = await api.get(`/products/featured?limit=${limit}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching featured products:', error);
      throw error;
    }
  },

  async createProduct(productData: CreateProductData): Promise<Product> {
    try {
      const response = await api.post<Product>(`/products`, productData);
      return response.data;
    } catch (error: any) {
      console.error('Error creating product:', error.response?.data || error.message);
      throw error;
    }
  },

  async updateProduct(id: string, productData: CreateProductData): Promise<Product> {
    try {
      const response = await api.put<Product>(`/products/${id}`, productData);
      return response.data;
    } catch (error: any) {
      console.error(`Error updating product ${id}:`, error.response?.data || error.message);
      throw error;
    }
  },

  async deleteProduct(id: string): Promise<void> {
    try {
      await api.delete(`/products/${id}`);
    } catch (error: any) {
      console.error(`Error deleting product ${id}:`, error.response?.data || error.message);
      throw error;
    }
  }
};

export { productService };
import api from './api';

export const productService = {
  async getAllProducts() {
    const response = await api.get('/products');
    return response.data;
  },

  async getProductById(id: number) {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  async getProductsByCategory(categoryId: number) {
    const response = await api.get(`/products/category/${categoryId}`);
    return response.data;
  },

  async searchProducts(query: string) {
    const response = await api.get(`/products/search?q=${query}`);
    return response.data;
  },
}; 
import api from './api';

export const categoryService = {
  async getAllCategories() {
    const response = await api.get('/categories');
    return response.data;
  },

  async getCategoryById(id: number) {
    const response = await api.get(`/categories/${id}`);
    return response.data;
  },
}; 
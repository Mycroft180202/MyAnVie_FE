import api from './api';

export const orderService = {
  async createOrder(orderData: any) {
    const response = await api.post('/orders', orderData);
    return response.data;
  },

  async getOrderById(id: number) {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  },

  async getUserOrders() {
    const response = await api.get('/orders/user');
    return response.data;
  },

  async updateOrderStatus(orderId: number, status: string) {
    const response = await api.put(`/orders/${orderId}/status`, { status });
    return response.data;
  },
}; 
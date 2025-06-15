import axios from 'axios';
import { API_URL } from '../config/api';

export interface OrderItem {
  productId: string;
  quantity: number;
}

export interface CreateOrderDto {
  shippingAddress: string;
  items: {
    productId: string;
    quantity: number;
  }[];
  paymentMethod: 'COD' | 'VNPAY';
}

export interface OrderDto {
  id: string;
  userId: string;
  orderDate: string;
  shippingAddress: string;
  status: string;
  totalAmount: number;
  items: {
    id: string;
    productId: string;
    productName: string;
    quantity: number;
    price: number;
    thumbnailUrl: string;
  }[];
}

export const orderService = {
  async createOrder(orderData: CreateOrderDto, token: string): Promise<OrderDto> {
    try {
      const response = await axios.post<OrderDto>(`${API_URL}/orders`, orderData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to create order');
    }
  },

  async getMyOrders(token: string): Promise<OrderDto[]> {
    try {
      const response = await axios.get<OrderDto[]>(`${API_URL}/orders/my-orders`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch orders');
    }
  },

  async getOrderById(orderId: string, token: string): Promise<OrderDto> {
    try {
      const response = await axios.get<OrderDto>(`${API_URL}/orders/${orderId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch order');
    }
  },

  createVNPayPayment: async (orderData: CreateOrderDto, token: string): Promise<string> => {
    const response = await fetch(`${API_URL}/orders/vnpay`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(orderData)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Không thể tạo thanh toán VNPAY');
    }

    const data = await response.json();
    return data.paymentUrl;
  }
}; 
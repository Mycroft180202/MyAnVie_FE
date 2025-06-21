import axios from 'axios';
import { API_URL } from '../config/constants';

export interface OrderItem {
  productId: string;
  quantity: number;
}

export interface CreateOrderDto {
  shippingAddress: string;
  paymentMethod: number; // 0 for COD, 1 for VNPAY
  items: OrderItem[];
}

export interface OrderItemResponse {
  id: string;
  productId: string;
  productName: string;
  productThumbnailUrl: string;
  quantity: number;
  price: number;
}

export interface OrderDto {
  id: string;
  userId: string;
  customerFullName: string;
  customerEmail: string;
  orderDate: string;
  totalAmount: number;
  shippingAddress: string;
  status: number; // Corrected to number
  orderItems: OrderItemResponse[];
}

export interface OrderResponse {
  order: OrderDto;
  paymentUrl: string;
}

export const createOrder = async (orderData: CreateOrderDto, token: string): Promise<OrderResponse> => {
  try {
    const response = await axios.post<OrderResponse>(`${API_URL}/Orders`, orderData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error: any) {
    console.error("Error creating order:", error.response?.data || error.message);
    throw error;
  }
};

export const getMyOrders = async (token: string): Promise<OrderDto[]> => {
  try {
    const response = await axios.get<OrderDto[]>(`${API_URL}/Orders/my-orders`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch orders');
  }
};

export const getOrderById = async (orderId: string, token: string): Promise<OrderDto> => {
  try {
    const response = await axios.get<OrderDto>(`${API_URL}/Orders/${orderId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch order');
  }
}; 
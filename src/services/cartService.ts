import axios from 'axios';
import { API_URL } from '../config/api';

export interface CartItem {
  id: number;
  productId: number;
  productName: string;
  price: number;
  quantity: number;
}

export interface Cart {
  id: number;
  userId: number;
  items: CartItem[];
}

export const cartService = {
  async getMyCart(): Promise<Cart> {
    try {
      const response = await axios.get(`${API_URL}/carts/my-cart`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch cart');
    }
  },

  async updateItemQuantity(itemId: number, quantity: number): Promise<Cart> {
    try {
      const response = await axios.patch(`${API_URL}/carts/items/${itemId}`, { quantity });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to update quantity');
    }
  },

  async removeItem(itemId: number): Promise<void> {
    try {
      await axios.delete(`${API_URL}/carts/items/${itemId}`);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to remove item');
    }
  }
};
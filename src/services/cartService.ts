import axios from 'axios';
import { API_URL } from '../config/api';

export interface CartItem {
  id: string;
  productId: string;
  productName: string;
  productPrice: number;
  productImage: string;
  quantity: number;
}

export interface Cart {
  id: string;
  userId: string;
  updatedAt: string;
  cartItems: CartItem[];
  totalPrice: number;
}

export const addToCart = async (productId: string, quantity: number, token: string): Promise<Cart> => {
  try {
    const response = await axios.post(`${API_URL}/cart/add`, {
      productId,
      quantity
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error: any) {
    console.error('Error adding to cart:', error);
    throw new Error(error.response?.data?.message || 'Failed to add to cart');
  }
};

export const getCart = async (): Promise<Cart> => {
  try {
    const response = await axios.get(`${API_URL}/cart`);
    return response.data;
  } catch (error) {
    console.error('Error getting cart:', error);
    throw error;
  }
};

export const cartService = {
  async getMyCart(token: string): Promise<Cart> {
    try {
      const response = await axios.get<Cart>(`${API_URL}/cart`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch cart');
    }
  },

  async addToCart(productId: string, quantity: number, token: string): Promise<Cart> {
    try {
      const response = await axios.post<Cart>(`${API_URL}/cart/add`, {
        productId,
        quantity
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to add to cart');
    }
  },

  async updateItemQuantity(itemId: string, quantity: number, token: string): Promise<Cart> {
    try {
      console.log('Updating quantity for item:', itemId, 'to:', quantity);
      const response = await axios.put<Cart>(
        `${API_URL}/cart/update`, 
        { 
          cartItemId: itemId,
          quantity: quantity 
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      console.log('Update response:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('Error details:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });
      const errorMessage = error.response?.data?.message || 'Failed to update quantity';
      throw new Error(errorMessage);
    }
  },

  async removeItem(itemId: string, token: string): Promise<void> {
    try {
      await axios.delete(`${API_URL}/cart/remove/${itemId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to remove item');
    }
  },

  clearCart: async (token: string): Promise<void> => {
    const response = await fetch(`${API_URL}/cart/clear`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Không thể xóa giỏ hàng');
    }
  }
};
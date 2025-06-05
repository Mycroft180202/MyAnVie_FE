// src/services/orderService.ts
import axios from 'axios';
import { API_URL } from '../config/api'; // Đảm bảo API_URL của bạn có /api ở cuối nếu cần
import { 
    Order, 
    CreateOrderData, 
    AdminUpdateOrderStatusData 
} from '../types/order'; // Import các type đã định nghĩa

// Axios instance này sẽ tự động đính kèm token nếu đã được set trong authService
// Hoặc bạn có thể tạo một axios instance riêng có interceptor để tự đính kèm token

export const orderService = {
  /**
   * Tạo một đơn hàng mới.
   * Yêu cầu người dùng đã đăng nhập (token sẽ được gửi tự động bởi axios default header).
   * Backend endpoint: POST /api/orders
   */
  async createOrder(orderData: CreateOrderData): Promise<Order> {
    try {
      const response = await axios.post<Order>(`${API_URL}/orders`, orderData);
      return response.data; // Backend trả về OrderDto (khớp với Order type của frontend)
    } catch (error: any) {
      console.error('Error creating order:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Không thể tạo đơn hàng. Vui lòng thử lại.');
    }
  },

  /**
   * Lấy tất cả đơn hàng của người dùng hiện tại đang đăng nhập.
   * Yêu cầu người dùng đã đăng nhập.
   * Backend endpoint: GET /api/orders/my
   */
  async getMyOrders(): Promise<Order[]> {
    try {
      const response = await axios.get<Order[]>(`${API_URL}/orders/my`);
      return response.data;
    } catch (error: any) {
      console.error('Error fetching my orders:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Không thể tải lịch sử đơn hàng.');
    }
  },

  /**
   * Lấy chi tiết một đơn hàng theo ID.
   * Yêu cầu người dùng đã đăng nhập.
   * Backend sẽ kiểm tra quyền (user phải là chủ đơn hàng hoặc là Admin).
   * Backend endpoint: GET /api/orders/{id}
   */
  async getOrderById(orderId: string): Promise<Order> {
    try {
      const response = await axios.get<Order>(`${API_URL}/orders/${orderId}`);
      return response.data;
    } catch (error: any) {
      console.error(`Error fetching order with ID ${orderId}:`, error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Không thể tải chi tiết đơn hàng hoặc bạn không có quyền xem.');
    }
  },

  /**
   * [Admin] Lấy tất cả đơn hàng trong hệ thống.
   * Yêu cầu người dùng là Admin.
   * Backend endpoint: GET /api/orders
   */
  async getAllOrdersAsAdmin(): Promise<Order[]> {
    try {
      const response = await axios.get<Order[]>(`${API_URL}/orders`);
      return response.data;
    } catch (error: any) {
      console.error('Admin: Error fetching all orders:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Không thể tải danh sách tất cả đơn hàng (Admin).');
    }
  },

  /**
   * [Admin] Cập nhật trạng thái của một đơn hàng.
   * Yêu cầu người dùng là Admin.
   * Backend endpoint: PUT /api/orders/{id}/status
   */
  async updateOrderStatusAsAdmin(orderId: string, statusData: AdminUpdateOrderStatusData): Promise<Order> {
    try {
      const response = await axios.put<Order>(`${API_URL}/orders/${orderId}/status`, statusData);
      return response.data; // Backend trả về OrderDto đã được cập nhật
    } catch (error: any) {
      console.error(`Admin: Error updating status for order ID ${orderId}:`, error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Không thể cập nhật trạng thái đơn hàng (Admin).');
    }
  },
};
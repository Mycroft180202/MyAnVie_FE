// src/types/order.ts

// Khớp với OrderStatus enum của backend (Pending=0, Processing=1, ...)
export enum OrderStatus {
  Pending = 0,
  Processing = 1,
  Shipped = 2,
  Delivered = 3,
  Cancelled = 4,
  Returned = 5,
}

// Khớp với OrderItemDto của backend
export interface OrderItem {
  // id?: string; // Id của OrderItem, nếu backend trả về và bạn cần
  productId: string;
  productName: string;
  productThumbnailUrl?: string | null;
  quantity: number;
  price: number; // Giá tại thời điểm mua
  // subTotal có thể được tính toán: quantity * price
}

// Khớp với OrderDto của backend
export interface Order {
  id: string;
  userId: string;
  customerFullName: string; // Từ User.FullName
  customerEmail: string;    // Từ User.Email
  orderDate: string;      // DateTime -> string (ISO 8601 format)
  totalAmount: number;
  shippingAddress: string;  // Backend OrderDto trả về string
  status: OrderStatus;      // number (sẽ là giá trị của OrderStatus enum)
  orderItems: OrderItem[];
  createdAt: string;
  updatedAt: string;
}

// ... (CreateOrderData, AdminUpdateOrderStatusData giữ nguyên như trước) ...
export interface CreateOrderItemData {
  productId: string;
  quantity: number;
}

export interface CreateOrderData {
  shippingAddress: string;
  items: CreateOrderItemData[];
}

export interface AdminUpdateOrderStatusData {
    status: OrderStatus; // number
}
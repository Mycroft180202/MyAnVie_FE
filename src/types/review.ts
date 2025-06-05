// src/types/review.ts

// Khớp với ProductReviewDto của backend
export interface ProductReview {
    id: string; // Guid
    productId: string; // Guid
    userId: string; // Guid
    userFullName: string;
    rating: number; // 1-5
    comment?: string | null;
    createdAt: string; // DateTime -> string (ISO 8601 format)
  }
  
  // DTO để tạo Review mới
  export interface CreateProductReviewData {
    // ProductId sẽ lấy từ URL
    rating: number;
    comment?: string | null;
  }
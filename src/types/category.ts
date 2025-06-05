export interface Category {
  id: string; // Guid từ backend
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCategoryData {
  name: string;
}
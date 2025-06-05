// src/types/news.ts
// Khớp với ArticleStatus enum của backend
export enum ArticleStatus {
    Draft = 0,
    Published = 1,
  }
  
  // Khớp với NewsArticleDto của backend
  export interface NewsArticle {
    id: string; // Guid
    title: string;
    content: string;
    thumbnailUrl?: string | null;
    authorFullName: string;
    authorId: string; // Guid
    status: ArticleStatus; // number
    slug: string;
    createdAt: string; // DateTime -> string
    updatedAt: string; // DateTime -> string
  }
  
  // DTO để tạo/cập nhật NewsArticle
  export interface UpsertNewsArticleData {
    title: string;
    content: string;
    thumbnailUrl?: string | null;
    slug: string;
    status: ArticleStatus; // number
  }
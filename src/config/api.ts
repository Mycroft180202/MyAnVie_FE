import axios from 'axios';

// Base URL cho API calls
export const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

// Axios default config có thể thêm ở đây
export const API_CONFIG = {
  headers: {
    'Content-Type': 'application/json',
  },
};

// Create and export axios instance
export const api = axios.create({
  baseURL: API_URL,
  ...API_CONFIG,
});
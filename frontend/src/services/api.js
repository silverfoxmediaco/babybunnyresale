// File: frontend/src/services/api.js
import axios from 'axios';

// Create axios instance with base configuration
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5001/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API calls
export const authAPI = {
  register: (userData) => API.post('/auth/register', userData),
  login: (credentials) => API.post('/auth/login', credentials),
  logout: () => API.get('/auth/logout'),
  getMe: () => API.get('/auth/me'),
  updateProfile: (data) => API.put('/auth/updatedetails', data),
  updatePassword: (data) => API.put('/auth/updatepassword', data),
};

// Auction API calls
export const auctionAPI = {
  getAll: (params) => API.get('/auctions', { params }),
  getFeatured: () => API.get('/auctions/featured'),
  getOne: (id) => API.get(`/auctions/${id}`),
  create: (formData) => API.post('/auctions', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  update: (id, data) => API.put(`/auctions/${id}`, data),
  delete: (id) => API.delete(`/auctions/${id}`),
  watch: (id) => API.post(`/auctions/${id}/watch`),
  buyNow: (id) => API.post(`/auctions/${id}/buy-now`),
};

// Bid API calls
export const bidAPI = {
  placeBid: (data) => API.post('/bids', data),
  getAuctionBids: (auctionId) => API.get(`/bids/auction/${auctionId}`),
  getMyBids: (params) => API.get('/bids/my-bids', { params }),
  getWinningBids: () => API.get('/bids/winning'),
};

// Category API calls
export const categoryAPI = {
  getAll: () => API.get('/categories'),
  getOne: (id) => API.get(`/categories/${id}`),
};

// User API calls
export const userAPI = {
  getProfile: (id) => API.get(`/users/${id}`),
  getAuctions: (id, params) => API.get(`/users/${id}/auctions`, { params }),
  getDashboardStats: () => API.get('/users/dashboard/stats'),
};

export default API;
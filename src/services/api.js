// src/services/api.js
import axios from 'axios';

// Create axios instance with default config
const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
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

// Response interceptor to handle common errors
api.interceptors.response.use(
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
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return Promise.resolve();
  },
  getProfile: () => api.get('/auth/profile'),
};

// Primary Skills API calls
export const primarySkillsAPI = {
  getAll: () => api.get('/primary-skills'),
  getById: (id) => api.get(`/primary-skills/${id}`),
  create: (skillData) => api.post('/primary-skills', skillData),
  update: (id, skillData) => api.put(`/primary-skills/${id}`, skillData),
  delete: (id) => api.delete(`/primary-skills/${id}`),
};

// Secondary Skills API calls
export const secondarySkillsAPI = {
  getAll: () => api.get('/secondary-skills'),
  getByPrimarySkill: (primarySkillId) => 
    api.get(`/secondary-skills?primarySkillId=${primarySkillId}`),
  getById: (id) => api.get(`/secondary-skills/${id}`),
  create: (skillData) => api.post('/secondary-skills', skillData),
  update: (id, skillData) => api.put(`/secondary-skills/${id}`, skillData),
  delete: (id) => api.delete(`/secondary-skills/${id}`),
};

// User Skills API calls
export const userSkillsAPI = {
  getAll: () => api.get('/user-skills'),
  getByUser: (userId) => api.get(`/user-skills/user/${userId}`),
  getByPrimarySkill: (primarySkillId) => 
    api.get(`/user-skills/primary/${primarySkillId}`),
  create: (skillData) => api.post('/user-skills', skillData),
  createBatch: (skillsData) => api.post('/user-skills/batch', skillsData),
  update: (id, skillData) => api.put(`/user-skills/${id}`, skillData),
  delete: (id) => api.delete(`/user-skills/${id}`),
  exportData: () => api.get('/user-skills/export', { responseType: 'blob' }),
};

// Admin API calls
export const adminAPI = {
  getUsers: () => api.get('/admin/users'),
  getUserById: (id) => api.get(`/admin/users/${id}`),
  updateUser: (id, userData) => api.put(`/admin/users/${id}`, userData),
  deleteUser: (id) => api.delete(`/admin/users/${id}`),
  getStats: () => api.get('/admin/stats'),
  exportAllData: () => api.get('/admin/export/all', { responseType: 'blob' }),
};

// Public API calls (no auth required)
export const publicAPI = {
  getSkills: () => api.get('/public/skills'),
  getSkillStats: () => api.get('/public/skill-stats'),
};

export default api;
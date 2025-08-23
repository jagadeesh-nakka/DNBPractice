// src/services/auth.js
import { authAPI } from './api';

// Auth service with token management
export const authService = {
  // Login user and store tokens
  login: async (username, password) => {
    try {
      const response = await authAPI.login({ username, password });
      
      if (response.data.token) {
        // Store token and user data
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify({
          id: response.data.id,
          username: response.data.username,
          email: response.data.email,
          role: response.data.authorities?.[0]?.authority?.replace('ROLE_', '') || 'USER'
        }));
        
        return {
          success: true,
          user: response.data,
        };
      }
      
      return {
        success: false,
        error: 'No token received',
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Login failed',
      };
    }
  },

  // Register new user
  register: async (userData) => {
    try {
      const response = await authAPI.register(userData);
      
      return {
        success: true,
        message: response.data.message,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Registration failed',
      };
    }
  },

  // Logout user
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return { success: true };
  },

  // Get current user from localStorage
  getCurrentUser: () => {
    try {
      const userStr = localStorage.getItem('user');
      return userStr ? JSON.parse(userStr) : null;
    } catch (error) {
      console.error('Error parsing user data:', error);
      return null;
    }
  },

  // Get auth token
  getToken: () => {
    return localStorage.getItem('token');
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return !!(token && user);
  },

  // Check if user has admin role
  isAdmin: () => {
    const user = authService.getCurrentUser();
    return user?.role === 'ADMIN';
  },

  // Validate token (optional - you can implement token validation API call)
  validateToken: async () => {
    try {
      const token = authService.getToken();
      if (!token) {
        return { valid: false };
      }

      // You can implement a token validation endpoint on your backend
      // For now, we'll just check if the token exists and user data is present
      const user = authService.getCurrentUser();
      return { valid: !!(token && user) };
    } catch (error) {
      return { valid: false, error: error.message };
    }
  },

  // Refresh token (if you implement refresh tokens)
  refreshToken: async () => {
    try {
      // Implement refresh token logic if needed
      // const response = await authAPI.refreshToken();
      // localStorage.setItem('token', response.data.token);
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Token refresh failed' 
      };
    }
  },
};

export default authService;
import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.NODE_ENV === 'development' 
    ? 'http://localhost:5000/api'
    : 'https://blog-sphere-399j.onrender.com', // <-- Replace with your actual backend Render URL after deployment
  timeout: 10000, // 10 second timeout
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Request interceptor for adding auth token
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle specific error statuses
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // Handle unauthorized (token expired, invalid, etc.)
          if (window.location.pathname !== '/login') {
            localStorage.removeItem('token');
            window.location.href = '/login?session=expired';
          }
          break;
        case 403:
          // Handle forbidden
          break;
        case 404:
          // Handle not found
          break;
        case 500:
          // Handle server error
          break;
        default:
          break;
      }
    } else if (error.request) {
      // The request was made but no response was received
      error.message = 'Network Error - No response from server';
    } else {
      // Something happened in setting up the request
      error.message = `Request Error - ${error.message}`;
    }
    
    return Promise.reject(error);
  }
);

export default instance;
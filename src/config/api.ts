/**
 * API Configuration
 * 
 * To use the Investment Health Radar API:
 * 1. Set your bearer token in localStorage: localStorage.setItem('api_bearer_token', 'your_token_here')
 * 2. Or set VITE_API_BEARER_TOKEN in your environment
 * 3. Optionally customize the API base URL with VITE_API_BASE_URL
 */

export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'https://api.discvr.ai',
  BEARER_TOKEN_KEY: 'api_bearer_token',
};

/**
 * Helper function to set bearer token in localStorage
 * Usage: setApiToken('your_bearer_token_here')
 */
export const setApiToken = (token: string) => {
  localStorage.setItem(API_CONFIG.BEARER_TOKEN_KEY, token);
  console.log('✅ API Bearer token set successfully');
};

/**
 * Helper function to get the current bearer token
 */
export const getApiToken = (): string | null => {
  return localStorage.getItem(API_CONFIG.BEARER_TOKEN_KEY);
};

/**
 * Helper function to remove bearer token
 */
export const removeApiToken = () => {
  localStorage.removeItem(API_CONFIG.BEARER_TOKEN_KEY);
  console.log('✅ API Bearer token removed');
};

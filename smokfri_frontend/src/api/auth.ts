import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000/api';

export interface RegisterData {
  username: string;
  password: string;
}

export interface LoginData {
  username: string;
  password: string;
}

export interface TokenResponse {
  access: string;
  refresh: string;
}

export const register = async (data: RegisterData) => {
  const response = await axios.post(`${API_BASE_URL}/user/`, data);
  return response.data;
};

export const login = async (data: LoginData): Promise<TokenResponse> => {
  const response = await axios.post(`${API_BASE_URL}/token/`, data);
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
};

import api from './axios';

export interface UserProfile {
  id: number;
  username: string;
  start_date: string | null;
  smoke_free_days: number;
  can_log_today: boolean;
}

export interface LogDayResponse {
  message: string;
  smoke_free_days: number;
}

export interface ResetResponse {
  message: string;
  smoke_free_days: number;
  start_date: string | null;
}

export const getProfile = async (): Promise<UserProfile> => {
  const response = await api.get('/user/profile/');
  return response.data;
};

export const logDay = async (): Promise<LogDayResponse> => {
  const response = await api.post('/user/log_day/');
  return response.data;
};

export const resetProgress = async (): Promise<ResetResponse> => {
  const response = await api.post('/user/reset/');
  return response.data;
};

export const setStartDate = async (startDate: string): Promise<UserProfile> => {
  const response = await api.patch('/user/profile/', { start_date: startDate });
  return response.data;
};


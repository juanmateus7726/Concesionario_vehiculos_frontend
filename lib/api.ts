import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export const login = async (username: string, password: string) => {
  const res = await axios.post(`${API_URL}/api/auth/login/`, { username, password });
  return res.data;
};

export const register = async (data: {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirm_password: string;
  role: string;
}) => {
  const res = await axios.post(`${API_URL}/api/auth/register/`, data);
  return res.data;
};
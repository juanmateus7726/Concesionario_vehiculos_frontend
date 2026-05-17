import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export const login = async (username: string, password: string) => {
  const res = await axios.post(`${API_URL}/api/auth/login/`, { username, password });
  return res.data;
};
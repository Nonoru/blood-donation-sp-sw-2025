import axios from "axios";
import { useNavigate } from 'react-router-dom';

const url = 'http://localhost:8080/api'


export const register = async (formData) => await axios.post(`${url}/register`, formData)


export const checkTaken = async (username) => {
  const url = 'http://localhost:8080/api/check-username';
  try {
    const response = await fetch(`${url}?username=${encodeURIComponent(username)}`);
    if (!response.ok) throw new Error('Network error');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Lỗi khi kiểm tra username:', error);
    return false;
  }
};

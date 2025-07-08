import axios from "axios";

const url = 'http://localhost:8080/auth'

const createHeaders = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
}
export const register = async (formData) => await axios.post(`${url}/register`, formData)

export const login = async (formLogin) => await axios.post(`${url}/login`, formLogin)

export const changePassword = async (formData) => {
  return await axios.put(`${url}/user/change/password `, formData, { headers: createHeaders() });
};
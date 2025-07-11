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
export const forgotPassword = async (email) => {
  return await axios.post(`${url}/user/forgot-password `, {email:email}, { headers: createHeaders() });
};
export const checkOtp = async (email, otp) => {
  return await axios.post(`${url}/user/check-otp `, {email:email, otp:otp}, { headers: createHeaders() });
};
export const resetPassword = async (token, newPassword, confirmNewPassword) => {
  return await axios.post(`${url}/user/reset-password `, {token:token, newPassword:newPassword, confirmNewPassword:confirmNewPassword}, { headers: createHeaders() });
};
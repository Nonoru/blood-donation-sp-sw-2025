import { jwtDecode } from 'jwt-decode';

export const isTokenValid = () => {
  const token = localStorage.getItem("token");
  if (!token) return false;

  try {
    const decoded = jwtDecode(token);
    const now = Date.now() / 1000;
    return decoded.exp > now;
  } catch (err) {
    return false;
  }
};

export const getUsernameFromToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return decoded.sub || null;
  } catch (err) {
    return null;
  }
};

export const getToken = () => localStorage.getItem("token");

export const getUserRole = () => {
  try {
    const token = getToken();
    const decoded = jwtDecode(token);
    return decoded.role || null;
  } catch {
    return null;
  }
};

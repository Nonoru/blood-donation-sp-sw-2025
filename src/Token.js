// Token.js (hoặc utils/auth.js)
import { jwtDecode } from 'jwt-decode'; // ✅ Dùng destructuring vì là named export


export const isTokenValid = () => {
    const token = localStorage.getItem("token");
    if (token === null)
        return false;

    try {
        const decoded = jwtDecode(token);
        const now = Date.now() / 1000;
        return decoded.exp > now;
    } catch (err) {
        return false;
    }
}
export function getUsernameFromToken() {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return decoded.sub;
  } catch (err) {
    return null;
  }
}
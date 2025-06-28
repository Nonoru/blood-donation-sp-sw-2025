import axios from "axios";

const url = 'http://localhost:8080/user'
const createHeaders = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
}
export const orderDonation = async (formData) => {
  return await axios.post(`${url}/order-donation`, formData, { headers: createHeaders() });
};

export const getOrderDate = async () =>{
    return await axios.get(`${url}/get-order-date`, { headers: createHeaders() });
};
export const getOrderHistory = async (userId) =>{
    return await axios.get(`${url}/list-order/${userId}`, { headers: createHeaders() });
};

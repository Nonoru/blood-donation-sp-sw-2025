import axios from "axios";

const url = 'http://localhost:8080/staff'

const createHeaders = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
}
export const getOrderBloodDonation = async () => {
    return await axios.get(`${url}/list-order-donation`, { headers: createHeaders() });
}
export const acceptOrder = async (id) => {
    return await axios.put(`${url}/accept-orders/${id}`, null,{ headers: createHeaders() });
}

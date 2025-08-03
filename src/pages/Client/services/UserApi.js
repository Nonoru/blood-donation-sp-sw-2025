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
export const getOrderHistory = async () =>{
    return await axios.get(`${url}/list-order`, { headers: createHeaders() });
};
export const orderDonationReceiving = async (formData) => {
  return await axios.post(`${url}/order-receiving `, formData, { headers: createHeaders() });
};
export const getOrderReceiveHistory = async (userId) =>{
    return await axios.get(`${url}/list-order/receive`, { headers: createHeaders() });
};
export const getBloodType = async () => {
  return await axios.get(`${url}/list-bloods`, { headers: createHeaders() });
}

export const guestGetBloodValidBags = async () => {
  return await axios.get(`${url}/list-blood-valid-bags`, { headers: createHeaders() });
}
export const getUrgentCanceledOrders = async () => {
  return await axios.get(`${url}/list-order-receive-urgent`, { headers: createHeaders() });
}


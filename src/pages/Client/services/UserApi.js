import axios from "axios";

const url = 'http://localhost:8080/feature'
export const orderDonation = async (formData) => {
  const token = localStorage.getItem('token');
  const headers = token ? {
    Authorization: `Bearer ${token}`
  } : {};

  return await axios.post(`${url}/order-donation`, formData, { headers });
};


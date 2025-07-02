import axios from "axios";

const url = 'http://localhost:8080/staff'

const createHeaders = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
}
export const getOrderBloodDonation = async () => {
    return await axios.get(`${url}/list-order/processing`, { headers: createHeaders() });
}
export const getOrderBloodDonationAccept = async () => {
    return await axios.get(`${url}/list-order/accept`, { headers: createHeaders() });
}
export const acceptOrder = async (id) => {
    return await axios.put(`${url}/accept-orders/${id}`, null,{ headers: createHeaders() });
}
export const refuseOrder = async (id, reason) => {
    return await axios.put(`${url}/refuse-orders/${id}`, {reason:reason},{ headers: createHeaders() });
}
export const completeOrder = async (id, reason) => {
    return await axios.put(`${url}/complete-orders/${id}`, null,{ headers: createHeaders() });
}
export const cancelOrder = async (id, reason) => {
    return await axios.put(`${url}/cancel-orders/${id}`, {reason:reason},{ headers: createHeaders() });
}
export const getClinics = async () => {
    return await axios.get(`${url}/list-clinics`, { headers: createHeaders() });
}
export const getOrderDates = async () => {
    return await axios.get(`${url}/list-schedules`, { headers: createHeaders() });
}
export const addOrderDate = async (formDate) => {
    return await axios.post(`${url}/create-date-donation`, formDate, {headers: createHeaders()});
}
export const getAllOrderDonate = async () => {
    return await axios.get(`${url}/list-order`, {headers: createHeaders()});
}
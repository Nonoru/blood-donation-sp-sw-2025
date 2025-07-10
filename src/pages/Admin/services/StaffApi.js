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
export const getOrderReceiveProcessing = async () => {
    return await axios.get(`${url}/list-order/receive/processing`, { headers: createHeaders() });
}
export const getOrderReceiveAccept = async () => {
    return await axios.get(`${url}/list-order/receive/accept`, { headers: createHeaders() });
}
export const acceptOrderReceive = async (id, clinicId) => {
    return await axios.put(`${url}/accept-orders/receive/${id}`, {clinicId:clinicId},{ headers: createHeaders() });
}
export const refuseOrderReceive = async (id, clinicId) => {
    return await axios.put(`${url}/refuse-orders/receive/${id}`, {clinicId:clinicId},{ headers: createHeaders() });
}
export const completeOrderReceive = async (id) => {
    return await axios.put(`${url}/complete-orders/receive/${id}`, null,{ headers: createHeaders() });
}
export const cancelOrderReceive = async (id, reason) => {
    return await axios.put(`${url}/cancel-orders/receive/${id}`, {reason:reason},{ headers: createHeaders() });
}
export const getAllOrderReceive = async () => {
    return await axios.get(`${url}/list-order/receive`, {headers: createHeaders()});
}
export const getBlood = async () => {
    return await axios.get(`${url}/blood`, { headers: createHeaders() });
}
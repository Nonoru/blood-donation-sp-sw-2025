import axios from "axios";

const url = 'http://localhost:8080/staff'

const createHeaders = () => {
    const token = localStorage.getItem('token');
    return token ? { 
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
    } : {
        'Content-Type': 'application/json'
    };
}

// CLINIC, BLOOD TYPE AND APPOINTMENT
export const getClinics = async () => {
    return await axios.get(`${url}/list-clinics`, { headers: createHeaders() });
}
export const getOrderDates = async () => {
    return await axios.get(`${url}/list-schedules`, { headers: createHeaders() });
}
export const addOrderDate = async (formDate) => {
    return await axios.post(`${url}/create-date-donation`, formDate, {headers: createHeaders()});
}
export const getBloodType = async () => {
    return await axios.get(`${url}/list-bloods`, { headers: createHeaders() });
}
export const getBloodBag = async () => {
    return await axios.get(`${url}/list-blood-bags`, { headers: createHeaders() });
}
export const getBloodBagValid = async () => {
    return await axios.get(`${url}/list-blood-valid-bags`, { headers: createHeaders() });
}


// ORDER BLOOD DONATION

// GET ORDER BLOOD DONATION (PENDING, PROCESSING)
export const getOrderBloodDonation = async () => {
    return await axios.get(`${url}/donation/list-pending`, { headers: createHeaders() });
}
export const getOrderBloodDonationAccept = async () => {
    return await axios.get(`${url}/donation/list-processing`, { headers: createHeaders() });
}
export const getAllOrderDonate = async () => {
    return await axios.get(`${url}/donation/list-all`, {headers: createHeaders()});
}

//===============================================
// PROECESS STATUS (ACCEPT, REFUSE, COMPLETE, CANCEL)
export const acceptOrder = async (id) => {
    return await axios.put(`${url}/donation/accept-orders/${id}`, null,{ headers: createHeaders() });
}
export const refuseOrder = async (formRefuse) => {
    return await axios.put(`${url}/donation/refuse-orders`, formRefuse,{ headers: createHeaders() });
}
export const completeOrder = async (formComplete) => {
    return await axios.put(`${url}/donation/complete-orders`, formComplete,{ headers: createHeaders() });
}
export const cancelOrder = async (formCancel) => {
    return await axios.put(`${url}/donation/cancel-orders`, formCancel,{ headers: createHeaders() });
}
//===============================================
// ORDER BLOOD RECEIVING

// GET ORDER BLOOD RECEIVING (PENDING, PROCESSING)
export const getOrderReceivePending = async () => {
    return await axios.get(`${url}/receive/list-order/receive-pending`, { headers: createHeaders() });
}
export const getOrderReceiveProcessing = async () => {
    return await axios.get(`${url}/receive/list-order/receive-processing`, { headers: createHeaders() });
}
export const getAllOrderReceive = async () => {
    return await axios.get(`${url}/receive/list-order/all`, {headers: createHeaders()});
}

// ================================
export const acceptOrderReceive = async (formAccept) => {
    return await axios.put(`${url}/receive/accept-orders`, formAccept,{ headers: createHeaders() });
}
export const refuseOrderReceive = async (formRefuse) => {
    return await axios.put(`${url}/receive/refuse-orders`, formRefuse,{ headers: createHeaders() });
}
export const completeOrderReceive = async (id) => {
    return await axios.put(`${url}/receive/complete-orders/${id}`, null,{ headers: createHeaders() });
}
export const cancelOrderReceive = async (formRefuse) => {
    return await axios.put(`${url}/receive/cancel-orders`, formRefuse,{ headers: createHeaders() });
}

//===============================================

export const getBlood = async () => {
    return await axios.get(`${url}/blood`, { headers: createHeaders() });
}
// BLOOD DONATE
export const getBloodDonateToday = async () => {
    return await axios.get(`${url}/statistic/today`, { headers: createHeaders() });
}
export const getBloodDonateYesterday = async () => {
    return await axios.get(`${url}/statistic/yesterday`, { headers: createHeaders() });
}
export const getBloodDonateMonth = async () => {
    return await axios.get(`${url}/statistic/month`, { headers: createHeaders() });
}

// STATISTIC

export const getBloodDonateTodayReceive = async () => {
    return await axios.get(`${url}/statistic/receive/today`, { headers: createHeaders() });
}
export const getBloodDonateYesterdayReceive = async () => {
    return await axios.get(`${url}/statistic/receive/yesterday`, { headers: createHeaders() });
}
export const getBloodDonateMonthReceive = async () => {
    return await axios.get(`${url}/statistic/receive/month`, { headers: createHeaders() });
}
// GRAPH
export const getBloodStatisticGraph = async () => {
    return await axios.get(`${url}/statistic/blood/graph`, { headers: createHeaders() });
}
// Cancel-Reason
export const getListCancelReason = async () => {
    return await axios.get(`${url}/cancel-reason`, { headers: createHeaders() });
}
// ================================
// STATISTIC NEW VERSION


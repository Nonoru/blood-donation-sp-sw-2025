import axios from "axios";

const url = 'http://localhost:8080/admin'

const createHeaders = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
}
export const listAccount = async () =>{
    return await axios.get(`${url}/list`, { headers: createHeaders() });
}

export const createAccount = async (formData) => {
    return await axios.post(`${url}/create`,formData, { headers: createHeaders() });
}

export const updateAccount = async (formData, id) => {
    return await axios.put(`${url}/update/${id}`,formData, {headers: createHeaders()} );
}

export const deleteAccount = async (id) => {
    return await axios.delete(`${url}/delete/${id}`, { headers: createHeaders() });
}

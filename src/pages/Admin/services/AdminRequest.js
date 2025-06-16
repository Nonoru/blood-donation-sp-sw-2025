import axios from "axios";

const url = 'http://localhost:8080/admin'

export const listAccount = async () => await axios.get(`${url}/list`)

export const createAccount = async (formData) => await axios.post(`${url}/create`,formData)

export const updateAccount = async (formData, id) => await axios.put(`${url}/update/${id}`,formData)

export const deleteAccount = async (id) => await axios.delete(`${url}/delete/${id}`)
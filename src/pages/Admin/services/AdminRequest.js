import axios from "axios";

const url = 'http://localhost:8080/admin'

export const listAccount = async () => await axios.get(`${url}/list`)

export const createAccount = async (formData) => await axios.post(`${url}/create`,formData)
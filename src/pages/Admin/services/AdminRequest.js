import axios from "axios";

const url = 'http://localhost:8080/admin'

export const listAccount = async () => await axios.post(`${url}/get-all`)

export const createAccount = async (formData) => await axios.post(`${url}/create-account`,formData)
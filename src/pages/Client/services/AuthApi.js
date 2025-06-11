import axios from "axios";

const url = 'http://localhost:8080/auth'


export const register = async (formData) => await axios.post(`${url}/register`, formData)

export const login = async (formLogin) => await axios.post(`${url}/login`, formLogin)

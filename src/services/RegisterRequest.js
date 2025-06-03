import axios from "axios";
import { useNavigate } from 'react-router-dom';

const url = 'http://localhost:8080/api'


export const register = async (formData) => await axios.post(`${url}/register`, formData)

export const checkUsernameExist = async (username) => await axios.get(`${url}/check-username?username=${username}`)

export const checkEmailExist = async (email) => await axios.get(`${url}/check-username?email=${email}`)
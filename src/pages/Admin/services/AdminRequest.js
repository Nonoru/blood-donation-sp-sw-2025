import axios from "axios";

const url = 'http://localhost:8080/admin'

export const listAccount = async () => await axios.get(`${url}/get-all`)
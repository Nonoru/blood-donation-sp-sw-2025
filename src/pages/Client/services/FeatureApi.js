import axios from "axios";

const url = 'http://localhost:8080/feature'


export const orderDonation = async (formData) => await axios.post(`${url}/order-donation`, formData)

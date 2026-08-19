import axios from 'axios';
import cookies from 'react-cookies';
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const endpoints = {
    chi_nhanh: `/chi-nhanh`,
    login: `/auth/login`,
    register: `/users`,
};  

export const authApis = () => axios.create({
    baseURL: BASE_URL,
    headers: {
        Authorization: `Bearer ${cookies.load('token')}`,
    },
})

export default axios.create({ baseURL: BASE_URL });
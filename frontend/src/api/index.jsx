import { jwtDecode } from "jwt-decode";
import axios from "axios";

const handleError = (err) => {
    if (err.response && err.response.status) {
        // localStorage.removeItem('token');
    }
    console.log(err);
};

export const setAuthToken = token => {
    if (token) {
        axios.defaults.headers.common["Authorization"] = 'Bearer ' + token;
    } else {
        delete axios.defaults.headers.common["Authorization"];
    }
}

export const login = async (userData) => {
    try {
        const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/user/login`, userData)
        if (data.success) {
            let token = data.data.data
            localStorage.setItem("jwtToken", token);
            setAuthToken(token);
            const decodedUser = jwtDecode(token);
            return decodedUser
        }
    } catch (error) {
        handleError(error)
    }
    return null
};

export const createOrder = async (params) => {
    try {
        const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/user/createOrder`, { params })
        if (data.success) {
            return data.data.data
        }
    } catch (error) {
        handleError(error)
    }
    return null
};

export const getOrder = async (order_id) => {
    try {
        const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/user/getOrder`, { order_id })
        if (data.success) {
            return data.data.data
        }
    } catch (error) {
        handleError(error)
    }
    return null
}

export const getAmount = async (fromCcy, toCcy, amount) => {
    try {
        const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/price/get`, { fromCcy, toCcy, amount })
        if (data.success) {
            return data.data.data
        }
    } catch (error) {
        handleError(error)
    }
    return null
}
import axios from "axios";

const API = axios.create({
    baseURL: "http://127.0.0.1:8000/api/students/",
});

// Add token automatically
API.interceptors.request.use((config) => {
    const token = localStorage.getItem("access");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default API;

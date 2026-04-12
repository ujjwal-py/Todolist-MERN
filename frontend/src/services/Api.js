import axios from 'axios'

const Api = axios.create({
    baseURL: process.env.BASE_URL
})

Api.interceptors.request.use((config) => {
    const token = localStorage.getItem("my-todo-token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default Api
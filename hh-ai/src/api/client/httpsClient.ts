import axios from 'axios';

export const authApi = axios.create({
    baseURL: 'http://127.0.0.1:5000',
    withCredentials: false,
});

// Инстанс без авторизации
export const publicApi = axios.create({
    baseURL: 'http://127.0.0.1:5000',
    withCredentials: false,
});

authApi.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

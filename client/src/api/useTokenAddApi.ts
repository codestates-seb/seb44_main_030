import { useCookies } from 'react-cookie';
import axios from 'axios';

export default function useApi() {
    const [cookies] = useCookies(['Token']);
    const API_URL = import.meta.env.VITE_KEY;

    const api = axios.create({
        baseURL: `${API_URL}`,
        withCredentials: true,
    });

    api.interceptors.request.use(
        (config) => {
            const token = cookies.Token;
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        },
    );

    return api;
}

import axios from 'axios';

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_REACT_APP_LARAVEL_BASE_URL,
});

export default axiosClient;
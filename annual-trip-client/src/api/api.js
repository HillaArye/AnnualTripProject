import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080'
});


api.interceptors.request.use((config) => {
    const teacherId = localStorage.getItem('teacherId');
    if (teacherId) {
        config.auth = {
            username: teacherId,
            password: '5069'
        };
    }
    return config;
});

export default api;

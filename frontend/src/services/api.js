import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000/api',

});

// A request interceptor to include the token in headers
API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token');
    // debug: confirm token presence
    console.debug('API interceptor - token from localStorage:', token);

    // ensure headers object exists and set Authorization
    req.headers = req.headers || {};
    if (token) {
        req.headers = {
            ...req.headers, // preserve existing headers
            Authorization: `Bearer ${token}`,
        };
    }

    return req;
});

export default API;
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});

export const login = async (email, password) => {
    return api.post('/auth/login', { email, password });
};

export const signup = async (userData) => {
    return api.post('/auth/signup', userData);
};

export const fetchUserProfile = async () => {
    const token = localStorage.getItem('token');
    return api.get('/users/me', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

// Ajoutez d'autres appels API si nécessaire

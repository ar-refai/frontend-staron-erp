// src/api.js

import axios from 'axios';
const token = localStorage.getItem('staron_token');
const instance = axios.create({
    baseURL: 'http://api.staronegypt.com.eg/api/v1',
    headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`,

    }, withCredentials: true,
    // Replace with your Laravel backend URL
});

export const login = async (credentials) => {
    try {
        const response = await instance.post('/login', credentials);
        return response.data;
    } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
            throw new Error(error.response.data.message);
        } else {
            throw new Error('Login failed'); // Fallback error message if the response structure is unexpected
        }
    }
};

export const register = async (userData) => {
    try {
        const response = await instance.post('/register', userData);
        return response.data;
    } catch (error) {
        throw new Error('Registration failed');
    }
};
export const UserData = async () => {
    try {
        const response = await instance.get('/users/profile');
        return response.data;
    } catch (error) {
        throw new Error('data failed');
    }
};
export const logout = async () => {
    try {
        const response = await instance.post('/logout',
        );
        return response.data;
    } catch (error) {
        throw new Error('Logout failed');
    }
};
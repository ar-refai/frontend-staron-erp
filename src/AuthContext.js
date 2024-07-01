// src/AuthContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { UserData } from './api';

const AuthContext = createContext({
  user: null,
  setUser: () => {},
});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await UserData();
                setUser(userData);
            } catch (error) {
                console.error('Failed to fetch user data:', error);
            }
        };

        const token = localStorage.getItem('staron_token');
        if (token) {
            fetchUserData();
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};

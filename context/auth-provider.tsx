import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { config } from '@/constants/config';
import * as SecureStore from 'expo-secure-store';

export const AuthContext = createContext<any>(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [auth, setAuth] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Load user from AsyncStorage on app start
    useEffect(() => {
        const loadUser = async () => {
            try {
                const userData = await AsyncStorage.getItem('user');
                if (userData) {
                    setAuth(JSON.parse(userData));
                }
            } catch (error: any) {
                console.log('Error loading user:', error);
            } finally {
                setIsLoading(false);
            }
        };
        loadUser();
    }, []);

    const handle_login = async (email: string | null, phone: string | null, password: string) => {
        try {
            const loginData: any = { password };

            // Send only the provided field (email OR phone)
            if (email) {
                loginData.email = email;
            } else if (phone) {
                loginData.phone = phone;
            }

            const response = await axios.post(`${config.URL}/auth/login`, loginData);
            const user = response.data;
            const token = response.data.token;
            await AsyncStorage.setItem('user', JSON.stringify(user));
            await SecureStore.setItemAsync('token', token);
        
            setAuth(user);
            return { success: true, data: user };
        } catch (error: any) {
            console.log('Error logging in', error.response?.data || error.message);
            return { success: false, message: error.response?.data?.message || 'Login failed' };
        }
    };

    // handle register user
    const handle_register = async (name: string, email: string | null, phone: string | null, password: string, role_id: string , referred_by_code?: string) => {
        try {
            const registerData: any = { name, password, role_id };
            if (email) {
                registerData.email = email;
            } else if (phone) {
                registerData.phone = phone;
            }
            if (referred_by_code) {
                registerData.referred_by_code = referred_by_code;
            }
            const response = await axios.post(`${config.URL}/auth/register`, registerData);
            const user = response.data;
            const token = response.data.token;
            await AsyncStorage.setItem('user', JSON.stringify(user));
            await SecureStore.setItemAsync('token', token);
            setAuth(user);
            return { success: true, data: user };
        } catch (error: any) {
            return { success: false, message: error.response?.data?.message || 'Registration failed' };
        }
    };

    // logout user
    const handle_logout = async () => {
        try {
            await AsyncStorage.removeItem('user');
            setAuth(null);
        } catch (error: any) {
            console.log('Error logging out', error.message);
        }
    };

    return (
        <AuthContext.Provider value={{
            auth,
            isLoading,
            handle_login,
            handle_register,
            handle_logout,
            // Compatibility with existing code
            user: auth?.user || auth,
            isAuthenticated: !!auth,
            login: handle_login,
            register: handle_register,
            logout: handle_logout
        }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use auth context


export { AuthProvider };
export default AuthProvider;
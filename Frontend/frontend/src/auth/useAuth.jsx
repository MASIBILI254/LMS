import {create} from 'zustand';
import api  from '../api/axios';

const useAuth = create((set) => ({
    user: null,
    role: null,
    token: localStorage.getItem("token") || null,
    loading: false,
    error: null,
    
    login: async (formData) => {
        set({ loading: true, error: null });
        try {
            const response = await api.post('/user/login',  formData );
            const { user, token } = response.data;
            localStorage.setItem("token", token);
            set({ user, role: user.role, token, loading: false });
        } catch (error) {
            set({ error: error.response?.data?.message || "Login failed", loading: false });
        }
    },

    register: async (formData) => {
        try {
            set({ loading: true, error: null });
            const response = await api.post('/user/register', formData);
            set({loading:false});
            return response.data;
        } catch (error) {
            console.error("Register error:", error.response?.data || error.message);
            set({ error: error.response?.data?.message || "Registration failed", loading: false });
        }
    },

    logout: () => {
        localStorage.removeItem("token");
        set({ user: null, role: null, token: null });
    },
}));
export default useAuth;
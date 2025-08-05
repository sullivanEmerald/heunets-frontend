
import { axiosInstance } from "../lib/utils";

export const authService = {
    async Register(data) {
        const { confirmPassword, ...registerData } = data;
        console.log("Registering with data:", registerData);
        try {
            const response = await axiosInstance.post('/auth/register', registerData);
            return response.data;
        } catch (error) {
            console.error("Registration error:", error);
            throw error;
        }
    },
    async Login(data) {
        try {
            const response = await axiosInstance.post('/auth/login', data)
            return response.data;
        } catch (error) {
            console.log('login failed', error)
            throw error
        }
    }
}



import { axiosInstance } from "../lib/utils";

export const authService = {
    async Register(email, password) {
        try {
            const response = await axiosInstance.post('/auth/register', { email, password });
            return response.data;
        } catch (error) {
            console.error("Registration error:", error);
            throw error;
        }
    }
}

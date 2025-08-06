
import { axiosInstance } from "../lib/utils";

export const VolunteerService = {

    async postComment(message, taskId) {
        const data = {
            message,
            taskId
        }
        try {
            const response = await axiosInstance.post('/volunteer/create', data)
            return response.data;
        } catch (error) {
            console.error('error', error)
            throw error
        }
    },

    async getTasks() {
        try {
            const response = await axiosInstance.get('/volunteer/tasks')
            return response.data;
        } catch (error) {
            console.error(error)
            throw error
        }
    },

    async getTask(id) {
        try {
            const response = await axiosInstance.get(`/volunteer/task/${id}`)
            return response.data;
        } catch (error) {
            console.log(error)
            throw error
        }
    }
}


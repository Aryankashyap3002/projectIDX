import axios from '../config/axiosConfig';

export const createProjectApi = async () => {
    try {
        console.log("Sending request to:", import.meta.env.VITE_BACKEND_URL + '/projects');
        const response = await axios.post('/projects');
        console.log("Response received:", response.data);
        return response.data;
    } catch(error) {
        console.log("Error details:", error.message, error.response || 'No response');
        throw error;
    }
}

export const getProjectTree = async ({ projectId }) => {
    try {
        const response = await axios.get(`/projects/${projectId}/tree`);
        console.log(response.data);
        return response?.data?.data;
    } catch(error) {
        console.log(error);
        throw error;
    }
}
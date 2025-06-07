import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const fundingApi = {
    // Get all approved funding profiles
    getApprovedFunds: async () => {
        try {
            const response = await axios.get(`${API_URL}/funding/approved`);
            return response.data;
        } catch (error) {
            console.error('Error fetching approved funds:', error);
            throw error;
        }
    },

    // Get a single funding profile by ID
    getFundById: async (id) => {
        try {
            const response = await axios.get(`${API_URL}/funding/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching fund details:', error);
            throw error;
        }
    },

    // Make a donation
    makeDonation: async (fundId, amount) => {
        try {
            const response = await axios.post(`${API_URL}/funding/${fundId}/donate`, {
                amount
            });
            return response.data;
        } catch (error) {
            console.error('Error making donation:', error);
            throw error;
        }
    }
}; 
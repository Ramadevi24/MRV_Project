import axios from 'axios';

const API_URL = 'https://atlas.smartgeoapps.com/MRVAPI/api/FuelManager';

const DataManagementAPI = {
  getAll: async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data.$values;
    } catch (error) {
      console.error('Error fetching all fuels:', error);
      throw error;
    }
  },

  getById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching fuel with id ${id}:`, error);
      throw error;
    }
  },

  create: async (fuelData) => {
    try {
      const response = await axios.post(API_URL, fuelData);
      return response.data;
    } catch (error) {
      console.error('Error creating new fuel:', error);
      throw error;
    }
  },

  update: async (id, fuelData) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, fuelData);
      return response.data;
    } catch (error) {
      console.error(`Error updating fuel with id ${id}:`, error);
      throw error;
    }
  },

  delete: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting fuel with id ${id}:`, error);
      throw error;
    }
  }
};

export default DataManagementAPI;
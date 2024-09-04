import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/User'; // INPUT_REQUIRED {API_BASE_URL is the base URL for the users API. Replace localhost:5259 with your actual API host and port if different.}

export const getUsers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}`);
    return response.data.$values;
  } catch (error) {
    console.error('Error fetching users:', error.response ? error.response.data : error, error.stack);
    throw error;
  }
};

export const createUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}`, userData);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error.response ? error.response.data : error, error.stack);
    throw error;
  }
};

export const updateUser = async (id, userData) => {
  try {
    const payload ={
      ...userData,
      userID:id
    }
    const response = await axios.put(`${API_BASE_URL}/${id}`, payload);
    return response.data;
  } catch (error) {
    console.error(`Error updating user with ID ${id}:`, error.response ? error.response.data : error, error.stack);
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting user with ID ${id}:`, error.response ? error.response.data : error, error.stack);
    throw error;
  }
};
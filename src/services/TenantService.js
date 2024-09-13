import axios from 'axios';

const API_BASE_URL = 'https://atlas.smartgeoapps.com/MRVAPI/api/Tenant'; // INPUT_REQUIRED {API_BASE_URL is the base URL for the roles API. Replace localhost:5259 with your actual API host and port if different.}

export const getTenants = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}`);
    return response.data.$values;
  } catch (error) {
    console.error('Error fetching tenants:', error.response ? error.response.data : error, error.stack);
    throw error;
  }
};

export const getTenantById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching role with ID ${id}:`, error.response ? error.response.data : error, error.stack);
    throw error;
  }
};

export const createTenant = async (roleData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}`, roleData);
    return response.data;
  } catch (error) {
    console.error('Error creating role:', error.response ? error.response.data : error, error.stack);
    throw error;
  }
};

export const updateTenant = async (id, roleData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${id}`, roleData);
    return response.data;
  } catch (error) {
    console.error(`Error updating role with ID ${id}:`, error.response ? error.response.data : error, error.stack);
    throw error;
  }
};

export const deleteTenant= async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting role with ID ${id}:`, error.response ? error.response.data : error, error.stack);
    throw error;
  }
};
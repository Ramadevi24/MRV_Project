import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/TenantRole'; // INPUT_REQUIRED {API_BASE_URL is the base URL for the roles API. Replace localhost:5259 with your actual API host and port if different.}

export const getTenantRoles = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}`);
    return response.data.$values;
  } catch (error) {
    console.error('Error fetching roles:', error.response ? error.response.data : error, error.stack);
    throw error;
  }
};

export const getTenantRoleById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching role with ID ${id}:`, error.response ? error.response.data : error, error.stack);
    throw error;
  }
};

export const createTenantRole = async (tenantroleData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}`, tenantroleData);
    return response.data;
  } catch (error) {
    console.error('Error creating role:', error.response ? error.response.data : error, error.stack);
    throw error;
  }
};

export const updateTenantRole = async (id, tenantroleData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${id}`, tenantroleData);
    return response.data;
  } catch (error) {
    console.error(`Error updating role with ID ${id}:`, error.response ? error.response.data : error, error.stack);
    throw error;
  }
};

export const deleteTenantRole = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting role with ID ${id}:`, error.response ? error.response.data : error, error.stack);
    throw error;
  }
};
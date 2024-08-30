import axios from 'axios';
const API_BASE_URL = 'http://localhost:5000/api/Permissions'; // INPUT_REQUIRED {API_BASE_URL is the base URL for the permissions API. Replace localhost:5259 with your actual API host and port if different.}

export const getPermissions = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}`);
    // Ensure the response data is always an array
    return response.data.$values;;
  } catch (error) {
    console.error('Error fetching permissions:', error.response ? error.response.data : error, error.stack);
    throw error;
  }
};

export const createPermission = async (permissionData) => {
  try {
    const createPayload ={
      ...permissionData,
      rolePermissions:[]
    }
    const response = await axios.post(`${API_BASE_URL}`, createPayload);
    return response.data;
  } catch (error) {
    console.error('Error creating permission:', error.response ? error.response.data : error, error.stack);
    throw error;
  }
};

export const updatePermission = async (id, permissionData) => {
  const updatePayload ={
    ...permissionData,
    rolePermissions:[]
  }
  try {
    const response = await axios.put(`${API_BASE_URL}/${id}`, updatePayload);
    return response.data;
  } catch (error) {
    console.error(`Error updating permission with ID ${id}:`, error.response ? error.response.data : error, error.stack);
    throw error;
  }
};

export const deletePermission = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting permission with ID ${id}:`, error.response ? error.response.data : error, error.stack);
    throw error;
  }
};
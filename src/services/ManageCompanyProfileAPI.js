import axios from 'axios';
import { toast } from 'react-toastify';

const API_BASE_URL = 'http://localhost:5000/api/Organization';
const CATEGORIES_URL = 'http://localhost:5000/api/Categories/level1and2';

export const getCompanyProfiles = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}`);
    return response.data.$values;
  } catch (error) {
    console.error('Error fetching company profiles:', error.response ? error.response.data : error, error.stack);
    toast.error('Error fetching company profiles');
    throw error;
  }
};

export const getCompanyProfile = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching company profile with ID ${id}:`, error.response ? error.response.data : error, error.stack);
    toast.error(`Error fetching company profile with ID ${id}`);
    throw error;
  }
};

export const createCompanyProfile = async (profileData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}`, profileData);
    return response.data;
  } catch (error) {
    console.error('Error creating company profile:', error.response ? error.response.data : error, error.stack);
    toast.error('Error creating company profile');
    throw error;
  }
};

export const updateCompanyProfile = async (id, profileData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${id}`, profileData);
    return response.data;
  } catch (error) {
    console.error(`Error updating company profile with ID ${id}:`, error.response ? error.response.data : error, error.stack);
    toast.error(`Error updating company profile with ID ${id}`);
    throw error;
  }
};

export const deleteCompanyProfile = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting company profile with ID ${id}:`, error.response ? error.response.data : error, error.stack);
    toast.error(`Error deleting company profile with ID ${id}`);
    throw error;
  }
};

export const fetchCategories = async () => {
  try {
  const response = await  axios.get(CATEGORIES_URL);
  return response.data.$values;
  } catch (error) {
    console.error('Error fetching company profiles:', error.response ? error.response.data : error, error.stack);
    toast.error('Error fetching company profiles');
    throw error;
  }
};
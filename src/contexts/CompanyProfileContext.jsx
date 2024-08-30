import React, { createContext, useContext, useState, useCallback } from 'react';
import * as ManageCompanyProfileAPI from '../services/ManageCompanyProfileAPI';

export const CompanyProfileContext = createContext();

export const CompanyProfileProvider = ({ children }) => {
  const [companyProfiles, setCompanyProfiles] = useState([]);
  const [error, setError] = useState(null);
  const [selectedProfile, setSelectedProfile] = useState(null);

  const fetchCompanyProfiles = useCallback(async () => {
    try {
      const profiles = await ManageCompanyProfileAPI.getCompanyProfiles();
      setCompanyProfiles(Array.isArray(profiles) ? profiles : []);
    } catch (error) {
      console.error("Failed to fetch company profiles", error);
      setError(error);
    }
  }, []);

  const createCompanyProfile = useCallback(async (profileData) => {
    try {
      await ManageCompanyProfileAPI.createCompanyProfile(profileData);
      await fetchCompanyProfiles(); // Refresh the list after adding
    } catch (error) {
      console.error("Failed to create company profile", error);
      setError(error);
    }
  }, [fetchCompanyProfiles]);

  const updateCompanyProfile = useCallback(async (id, profileData) => {
    try {
      await ManageCompanyProfileAPI.updateCompanyProfile(id, profileData);
      await fetchCompanyProfiles(); // Refresh the list after updating
    } catch (error) {
      console.error(`Failed to update company profile with ID ${id}`, error);
      setError(error);
    }
  }, [fetchCompanyProfiles]);

  const deleteCompanyProfile = useCallback(async (id) => {
    try {
      await ManageCompanyProfileAPI.deleteCompanyProfile(id);
      await fetchCompanyProfiles(); // Refresh the list after deleting
    } catch (error) {
      console.error(`Failed to delete company profile with ID ${id}:`, error);
      setError(error);
    }
  }, [fetchCompanyProfiles]);

  const selectProfileForEdit = useCallback((id) => {
    const profile = companyProfiles.find(profile => profile.companyID === id);
    if (profile) {
      setSelectedProfile(profile);
    } else {
      setError(new Error(`Failed to find company profile with ID ${id} for editing.`));
    }
  }, [companyProfiles]);

  return (
    <CompanyProfileContext.Provider value={{
      companyProfiles,
      fetchCompanyProfiles,
      createCompanyProfile,
      updateCompanyProfile,
      deleteCompanyProfile,
      selectProfileForEdit,
      selectedProfile,
      error,
      setSelectedProfile, // Expose setSelectedProfile to allow direct updates from components
    }}>
      {children}
    </CompanyProfileContext.Provider>
  );
};

export const useCompanyProfile = () => useContext(CompanyProfileContext);
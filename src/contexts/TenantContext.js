import React, { createContext, useContext, useState, useCallback } from 'react';
import * as TenantService from '../services/TenantService';

export const TenantContext = createContext();

export const TenantProvider = ({ children }) => {
  const [tenants, setTenants] = useState([]);
  const [selectedTenant, setSelectedTenant] = useState(null);

  const fetchTenants = useCallback(async () => {
    try {
      const fetchedTenants = await TenantService.getTenants();
      setTenants(Array.isArray(fetchedTenants) ? fetchedTenants : []);
    } catch (error) {
      console.error('Error fetching roles:', error.response ? error.response.data : error, error.stack);
    }
  }, []);

  const fetchTenantById = useCallback(async (id) => {
    try {
      const role = await TenantService.getTenantById(id);
      console.log(role, 'role')
      if (role) {
        setSelectedTenant(role);
      } else {
        throw new Error(`Role with ID ${id} not found.`);
      }
    } catch (error) {
      console.error(`Error fetching role by ID ${id}:`, error.response ? error.response.data : error, error.stack);
    }
  }, []);

  const createTenant = useCallback(async (roleData) => {
    try {
      await TenantService.createTenant(roleData);
      await fetchTenants();
    } catch (error) {
      console.error('Error creating role:', error.response ? error.response.data : error, error.stack);
    }
  }, [fetchTenants]);

  const updateTenant = useCallback(async (id, roleData) => {
    try {
      await TenantService.updateTenant(id, roleData);
      await fetchTenants();
    } catch (error) {
      console.error(`Error updating role with ID ${id}:`, error.response ? error.response.data : error, error.stack);
    }
  }, [fetchTenants]);

  const deleteTenant = useCallback(async (id) => {
    try {
      await TenantService.deleteTenant(id);
      await fetchTenants();
    } catch (error) {
      console.error(`Error deleting role with ID ${id}:`, error.response ? error.response.data : error, error.stack);
    }
  }, [fetchTenants]);

  return (
    <TenantContext.Provider value={{
      tenants,
      fetchTenants,
      fetchTenantById,
      createTenant,
      updateTenant,
      deleteTenant,
      selectedTenant,
      setSelectedTenant,
    }}>
      {children}
    </TenantContext.Provider>
  );
};

export const useTenants = () => useContext(TenantContext);
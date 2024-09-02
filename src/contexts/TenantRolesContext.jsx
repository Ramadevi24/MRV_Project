import React, { createContext, useContext, useState, useCallback } from 'react';
import * as TenantRolesService from '../services/TenantRolesService';

export const TenantRolesContext = createContext();

export const TenantRolesProvider = ({ children }) => {
  const [tenantroles, setTenantRoles] = useState([]);
  const [selectedTenantRole, setSelectedTenantRole] = useState(null);

  const fetchTenantRoles = useCallback(async () => {
    try {
      const fetchedTenantRoles = await TenantRolesService.getTenantRoles();
      setTenantRoles(Array.isArray(fetchedTenantRoles) ? fetchedTenantRoles : []);
    } catch (error) {
      console.error('Error fetching roles:', error.response ? error.response.data : error, error.stack);
    }
  }, []);

  const fetchTenantRoleById = useCallback(async (id) => {
    try {
      const role = await TenantRolesService.getTenantRoleById(id);
      if (role) {
        setSelectedTenantRole(role);
      } else {
        throw new Error(`Role with ID ${id} not found.`);
      }
    } catch (error) {
      console.error(`Error fetching role by ID ${id}:`, error.response ? error.response.data : error, error.stack);
    }
  }, []);

  const createTenantRole = useCallback(async (roleData) => {
    try {
      await TenantRolesService.createTenantRole(roleData);
      await fetchTenantRoles();
    } catch (error) {
      console.error('Error creating role:', error.response ? error.response.data : error, error.stack);
    }
  }, [fetchTenantRoles]);

  const updateTenantRole = useCallback(async (id, roleData) => {
    try {
      await TenantRolesService.updateTenantRole(id, roleData);
      await fetchTenantRoles();
    } catch (error) {
      console.error(`Error updating role with ID ${id}:`, error.response ? error.response.data : error, error.stack);
    }
  }, [fetchTenantRoles]);

  const deleteTenantRole = useCallback(async (id) => {
    try {
      await TenantRolesService.deleteTenantRole(id);
      await fetchTenantRoles();
    } catch (error) {
      console.error(`Error deleting role with ID ${id}:`, error.response ? error.response.data : error, error.stack);
    }
  }, [fetchTenantRoles]);

  return (
    <TenantRolesContext.Provider value={{
      tenantroles,
      fetchTenantRoles,
      fetchTenantRoleById,
      createTenantRole,
      updateTenantRole,
      deleteTenantRole,
      selectedTenantRole,
      setSelectedTenantRole,
    }}>
      {children}
    </TenantRolesContext.Provider>
  );
};

export const useTenantRoles = () => useContext(TenantRolesContext);
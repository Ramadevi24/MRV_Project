import React, { createContext, useContext, useState, useCallback } from 'react';
import * as RolesService from '../services/RolesService';

export const RolesContext = createContext();

export const RolesProvider = ({ children }) => {
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);

  const fetchRoles = useCallback(async () => {
    try {
      const fetchedRoles = await RolesService.getRoles();
      setRoles(Array.isArray(fetchedRoles) ? fetchedRoles : []);
    } catch (error) {
      console.error('Error fetching roles:', error.response ? error.response.data : error, error.stack);
    }
  }, []);

  const fetchRoleById = useCallback(async (id) => {
    try {
      const role = await RolesService.getRoleById(id);
      if (role) {
        setSelectedRole(role);
      } else {
        throw new Error(`Role with ID ${id} not found.`);
      }
    } catch (error) {
      console.error(`Error fetching role by ID ${id}:`, error.response ? error.response.data : error, error.stack);
    }
  }, []);

  const createRole = useCallback(async (roleData) => {
    try {
      await RolesService.createRole(roleData);
      await fetchRoles();
    } catch (error) {
      console.error('Error creating role:', error.response ? error.response.data : error, error.stack);
    }
  }, [fetchRoles]);

  const updateRole = useCallback(async (id, roleData) => {
    try {
      await RolesService.updateRole(id, roleData);
      await fetchRoles();
    } catch (error) {
      console.error(`Error updating role with ID ${id}:`, error.response ? error.response.data : error, error.stack);
    }
  }, [fetchRoles]);

  const deleteRole = useCallback(async (id) => {
    try {
      await RolesService.deleteRole(id);
      await fetchRoles();
    } catch (error) {
      console.error(`Error deleting role with ID ${id}:`, error.response ? error.response.data : error, error.stack);
    }
  }, [fetchRoles]);

  return (
    <RolesContext.Provider value={{
      roles,
      fetchRoles,
      fetchRoleById,
      createRole,
      updateRole,
      deleteRole,
      selectedRole,
      setSelectedRole,
    }}>
      {children}
    </RolesContext.Provider>
  );
};

export const useRoles = () => useContext(RolesContext);
import React, { createContext, useContext, useState, useCallback } from 'react';
import * as PermissionsService from '../services/permissionsService';

export const PermissionsContext = createContext();

export const PermissionsProvider = ({ children }) => {
  const [permissions, setPermissions] = useState([]);
  const [selectedPermission, setSelectedPermission] = useState(null);

  const fetchPermissions = useCallback(async () => {
    try {
      const fetchedPermissions = await PermissionsService.getPermissions();
      // Ensure fetchedPermissions is always an array
      setPermissions(Array.isArray(fetchedPermissions) ? fetchedPermissions : []);
    } catch (error) {
      console.error('Error fetching permissions:', error.response ? error.response.data : error, error.stack);
    }
  }, []);

  const createPermission = useCallback(async (permissionData) => {
    try {
      await PermissionsService.createPermission(permissionData);
      await fetchPermissions();
    } catch (error) {
      console.error('Error creating permission:', error.response ? error.response.data : error, error.stack);
    }
  }, [fetchPermissions]);

  const updatePermission = useCallback(async (id, permissionData) => {
    try {
      await PermissionsService.updatePermission(id, permissionData);
      await fetchPermissions();
    } catch (error) {
      console.error(`Error updating permission with ID ${id}:`, error.response ? error.response.data : error, error.stack);
    }
  }, [fetchPermissions]);

  const deletePermission = useCallback(async (id) => {
    try {
      await PermissionsService.deletePermission(id);
      await fetchPermissions();
    } catch (error) {
      console.error(`Error deleting permission with ID ${id}:`, error.response ? error.response.data : error, error.stack);
    }
  }, [fetchPermissions]);

  const selectPermissionForEdit = useCallback((id) => {
    const permission = permissions.find(permission => permission.permissionID === id);
    if (permission) {
      setSelectedPermission(permission);
    } else {
      console.error(`Failed to find permission with ID ${id} for editing.`);
    }
  }, [permissions]);

  return (
    <PermissionsContext.Provider value={{
      permissions,
      fetchPermissions,
      createPermission,
      updatePermission,
      deletePermission,
      selectPermissionForEdit,
      selectedPermission,
      setSelectedPermission,
    }}>
      {children}
    </PermissionsContext.Provider>
  );
};

export const usePermissions = () => useContext(PermissionsContext);
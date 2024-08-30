import React, { createContext, useContext, useState, useCallback } from 'react';
import * as userService from '../services/userService'; // Import userService

const UsersContext = createContext();

export const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchUsers = useCallback(async () => {
    try {
      const data = await userService.getUsers();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error.message, error.stack);
    }
  }, []);

  const createUser = useCallback(async (userData) => {
    try {
      await userService.createUser(userData);
      await fetchUsers();
    } catch (error) {
      console.error('Error creating user:', error.message, error.stack);
    }
  }, [fetchUsers]);

  const updateUser = useCallback(async (id, userData) => {
    try {
      await userService.updateUser(id, userData);
      await fetchUsers();
    } catch (error) {
      console.error(`Error updating user with ID ${id}:`, error.message, error.stack);
    }
  }, [fetchUsers]);

  const deleteUser = useCallback(async (id) => {
    try {
      await userService.deleteUser(id);
      await fetchUsers();
    } catch (error) {
      console.error(`Error deleting user with ID ${id}:`, error.message, error.stack);
    }
  }, [fetchUsers]);

  return (
    <UsersContext.Provider value={{
      users,
      fetchUsers,
      createUser,
      updateUser,
      deleteUser,
      selectedUser,
      setSelectedUser,
    }}>
      {children}
    </UsersContext.Provider>
  );
};

export const useUsers = () => useContext(UsersContext);
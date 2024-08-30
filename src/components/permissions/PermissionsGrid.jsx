import React, { useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { usePermissions } from '../../contexts/PermissionsContext';
import { toast } from 'react-toastify';

const PermissionsGrid = ({ handleSelectPermissionForEdit }) => {
  const { permissions, fetchPermissions, deletePermission } = usePermissions();

  useEffect(() => {
    fetchPermissions().catch(error => {
      console.error('Failed to fetch permissions:', error.message, error.stack);
      toast.error('Error fetching permissions.');
    });
  }, [fetchPermissions]);

  const handleEdit = (permission) => {
    handleSelectPermissionForEdit(permission);
  };

  const handleDelete = async (id) => {
    try {
      await deletePermission(id);
      toast.success('Permission deleted successfully.');
    } catch (error) {
      console.error(`Error deleting permission with ID ${id}:`, error.message, error.stack);
      toast.error(`Error deleting permission with ID ${id}.`);
    }
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Permission Name</th>
          <th>Description</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {permissions.map((permission) => (
          <tr key={permission.permissionID}>
            <td>{permission.permissionName}</td>
            <td>{permission.description}</td>
            <td>
              <Button variant="info" onClick={() => handleEdit(permission)}>Edit</Button>{' '}
              <Button variant="danger" onClick={() => handleDelete(permission.permissionID)}>Delete</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default PermissionsGrid;
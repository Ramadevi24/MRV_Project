import React, { useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { useRoles } from '../../contexts/RolesContext';
import { toast } from 'react-toastify';
import formatDate from '../../utils/formateDate'

const RolesGrid = ({ handleSelectRoleForEdit }) => {
  const { roles, fetchRoles, deleteRole } = useRoles();

  useEffect(() => {
    fetchRoles().catch(error => {
      console.error('Failed to fetch roles:', error.message, error.stack);
    });
  }, [fetchRoles]);

  const handleEdit = (role) => {
    handleSelectRoleForEdit(role);
  };

  const handleDelete = async (id) => {
    try {
      await deleteRole(id);
      toast.success('Role deleted successfully.');
    } catch (error) {
      console.error(`Error deleting role with ID ${id}:`, error.message, error.stack);
      toast.error(`Error deleting role with ID ${id}.`);
    }
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Role Name</th>
          <th>Description</th>
          <th>Created Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {roles.map((role) => (
          <tr key={role.roleID}>
            <td>{role.roleName}</td>
            <td>{role.description}</td>
            <td>{formatDate(role.createdDate)}</td>
            <td>
              <Button variant="info" onClick={() => handleEdit(role)}>Edit</Button>{' '}
              <Button variant="danger" onClick={() => handleDelete(role.roleID)}>Delete</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default RolesGrid;
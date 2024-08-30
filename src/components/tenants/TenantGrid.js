import React, { useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { useTenants } from '../../contexts/TenantContext';
import { toast } from 'react-toastify';
import formatDate from '../../utils/formateDate'

const TenantGrid = ({ handleSelectTenantForEdit }) => {
  const { tenants, fetchTenants, deleteTenant } = useTenants();

  useEffect(() => {
    fetchTenants().catch(error => {
      console.error('Failed to fetch roles:', error.message, error.stack);
    });
  }, [fetchTenants]);

  const handleEdit = (role) => {
    handleSelectTenantForEdit(role);
  };

  const handleDelete = async (id) => {
    try {
      await deleteTenant(id);
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
          <th>Tenant Name</th>
          <th>Description</th>
          <th>Created Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {tenants.map((role) => (
          <tr key={role.roleID}>
            <td>{role.roleName}</td>
            <td>{role.description}</td>
            <td>{formatDate(role.dateCreated)}</td>
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

export default TenantGrid;
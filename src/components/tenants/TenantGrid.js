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

  const handleEdit = (tenant) => {
    handleSelectTenantForEdit(tenant);
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
    <Table striped bordered hover style={{width:'95%', marginLeft:'35px'}}>
      <thead>
        <tr>
        <th>Tenant ID</th>
          <th>Tenant Name</th>
          <th>Description</th>
          <th>Created Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {tenants.map((tenant) => (
          <tr key={tenant.tenantID}>
             <td>{tenant.tenantID}</td>
            <td>{tenant.name}</td>
            <td>{tenant.description}</td>
            <td>{formatDate(tenant.createdDate)}</td>
            <td>
              <Button variant="info" onClick={() => handleEdit(tenant)}>Edit</Button>{' '}
              <Button variant="danger" onClick={() => handleDelete(tenant.tenantID)}>Delete</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TenantGrid;
import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useTenants } from '../../contexts/TenantContext';
import { toast } from 'react-toastify';
import TenantGrid from './TenantGrid';
import CreateTenantForm from './CreateTenantForm';
import Topbar from "../Topbar";
import Sidebar from "../Sidebar";

const TenantPage = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const { fetchTenants, fetchTenantById, selectedTenant, setSelectedTenant, deleteTenant } = useTenants();
  console.log(selectedTenant, 'selectedTenant')

  useEffect(() => {
    fetchTenants().catch(error => {
      console.error('Failed to fetch roles:', error.message, error.stack);
    });
  }, [fetchTenants]);

  const handleShowCreateForm = () => {
    setShowCreateForm(true);
    setSelectedTenant(null); // Ensure form is reset for creating a new role
  };

  const handleCloseCreateForm = () => {
    setShowCreateForm(false);
    fetchTenants().catch(error => {
      console.error('Failed to fetch roles after closing create form:', error.message, error.stack);
    });
  };

  const handleSelectTenantForEdit = (tenant) => {
    fetchTenantById(tenant.tenantID).then(() => {
      setShowCreateForm(true); // Open the form for editing
    }).catch(error => {
      console.error(`Failed to fetch role details for editing: ${error.message}`, error.stack);
    });
  };

  const handleDeleteTenant = async (tenantID) => {
    try {
      await deleteTenant(tenantID);
      toast.success('Tenant deleted successfully');
      fetchTenants();
    } catch (error) {
      console.error(`Failed to delete role: ${error.message}`, error.stack);
      toast.error('Failed to delete role');
    }
  };

  return (
    <>
    <div>
      <Button variant="primary" style={{margin: "20px",float:"inline-end"}} onClick={handleShowCreateForm}>
        Create New Tenant
      </Button>
      <TenantGrid handleSelectTenantForEdit={handleSelectTenantForEdit} handleDeleteTenant={handleDeleteTenant} />
      <CreateTenantForm show={showCreateForm} handleClose={handleCloseCreateForm} currentTenant={selectedTenant} />
    </div>
      </>
  );
};

export default TenantPage;
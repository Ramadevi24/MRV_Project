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

  const handleSelectTenantForEdit = (role) => {
    fetchTenantById(role.roleID).then(() => {
      setShowCreateForm(true); // Open the form for editing
    }).catch(error => {
      console.error(`Failed to fetch role details for editing: ${error.message}`, error.stack);
    });
  };

  const handleDeleteTenant = async (roleId) => {
    try {
      await deleteTenant(roleId);
      toast.success('Role deleted successfully');
      fetchTenants();
    } catch (error) {
      console.error(`Failed to delete role: ${error.message}`, error.stack);
      toast.error('Failed to delete role');
    }
  };

  return (
    <>
    <div className="layout-wrapper">
      <div className="main-menu active">
        <Sidebar />
      </div>
      <div className="page-content">
        <Topbar />
    <div>
      <Button variant="primary" style={{margin: "20px",float:"inline-end"}} onClick={handleShowCreateForm}>
        Create New Tenant
      </Button>
      <TenantGrid handleSelectTenantForEdit={handleSelectTenantForEdit} handleDeleteTenant={handleDeleteTenant} />
      <CreateTenantForm show={showCreateForm} handleClose={handleCloseCreateForm} currentTenant={selectedTenant} />
    </div>
    </div>
    </div>
      </>
  );
};

export default TenantPage;
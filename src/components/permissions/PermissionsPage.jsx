import React, { useState } from 'react';
import PermissionsGrid from './PermissionsGrid';
import CreateEditPermissionForm from './CreateEditPermissionForm';
import { Button } from 'react-bootstrap';
import { usePermissions } from '../../contexts/PermissionsContext';

const PermissionsPage = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedPermission, setSelectedPermission] = useState(null);
  const { fetchPermissions } = usePermissions();

  const handleShowCreateForm = () => {
    setShowCreateForm(true);
    setSelectedPermission(null); // Ensure form is reset for creating a new permission
  };

  const handleCloseCreateForm = () => {
    setShowCreateForm(false);
    fetchPermissions().catch(error => {
      console.error('Failed to fetch permissions after closing create form:', error.message, error.stack);
    });
  };

  const handleSelectPermissionForEdit = (permission) => {
    setSelectedPermission(permission);
    setShowCreateForm(true); // Open the form for editing
  };

  return (
    <>
    <div>
      <Button variant="primary" style={{margin: "20px",float:"inline-end"}} onClick={handleShowCreateForm}>
        Create New Permission
      </Button>
      <PermissionsGrid handleSelectPermissionForEdit={handleSelectPermissionForEdit} />
      <CreateEditPermissionForm show={showCreateForm} handleClose={handleCloseCreateForm} currentPermission={selectedPermission} />
    </div>
      </>
  );
};

export default PermissionsPage;
import React, { useState, useEffect } from 'react';
import RolesGrid from './RolesGrid';
import CreateRoleForm from './CreateRoleForm';
import { Button } from 'react-bootstrap';
import { useRoles } from '../../contexts/RolesContext';
import { toast } from 'react-toastify';
import Topbar from "../Topbar";
import Sidebar from "../Sidebar";

const RolesPage = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const { fetchRoles, fetchRoleById, selectedRole, setSelectedRole, deleteRole } = useRoles();

  useEffect(() => {
    fetchRoles().catch(error => {
      console.error('Failed to fetch roles:', error.message, error.stack);
    });
  }, [fetchRoles]);

  const handleShowCreateForm = () => {
    setShowCreateForm(true);
    setSelectedRole(null); // Ensure form is reset for creating a new role
  };

  const handleCloseCreateForm = () => {
    setShowCreateForm(false);
    fetchRoles().catch(error => {
      console.error('Failed to fetch roles after closing create form:', error.message, error.stack);
    });
  };

  const handleSelectRoleForEdit = (role) => {
    fetchRoleById(role.roleID).then(() => {
      setShowCreateForm(true); // Open the form for editing
    }).catch(error => {
      console.error(`Failed to fetch role details for editing: ${error.message}`, error.stack);
    });
  };

  const handleDeleteRole = async (roleId) => {
    try {
      await deleteRole(roleId);
      toast.success('Role deleted successfully');
      fetchRoles();
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
        Create New Role
      </Button>
      <RolesGrid handleSelectRoleForEdit={handleSelectRoleForEdit} handleDeleteRole={handleDeleteRole} />
      <CreateRoleForm show={showCreateForm} handleClose={handleCloseCreateForm} currentRole={selectedRole} />
    </div>
      </div>
    </div>
      </>
   
  );
};

export default RolesPage;
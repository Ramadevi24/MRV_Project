import React, { useState } from 'react';
import PermissionsGrid from './PermissionsGrid';
import CreateEditPermissionForm from './CreateEditPermissionForm';
import { Button } from 'react-bootstrap';
import { usePermissions } from '../../contexts/PermissionsContext';

import searchicon from '../../images/searchbaricon.png'

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
    <div style={{padding:'20px'}}>
      {/* <Button variant="primary" style={{margin: "20px",float:"inline-end"}} onClick={handleShowCreateForm}>
        Create New Permission
      </Button> */}
                  <div className="header-container mt-3">
<h2 className="header-title">Permissions</h2>
<div className="header-actions">
<div className="search-box">

<input
            type="text"
            placeholder="Search permission"
            className="search-input"
          />
          <img className="search-icon" src={searchicon} />

</div>
<select className="sort-dropdown">
<option>Sort By</option>
<option value="created-date">Created Date</option>
<option value="role-name">Role Name</option>
</select>
<button onClick={handleShowCreateForm} className="add-role-btn" style={{width:'195px'}}> Create New Permission</button>
</div>
</div>
      <PermissionsGrid handleSelectPermissionForEdit={handleSelectPermissionForEdit} />
      <CreateEditPermissionForm show={showCreateForm} handleClose={handleCloseCreateForm} currentPermission={selectedPermission} />
    </div>
      </>
  );
};

export default PermissionsPage;
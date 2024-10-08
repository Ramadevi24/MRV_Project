import React, { useState, useEffect } from 'react';
import RolesGrid from './RolesGrid';
import CreateRoleForm from './CreateRoleForm';
import { Button } from 'react-bootstrap';
import { useRoles } from '../../contexts/RolesContext';
import { toast } from 'react-toastify';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../../css/AddNewRole.css';
import searchicon from '../../images/searchbaricon.png';
import { useTranslation } from "react-i18next";

const RolesPage = () => {

  const {t}=useTranslation();
  const navigate = useNavigate()
  const [showCreateForm, setShowCreateForm] = useState(false);
  const {
    fetchRoles,
    fetchRoleById,
    selectedRole,
    setSelectedRole,
    deleteRole,
  } = useRoles();

  useEffect(() => {
    fetchRoles().catch((error) => {
      console.error("Failed to fetch roles:", error.message, error.stack);
    });
  }, [fetchRoles]);

  // const handleShowCreateForm = () => {
  //   setShowCreateForm(true);
  //   setSelectedRole(null); // Ensure form is reset for creating a new role
  // };

  const handleAddRole = () => {
    navigate("/Mrv/addnewrole");
  };

  // const handleCloseCreateForm = () => {
  //   setShowCreateForm(false);
  //   fetchRoles().catch((error) => {
  //     console.error(
  //       "Failed to fetch roles after closing create form:",
  //       error.message,
  //       error.stack
  //     );
  //   });
  // };

  const handleSelectRoleForEdit = (role) => {
    fetchRoleById(role.roleID)
      .then(() => {
        navigate("/Mrv/addnewrole"); // Open the form for editing
      })
      .catch((error) => {
        console.error(
          `Failed to fetch role details for editing: ${error.message}`,
          error.stack
        );
      });
  };

  const handleDeleteRole = async (roleId) => {
    try {
      await deleteRole(roleId);
      toast.success(t('Role deleted successfully'));
      fetchRoles();
    } catch (error) {
      console.error(`Failed to delete role: ${error.message}`, error.stack);
      toast.error(t('Failed to delete role'));
    }
  };

  return (
    <>
        <div className='p-4'>
<div className="header-container">
<h2 className="header-title">{t('Roles')}</h2>
<div className="header-actions">
<div className="search-box">

<input
            type="text"
            placeholder={t("Search roles")}
            className="search-input"
          />
          <img className="search-icon" src={searchicon} />

</div>
<select className="sort-dropdown">
<option>{t('Sort By')}</option>
<option value="created-date">{t('Created Date')}</option>
<option value="role-name">{t('Role Name')}</option>
</select>
<button onClick={handleAddRole} className="add-role-btn">{t('ADD NEW ROLE +')}</button>
</div>
</div>


      {/* <Button variant="primary" style={{margin: "20px",float:"inline-end"}} onClick={handleShowCreateForm}>
        Create New Role
      </Button> */}
        <RolesGrid
          handleSelectRoleForEdit={handleSelectRoleForEdit}
          handleDeleteRole={handleDeleteRole}
        />
        {/* <CreateRoleForm show={showCreateForm} handleClose={handleCloseCreateForm} currentRole={selectedRole} /> */}
        {/* <AddNewRole  handleClose={handleCloseCreateForm} currentRole={selectedRole} /> */}
      </div>
    </>
  );
};

export default RolesPage;

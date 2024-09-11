import React, { useState, useEffect } from 'react';
import { useTenants } from '../../contexts/TenantContext';
import { toast } from 'react-toastify';
import TenantGrid from './TenantGrid';
import CreateTenantForm from './CreateTenantForm';
import searchicon from '../../images/searchbaricon.png';
import { useTranslation } from "react-i18next";

const TenantPage = () => {
  const {t}=useTranslation();
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
      toast.success(t('Tenant deleted successfully'));
      fetchTenants();
    } catch (error) {
      console.error(`Failed to delete role: ${error.message}`, error.stack);
      toast.error(t('Failed to delete role'));
    }
  };

  return (
    <>
    
      {/* <Button variant="primary" style={{margin: "20px",float:"inline-end"}} onClick={handleShowCreateForm}>
        Create New Tenant
      </Button> */}
      <div className='p-4'>
<div className="header-container">
<h2 className="header-title">{t('Tenant')}</h2>
<div className="header-actions">
<div className="search-box">

<input
            type="text"
            placeholder={t("Search Tenant")}
            className="search-input"
          />
          <img className="search-icon" src={searchicon} />

</div>
<select className="sort-dropdown">
<option>{t('Sort By')}</option>
<option value="created-date">{t('Created Date')}</option>
<option value="role-name">{t('Role Name')}</option>
</select>
<button onClick={handleShowCreateForm} className="add-role-btn">  {t('Create New Tenant')}</button>
</div>
</div>
      <TenantGrid handleSelectTenantForEdit={handleSelectTenantForEdit} handleDeleteTenant={handleDeleteTenant} />
      <CreateTenantForm show={showCreateForm} handleClose={handleCloseCreateForm} currentTenant={selectedTenant} />
    </div>
      </>
  );
};

export default TenantPage;
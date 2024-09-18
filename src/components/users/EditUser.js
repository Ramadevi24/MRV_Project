import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../../css/EditForm.css';

const EditUser = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    passwordHash: '',
    phone: '',
    tenantID: '',
    organizationID: '',
    tenantRoleID: '',
    userRole: ''
  });
  const [dropdownOptions, setDropdownOptions] = useState({
    tenants: [],
    organizations: [],
    tenantRoles: [],
    userRoles: []
  });

  useEffect(() => {
    fetchUserData();
    fetchDropdownOptions();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`https://atlas.smartgeoapps.com/MRVAPI/api/User/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setFormData(response.data);
    } catch (error) {
      toast.error(t('Error fetching user data'));
    }
  };

  const fetchDropdownOptions = async () => {
    try {
        const [tenants, organizations, tenantRoles, userRoles] = await Promise.all([
          axios.get('https://atlas.smartgeoapps.com/MRVAPI/api/Tenant', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }),
          axios.get('https://atlas.smartgeoapps.com/MRVAPI/api/Organization', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }),
          axios.get('https://atlas.smartgeoapps.com/MRVAPI/api/TenantRole', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }),
          axios.get('https://atlas.smartgeoapps.com/MRVAPI/api/Role', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
        ]);
        setDropdownOptions({
          tenants: tenants.data.$values,
          organizations: organizations.data.$values,
          tenantRoles: tenantRoles.data.$values,
          userRoles: userRoles.data.$values
        });
    } catch (error) {
      toast.error(t('Error fetching dropdown options'));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://atlas.smartgeoapps.com/MRVAPI/api/User/${id}`, formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      toast.success(t('User updated successfully'));
      navigate('/users');
    } catch (error) {
      toast.error(t('Error updating user'));
    }
  };

  return (
    <div className="container">
      <div className='form-heading-row'>
        <div>
        <h2 className='edit-form-header'>{t('Edit User')}</h2>
        </div>
        <div>
        <button onClick={() => navigate(-1)} className='form_back'>{t('Back')}</button>
        </div>
        </div>
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <div className="col">
            <label>{t('First Name')}<span style={{ color: 'red' }}>*</span></label>
            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
          </div>
          <div className="col">
            <label>{t('Last Name')}<span style={{ color: 'red' }}>*</span></label>
            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col">
            <label>{t('Email')}<span style={{ color: 'red' }}>*</span></label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="col">
            <label>{t('Password')}<span style={{ color: 'red' }}>*</span></label>
            <input type="password" name="passwordHash" value={formData.passwordHash} onChange={handleChange} required />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col">
            <label>{t('Phone')}<span style={{ color: 'red' }}>*</span></label>
            <input type="number" name="phone" value={formData.phone} onChange={handleChange} required />
          </div>
          <div className="col">
            <label className='custum-dropdown-label'>{t('Tenant ID')}<span style={{ color: 'red' }}>*</span></label>
            <select className='custum-dropdown-select' name="tenantID" value={formData.tenantID} onChange={handleChange} required>
              <option value="">{t('Select Tenant')}</option>
              {dropdownOptions.tenants.$values?.map(tenant => (
                <option key={tenant.tenantID} value={tenant.tenantID}>{tenant.name}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col">
            <label className='custum-dropdown-label'>{t('Organization ID')}<span style={{ color: 'red' }}>*</span></label>
            <select className='custum-dropdown-select' name="organizationID" value={formData.organizationID} onChange={handleChange} required>
              <option value="">{t('Select Organization')}</option>
              {dropdownOptions.organizations.$values?.map(org => (
                <option key={org.organizationID} value={org.organizationID}>{org.organizationName}</option>
              ))}
            </select>
          </div>
          <div className="col">
            <label className='custum-dropdown-label'>{t('Tenant Role ID')}<span style={{ color: 'red' }}>*</span></label>
            <select className='custum-dropdown-select' name="tenantRoleID" value={formData.tenantRoleID} onChange={handleChange} required>
              <option value="">{t('Select Tenant Role')}</option>
              {dropdownOptions.tenantRoles.$values?.map(role => (
                <option key={role.tenantRoleID} value={role.tenantRoleID}>{role.roleName}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-6">
            <label className='custum-dropdown-label'>{t('User Role')}<span style={{ color: 'red' }}>*</span></label>
            <select className='custum-dropdown-select' name="userRole" value={formData.userRole} onChange={handleChange} required>
              <option value="">{t('Select User Role')}</option>
               {dropdownOptions.userRoles.map(role => (
                <option key={role.roleID} value={role.roleName}>{role.roleName}</option>
              ))}
            </select>
          </div>
        </div>
        <button type="submit" className="btn">{t('Update User')}</button>
      </form>
    </div>
  );
};

export default EditUser;
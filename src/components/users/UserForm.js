import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

const UserForm = () => {
  const { t } = useTranslation();
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
    fetchDropdownOptions();
  }, []);

  const fetchDropdownOptions = async () => {
    try {
      const [tenants, organizations, tenantRoles, userRoles] = await Promise.all([
        axios.get('/api/tenants', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }),
        axios.get('/api/organizations', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }),
        axios.get('/api/tenantRoles', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }),
        axios.get('/api/userRoles', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
      ]);
      setDropdownOptions({
        tenants: tenants.data,
        organizations: organizations.data,
        tenantRoles: tenantRoles.data,
        userRoles: userRoles.data
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
      await axios.post('/api/users', formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      toast.success(t('User created successfully'));
    } catch (error) {
      toast.error(t('Error creating user'));
    }
  };

  return (
    <div className="container">
      <h2 style={{textAlign:'left'}}>{t('Create User')}</h2>
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
            <label>{t('Tenant ID')}<span style={{ color: 'red' }}>*</span></label>
            <select name="tenantID" value={formData.tenantID} onChange={handleChange} required>
              <option value="">{t('Select Tenant')}</option>
              {dropdownOptions.tenants.map(tenant => (
                <option key={tenant.id} value={tenant.id}>{tenant.name}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col">
            <label>{t('Organization ID')}<span style={{ color: 'red' }}>*</span></label>
            <select name="organizationID" value={formData.organizationID} onChange={handleChange} required>
              <option value="">{t('Select Organization')}</option>
              {dropdownOptions.organizations.map(org => (
                <option key={org.id} value={org.id}>{org.name}</option>
              ))}
            </select>
          </div>
          <div className="col">
            <label>{t('Tenant Role ID')}<span style={{ color: 'red' }}>*</span></label>
            <select name="tenantRoleID" value={formData.tenantRoleID} onChange={handleChange} required>
              <option value="">{t('Select Tenant Role')}</option>
              {dropdownOptions.tenantRoles.map(role => (
                <option key={role.id} value={role.id}>{role.name}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col">
            <label>{t('User Role')}<span style={{ color: 'red' }}>*</span></label>
            <select name="userRole" value={formData.userRole} onChange={handleChange} required>
              <option value="">{t('Select User Role')}</option>
              {dropdownOptions.userRoles.map(role => (
                <option key={role.id} value={role.id}>{role.name}</option>
              ))}
            </select>
          </div>
        </div>
        <button type="submit" className="btn">{t('Create User')}</button>
      </form>
    </div>
  );
};

export default UserForm;
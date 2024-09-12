import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const UserFormPage = () => {
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
  const [tenants, setTenants] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [roles, setRoles] = useState([]);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchDropdownData();
    if (id) {
      fetchUserData(id);
    }
  }, [id]);

  const fetchDropdownData = async () => {
    try {
      const [tenantsResponse, organizationsResponse, rolesResponse] = await Promise.all([
        axios.get('/api/tenants'),
        axios.get('/api/organizations'),
        axios.get('/api/roles')
      ]);
      setTenants(tenantsResponse.data);
      setOrganizations(organizationsResponse.data);
      setRoles(rolesResponse.data);
    } catch (error) {
        toast.error(t('error.fetchDropdownData'), 'error');
    }
  };

  const fetchUserData = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/User/${userId}`);
      setFormData(response.data);
    } catch (error) {
        toast.error(t('error.fetchUserData'), 'error');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await axios.put(`http://localhost:5000/api/User/${id}`, formData);
        toast.success(t('success.updateUser'), 'success');
      } else {
        await axios.post('http://localhost:5000/api/User', formData);
        toast.success(t('success.createUser'), 'success');
      }
      navigate('/users');
    } catch (error) {
        toast.error(t('error.submitForm'), 'error');
    }
  };

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">{t('First Name')}</label>
          <input
            type="text"
            className="form-control"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">{t('Last Name')}</label>
          <input
            type="text"
            className="form-control"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">{t('Email')}</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">{t('Password')}</label>
          <input
            type="password"
            className="form-control"
            name="passwordHash"
            value={formData.passwordHash}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">{t('Phone')}</label>
          <input
            type="number"
            className="form-control"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">{t('Tenant')}</label>
          <select
            className="form-control"
            name="tenantID"
            value={formData.tenantID}
            onChange={handleChange}
            required
          >
            {tenants.map(tenant => (
              <option key={tenant.id} value={tenant.id}>
                {tenant.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">{t('Organization')}</label>
          <select
            className="form-control"
            name="organizationID"
            value={formData.organizationID}
            onChange={handleChange}
            required
          >
            {organizations.map(org => (
              <option key={org.id} value={org.id}>
                {org.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">{t('Role')}</label>
          <select
            className="form-control"
            name="tenantRoleID"
            value={formData.tenantRoleID}
            onChange={handleChange}
            required
          >
            {roles.map(role => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">{t('User Role')}</label>
          <select
            className="form-control"
            name="userRole"
            value={formData.userRole}
            onChange={handleChange}
            required
          >
            <option value="admin">{t('Admin')}</option>
            <option value="user">{t('user')}</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          {id ? t('updateUser') : t('Create User')}
        </button>
      </form>
    </div>
  );
};

export default UserFormPage;
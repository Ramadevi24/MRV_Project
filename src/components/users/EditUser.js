import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';
import '../../css/EditForm.css';

const EditUser = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams(); // User ID from URL
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
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
    // Fetch both user data and dropdown options in parallel
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch user data and dropdown options simultaneously
      const [userResponse, tenantsResponse, organizationsResponse, tenantRolesResponse, userRolesResponse] = await Promise.all([
        axios.get(`https://atlas.smartgeoapps.com/MRVAPI/api/User/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('AuthToken')}` }
        }),
        axios.get('https://atlas.smartgeoapps.com/MRVAPI/api/Tenant', {
          headers: { Authorization: `Bearer ${localStorage.getItem('AuthToken')}` }
        }),
        axios.get('https://atlas.smartgeoapps.com/MRVAPI/api/Organization', {
          headers: { Authorization: `Bearer ${localStorage.getItem('AuthToken')}` }
        }),
        axios.get('https://atlas.smartgeoapps.com/MRVAPI/api/TenantRole', {
          headers: { Authorization: `Bearer ${localStorage.getItem('AuthToken')}` }
        }),
        axios.get('https://atlas.smartgeoapps.com/MRVAPI/api/Role/Roles', {
          headers: { Authorization: `Bearer ${localStorage.getItem('AuthToken')}` }
        })
      ]);

      const userData = userResponse.data;
      const tenants = tenantsResponse.data.$values;
      const organizations = organizationsResponse.data.$values;
      const tenantRoles = tenantRolesResponse.data.$values;
      const userRoles = userRolesResponse.data.$values;

      // Set dropdown options
      setDropdownOptions({
        tenants,
        organizations,
        tenantRoles,
        userRoles
      });

      // Map tenantName, organizationName, tenantRoleName, and userRole to IDs
      mapDropdownValues(userData, tenants, organizations, tenantRoles, userRoles);

      // Set the form data for first name, last name, email, and phone
      setFormData((prevFormData) => ({
        ...prevFormData,
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        phone: userData.phone
      }));

    } catch (error) {
      toast.error(t('Error fetching data'));
    }
  };

  const mapDropdownValues = (userData, tenants, organizations, tenantRoles, userRoles) => {
    const { tenantName, organizationName, roleName: tenantRoleName, userRole: userRoleName } = userData;

    // Find tenant ID by tenantName
    const initialTenant = tenants.find(tenant => tenant.name === tenantName);
    if (initialTenant) {
      setFormData((prevFormData) => ({ ...prevFormData, tenantID: initialTenant.tenantID }));
    }

    // Find organization ID by organizationName
    const initialOrganization = organizations.find(org => org.organizationName === organizationName);
    if (initialOrganization) {
      setFormData((prevFormData) => ({ ...prevFormData, organizationID: initialOrganization.organizationID }));
    }

    // Find tenant role ID by tenantRoleName
    const initialTenantRole = tenantRoles.find(role => role.roleName === tenantRoleName);
    if (initialTenantRole) {
      setFormData((prevFormData) => ({ ...prevFormData, tenantRoleID: initialTenantRole.tenantRoleID }));
    }

    // Find user role by userRoleName
    const initialUserRole = userRoles.find(role => role.roleName === userRoleName);
    if (initialUserRole) {
      setFormData((prevFormData) => ({ ...prevFormData, userRole: initialUserRole.roleName }));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updateFormData = { ...formData,
      loginType: 'custom'
     };
    try {
      await axios.put(`https://atlas.smartgeoapps.com/MRVAPI/api/User/${id}`, updateFormData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('AuthToken')}` }
      });
      toast.success(t('User updated successfully'));
      navigate('/Mrv/users');
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
      <form onSubmit={handleSubmit} className='form-container'>
          <div className="col-6">
            <label>{t('First Name')}<span style={{ color: 'red' }}>*</span></label>
            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
          </div>
          <div className="col-6">
            <label>{t('Last Name')}<span style={{ color: 'red' }}>*</span></label>
            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
          </div>
          <div className="col-6">
            <label>{t('Email')}<span style={{ color: 'red' }}>*</span></label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="col-6">
            <label>{t('Phone')}<span style={{ color: 'red' }}>*</span></label>
            <input type="number" name="phone" value={formData.phone} onChange={handleChange} required />
          </div>
          <div className="col-6">
            <label className='custum-dropdown-label'>{t('Tenant ID')}<span style={{ color: 'red' }}>*</span></label>
            <select className='custum-dropdown-select' name="tenantID" value={formData.tenantID} onChange={handleChange} required>
              <option value="">{t('Select Tenant')}</option>
              {dropdownOptions.tenants?.map(tenant => (
                <option key={tenant.tenantID} value={tenant.tenantID}>{tenant.name}</option>
              ))}
            </select>
        </div>
          <div className="col-6">
            <label className='custum-dropdown-label'>{t('Organization ID')}<span style={{ color: 'red' }}>*</span></label>
            <select className='custum-dropdown-select' name="organizationID" value={formData.organizationID} onChange={handleChange} required>
              <option value="">{t('Select Organization')}</option>
              {dropdownOptions.organizations?.map(org => (
                <option key={org.organizationID} value={org.organizationID}>{org.organizationName}</option>
              ))}
            </select>
          </div>
          {/* <div className="col-6">
            <label className='custum-dropdown-label'>{t('Tenant Role ID')}<span style={{ color: 'red' }}>*</span></label>
            <select className='custum-dropdown-select' name="tenantRoleID" value={formData.tenantRoleID} onChange={handleChange} required>
              <option value="">{t('Select Tenant Role')}</option>
              {dropdownOptions.tenantRoles?.map(role => (
                <option key={role.tenantRoleID} value={role.tenantRoleID}>{role.roleName}</option>
              ))}
            </select>
          </div> */}
          <div className="col-6">
            <label className='custum-dropdown-label'>{t('User Role')}<span style={{ color: 'red' }}>*</span></label>
            <select className='custum-dropdown-select' name="userRole" value={formData.userRole} onChange={handleChange} required>
              <option value="">{t('Select User Role')}</option>
              {dropdownOptions.userRoles?.map(role => (
                <option key={role.roleID} value={role.roleName}>{role.roleName}</option>
              ))}
            </select>
        </div>
        <button type="submit" className="btn">{t('Update User')}</button>
      </form>
    </div>
  );
};

export default EditUser;

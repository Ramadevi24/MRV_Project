import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';
import '../../css/EditForm.css';

const EditUser = ({ userPermissions }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams(); // User ID from URL
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    tenantID: userPermissions.tenantID || '', // Default to userPermissions.tenantID if available
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
    fetchData();
    
    // If userPermissions.tenantID exists, fetch organizations and roles for that tenant
    if (userPermissions.tenantID) {
      fetchOrganizationsAndRoles(userPermissions.tenantID);
    }
  }, []);

  const fetchData = async () => {
    try {
      const [userResponse, tenantsResponse] = await Promise.all([
        axios.get(`https://atlas.smartgeoapps.com/MRVAPI/api/User/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('AuthToken')}` }
        }),
        axios.get('https://atlas.smartgeoapps.com/MRVAPI/api/Tenant', {
          headers: { Authorization: `Bearer ${localStorage.getItem('AuthToken')}` }
        })
      ]);

      const userData = userResponse.data;
      const tenants = tenantsResponse.data.$values;

      // Set dropdown options
      setDropdownOptions(prevState => ({
        ...prevState,
        tenants
      }));

      // Map tenantName, organizationName, tenantRoleName, and userRole to IDs
      mapDropdownValues(userData, tenants);

      // Set the form data for first name, last name, email, and phone
      setFormData(prevFormData => ({
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

  const mapDropdownValues = (userData, tenants) => {
    const { tenantName, organizationName, roleName: tenantRoleName, userRole: userRoleName } = userData;

    // Find tenant ID by tenantName
    const initialTenant = tenants.find(tenant => tenant.name === tenantName);
    if (initialTenant) {
      setFormData(prevFormData => ({ ...prevFormData, tenantID: initialTenant.tenantID }));
      // Fetch organizations and roles based on tenant
      fetchOrganizationsAndRoles(initialTenant.tenantID);
    }
  };

  // Fetch organizations and user roles based on the selected tenantID
  const fetchOrganizationsAndRoles = async (tenantID) => {
    try {
      const roleUrl = tenantID
        ? `https://atlas.smartgeoapps.com/MRVAPI/api/Role/Roles?tenantId=${tenantID}`
        : 'https://atlas.smartgeoapps.com/MRVAPI/api/Role/Roles';

      const organizationUrl = tenantID
        ? `https://atlas.smartgeoapps.com/MRVAPI/api/Organization/getOrganizations/${tenantID}`
        : 'https://atlas.smartgeoapps.com/MRVAPI/api/Organization';

      const [organizations, userRoles] = await Promise.all([
        axios.get(organizationUrl, {
          headers: { Authorization: `Bearer ${localStorage.getItem('AuthToken')}` }
        }),
        axios.get(roleUrl, {
          headers: { Authorization: `Bearer ${localStorage.getItem('AuthToken')}` }
        })
      ]);

      setDropdownOptions(prevState => ({
        ...prevState,
        organizations: organizations.data.$values,
        userRoles: userRoles.data.$values
      }));
    } catch (error) {
      toast.error(t('Error fetching organizations and roles'));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({ ...prevFormData, [name]: value }));

    if (name === 'tenantID') {
      // Fetch organizations and roles when tenantID changes
      fetchOrganizationsAndRoles(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updateFormData = { ...formData, loginType: 'custom' };
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
    <div className="container ">
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
        {!userPermissions.tenantID && (
          <div className="col-6">
            <label className='custum-dropdown-label'>{t('Tenant ID')}<span style={{ color: 'red' }}>*</span></label>
            <select className='custum-dropdown-select' name="tenantID" value={formData.tenantID} onChange={handleChange} required>
              <option value="">{t('Select Tenant')}</option>
              {dropdownOptions.tenants?.map(tenant => (
                <option key={tenant.tenantID} value={tenant.tenantID}>{tenant.name}</option>
              ))}
            </select>
          </div>
        )}
        <div className="col-6">
          <label className='custum-dropdown-label'>{t('Organization ID')}<span style={{ color: 'red' }}>*</span></label>
          <select className='custum-dropdown-select' name="organizationID" value={formData.organizationID} onChange={handleChange} required>
            <option value="">{t('Select Organization')}</option>
            {dropdownOptions.organizations?.map(org => (
              <option key={org.organizationID} value={org.organizationID}>{org.organizationName}</option>
            ))}
          </select>
        </div>
        <div className="col-6">
          <label className='custum-dropdown-label'>{t('User Role')}<span style={{ color: 'red' }}>*</span></label>
          <select className='custum-dropdown-select' name="userRole" value={formData.userRole} onChange={handleChange} required>
            <option value="">{t('Select User Role')}</option>
            {dropdownOptions.userRoles?.map(role => (
              <option key={role.roleID} value={role.roleName}>{role.roleName}</option>
            ))}
          </select>
        </div>
        <div>
          <button type="submit" className="btn" style={{marginTop:'30px'}}>{t('Update User')}</button>
        </div>
       
      </form>
    </div>
  );
};

export default EditUser;

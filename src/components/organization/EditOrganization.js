import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import '../../css/EditForm.css';
import { useParams } from 'react-router-dom';
import DropdownTreeSelect from 'react-dropdown-tree-select';
import 'react-dropdown-tree-select/dist/styles.css';
import { useNavigate } from 'react-router-dom';
import  {formatDate}  from '../../utils/formateDate.js';

const EditOrganization = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    tenantID: '',
    tenantName: '', // Add tenantName to formData
    organizationName: '',
    description: '',
    establishedDate: '',
    contactEmail: '',
    contactPhone: '',
    address: '',
    categoryIDs: [],
    locations: [{ latitude: '', longitude: '', address: '' }],
  });
  const [tenants, setTenants] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchOrganization();
    fetchCategories();
  }, []);

  const fetchOrganization = async () => {
    try {
      const response = await axios.get(`https://atlas.smartgeoapps.com/MRVAPI/api/Organization/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = response.data;
      data.establishedDate = formatDate(data.establishedDate);
      setFormData(data);
      fetchTenants(data.tenantName);
    } catch (error) {
      toast.error(t('errorFetchingData'));
    }
  };

  const fetchTenants = async (tenantName) => {
    try {
      const response = await axios.get('https://atlas.smartgeoapps.com/MRVAPI/api/Tenant', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const tenantsData = response.data.$values;
      setTenants(tenantsData);

      const initialTenant = tenantsData.find(tenant => tenant.name === tenantName);
      if (initialTenant) {
        setFormData(prevFormData => ({ ...prevFormData, tenantID: initialTenant.tenantID }));
      }
    } catch (error) {
      toast.error(t('errorFetchingData'));
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('https://atlas.smartgeoapps.com/MRVAPI/api/Categories/level1and2', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setCategories(response.data.$values);
    } catch (error) {
      toast.error(t('errorFetchingData'));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLocationChange = (index, e) => {
    const { name, value } = e.target;
    const newLocations = formData.locations.map((location, i) =>
      i === index ? { ...location, [name]: value } : location
    );
    setFormData({ ...formData, locations: newLocations });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://atlas.smartgeoapps.com/MRVAPI/api/Organization/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      toast.success(t('Organization updated successfully'));
      navigate('/organizations');
    } catch (error) {
      toast.error(t('updateError'));
    }
  };

  const data = categories.map(category => ({
    label: category.categoryName,
    value: category.categoryID,
    children: category.subcategories?.map(subcategory => ({
      label: subcategory.subcategoryName,
      value: subcategory.subcategoryID
    }))
  }));

  const handleCategoryChange = (currentNode, selectedNodes) => {
    const selectedIds = selectedNodes?.map(node => node.value);
    setFormData({ ...formData, categoryIDs: selectedIds });
  };

  return (
    <div className="container">
      <h2>{t('Edit Organization')}</h2>
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <div className="col">
            <label>{t('tenantId')}<span className="text-danger">*</span></label>
            <select name="tenantID" value={formData.tenantID} onChange={handleChange} className="form-control" required>
              <option value="">{t('selectTenant')}</option>
              {tenants.map(tenant => (
                <option key={tenant.tenantID} value={tenant.tenantID}>{tenant.name}</option>
              ))}
            </select>
          </div>
          <div className="col">
            <label>{t('organizationName')}<span className="text-danger">*</span></label>
            <input type="text" name="organizationName" value={formData.organizationName} onChange={handleChange} className="form-control" required />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col">
            <label>{t('description')}<span className="text-danger">*</span></label>
            <textarea name="description" value={formData.description} onChange={handleChange} className="form-control" required></textarea>
          </div>
          <div className="col">
            <label>{t('establishedDate')}<span className="text-danger">*</span></label>
            <input type="date" name="establishedDate" value={formData.establishedDate} onChange={handleChange} className="form-control" required />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col">
            <label>{t('contactEmail')}<span className="text-danger">*</span></label>
            <input type="email" name="contactEmail" value={formData.contactEmail} onChange={handleChange} className="form-control" required />
          </div>
          <div className="col">
            <label>{t('contactPhone')}<span className="text-danger">*</span></label>
            <input type="number" name="contactPhone" value={formData.contactPhone} onChange={handleChange} className="form-control" required />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col">
            <label>{t('address')}<span className="text-danger">*</span></label>
            <input type="text" name="address" value={formData.address} onChange={handleChange} className="form-control" required />
          </div>
          <div className="col">
            <label>{t('categoryIDs')}<span className="text-danger">*</span></label>
            <DropdownTreeSelect
              data={data}
              onChange={handleCategoryChange}
              className="form-control"
              texts={{ placeholder: 'Select categories' }}
            />
          </div>
        </div>
        {formData.locations.$values?.map((location, index) => (
          <div className="row mb-3" key={index}>
            <div className="col">
              <label>{t('latitude')}<span className="text-danger">*</span></label>
              <input type="text" name="latitude" value={location.latitude} onChange={(e) => handleLocationChange(index, e)} className="form-control" required />
            </div>
            <div className="col">
              <label>{t('longitude')}<span className="text-danger">*</span></label>
              <input type="text" name="longitude" value={location.longitude} onChange={(e) => handleLocationChange(index, e)} className="form-control" required />
            </div>
            <div className="col">
              <label>{t('locationAddress')}<span className="text-danger">*</span></label>
              <input type="text" name="address" value={location.address} onChange={(e) => handleLocationChange(index, e)} className="form-control" required />
            </div>
          </div>
        ))}
        <button type="submit" className="btn">{t('submit')}</button>
      </form>
    </div>
  );
};

export default EditOrganization;
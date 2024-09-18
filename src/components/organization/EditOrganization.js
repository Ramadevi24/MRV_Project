import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import '../../css/EditForm.css';
import { useParams } from 'react-router-dom';
import DropdownTreeSelect from 'react-dropdown-tree-select';
import 'react-dropdown-tree-select/dist/styles.css';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../../utils/formateDate.js';
import "../../css/custom-dropdown.css";

const transformData = (categories, selectedCategoryIDs) => {
  return categories
    .filter(
      (category) => category.categoryName && category.categoryCode
    )
    .map((category) => ({
      label: `${category.categoryCode} - ${category.categoryName}`, 
      value:  category.categoryID,
      checked: selectedCategoryIDs?.includes(category.categoryID),
      children: category.subCategories
        ? transformData(category.subCategories.$values || selectedCategoryIDs)
        : [],
    }));
};

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
  const [treeData, setTreeData] = useState([]);

  useEffect(() => {
    fetchOrganization();
    fetchCategories();
  }, []);

  console.log(formData, 'formData');

  useEffect(() => {
    setTreeData(transformData(categories, formData?.categories?.$values));
  }, [categories, formData.categoryIDs]);

  const handleCategoryChange = (currentNode, selectedNodes) => {
    const categoryIds = selectedNodes.map((node) => node.value);
    setFormData({ ...formData, categoryIDs: categoryIds });
  };

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

  return (
    <div className="container">
      <div className='form-heading-row'>
        <div>
        <h2 className='edit-form-header'>{t('Edit Organization')}</h2>
        </div>
        <div>
        <button onClick={() => navigate(-1)} className='form_back'>{t('Back')}</button>
        </div>
        </div>
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
            <label>
              {t("categoryIDs")}
              <span className="text-danger">*</span>
            </label>
            <DropdownTreeSelect
              data={treeData}
              onChange={handleCategoryChange}
              keepTreeOnSearch
              keepOpenOnSelect
              texts={{ placeholder: "Select Categories" }}
              className="category-tree-dropdown"
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
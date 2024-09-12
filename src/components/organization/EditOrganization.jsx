import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Select from 'react-select';
import TreeSelect from 'react-select-tree';
import '../../css/EditOrganization.css';


const EditOrganization = () => {
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const [tenants, setTenants] = useState([]);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    tenantId: '',
    name: '',
    description: '',
    establishedDate: '',
    contactEmail: '',
    contactPhone: '',
    address: '',
    categoryIds: [],
    latitude: '',
    longitude: '',
    locationAddress: ''
  });

  useEffect(() => {
    fetchTenants();
    fetchCategories();
    fetchOrganizationData();
  }, []);

  const fetchTenants = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/Tenant');
      setTenants(response.data.$values);
    } catch (error) {
      toast.error(t('errorFetchingData'));
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/Categories/level1and2');
      setCategories(response.data.$values);
    } catch (error) {
      toast.error(t('errorFetchingData'));
    }
  };

  const fetchOrganizationData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/Organization/${id}`);
      setFormData(response.data.$values);
    } catch (error) {
      toast.error(t('errorFetchingData'));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (selectedOption, name) => {
    setFormData({ ...formData, [name]: selectedOption });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/Organization/${id}`, formData);
      toast.success(t('updateSuccess'));
    } catch (error) {
      toast.error(t('updateError'));
    }
  };

  return (
    <div className="container">
      <h2>{t('editOrganization')}</h2>
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <div className="col">
            <label>{t('tenantId')}</label>
            <Select
              options={tenants.map(tenant => ({ value: tenant.tenantID, label: tenant.name }))}
              value={tenants.find(tenant => tenant.tenantID === formData.tenantId)}
              onChange={(selectedOption) => handleSelectChange(selectedOption.value, 'tenantId')}
              required
            />
          </div>
          <div className="col">
            <label>{t('organizationName')}</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="mb-3">
          <label>{t('description')}</label>
          <textarea
            className="form-control"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="row mb-3">
          <div className="col">
            <label>{t('establishedDate')}</label>
            <input
              type="date"
              className="form-control"
              name="establishedDate"
              value={formData.establishedDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col">
            <label>{t('contactEmail')}</label>
            <input
              type="email"
              className="form-control"
              name="contactEmail"
              value={formData.contactEmail}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col">
            <label>{t('contactPhone')}</label>
            <input
              type="number"
              className="form-control"
              name="contactPhone"
              value={formData.contactPhone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col">
            <label>{t('address')}</label>
            <input
              type="text"
              className="form-control"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="mb-3">
          <label>{t('categoryIds')}</label>
          <TreeSelect
            options={categories}
            value={formData.categoryIds}
            onChange={(selectedOption) => handleSelectChange(selectedOption, 'categoryIds')}
            isMulti
            required
          />
        </div>
        <div className="row mb-3">
          <div className="col">
            <label>{t('latitude')}</label>
            <input
              type="text"
              className="form-control"
              name="latitude"
              value={formData.latitude}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col">
            <label>{t('longitude')}</label>
            <input
              type="text"
              className="form-control"
              name="longitude"
              value={formData.longitude}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col">
            <label>{t('locationAddress')}</label>
            <input
              type="text"
              className="form-control"
              name="locationAddress"
              value={formData.locationAddress}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary">{t('submit')}</button>
      </form>
    </div>
  );
};

export default EditOrganization;
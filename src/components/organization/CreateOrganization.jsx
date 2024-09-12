import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';
import 'bootstrap/dist/css/bootstrap.min.css';
import Select from 'react-select';
import TreeSelect from 'react-select-tree';
import '../../css/CreateOrganization.css';

const CreateOrganization = () => {
  const { t, i18n } = useTranslation();
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
  }, []);

  const fetchTenants = async () => {
    try {
      const response = await axios.get('/api/tenants');
      setTenants(response.data);
    } catch (error) {
      toast.error(t('errorFetchingData'));
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/api/categories');
      setCategories(response.data);
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
      await axios.post('/api/organizations', formData);
      toast.success(t('createSuccess'));
    } catch (error) {
      toast.error(t('createError'));
    }
  };

  return (
    <div className="container">
      <h2>{t('Create Organization')}</h2>
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <div className="col">
            <label>{t('Tenant ID')}</label>
            <Select
              options={tenants.map(tenant => ({ value: tenant.id, label: tenant.name }))}
              onChange={(selectedOption) => handleSelectChange(selectedOption.value, 'tenantId')}
              required
            />
          </div>
          <div className="col">
            <label>{t('Organization Name')}</label>
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
          <label>{t('Description')}</label>
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
            <label>{t('Established Date')}</label>
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
            <label>{t('Contact Email')}</label>
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
            <label>{t('Contact Phone')}</label>
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
            <label>{t('Address')}</label>
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
            onChange={(selectedOption) => handleSelectChange(selectedOption, 'categoryIds')}
            isMulti
            required
          />
        </div>
        <div className="row mb-3">
          <div className="col">
            <label>{t('Latitude')}</label>
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
            <label>{t('Longitude')}</label>
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
            <label>{t('Location Address')}</label>
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
        <button type="submit" className="btn btn-primary">{t('Submit')}</button>
      </form>
    </div>
  );
};

export default CreateOrganization;
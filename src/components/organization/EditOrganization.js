import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import '../../css/CreateForm.css';
import { useParams } from 'react-router-dom';

const EditOrganization = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    tenantId: '',
    name: '',
    description: '',
    establishedDate: '',
    contactEmail: '',
    contactPhone: '',
    address: '',
    categoryIds: [],
    locations: [{ latitude: '', longitude: '', address: '' }],
  });
  const [tenants, setTenants] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchOrganization();
    fetchTenants();
    fetchCategories();
  }, []);

  const fetchOrganization = async () => {
    try {
      const response = await axios.get(`/api/organizations/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setFormData(response.data);
    } catch (error) {
      toast.error(t('errorFetchingData'));
    }
  };

  const fetchTenants = async () => {
    try {
      const response = await axios.get('/api/tenants', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setTenants(response.data);
    } catch (error) {
      toast.error(t('errorFetchingData'));
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/api/categories', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setCategories(response.data);
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
      await axios.put(`/api/organizations/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
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
            <label>{t('tenantId')}<span className="text-danger">*</span></label>
            <select name="tenantId" value={formData.tenantId} onChange={handleChange} className="form-control" required>
              <option value="">{t('selectTenant')}</option>
              {tenants.map(tenant => (
                <option key={tenant.id} value={tenant.id}>{tenant.name}</option>
              ))}
            </select>
          </div>
          <div className="col">
            <label>{t('organizationName')}<span className="text-danger">*</span></label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} className="form-control" required />
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
            <label>{t('categoryIds')}<span className="text-danger">*</span></label>
            <select multiple name="categoryIds" value={formData.categoryIds} onChange={handleChange} className="form-control" required>
              {categories.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </div>
        </div>
        {formData.locations.map((location, index) => (
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
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const TenantFormPage = () => {
  const [formData, setFormData] = useState({ tenantName: '', description: '' });
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { tenantID } = useParams();

  console.log(formData, 'formData');

  useEffect(() => {
    if (tenantID) {
      fetchTenant();
    }
  }, [tenantID]);

  const fetchTenant = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/Tenant/${tenantID}`);
      setFormData(response.data.$values);
    } catch (error) {
      toast.error(t('error.fetchTenant'));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (tenantID) {
        await axios.put(`http://localhost:5000/api/Tenant/${tenantID}`, formData);
        toast.success(t('success.updateTenant'));
      } else {
        await axios.post('http://localhost:5000/api/Tenant/', formData);
        toast.success(t('success.createTenant'));
      }
      navigate('/');
    } catch (error) {
      toast.error(t('error.submitTenant'));
    }
  };

  return (
    <div className="container mt-5">
      <h2>{tenantID ? t('editTenant') : t('Create Tenant')}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">{t('Tenant Name')}</label>
          <input
            type="text"
            className="form-control"
            name="tenantName"
            value={formData.tenantName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">{t('Description')}</label>
          <textarea
            className="form-control"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {t('Submit')}
        </button>
      </form>
    </div>
  );
};

export default TenantFormPage;
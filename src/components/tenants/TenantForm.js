import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import '../../css/CreateForm.css';

const TenantForm = () => {
  const { t } = useTranslation();
  const [tenantName, setTenantName] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!tenantName) newErrors.tenantName = t('This field is required');
    if (!description) newErrors.description = t('This field is required');
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await axios.post('/api/tenants', { tenantName, description }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      toast.success(t('Tenant created successfully'));
    } catch (error) {
      toast.error(t('Error creating tenant'));
    }
  };

  return (
    <div className="container">
      <h2>{t('Create Tenant')}</h2>
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <label>
            {t('Tenant Name')} <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            value={tenantName}
            onChange={(e) => setTenantName(e.target.value)}
            className={errors.tenantName ? 'form-control is-invalid' : 'form-control'}
          />
          {errors.tenantName && <div className="invalid-feedback">{errors.tenantName}</div>}
        </div>
        <div className="row mb-3">
          <label>
            {t('Description')} <span className="text-danger">*</span>
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={errors.description ? 'form-control is-invalid' : 'form-control'}
          />
          {errors.description && <div className="invalid-feedback">{errors.description}</div>}
        </div>
        <button type="submit" className="btn btn-primary">{t('Create Tenant')}</button>
      </form>
    </div>
  );
};

export default TenantForm;
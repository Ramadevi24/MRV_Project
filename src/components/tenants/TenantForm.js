import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import '../../css/CreateForm.css';
import { useNavigate } from 'react-router-dom';

const TenantForm = () => {
  const { t } = useTranslation();
  const [name, setTenantName] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!name) newErrors.name = t('This field is required');
    if (!description) newErrors.description = t('This field is required');
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await axios.post('https://atlas.smartgeoapps.com/MRVAPI/api/Tenant', { name, description }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      toast.success(t('Tenant created successfully'));
      navigate('/tenants');
    } catch (error) {
      toast.error(t('Error creating tenant'));
    }
  };

  return (
    <div className="container" style={{marginTop: '3rem',padding:'40px'}}>
      <div className='form-heading-row'>
        <div>
        <h2 className='create-form-header'>{t('Create Tenant')}</h2>
        </div>
        <div>
        <button onClick={() => navigate(-1)} className='form_back'>{t('Back')}</button>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <label>
            {t('Tenant Name')} <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setTenantName(e.target.value)}
            className={errors.name ? 'form-control is-invalid' : 'form-control'}
          />
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
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
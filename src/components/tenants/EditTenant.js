import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import '../../css/EditForm.css';

const EditTenant = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [tenantName, setTenantName] = useState('');
  const [description, setDescription] = useState('');
  const [regionID, setRegionID] = useState('');
  const [errors, setErrors] = useState({});

  const fetchTenant = async () => {
    try {
      const response = await axios.get(`https://atlas.smartgeoapps.com/MRVAPI/api/Tenant/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('AuthToken')}` },
      });
      const tenant = response.data;
      setTenantName(tenant.name);
      setDescription(tenant.description);
    } catch (error) {
      toast.error(t('Error fetching tenant details'));
    }
  };
  
  useEffect(() => {
    fetchTenant();
  }, [id]);

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

    const updatedTenant = { name:tenantName, description, regionID };

    try {
      await axios.put(`https://atlas.smartgeoapps.com/MRVAPI/api/Tenant/${id}`, updatedTenant, {
        headers: { Authorization: `Bearer ${localStorage.getItem('AuthToken')}` },
      });
      toast.success(t('Tenant updated successfully'));
      navigate('/tenants');
    } catch (error) {
      toast.error(t('Error updating tenant'));
    }
  };

  return (
    <div className="container">
      <div className='form-heading-row'>
        <div>
        <h2 className='edit-form-header'>{t('Edit Tenant')}</h2>
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
        <div className="row mb-3">
          <label>
            {t('Region ID')} <span className="text-danger">*</span>
          </label>
          <input
            type="number"
            value={regionID}
            onChange={(e) => setRegionID(e.target.value)}
            className={errors.regionID ? 'form-control is-invalid' : 'form-control'}
          />
          {errors.regionID && <div className="invalid-feedback">{errors.regionID}</div>}
        </div>
        <button type="submit" className="btn btn-primary">{t('Update Tenant')}</button>
      </form>
    </div>
  );
};

export default EditTenant;
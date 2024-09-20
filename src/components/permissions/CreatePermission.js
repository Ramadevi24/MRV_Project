import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import '../../css/CreateForm.css';

const CreatePermission = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    permissionDisplayName: '',
    description: '',
    permissionuniquename: '',
    permissionGroup: ''
  });
  const [permissionGroups, setPermissionGroups] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchPermissionGroups();
  }, []);

  const fetchPermissionGroups = async () => {
    try {
      const response = await axios.get('/api/permission-groups', {
        headers: { Authorization: `Bearer ${localStorage.getItem('AuthToken')}` }
      });
      setPermissionGroups(response.data);
    } catch (error) {
      toast.error(t('errorFetchingPermissionGroups'));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.permissionDisplayName) newErrors.permissionDisplayName = t('required');
    if (!formData.description) newErrors.description = t('required');
    if (!formData.permissionuniquename) newErrors.permissionuniquename = t('required');
    if (!formData.permissionGroup) newErrors.permissionGroup = t('required');
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await axios.post('https://atlas.smartgeoapps.com/MRVAPI/api/Permissions', formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('AuthToken')}` }
      });
      toast.success(t('permissionCreated'));
      navigate('/permissions');
    } catch (error) {
      toast.error(t('errorCreatingPermission'));
    }
  };

  return (
    <div className="container">
      <div className='form-heading-row'>
        <div>
        <h2 className='create-form-header'>{t('Create Permission')}</h2>
        </div>
        <div>
        <button onClick={() => navigate(-1)} className='form_back'>{t('Back')}</button>
        </div>
        </div>
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <div className="col">
            <label>{t('Permission Display Name')} <span className="text-danger">*</span></label>
            <input
              type="text"
              name="permissionDisplayName"
              value={formData.permissionDisplayName}
              onChange={handleChange}
              className={`form-control ${errors.permissionDisplayName ? 'is-invalid' : ''}`}
            />
            {errors.permissionDisplayName && <div className="invalid-feedback">{errors.permissionDisplayName}</div>}
          </div>
          <div className="col">
            <label>{t('Description')} <span className="text-danger">*</span></label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={`form-control ${errors.description ? 'is-invalid' : ''}`}
            />
            {errors.description && <div className="invalid-feedback">{errors.description}</div>}
          </div>
        </div>
        <div className="row mb-3">
          <div className="col">
            <label>{t('Permission unique Name')} <span className="text-danger">*</span></label>
            <input
              type="text"
              name="permissionuniquename"
              value={formData.permissionuniquename}
              onChange={handleChange}
              className={`form-control ${errors.permissionuniquename ? 'is-invalid' : ''}`}
            />
            {errors.permissionuniquename && <div className="invalid-feedback">{errors.permissionuniquename}</div>}
          </div>
          <div className="col">
            <label>{t('Permission Group')} <span className="text-danger">*</span></label>
            <select
              name="permissionGroup"
              value={formData.permissionGroup}
              onChange={handleChange}
              className={`form-control ${errors.permissionGroup ? 'is-invalid' : ''}`}
            >
              <option value="">{t('Select Permission Group')}</option>
              {permissionGroups.map(group => (
                <option key={group.id} value={group.id}>{group.name}</option>
              ))}
            </select>
            {errors.permissionGroup && <div className="invalid-feedback">{errors.permissionGroup}</div>}
          </div>
        </div>
        <button type="submit" className="btn">{t('Create Permission')}</button>
      </form>
    </div>
  );
};

export default CreatePermission;
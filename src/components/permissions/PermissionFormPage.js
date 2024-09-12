import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import 'bootstrap/dist/css/bootstrap.min.css';

const PermissionFormPage = () => {
  const [formData, setFormData] = useState({ permissionName: '', description: '' });
  const { permissionID} = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();


  useEffect(() => {
    if (permissionID) {
      fetchPermission();
    }
  }, [permissionID]);

  const fetchPermission = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/Permissions/${permissionID}`);
      setFormData(response.data);
    } catch (error) {
        toast.error(t('error.fetchPermission'), 'error');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (permissionID) {
        await axios.put(`http://localhost:5000/api/Permissions/${permissionID}`, formData);
        toast.success(t('success.updatePermission'), 'success');
      } else {
        await axios.post('http://localhost:5000/api/Permissions', formData);
        toast.success(t('success.createPermission'), 'success');
      }
      navigate('/');
    } catch (error) {
        toast.error(t('error.submitPermission'), 'error');
    }
  };

  return (
    <div className="container mt-5">
      <h2>{permissionID ? t('editPermission') : t('create Permission')}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>{t('Permission Display Name')}</label>
          <input
            type="text"
            className="form-control"
            name="permissionDisplayName"
            value={formData.permissionDisplayName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>{t('Description')}</label>
          <textarea
            className="form-control"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>{t('Permission Unique Name')}</label>
          <input
            type="text"
            className="form-control"
            name="permissionUniqueName"
            value={formData.permissionUniqueName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>{t('Permission Group')}</label>
          <select
            className="form-control"
            name="permissionGroup"
            value={formData.permissionGroup}
            onChange={handleChange}
            required
          >
            <option value="">{t('Select Group')}</option>
            <option value="group1">{t('group1')}</option>
            <option value="group2">{t('group2')}</option>
            <option value="group3">{t('group3')}</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          {t('Submit')}
        </button>
      </form>
    </div>
  );
};

export default PermissionFormPage;
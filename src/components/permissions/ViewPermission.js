import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../../css/CreateForm.css';
import { useNavigate } from 'react-router-dom';

const ViewPermission = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { permissionID } = useParams();
  const [permission, setPermission] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPermission();
  }, []);

  const fetchPermission = async () => {
    try {
      const response = await axios.get(`https://atlas.smartgeoapps.com/MRVAPI/api/Permissions/${permissionID}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('AuthToken')}` }
      });
      setPermission(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      // Handle error
    }
  };

  if (loading) {
    return (
      <div className="spinner-border" role="status">
        <span className="sr-only">{t('loading')}</span>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className='form-heading-row'>
        <div>
        <h2 className='view-form-header'>{t('View Permission')}</h2>
        </div>
        <div>
        <button onClick={() => navigate(-1)} className='form_back'>{t('Back')}</button>
        </div>
        </div>
      <table className="table custom-table table-striped table-hover">
        <tbody>
          <tr>
            <th>{t('permissionID')}</th>
            <td>{permission?.permissionID}</td>
          </tr>
          <tr>
            <th>{t('permissionDisplayName')}</th>
            <td>{permission?.permissionDisplayName}</td>
          </tr>
          <tr>
            <th>{t('description')}</th>
            <td>{permission?.description}</td>
          </tr>
          <tr>
            <th>{t('permissionuniquename')}</th>
            <td>{permission?.permissionuniquename}</td>
          </tr>
          <tr>
            <th>{t('permissionGroup')}</th>
            <td>{permission?.permissionGroup}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ViewPermission;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import '../../css/ViewForm.css';

const ViewTenant = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [tenant, setTenant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTenant();
  }, [id]);

  const fetchTenant = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/Tenant/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setTenant(response.data.$values);
      setLoading(false);
    } catch (error) {
      toast.error(t('Error fetching tenant details'));
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="spinner">Loading...</div>;
  }

  return (
    <div className="container">
      <h2>{t('View Tenant')}</h2>
      <table className="custom-table table table-striped table-hover">
        <tbody>
          <tr>
            <th>{t('Tenant ID')}</th>
            <td>{tenant?.tenantID}</td>
          </tr>
          <tr>
            <th>{t('Tenant Name')}</th>
            <td>{tenant?.name}</td>
          </tr>
          <tr>
            <th>{t('Description')}</th>
            <td>{tenant?.description}</td>
          </tr>
          <tr>
            <th>{t('Created Date')}</th>
            <td>{tenant?.createdDate}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ViewTenant;
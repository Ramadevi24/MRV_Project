import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast } from 'react-toastify';

const TenantDetailPage = () => {
  const [tenant, setTenant] = useState({});
  const { t } = useTranslation();
  const { tenantID } = useParams();

  useEffect(() => {
    fetchTenant();
  }, [tenantID]);

  const fetchTenant = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/Tenant/${tenantID}`);
      setTenant(response.data.$values);
    } catch (error) {
      toast.error(t('error.fetchTenant'));
    }
  };

  return (
    <div className="container mt-5">
      <h2>{t('tenantDetails')}</h2>
      <table className="table table-bordered">
        <tbody>
          <tr>
            <th>{t('tenantName')}</th>
            <td>{tenant.name}</td>
          </tr>
          <tr>
            <th>{t('description')}</th>
            <td>{tenant.description}</td>
          </tr>
          <tr>
            <th>{t('createdDate')}</th>
            <td>{tenant.createdDate}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TenantDetailPage;
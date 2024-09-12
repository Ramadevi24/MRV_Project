import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/ViewOrganization.css';

const ViewOrganization = () => {
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const [organization, setOrganization] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrganizationData();
  }, []);

  const fetchOrganizationData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/Organization/${id}`);
      setOrganization(response.data);
    } catch (error) {
      setError(t('errorFetchingData'));
    }
  };

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  if (!organization) {
    return <div className="spinner-border text-primary" role="status"><span className="visually-hidden">{t('loading')}</span></div>;
  }

  return (
    <div className="container">
      <h2>{t('viewOrganization')}</h2>
      <table className="table table-striped table-hover">
        <tbody>
          <tr>
            <th>{t('organizationName')}</th>
            <td>{organization.name}</td>
          </tr>
          <tr>
            <th>{t('description')}</th>
            <td>{organization.description}</td>
          </tr>
          <tr>
            <th>{t('establishedDate')}</th>
            <td>{organization.establishedDate}</td>
          </tr>
          <tr>
            <th>{t('contactEmail')}</th>
            <td>{organization.contactEmail}</td>
          </tr>
          <tr>
            <th>{t('contactPhone')}</th>
            <td>{organization.contactPhone}</td>
          </tr>
          <tr>
            <th>{t('address')}</th>
            <td>{organization.address}</td>
          </tr>
          <tr>
            <th>{t('categoryIds')}</th>
            <td>{organization.categories.$values.join(', ')}</td>
          </tr>
          <tr>
            <th>{t('latitude')}</th>
            <td>{organization.latitude}</td>
          </tr>
          <tr>
            <th>{t('longitude')}</th>
            <td>{organization.longitude}</td>
          </tr>
          <tr>
            <th>{t('locationAddress')}</th>
            <td>{organization.locationAddress}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ViewOrganization;
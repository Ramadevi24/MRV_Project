import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import '../../css/ViewForm.css';

const ViewOrganization = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [organization, setOrganization] = useState(null);

  useEffect(() => {
    fetchOrganization();
  }, []);

  const fetchOrganization = async () => {
    try {
      const response = await axios.get(`https://atlas.smartgeoapps.com/MRVAPI/api/Organization/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setOrganization(response.data);
    } catch (error) {
      toast.error(t('errorFetchingData'));
    }
  };

  if (!organization) {
    return <div className="spinner-border" role="status"><span className="sr-only">{t('loading')}</span></div>;
  }

  return (
    <div className="container">
      <h2>{t('View Organization')}</h2>
      <table className="table table-striped table-hover custom-table">
        <tbody>
          <tr>
            <th>{t('organizationName')}</th>
            <td>{organization.organizationName}</td>
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
            <td>{organization.categories.$values.join(',')}</td>
          </tr>
          {organization.locations.$values.map((location, index) => (
            <React.Fragment key={index}>
              <tr>
                <th>{t('latitude')}</th>
                <td>{location.latitude}</td>
              </tr>
              <tr>
                <th>{t('longitude')}</th>
                <td>{location.longitude}</td>
              </tr>
              <tr>
                <th>{t('locationAddress')}</th>
                <td>{location.address}</td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewOrganization;
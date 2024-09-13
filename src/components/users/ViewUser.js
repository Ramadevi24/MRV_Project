import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../../css/CreateForm.css';

const ViewUser = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`https://atlas.smartgeoapps.com/MRVAPI/api/User/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setUser(response.data);
    } catch (error) {
      toast.error(t('Error fetching user data'));
    }
  };

  if (!user) {
    return <div className="spinner-border text-primary" role="status"><span className="sr-only">{t('Loading...')}</span></div>;
  }

  return (
    <div className="container mt-5">
      <h2>{t('View User')}</h2>
      <table className="table table-striped table-hover custom-table">
        <tbody>
          <tr>
            <th>{t('User ID')}</th>
            <td>{user.id}</td>
          </tr>
          <tr>
            <th>{t('First Name')}</th>
            <td>{user.firstName}</td>
          </tr>
          <tr>
            <th>{t('Last Name')}</th>
            <td>{user.lastName}</td>
          </tr>
          <tr>
            <th>{t('Email')}</th>
            <td>{user.email}</td>
          </tr>
          <tr>
            <th>{t('Phone')}</th>
            <td>{user.phone}</td>
          </tr>
          <tr>
            <th>{t('Login Type')}</th>
            <td>{user.loginType}</td>
          </tr>
          <tr>
            <th>{t('Tenant Name')}</th>
            <td>{user.tenantName}</td>
          </tr>
          <tr>
            <th>{t('Organization Name')}</th>
            <td>{user.organizationName}</td>
          </tr>
          <tr>
            <th>{t('User Role')}</th>
            <td>{user.userRole}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ViewUser;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast } from 'react-toastify';


const UserDetailPage = () => {
  const [user, setUser] = useState({});
  const { t } = useTranslation();
  const { id } = useParams();

  useEffect(() => {
    fetchUserData(id);
  }, [id]);

  const fetchUserData = async (userId) => {
    try {
      const response = await axios.get(`https://atlas.smartgeoapps.com/MRVAPI/api/User/${userId}`);
      setUser(response.data);
    } catch (error) {
        toast.error(t('error.fetchUserData'), 'error');
    }
  };

  return (
    <div className="container mt-5">
      <table className="table table-bordered">
        <tbody>
          <tr>
            <th>{t('firstName')}</th>
            <td>{user.firstName}</td>
          </tr>
          <tr>
            <th>{t('lastName')}</th>
            <td>{user.lastName}</td>
          </tr>
          <tr>
            <th>{t('email')}</th>
            <td>{user.email}</td>
          </tr>
          <tr>
            <th>{t('phone')}</th>
            <td>{user.phone}</td>
          </tr>
          <tr>
            <th>{t('tenant')}</th>
            <td>{user.tenantName}</td>
          </tr>
          <tr>
            <th>{t('organization')}</th>
            <td>{user.organizationName}</td>
          </tr>
          <tr>
            <th>{t('role')}</th>
            <td>{user.roleName}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default UserDetailPage;
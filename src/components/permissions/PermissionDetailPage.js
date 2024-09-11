import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import 'bootstrap/dist/css/bootstrap.min.css';

const PermissionDetailPage = () => {
  const [permission, setPermission] = useState({});
  const { permissionID } = useParams();
  const { t } = useTranslation();

  useEffect(() => {
    fetchPermission();
  }, [permissionID]);

  const fetchPermission = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/Permissions/${permissionID}`);
      setPermission(response.data);
    } catch (error) {
      console.error(t('error.fetchPermission'));
    }
  };

  return (
    <div className="container mt-5">
      <h2>{t('viewPermission')}</h2>
      <table className="table table-bordered">
        <tbody>
          <tr>
            <th>{t('permissionID')}</th>
            <td>{permission.permissionID}</td>
          </tr>
          <tr>
            <th>{t('permissionDisplayName')}</th>
            <td>{permission.permissionDisplayName}</td>
          </tr>
          <tr>
            <th>{t('description')}</th>
            <td>{permission.description}</td>
          </tr>
          <tr>
            <th>{t('createdDate')}</th>
            <td>{permission.createdDate}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PermissionDetailPage;
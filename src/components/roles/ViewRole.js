import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import '../../css/ViewForm.css';
import { formatDateTime } from '../../utils/formateDate';

const ViewRole = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRole();
  }, []);

  const fetchRole = async () => {
    try {
      const response = await axios.get(`https://atlas.smartgeoapps.com/MRVAPI/api/Role/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setRole(response.data);
      setLoading(false);
    } catch (error) {
      toast.error(t('errorFetchingRole'));
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="spinner-border text-primary" role="status"><span className="sr-only">{t('loading')}</span></div>;
  }

  return (
      <div className="container mt-4">
      <h2 className='view-form-header'>{t('View Role')}</h2>
     <table className="table custom-table table-striped table-hover">
     <tbody>
       <tr>
         <th>{t('Role ID')}</th>
         <td>{role?.roleID}</td>
       </tr>
       <tr>
         <th>{t('Role Name')}</th>
         <td>{role?.roleName}</td>
       </tr>
       <tr>
         <th>{t('Description')}</th>
         <td>{role?.description}</td>
       </tr>
       <tr>
         <th>{t('Role Permissions')}</th>
         <td>{role?.rolePermissions.$values.join(', ')}</td>
       </tr>
       <tr>
         <th>{t('Created Date')}</th>
         <td>{formatDateTime(role?.createdDate)}</td>
       </tr>
     </tbody>
   </table>
   </div>
  );
};

export default ViewRole;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import '../../css/ViewForm.css';
import { formatDate, formatDateTime } from '../../utils/formateDate';
import { useNavigate } from 'react-router-dom';

const ViewRole = ({userPermissions}) => {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRole();
  }, []);

  const fetchRole = async () => {
    try {
      const tenantId = userPermissions.tenantID || null; // Check if tenantID exists
                  const roleId = id;
            
                  const url = tenantId 
                    ? `https://atlas.smartgeoapps.com/MRVAPI/api/Role/${roleId}?tenantId=${tenantId}`
                    : `https://atlas.smartgeoapps.com/MRVAPI/api/Role/${roleId}`;
            
                  const response = await axios.get(url, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('AuthToken')}` },
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
      <div className='form-heading-row'>
        <div>
        <h2 className='view-form-header'>{t('View Role')}</h2>
        </div>
        <div>
        <button onClick={() => navigate(-1)} className='form_back'>{t('Back')}</button>
        </div>
        </div>
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
  <td>
  {role?.permissions?.$values?.length > 0 ? (
  role.permissions.$values.map((permission, index) => (
    <span key={permission.permissionID}>
      {permission.permissionDisplayName}
      {index < role.permissions.$values.length - 1 ? ', ' : ''}
    </span>
  ))
) : null}
  </td>
</tr>

       <tr>
         <th>{t('Created Date')}</th>
         <td>{formatDate(role?.createdDate)}</td>
       </tr>
     </tbody>
   </table>
   </div>
  );
};

export default ViewRole;
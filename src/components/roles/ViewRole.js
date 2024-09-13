import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { Table, Container } from 'react-bootstrap';
import '../../css/ViewForm.css';

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
      const response = await axios.get(`http://localhost:5000/api/Role/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setRole(response.data.$values);
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
    <Container className="mt-5">
      <h2>{t('viewRole')}</h2>
      <Table striped hover className="custom-table">
        <thead>
          <tr>
            <th>{t('roleId')}</th>
            <th>{t('roleName')}</th>
            <th>{t('description')}</th>
            <th>{t('permissions')}</th>
            <th>{t('createdDate')}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{role?.roleID}</td>
            <td>{role?.roleName}</td>
            <td>{role?.description}</td>
            <td>{role?.rolePermissions.$values.join(', ')}</td>
            <td>{new Date(role?.createdDate).toLocaleDateString()}</td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
};

export default ViewRole;
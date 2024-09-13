import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPencilAlt, FaTrashAlt, FaEye, FaSortUp, FaSortDown } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import '../../css/CreateForm.css';

const TenantGrid = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [tenants, setTenants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'ascending' });
  const [currentPage, setCurrentPage] = useState(1);
  const [tenantsPerPage, setTenantsPerPage] = useState(10);

  useEffect(() => {
    fetchTenants();
  }, []);

  const fetchTenants = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/Tenant', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setTenants(response.data.$values);
      setLoading(false);
    } catch (error) {
      toast.error(t('Error fetching tenants'));
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm(t('Are you sure you want to delete this tenant?'))) {
      try {
        await axios.delete(`http://localhost:5000/api/Tenant/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setTenants(tenants.filter((tenant) => tenant.id !== id));
        toast.success(t('Tenant deleted successfully'));
      } catch (error) {
        toast.error(t('Error deleting tenant'));
      }
    }
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedTenants = [...tenants].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  const filteredTenants = sortedTenants.filter((tenant) =>
    tenant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastTenant = currentPage * tenantsPerPage;
  const indexOfFirstTenant = indexOfLastTenant - tenantsPerPage;
  const currentTenants = filteredTenants.slice(indexOfFirstTenant, indexOfLastTenant);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mt-5">
    <div className="tenant-grid">
      <div className="header d-flex justify-content-between align-items-center mb-3">
        <input
          type="text"
            className="form-control w-25"
          placeholder={t('Search')}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="btn btn-primary" onClick={() => navigate('/create-tenant')}>
          {t('Create Tenant')}
        </button>
      </div>
      {loading ? (
        <div className="spinner">Loading...</div>
      ) : (
        <table className="custom-table table table-striped table-hover">
          <thead>
            <tr>
              <th>{t('Tenant ID')}</th>
              <th onClick={() => handleSort('name')}>
                {t('Tenant Name')}
                {sortConfig.key === 'name' && (sortConfig.direction === 'ascending' ? <FaSortUp /> : <FaSortDown />)}
              </th>
              <th>{t('Description')}</th>
              <th onClick={() => handleSort('createdDate')}>
                {t('Created Date')}
                {sortConfig.key === 'createdDate' && (sortConfig.direction === 'ascending' ? <FaSortUp /> : <FaSortDown />)}
              </th>
              <th>{t('Actions')}</th>
            </tr>
          </thead>
          <tbody>
            {currentTenants.map((tenant) => (
              <tr key={tenant.tenantID}>
                <td>{tenant.tenantID}</td>
                <td>{tenant.name}</td>
                <td>{tenant.description}</td>
                <td>{tenant.createdDate}</td>
                <td className="action-icons">
                  <button className="view-btn" onClick={() => navigate(`/view-tenant/${tenant.tenantID}`)}>
                    <FaEye color="green" />
                  </button>
                  <button className="edit-btn" onClick={() => navigate(`/edit-tenant/${tenant.tenantID}`)}>
                    <FaPencilAlt color="blue" />
                  </button>
                  <button className="delete-btn" onClick={() => handleDelete(tenant.tenantID)}>
                    <FaTrashAlt color="red" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className="pagination">
        <select value={tenantsPerPage} onChange={(e) => setTenantsPerPage(e.target.value)}>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
        <ul className="pagination-list">
          {Array.from({ length: Math.ceil(filteredTenants.length / tenantsPerPage) }, (_, i) => (
            <li key={i} className="page-item">
              <button onClick={() => paginate(i + 1)} className="page-link">
                {i + 1}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
    </div>
  );
};

export default TenantGrid;
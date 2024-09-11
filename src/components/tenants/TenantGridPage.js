import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPencilAlt, FaTrashAlt, FaEye, FaSortUp, FaSortDown } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const TenantGridPage = () => {
  const [tenants, setTenants] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'tenantName', direction: 'ascending' });
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [tenantsPerPage, setTenantsPerPage] = useState(10);
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    fetchTenants();
  }, []);

  const fetchTenants = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/Tenant');
      setTenants(response.data.$values);
    } catch (error) {
      toast.error(t('error.fetchTenants'));
    }
  };

  const handleDelete = async (tenantID) => { // Add this function
    try {
      await axios.delete(`http://localhost:5000/api/Tenant/${tenantID}`);
      setTenants(tenants.filter(tenant => tenant.id !== tenantID));
      toast.success(t('success.deleteUser'), 'success');
    } catch (error) {
      toast.error(t('error.deleteUser'), 'error');
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

  const filteredTenants = sortedTenants?.filter(tenant =>
    tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tenant.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tenant.createdDate.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastTenant = currentPage * tenantsPerPage;
  const indexOfFirstTenant = indexOfLastTenant - tenantsPerPage;
  const currentTenants = filteredTenants.slice(indexOfFirstTenant, indexOfLastTenant);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between mb-3">
        <input
          type="text"
          className="form-control w-25"
          placeholder={t('search')}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="btn btn-primary" onClick={() => navigate('/create-tenant')}>
          {t('createTenant')}
        </button>
      </div>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th onClick={() => handleSort('tenantID')}>{t('tenantID')}</th>
            <th onClick={() => handleSort('tenantName')}>
              {t('tenantName')}
              {sortConfig.key === 'tenantName' && (sortConfig.direction === 'ascending' ? <FaSortUp /> : <FaSortDown />)}
            </th>
            <th onClick={() => handleSort('description')}>
              {t('description')}
              {sortConfig.key === 'description' && (sortConfig.direction === 'ascending' ? <FaSortUp /> : <FaSortDown />)}
            </th>
            <th onClick={() => handleSort('createdDate')}>
              {t('createdDate')}
              {sortConfig.key === 'createdDate' && (sortConfig.direction === 'ascending' ? <FaSortUp /> : <FaSortDown />)}
            </th>
            <th>{t('actions')}</th>
          </tr>
        </thead>
        <tbody>
          {currentTenants.map((tenant) => (
            <tr key={tenant.tenantID}>
              <td>{tenant.tenantID}</td>
              <td>{tenant. name}</td>
              <td>{tenant.description}</td>
              <td>{tenant.createdDate}</td>
              <td>
                <FaPencilAlt onClick={() => navigate(`/edit-tenant/${tenant.tenantID}`)} />
                <FaTrashAlt onClick={() => handleDelete(tenant.tenantID)} />
                <FaEye onClick={() => navigate(`/view-tenant/${tenant.tenantID}`)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="d-flex justify-content-between">
        <select
          className="form-select w-25"
          value={tenantsPerPage}
          onChange={(e) => setTenantsPerPage(e.target.value)}
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
        <nav>
          <ul className="pagination">
            {Array.from({ length: Math.ceil(filteredTenants.length / tenantsPerPage) }, (_, index) => (
              <li key={index} className="page-item">
                <a onClick={() => paginate(index + 1)} className="page-link">
                  {index + 1}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default TenantGridPage;
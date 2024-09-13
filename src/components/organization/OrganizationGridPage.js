import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPencilAlt, FaTrashAlt, FaEye, FaSortUp, FaSortDown } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import '../../css/createGrid.css';

const OrganizationGridPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'ascending' });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    fetchOrganizations();
  }, []);

  const fetchOrganizations = async () => {
    try {
      const response = await axios.get('https://atlas.smartgeoapps.com/MRVAPI/api/Organization', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setOrganizations(response.data.$values);
      setLoading(false);
    } catch (error) {
      toast.error(t('errorFetchingData'));
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm(t('confirmDelete'))) {
      try {
        await axios.delete(`https://atlas.smartgeoapps.com/MRVAPI/api/Organization/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setOrganizations(organizations.filter(org => org.id !== id));
        await fetchOrganizations();
        toast.success(t('Organization deleted successfully'));
      } catch (error) {
        toast.error(t('Something went wrong'));
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

  const sortedOrganizations = [...organizations].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  const filteredOrganizations = sortedOrganizations.filter(org =>
    org.organizationName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    org.tenantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    org.establishedDate.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedOrganizations = filteredOrganizations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="container mt-5">
    <div className="organization-grid-page">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <input
          type="text"
          className="form-control w-25"
          placeholder={t('Search')}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="btn btn-primary"
          onClick={() => navigate('/create-organization')}
        >
          {t('Create Organization')}
        </button>
      </div>
      {loading ? (
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">{t('loading')}</span>
        </div>
      ) : (
        <table className="table table-striped table-hover custom-table">
          <thead>
            <tr>
              <th>{t('Organization ID')}</th>
              <th onClick={() => handleSort('name')}>
                {t('Organization Name')}
                {sortConfig.key === 'name' && (
                  sortConfig.direction === 'ascending' ? <FaSortUp /> : <FaSortDown />
                )}
              </th>
              <th onClick={() => handleSort('tenantName')}>
                {t('Tenant Name')}
                {sortConfig.key === 'tenantName' && (
                  sortConfig.direction === 'ascending' ? <FaSortUp /> : <FaSortDown />
                )}
              </th>
              <th onClick={() => handleSort('Established Date')}>
                {t('Established date')}
                {sortConfig.key === 'establishedDate' && (
                  sortConfig.direction === 'ascending' ? <FaSortUp /> : <FaSortDown />
                )}
              </th>
              <th onClick={() => handleSort('categories')}>
                {t('Categories')}
                {sortConfig.key === 'categories' && (
                  sortConfig.direction === 'ascending' ? <FaSortUp /> : <FaSortDown />
                )}
              </th>
              <th>{t('Actions')}</th>
            </tr>
          </thead>
          <tbody>
            {paginatedOrganizations.map(org => (
              <tr key={org.organizationID}>
                <td>{org.organizationID}</td>
                <td>{org.organizationName}</td>
                <td>{org.tenantName}</td>
                <td>{org.establishedDate}</td>
                <td>{org.categories. $values.join(', ')}</td>
                <td className="action-icons">
                  <button className="view-btn" onClick={() => navigate(`/view-organization/${org.organizationID}`)}>
                    <FaEye color="green" />
                  </button>
                  <button className="edit-btn" onClick={() => navigate(`/edit-organization/${org.organizationID}`)}>
                    <FaPencilAlt color="blue" />
                  </button>
                  <button className="delete-btn" onClick={() => handleDelete(org.organizationID)}>
                    <FaTrashAlt color="red" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className="d-flex justify-content-between align-items-center mt-3">
        <div>
          <select
            className="form-select"
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
        </div>
        <div className='d-flex'> 
          <button
            className="btn btn-secondary"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            {t('previous')}
          </button>
          <span className="mx-2 mt-2">{currentPage}</span>
          <button
            className="btn btn-secondary"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage * itemsPerPage >= filteredOrganizations.length}
          >
            {t('next')}
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default OrganizationGridPage;
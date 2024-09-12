import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPencilAlt, FaTrashAlt, FaEye, FaSortUp, FaSortDown } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/OrganizationGridPage.css';


const OrganizationGrid = () => {
  const { t, i18n } = useTranslation();
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);

  useEffect(() => {
    fetchOrganizations();
  }, []);

  const fetchOrganizations = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/Organization');
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
        await axios.delete(`http://localhost:5000/api/Organization/${id}`);
        setOrganizations(organizations.filter(org => org.id !== id));
        toast.success(t('deleteSuccess'));
      } catch (error) {
        toast.error(t('deleteError'));
      }
    }
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedOrganizations = [...organizations].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const filteredOrganizations = sortedOrganizations.filter(org =>
    org.organizationName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    org.tenantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    org.categories.toLowerCase().includes(searchTerm.toLowerCase()) ||
    org.establishedDate.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredOrganizations.slice(indexOfFirstRecord, indexOfLastRecord);

  const totalPages = Math.ceil(filteredOrganizations.length / recordsPerPage);

  return (
    <div className="container">
      <div className="row mb-3">
        <div className="col">
          <button className="btn btn-primary" onClick={() => window.location.href = '/create-organization'}>
            {t('createOrganization')}
          </button>
        </div>
        <div className="col">
          <input
            type="text"
            className="form-control"
            placeholder={t('search')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="col">
          <select className="form-select" onChange={(e) => setRecordsPerPage(e.target.value)} value={recordsPerPage}>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
        </div>
      </div>
      {loading ? (
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">{t('loading')}</span>
        </div>
      ) : (
        <table className="table table-striped table-hover custom-table">
          <thead>
            <tr>
              <th>{t('organizationId')}</th>
              <th onClick={() => handleSort('name')}>
                {t('organizationName')}
                {sortConfig.key === 'name' && (sortConfig.direction === 'asc' ? <FaSortUp /> : <FaSortDown />)}
              </th>
              <th onClick={() => handleSort('tenantName')}>
                {t('tenantName')}
                {sortConfig.key === 'tenantName' && (sortConfig.direction === 'asc' ? <FaSortUp /> : <FaSortDown />)}
              </th>
              <th onClick={() => handleSort('establishedDate')}>
                {t('establishedDate')}
                {sortConfig.key === 'establishedDate' && (sortConfig.direction === 'asc' ? <FaSortUp /> : <FaSortDown />)}
              </th>
              <th onClick={() => handleSort('categories')}>
                {t('categories')}
                {sortConfig.key === 'categories' && (sortConfig.direction === 'asc' ? <FaSortUp /> : <FaSortDown />)}
              </th>
              <th>{t('actions')}</th>
            </tr>
          </thead>
          <tbody>
            {currentRecords.map(org => (
              <tr key={org.organizationID}>
                <td>{org.organizationID}</td>
                <td>{org.organizationName}</td>
                <td>{org.tenantName}</td>
                <td>{org.establishedDate}</td>
                <td>{org.categories.$values.join(', ')}</td>
                <td className="action-icons">
                  <button className="view-btn" onClick={() => window.location.href = `/view-organization/${org.organizationID}`}>
                    <FaEye color="green" />
                  </button>
                  <button className="edit-btn" onClick={() => window.location.href = `/edit-organization/${org.organizationID}`}>
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
      <div className="d-flex justify-content-end">
        <nav>
          <ul className="pagination">
            {[...Array(totalPages).keys()].map(number => (
              <li key={number + 1} className={`page-item ${currentPage === number + 1 ? 'active' : ''}`}>
                <button className="page-link" onClick={() => setCurrentPage(number + 1)}>
                  {number + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default OrganizationGrid;
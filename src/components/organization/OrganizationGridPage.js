import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPencilAlt, FaTrashAlt, FaEye, FaSortUp, FaSortDown } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import '../../css/createGrid.css';
import Pagination from '../Pagination.js';
import { formatDate } from '../../utils/formateDate.js';

const OrganizationGridPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'ascending' });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteOrgId, setDeleteOrgId] = useState(null);

  useEffect(() => {
    fetchOrganizations();
  }, []);

  const fetchOrganizations = async () => {
    try {
      const response = await axios.get('https://atlas.smartgeoapps.com/MRVAPI/api/Organization', {
        headers: { Authorization: `Bearer ${localStorage.getItem('AuthToken')}` }
      });
      setOrganizations(response.data.$values);
      setLoading(false);
    } catch (error) {
      toast.error(t('errorFetchingData'));
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    setDeleteOrgId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`https://atlas.smartgeoapps.com/MRVAPI/api/Organization/${deleteOrgId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('AuthToken')}` }
      });
      setOrganizations(organizations.filter(org => org.id !== deleteOrgId));
      await fetchOrganizations();
      toast.success(t('Organization deleted successfully'));
    } catch (error) {
      toast.error(t('Something went wrong'));
    } finally {
      setShowDeleteModal(false);
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
    org.organizationName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    org.categories.$values.join(',')?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    org.tenantName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    org.establishedDate?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredOrganizations.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
            className="button-72"
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
                <th onClick={() => handleSort('establishedDate')}>
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
              {currentItems.map(org => (
                <tr key={org.organizationID}>
                  <td>{org.organizationID}</td>
                  <td>{org.organizationName}</td>
                  <td>{org.tenantName}</td>
                  <td>{formatDate(org.establishedDate)}</td>                  
                  <td>{org.categories.$values.join(',')}</td>
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
        <Pagination
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          totalItems={filteredOrganizations.length}
          paginate={paginate}
          setItemsPerPage={setItemsPerPage}
          t={t}
        />
      </div>
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{t('Delete Confirmation')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{t('Are you sure you want to delete?')}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            {t('cancel')}
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            {t('delete')}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default OrganizationGridPage;
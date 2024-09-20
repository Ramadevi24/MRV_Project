import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPencilAlt, FaTrashAlt, FaEye, FaSortUp, FaSortDown } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import '../../css/CreateForm.css';
import { Spinner, Modal, Button } from 'react-bootstrap';
import Pagination from '../Pagination.js'; // Import the Pagination component
import { formatDate} from '../../utils/formateDate.js';

const TenantGrid = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [tenants, setTenants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'ascending' });
  const [currentPage, setCurrentPage] = useState(1);
  const [tenantsPerPage, setTenantsPerPage] = useState(10);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [tenantToDelete, setTenantToDelete] = useState(null);

  useEffect(() => {
    fetchTenants();
  }, []);

  const fetchTenants = async () => {
    try {
      const response = await axios.get('https://atlas.smartgeoapps.com/MRVAPI/api/Tenant', {
        headers: { Authorization: `Bearer ${localStorage.getItem('AuthToken')}` },
      });
      setTenants(response.data.$values);
      setLoading(false);
    } catch (error) {
      toast.error(t('Error fetching tenants'));
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    setTenantToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`https://atlas.smartgeoapps.com/MRVAPI/api/Tenant/${tenantToDelete}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('AuthToken')}` },
      });
      setTenants(tenants.filter((tenant) => tenant.tenantID !== tenantToDelete));
      toast.success(t('Tenant deleted successfully'));
      await fetchTenants();
    } catch (error) {
      toast.error(t('Error deleting tenant'));
    } finally {
      setShowDeleteModal(false);
      setTenantToDelete(null);
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
    ['name', 'description', 'createdDate'].some((key) =>
      tenant[key].toLowerCase().includes(searchTerm.toLowerCase())
    )
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
          <button className="button-72" onClick={() => navigate('/create-tenant')}>
            {t('Create Tenant')}
          </button>
        </div>
        {loading ? (
          <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
            <Spinner animation="border" role="status">
              <span className="sr-only">{t('Loading...')}</span>
            </Spinner>
          </div>
        ) : (
          <table className="custom-table table table-striped table-hover">
            <thead>
              <tr>
                <th onClick={() => handleSort('tenantID')}>
                  {t('Tenant ID')}
                  {sortConfig.key === 'tenantID' && (sortConfig.direction === 'ascending' ? <FaSortUp /> : <FaSortDown />)}
                </th>
                <th onClick={() => handleSort('name')}>
                  {t('Tenant Name')}
                  {sortConfig.key === 'name' && (sortConfig.direction === 'ascending' ? <FaSortUp /> : <FaSortDown />)}
                </th>
                <th onClick={() => handleSort('description')}>
                  {t('Description')}
                  {sortConfig.key === 'description' && (sortConfig.direction === 'ascending' ? <FaSortUp /> : <FaSortDown />)}
                </th>
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
                  <td>{formatDate(tenant.createdDate)}</td>
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

        {/* Pagination Component */}
        <Pagination
          itemsPerPage={tenantsPerPage}
          currentPage={currentPage}
          totalItems={filteredTenants.length}
          paginate={paginate}
          setItemsPerPage={setTenantsPerPage}
          t={t}
        />
      </div>

      {/* Delete Confirmation Modal */}
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

export default TenantGrid;
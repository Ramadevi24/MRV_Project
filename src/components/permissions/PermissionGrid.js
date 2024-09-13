import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPencilAlt, FaTrashAlt, FaEye, FaSortUp, FaSortDown } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { Modal, Button, Table, Form, Pagination } from 'react-bootstrap';
import '../../css/createGrid.css';
import { useNavigate } from 'react-router-dom';

const PermissionGrid = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'permissionDisplayName', direction: 'ascending' });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [permissionToDelete, setPermissionToDelete] = useState(null);

  useEffect(() => {
    fetchPermissions();
  }, []);

  const fetchPermissions = async () => {
    try {
      const response = await axios.get('https://atlas.smartgeoapps.com/MRVAPI/api/Permissions', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setPermissions(response.data.$values);
      setLoading(false);
    } catch (error) {
      toast.error(t('errorFetchingPermissions'));
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/permissions/${permissionToDelete.id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setPermissions(permissions.filter(p => p.id !== permissionToDelete.id));
      toast.success(t('Permission deleted successfully'));
      await fetchPermissions();
      setShowDeleteModal(false);
    } catch (error) {
      toast.error(t('errorDeletingPermission'));
    }
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedPermissions = [...permissions].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  const filteredPermissions = sortedPermissions.filter(permission =>
    permission.permissionDisplayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    permission.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    permission.permissionuniquename.toLowerCase().includes(searchTerm.toLowerCase()) ||
    permission.permissionGroup.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPermissions.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredPermissions.length / itemsPerPage);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between mb-3">
        <Form.Control
          type="text"
          placeholder={t('Search')}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-25"
        />
        <Button variant="primary" onClick={() => navigate('/create-permission')}>
          {t('Create Permission')}
        </Button>
      </div>
      {loading ? (
        <div className="spinner-border" role="status">
          <span className="sr-only">{t('loading')}</span>
        </div>
      ) : (
        <Table className="custom-table table-striped table-hover">
          <thead>
            <tr>
              <th onClick={() => handleSort('permissionDisplayName')}>
                {t('Permission Display Name')}
                {sortConfig.key === 'permissionDisplayName' && (sortConfig.direction === 'ascending' ? <FaSortUp /> : <FaSortDown />)}
              </th>
              <th onClick={() => handleSort('description')}>
                {t('Description')}
                {sortConfig.key === 'description' && (sortConfig.direction === 'ascending' ? <FaSortUp /> : <FaSortDown />)}
              </th>
              <th onClick={() => handleSort('permissionuniquename')}>
                {t('Permission unique Name')}
                {sortConfig.key === 'permissionuniquename' && (sortConfig.direction === 'ascending' ? <FaSortUp /> : <FaSortDown />)}
              </th>
              <th onClick={() => handleSort('permissionGroup')}>
                {t('Permission Group')}
                {sortConfig.key === 'permissionGroup' && (sortConfig.direction === 'ascending' ? <FaSortUp /> : <FaSortDown />)}
              </th>
              <th>{t('Actions')}</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map(permission => (
              <tr key={permission.permissionID}>
                <td>{permission.permissionDisplayName}</td>
                <td>{permission.description}</td>
                <td>{permission.permissionuniquename}</td>
                <td>{permission.permissionGroup}</td>
                <td className="action-icons">
                  <button className="view-btn" onClick={() => navigate(`/view-permission/${permission.permissionID}`)}>
                    <FaEye color="green" />
                  </button>
                  <button className="edit-btn" onClick={() => navigate(`/edit-permission/${permission.permissionID}`)}>
                    <FaPencilAlt color="blue" />
                  </button>
                  <button className="delete-btn" onClick={() => { setPermissionToDelete(permission); setShowDeleteModal(true); }}>
                    <FaTrashAlt color="red" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <div className="d-flex justify-content-between">
        <Form.Control
          as="select"
          value={itemsPerPage}
          onChange={(e) => setItemsPerPage(Number(e.target.value))}
          className="w-25"
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </Form.Control>
        <Pagination>
          {[...Array(totalPages).keys()].map(number => (
            <Pagination.Item key={number + 1} active={number + 1 === currentPage} onClick={() => setCurrentPage(number + 1)}>
              {number + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </div>
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{t('Confirm Delete')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{t('delete Confirmation Message')}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            {t('cancel')}
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            {t('delete')}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PermissionGrid;
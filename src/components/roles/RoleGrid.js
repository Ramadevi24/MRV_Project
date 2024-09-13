import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPencilAlt, FaTrashAlt, FaEye, FaSortUp, FaSortDown } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Modal, Button, Table, Form, Pagination } from 'react-bootstrap';
import '../../css/createGrid.css';

const RoleGrid = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortConfig, setSortConfig] = useState({ key: 'roleName', direction: 'ascending' });
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rolesPerPage, setRolesPerPage] = useState(10);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState(null);

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const response = await axios.get('https://atlas.smartgeoapps.com/MRVAPI/api/Role', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setRoles(response.data.$values);
      setLoading(false);
    } catch (error) {
      toast.error(t('errorFetchingRoles'));
      setLoading(false);
    }
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedRoles = [...roles].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  const filteredRoles = sortedRoles.filter((role) =>
    role.roleName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastRole = currentPage * rolesPerPage;
  const indexOfFirstRole = indexOfLastRole - rolesPerPage;
  const currentRoles = filteredRoles.slice(indexOfFirstRole, indexOfLastRole);

  const handleDelete = async () => {
    try {
      await axios.delete(`https://atlas.smartgeoapps.com/MRVAPI/api/Role/${roleToDelete.id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setRoles(roles.filter((role) => role.id !== roleToDelete.id));
      toast.success(t('Role deleted successfully'));
      await fetchRoles();
      setShowDeleteModal(false);
    } catch (error) {
      toast.error(t('errorDeletingRole'));
    }
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between mb-3">
        <Form.Control
          type="text"
          placeholder={t('Search')}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-25"
        />
        <Button variant="primary" onClick={() => navigate('/create-role')}>
          {t('Create Role')}
        </Button>
      </div>
      {loading ? (
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">{t('loading')}</span>
        </div>
      ) : (
        <Table striped hover className="custom-table">
          <thead>
            <tr>
              <th>{t('Role ID')}</th>
              <th onClick={() => handleSort('roleName')}>
                {t('Role Name')}
                {sortConfig.key === 'roleName' && (
                  sortConfig.direction === 'ascending' ? <FaSortUp /> : <FaSortDown />
                )}
              </th>
              <th>{t('Description')}</th>
              <th onClick={() => handleSort('createdDate')}>
                {t('Created Date')}
                {sortConfig.key === 'createdDate' && (
                  sortConfig.direction === 'ascending' ? <FaSortUp /> : <FaSortDown />
                )}
              </th>
              <th>{t('Actions')}</th>
            </tr>
          </thead>
          <tbody>
            {currentRoles.map((role) => (
              <tr key={role.roleID}>
                <td>{role.roleID}</td>
                <td>{role.roleName}</td>
                <td>{role.description}</td>
                <td>{new Date(role.createdDate).toLocaleDateString()}</td>
                <td className="action-icons">
                  <button className="view-btn" onClick={() => navigate(`/view-role/${role.roleID}`)}>
                    <FaEye color="green" />
                  </button>
                  <button className="edit-btn" onClick={() => navigate(`/edit-role/${role.roleID}`)}>
                    <FaPencilAlt color="blue" />
                  </button>
                  <button className="delete-btn" onClick={() => { setRoleToDelete(role); setShowDeleteModal(true); }}>
                    <FaTrashAlt color="red" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <div className="d-flex justify-content-between">
        <Form.Select
          value={rolesPerPage}
          onChange={(e) => setRolesPerPage(Number(e.target.value))}
          className="w-25"
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </Form.Select>
        <Pagination>
          {[...Array(Math.ceil(filteredRoles.length / rolesPerPage)).keys()].map((number) => (
            <Pagination.Item key={number + 1} active={number + 1 === currentPage} onClick={() => setCurrentPage(number + 1)}>
              {number + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </div>
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{t('confirmDelete')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{t('deleteConfirmation')}</Modal.Body>
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

export default RoleGrid;
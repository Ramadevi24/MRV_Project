import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPencilAlt, FaTrashAlt, FaEye, FaSortUp, FaSortDown } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Modal, Button, Table, Form } from 'react-bootstrap';
import '../../css/createGrid.css';
import  Pagination from '../Pagination.js';

const RoleGrid = ({userPermissions}) => {
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

  // const fetchRoles = async () => {
  //   try {
  //     const response = await axios.get('https://atlas.smartgeoapps.com/MRVAPI/api/Role/Roles?tenantId=userPermissions.tenantID', {
  //       headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  //     });
  //     setRoles(response.data.$values);
  //     setLoading(false);
  //   } catch (error) {
  //     toast.error(t('errorFetchingRoles'));
  //     setLoading(false);
  //   }
  // };

  const fetchRoles = async () => {
    try {
      let tenantId = userPermissions.tenantID || '';
      let url = tenantId ? `https://atlas.smartgeoapps.com/MRVAPI/api/Role/Roles?tenantId=${tenantId}` 
                         : 'https://atlas.smartgeoapps.com/MRVAPI/api/Role/Roles';
  
      const response = await axios.get(url, {
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
    role.roleName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    role.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    role.createdDate.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastRole = currentPage * rolesPerPage;
  const indexOfFirstRole = indexOfLastRole - rolesPerPage;
  const currentRoles = filteredRoles.slice(indexOfFirstRole, indexOfLastRole);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDelete = async () => {
    try {
      await axios.delete(`https://atlas.smartgeoapps.com/MRVAPI/api/Role/Roles/${roleToDelete.roleID}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setRoles(roles.filter((role) => role.roleID !== roleToDelete.roleID));
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
        <Button className='button-72' onClick={() => navigate('/create-role')}>
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
              <th onClick={() => handleSort('description')}>{t('Description')}
              {sortConfig.key === 'description' && (
                  sortConfig.direction === 'ascending' ? <FaSortUp /> : <FaSortDown />
                )}
              </th>
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
      <Pagination
        itemsPerPage={rolesPerPage}
        currentPage={currentPage}
        totalItems={filteredRoles.length}
        paginate={paginate}
        setItemsPerPage={setRolesPerPage}
        t={t}
        />
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{t('Delete Confirmation')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{t('Are you sure you want to delete?')}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            {t('Cancel')}
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            {t('Delete')}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default RoleGrid;
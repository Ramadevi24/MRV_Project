import React, { useState, useEffect, useCallback, useMemo } from 'react';
import axios from 'axios';
import { FaPencilAlt, FaTrashAlt, FaEye, FaSortUp, FaSortDown } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Pagination from '../Pagination.js';

const UserGrid = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = useCallback(async () => {
    try {
      const response = await axios.get('https://atlas.smartgeoapps.com/MRVAPI/api/User', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setUsers(response.data.$values);
      setLoading(false);
    } catch (error) {
      toast.error(t('Error fetching users'));
      setLoading(false);
    }
  }, [t]);

  const handleSort = useCallback((key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  }, [sortConfig]);

  const sortedUsers = useMemo(() => {
    return [...users].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
  }, [users, sortConfig]);

  const filteredUsers = useMemo(() => {
    return sortedUsers.filter(user =>
      Object.keys(user).some(key =>
        user[key] && user[key].toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [sortedUsers, searchTerm]);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDelete = useCallback(async () => {
    try {
      await axios.delete(`https://atlas.smartgeoapps.com/MRVAPI/api/User/${userToDelete.id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setUsers(users.filter(user => user.id !== userToDelete.id));
      toast.success(t('User deleted successfully'));
      await fetchUsers();
      setShowModal(false);
    } catch (error) {
      toast.error(t('Error deleting user'));
      setShowModal(false);
    }
  }, [userToDelete, users, fetchUsers, t]);

  if (loading) {
    return <div className="spinner-border text-primary" role="status"><span className="sr-only">{t('Loading...')}</span></div>;
  }

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between mb-3">
        <input
          type="text"
          className="form-control w-25"
          placeholder={t('Search')}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="button-72" onClick={() => navigate('/create-user')}>{t('Create User')}</button>
      </div>
      <table className="table table-striped table-hover custom-table">
        <thead>
          <tr>
            <th onClick={() => handleSort('id')}>{t('User ID')} {sortConfig.key === 'id' && (sortConfig.direction === 'ascending' ? <FaSortUp /> : <FaSortDown />)}</th>
            <th onClick={() => handleSort('firstName')}>{t('First Name')} {sortConfig.key === 'firstName' && (sortConfig.direction === 'ascending' ? <FaSortUp /> : <FaSortDown />)}</th>
            <th onClick={() => handleSort('lastName')}>{t('Last Name')} {sortConfig.key === 'lastName' && (sortConfig.direction === 'ascending' ? <FaSortUp /> : <FaSortDown />)}</th>
            <th onClick={() => handleSort('email')}>{t('Email')}{sortConfig.key === 'email' && (sortConfig.direction === 'ascending' ? <FaSortUp /> : <FaSortDown />)}</th>
            <th onClick={() => handleSort('phone')}>{t('Phone')}{sortConfig.key === 'phone' && (sortConfig.direction === 'ascending' ? <FaSortUp /> : <FaSortDown />)}</th>
            <th onClick={() => handleSort('loginType')}>{t('Login Type')} {sortConfig.key === 'loginType' && (sortConfig.direction === 'ascending' ? <FaSortUp /> : <FaSortDown />)}</th>
            <th onClick={() => handleSort('tenantName')}>{t('Tenant Name')} {sortConfig.key === 'tenantName' && (sortConfig.direction === 'ascending' ? <FaSortUp /> : <FaSortDown />)}</th>
            <th onClick={() => handleSort('organizationName')}>{t('Organization Name')} {sortConfig.key === 'organizationName' && (sortConfig.direction === 'ascending' ? <FaSortUp /> : <FaSortDown />)}</th>
            <th onClick={() => handleSort('userRole')}>{t('User Role')} {sortConfig.key === 'userRole' && (sortConfig.direction === 'ascending' ? <FaSortUp /> : <FaSortDown />)}</th>
            <th>{t('Actions')}</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map(user => (
            <tr key={user.userID}>
              <td>{user.userID}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.loginType}</td>
              <td>{user.tenantName}</td>
              <td>{user.organizationName}</td>
              <td>{user.userRole}</td>
              <td className="action-icons">
                <button className="view-btn text-success" onClick={() => navigate(`/view-user/${user.userID}`)}><FaEye /></button>
                <button className="edit-btn text-primary" onClick={() => navigate(`/edit-user/${user.userID}`)}><FaPencilAlt /></button>
                <button className="delete-btn text-danger" onClick={() => { setShowModal(true); setUserToDelete(user); }}><FaTrashAlt /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
          itemsPerPage={usersPerPage}
          currentPage={currentPage}
          totalItems={filteredUsers.length}
          paginate={paginate}
          setItemsPerPage={setUsersPerPage}
          t={t}
        />

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{t('Delete Confirmation')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{t('Are you sure you want to delete this user?')}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>{t('Cancel')}</Button>
          <Button variant="danger" onClick={handleDelete}>{t('Delete')}</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default React.memo(UserGrid);
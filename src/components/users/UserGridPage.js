import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const UserGridPage = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'firstName', direction: 'ascending' });
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://atlas.smartgeoapps.com/MRVAPI/api/User');
      setUsers(response.data.$values);
    } catch (error) {
    toast.error(t('error.fetchUsers'), 'error');
    }
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

   const handleDelete = async (userId) => { // Add this function
    try {
      await axios.delete(`https://atlas.smartgeoapps.com/MRVAPI/api/User/${userId}`);
      setUsers(users.filter(user => user.id !== userId));
      toast.success(t('success.deleteUser'), 'success');
    } catch (error) {
      toast.error(t('error.deleteUser'), 'error');
    }
  };


  const sortedUsers = [...users].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  const filteredUsers = sortedUsers.filter(user =>
    user.firstName.toLowerCase().includes(search.toLowerCase()) ||
    user.lastName.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase()) ||
    user.phone.toLowerCase().includes(search.toLowerCase()) ||
    user.loginType.toLowerCase().includes(search.toLowerCase()) ||
    user.organizationName.toLowerCase().includes(search.toLowerCase()) ||
    user.roleName.toLowerCase().includes(search.toLowerCase()) ||
    user.tenantName.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between mb-3">
        <input
          type="text"
          className="form-control w-25"
          placeholder={t('Search')}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="btn btn-primary" onClick={() => navigate('/create-user')}>
          {t('Create User')}
        </button>
      </div>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th onClick={() => handleSort('firstName')}>{t('First Name')}</th>
            <th onClick={() => handleSort('tenantName')}>{t('Tenant Name')}</th>
            <th onClick={() => handleSort('email')}>{t('Email')}</th>
            <th onClick={() => handleSort('organizationName')}>{t('Organization Name')}</th>
            <th onClick={() => handleSort('roleName')}>{t('Role Name')}</th>
            <th>{t('Actions')}</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map(user => (
            <tr key={user.userID}>
              <td>{user.firstName}</td>
              <td>{user.tenantName}</td>
              <td>{user.email}</td>
              <td>{user.organizationName}</td>
              <td>{user.roleName}</td>
              <td>
                <button className="btn btn-warning btn-sm" onClick={() => navigate(`/edit-user/${user.userID}`)}>
                  {t('edit')}
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(user.userID)}>
                  {t('delete')}
                </button>
                <button className="btn btn-info btn-sm" onClick={() => navigate(`/view-user/${user.userID}`)}>
                  {t('view')}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        usersPerPage={usersPerPage}
        totalUsers={filteredUsers.length}
        paginate={paginate}
      />
    </div>
  );
};

const Pagination = ({ usersPerPage, totalUsers, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map(number => (
          <li key={number} className="page-item">
            <a onClick={() => paginate(number)} href="!#" className="page-link">
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default UserGridPage;
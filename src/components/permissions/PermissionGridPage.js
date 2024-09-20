import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPencilAlt, FaTrashAlt, FaEye, FaSortUp, FaSortDown } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

const PermissionGridPage = () => {
  const [permissions, setPermissions] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'permissionDisplayName', direction: 'ascending' });
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    fetchPermissions();
  }, [sortConfig, searchTerm, currentPage, recordsPerPage]);

  const fetchPermissions = async () => {
    try {
      const response = await axios.get('https://atlas.smartgeoapps.com/MRVAPI/api/Permissions');
      setPermissions(response.data.$values);
    } catch (error) {
        toast.error(t('error.fetchPermissions'), 'error');
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
    permission.createdDate.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredPermissions.slice(indexOfFirstRecord, indexOfLastRecord);

  const totalPages = Math.ceil(filteredPermissions.length / recordsPerPage);

  const handleDelete = async (id) => {
    if (window.confirm(t('confirm.deletePermission'))) {
      try {
        await axios.delete(`https://atlas.smartgeoapps.com/MRVAPI/api/Permissions/${id}`);
        toast.success(t('success.deletePermission'), 'success');
        fetchPermissions();
      } catch (error) {
        toast.error(t('error.deletePermission'), 'error');
      }
    }
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between mb-3">
        <h2>{t('Permissions')}</h2>
        <button className="button-72" onClick={() => navigate('/create-permission')}>
          {t('Create Permission')}
        </button>
      </div>
      <input
        type="text"
        className="form-control mb-3"
        placeholder={t('Search')}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>{t('Permission ID')}</th>
            <th onClick={() => handleSort('permissionDisplayName')}>
              {t('Permission Display Name')} {sortConfig.key === 'permissionDisplayName' && (sortConfig.direction === 'ascending' ? <FaSortUp /> : <FaSortDown />)}
            </th>
            <th onClick={() => handleSort('description')}>
              {t('Description')} {sortConfig.key === 'description' && (sortConfig.direction === 'ascending' ? <FaSortUp /> : <FaSortDown />)}
            </th>
            <th onClick={() => handleSort('createdDate')}>
              {t('Created Date')} {sortConfig.key === 'createdDate' && (sortConfig.direction === 'ascending' ? <FaSortUp /> : <FaSortDown />)}
            </th>
            <th>{t('Actions')}</th>
          </tr>
        </thead>
        <tbody>
          {currentRecords.map(permission => (
            <tr key={permission.permissionID}>
              <td>{permission.permissionID}</td>
              <td>{permission.permissionDisplayName}</td>
              <td>{permission.description}</td>
              <td>{permission.createdDate}</td>
              <td>
                <FaPencilAlt className="text-primary mr-2" onClick={() => navigate(`/edit-permission/${permission.permissionID}`)} />
                <FaTrashAlt className="text-danger mr-2" onClick={() => handleDelete(permission.permissionID)} />
                <FaEye className="text-success" onClick={() => navigate(`/view-permission/${permission.permissionID}`)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="d-flex justify-content-between">
        <div>
          <select className="form-control" value={recordsPerPage} onChange={(e) => setRecordsPerPage(e.target.value)}>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
        </div>
        <div>
          <button className="btn btn-secondary" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
            {t('previous')}
          </button>
          <span className="mx-2">{currentPage} / {totalPages}</span>
          <button className="btn btn-secondary" onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
            {t('next')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PermissionGridPage;
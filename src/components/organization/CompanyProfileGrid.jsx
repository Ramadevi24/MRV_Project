import React, { useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useCompanyProfile } from '../../contexts/CompanyProfileContext';
import { toast } from 'react-toastify';
import ViewCompanyProfileModal from './ViewCompanyProfileModal'
import formatDate from '../../utils/formateDate';
import '../../css/TableGrid.css';
import eyeicon from '../../images/eyeicon.png';
import editicon from '../../images/editicon.png';
import deleteicon from '../../images/deleteicon.png';

const CompanyProfileGrid = ({onEdit}) => {
  const { companyProfiles, deleteCompanyProfile, fetchCompanyProfiles } = useCompanyProfile();
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);

  const handleDelete = async (id) => {
    try {
      await deleteCompanyProfile(id);
      await fetchCompanyProfiles();
      toast.success(`Organization deleted successfully.`);
    } catch (error) {
      toast.error(`Error deleting company profile with ID ${id}: ${error.message}`, error.stack);
    }
  };

  const handleView = (profile) => {
    setSelectedProfile(profile);
    setShowViewModal(true);
  };

  const handleCloseViewModal = () => {
    setShowViewModal(false);
    setSelectedProfile(null);
  };

  const handleEdit = (profile) => {
    onEdit(profile);
  };

  return (
    <>
    
      {/* <Table striped bordered hover style={{width:'95%', marginLeft:'35px'}}>
        <thead>
          <tr>
            <th>Organization ID</th>
            <th>Tenant ID</th>
            <th>Organization Name</th>
            <th>Description</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Created Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {companyProfiles.map((profile) => (
            <tr key={profile.organizationID}>
              <td>{profile.organizationID}</td>
              <td>{profile.tenantID}</td>
              <td>{profile.organizationName}</td>
              <td>{profile.description}</td>
              <td>{profile.address}</td>
              <td>{profile.contactPhone}</td>
              <td>{profile.contactEmail}</td>
              <td>{formatDate(profile.createdDate)}</td>
              <td>
                <Button variant="success" onClick={() => handleEdit(profile)}>Edit</Button>{' '}
                <Button variant="danger" onClick={() => handleDelete(profile.companyID)}>Delete</Button>{' '}
                <Button variant="info"  onClick={() => handleView(profile)}>View</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table> */}
      <table className="custom-table">
<thead className='tabel-head'>
<tr>
<th><input className='check-box' type="checkbox" /></th>
<th>Organization ID</th>
            <th>Tenant ID</th>
            <th>Organization Name</th>
            <th>Description</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Created Date</th>
            <th>Actions</th>
</tr>
</thead>
<tbody>
{companyProfiles.map((profile) => (
 <tr key={profile.organizationID}>
  <td><input className='check-box' type="checkbox" /></td>
<td>{profile.organizationID}</td>
              <td>{profile.tenantID}</td>
              <td>{profile.organizationName}</td>
              <td>{profile.description}</td>
              <td>{profile.address}</td>
              <td>{profile.contactPhone}</td>
              <td>{profile.contactEmail}</td>
              <td>{formatDate(profile.createdDate)}</td>
              <td>
<span className="action-icons">
<button className="view-btn"  onClick={() => handleView(profile)}><img src={eyeicon} /></button>
<button onClick={() => handleEdit(profile)} className="edit-btn"><img src={editicon} /></button>
<button  onClick={() => handleDelete(profile.companyID)}className="delete-btn"><img src={deleteicon} /></button>
</span>
</td>
</tr>
        ))}
</tbody>
</table>
      <ViewCompanyProfileModal show={showViewModal} handleClose={handleCloseViewModal} companyProfile={selectedProfile} />
    </>
  );
};

export default CompanyProfileGrid;
import React, { useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useCompanyProfile } from '../../contexts/CompanyProfileContext';
import { toast } from 'react-toastify';
import ViewCompanyProfileModal from './ViewCompanyProfileModal'
import formatDate from '../../utils/formateDate';

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
      <Table striped bordered hover>
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
                <Button variant="info" onClick={() => handleView(profile)}>View</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <ViewCompanyProfileModal show={showViewModal} handleClose={handleCloseViewModal} companyProfile={selectedProfile} />
    </>
  );
};

export default CompanyProfileGrid;
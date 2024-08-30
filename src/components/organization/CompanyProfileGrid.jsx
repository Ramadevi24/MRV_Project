import React, { useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useCompanyProfile } from '../../contexts/CompanyProfileContext';
import { toast } from 'react-toastify';
import ViewCompanyProfileModal from './ViewCompanyProfileModal'

const CompanyProfileGrid = ({onEdit}) => {
  const { companyProfiles, deleteCompanyProfile, fetchCompanyProfiles } = useCompanyProfile();
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);

  const handleDelete = async (id) => {
    try {
      await deleteCompanyProfile(id);
      await fetchCompanyProfiles();
      toast.success(`Company profile deleted successfully.`);
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
            <th>Company Name</th>
            <th>Owner</th>
            <th>Type</th>
            <th>Address</th>
            <th>City</th>
            <th>State</th>
            <th>Zipcode</th>
            <th>Country</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Website</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {companyProfiles.map((profile) => (
            <tr key={profile.companyID}>
              <td>{profile.companyName}</td>
              <td>{profile.companyOwner}</td>
              <td>{profile.companyType}</td>
              <td>{profile.companyAddress}</td>
              <td>{profile.city}</td>
              <td>{profile.state}</td>
              <td>{profile.zipcode}</td>
              <td>{profile.country}</td>
              <td>{profile.companyPhone}</td>
              <td>{profile.companyEmail}</td>
              <td>{profile.companyWebsite}</td>
              <td>{profile.companyDescription}</td>
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
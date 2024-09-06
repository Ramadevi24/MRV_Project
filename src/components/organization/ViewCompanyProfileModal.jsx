import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import formateDate from '../../utils/formateDate';

const ViewCompanyProfileModal = ({ show, handleClose, companyProfile }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Organization Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {companyProfile && (
          <>
            <p><strong>Organization Name:</strong> {companyProfile.organizationName}</p>
            <p><strong>Tenant Name:</strong> {companyProfile.tenantName}</p>
            <p><strong>Description:</strong> {companyProfile.description}</p>
            <p><strong>Established Date:</strong> {formateDate(companyProfile.establishedDate)}</p>
            <p><strong>Address:</strong> {companyProfile.address}</p>
            <p><strong>Email:</strong> {companyProfile.contactEmail}</p>
            <p><strong>Phone:</strong> {companyProfile.contactPhone}</p>
            <p><strong>categories:</strong> {companyProfile.categories.$values.join(',')}</p>
            <p><strong>Location:</strong> {companyProfile.country}</p>
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewCompanyProfileModal;
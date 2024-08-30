import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const ViewCompanyProfileModal = ({ show, handleClose, companyProfile }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Company Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {companyProfile && (
          <>
            <p><strong>Company Name:</strong> {companyProfile.companyName}</p>
            <p><strong>Owner:</strong> {companyProfile.companyOwner}</p>
            <p><strong>Type:</strong> {companyProfile.companyType}</p>
            <p><strong>Address:</strong> {companyProfile.companyAddress}</p>
            <p><strong>City:</strong> {companyProfile.city}</p>
            <p><strong>State:</strong> {companyProfile.state}</p>
            <p><strong>Zipcode:</strong> {companyProfile.zipcode}</p>
            <p><strong>Country:</strong> {companyProfile.country}</p>
            <p><strong>Phone:</strong> {companyProfile.companyPhone}</p>
            <p><strong>Email:</strong> {companyProfile.companyEmail}</p>
            <p><strong>Website:</strong> {companyProfile.companyWebsite}</p>
            <p><strong>Description:</strong> {companyProfile.companyDescription}</p>
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
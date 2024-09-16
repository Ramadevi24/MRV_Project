import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import {formatDate} from '../../utils/formateDate';
import { useTranslation } from "react-i18next";
import { useLocation } from 'react-router-dom';

const ViewCompanyProfileModal = ({ show, handleClose, companyProfile }) => {
  const {t}=useTranslation();
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t('Organization Profile')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {companyProfile && (
          <>
            <p><strong>{t('Organization Name')}:</strong> {companyProfile.organizationName}</p>
            <p><strong>{t('Tenant Name')}:</strong> {companyProfile.tenantName}</p>
            <p><strong>{t('Description')}:</strong> {companyProfile.description}</p>
            <p><strong>{t('Established Date')}:</strong> {formatDate(companyProfile.establishedDate)}</p>
            <p><strong>{t('Address')}:</strong> {companyProfile.address}</p>
            <p><strong>{t('Email')}:</strong> {companyProfile.contactEmail}</p>
            <p><strong>{t('Phone')}:</strong> {companyProfile.contactPhone}</p>
            <p><strong>{t('categories')}:</strong> {companyProfile.categories.$values.join(',')}</p>
            <p><strong>{t('Location')}:</strong> {companyProfile.country}</p>
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          {t('Close')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewCompanyProfileModal;
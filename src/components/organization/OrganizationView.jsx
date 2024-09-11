import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { Card, Button, Table } from 'react-bootstrap';

const OrganizationView = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [organization, setOrganization] = useState(null);

  useEffect(() => {
    const fetchOrganization = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/Organization/${id}`);
        setOrganization(response.data);
      } catch (error) {
        console.error('Failed to fetch organization', error);
      }
    };

    fetchOrganization();
  }, [id]);

  if (!organization) {
    return <div>{t('Loading...')}</div>;
  }

  return (
    <div className="container">
      <Card>
        <Card.Header>{t('Organization Details')}</Card.Header>
        <Card.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>{t('Organization Name')}</th>
                <th>{t('Description')}</th>
                <th>{t('Established Date')}</th>
                <th>{t('Tenant Name')}</th>
                <th>{t('Contact Email')}</th>
                <th>{t('Address')}</th>
                <th>{t('Categories')}</th>
                <th>{t('Locations')}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{organization.organizationName}</td>
                <td>{organization.description}</td>
                <td>{organization.establishedDate}</td>
                <td>{organization.tenantName}</td>
                <td>{organization.contactEmail}</td>
                <td>{organization.address}</td>
                <td>{organization.categories.$values.join(', ')}</td>
                <td>{organization.locations.$values.join(', ')}</td>
              </tr>
            </tbody>
          </Table>
          <Button variant="primary" onClick={() => window.history.back()} className="mt-3">
            {t('Back')}
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default OrganizationView;
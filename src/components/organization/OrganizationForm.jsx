import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router-dom';
import DropdownTreeSelect from 'react-dropdown-tree-select';
import 'react-dropdown-tree-select/dist/styles.css';
import '../../css/custom-dropdown.css'; // Import custom CSS

const OrganizationForm = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    organizationName: '',
    description: '',
    establishedDate: '',
    tenantID: '',
    contactEmail: '',
    contactPhone: '', // Added contactPhone field
    address: '',
    categoryIDs: [],
    locations: [{ latitude: '', longitude: '', address: '' }] // Grouped location fields
  });
  const [formErrors, setFormErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(true);
  const [tenants, setTenants] = useState([]);
  const [categories, setCategories] = useState([]);
  const [alertMessage, setAlertMessage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tenantsResponse, categoriesResponse] = await Promise.all([
          axios.get('http://localhost:5000/api/Tenant'),
          axios.get('http://localhost:5000/api/Categories/level1and2')
        ]);
  
        setTenants(tenantsResponse.data.$values);
        setCategories(transformCategories(categoriesResponse.data.$values));
  
        if (id) {
          const organizationResponse = await axios.get(`http://localhost:5000/api/Organization/${id}`);
          const organizationData = organizationResponse.data;
          // Ensure locations array is properly initialized
          if (!organizationData.locations || organizationData.locations.length === 0) {
            organizationData.locations = [{ latitude: '', longitude: '', address: '' }];
          }
          // Format the established date
          if (organizationData.establishedDate) {
            organizationData.establishedDate = new Date(organizationData.establishedDate).toISOString().split('T')[0];
          }
          // Find the tenant ID based on tenant name
          const matchedTenant = tenantsResponse.data.$values.find(tenant => tenant.name === organizationData.tenantName);
          if (matchedTenant) {
            organizationData.tenantID = matchedTenant.tenantID;
          }
          setFormData(organizationData);
        }
      } catch (error) {
        console.error('Failed to fetch data', error);
      }
    };
  
    fetchData();
  }, [id]);

  useEffect(() => {
    setIsFormValid(validateForm());
  }, [formData]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        if (id) {
          await axios.put(`http://localhost:5000/api/Organization/${id}`, formData);
          setAlertMessage({ type: 'success', text: t('Organization updated successfully') });
        } else {
          await axios.post('http://localhost:5000/api/Organization', formData);
          setAlertMessage({ type: 'success', text: t('Organization created successfully') });
        }
        resetForm();
        navigate('/organizationtable');
      } catch (error) {
        setAlertMessage({ type: 'danger', text: t('Failed to save organization. Please try again later.') });
      }
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.organizationName) errors.organizationName = true;
    if (!formData.description) errors.description = true;
    if (!formData.establishedDate) errors.establishedDate = true;
    if (!formData.tenantID) errors.tenantID = true;
    if (!formData.contactEmail) {
      errors.contactEmail = true;
    } else if (!/\S+@\S+\.\S+/.test(formData.contactEmail)) {
      errors.contactEmail = t('Invalid email format');
    }
    if (!formData.contactPhone) errors.contactPhone = true; // Validate contactPhone field
    if (!formData.address) errors.address = true;
    if (formData.categoryIDs?.$values?.length === 0) errors.categoryIDs = true;
    if (formData.locations?.$values?.length === 0 || !formData.locations?.$values?.[0]?.latitude || !formData.locations?.$values?.[0]?.longitude) {
      errors.locations = true;
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const resetForm = () => {
    setFormData({
      organizationName: '',
      description: '',
      establishedDate: '',
      tenantID: '',
      contactEmail: '',
      contactPhone: '', // Reset contactPhone field
      address: '',
      categoryIDs: [],
      locations: [{ latitude: '', longitude: '', address: '' }] // Reset location fields
    });
    setFormErrors({});
  };

  const transformCategories = (categories) => {
    return categories.map(category => ({
      label: category.categoryName,
      value: category.categoryID,
      children: category.subCategories ? transformCategories(category.subCategories.$values) : []
    }));
  };

  const handleCategoryChange = (currentNode, selectedNodes) => {
    setFormData({ ...formData, categoryIDs: selectedNodes.map(node => node.value) });
  };

  const handleLocationChange = (index, field, value) => {
    const newLocations = [...formData.locations];
    newLocations[index][field] = value;
    setFormData({ ...formData, locations: newLocations });
  };

  const handleTenantChange = (e) => {
    setFormData({ ...formData, tenantID: e.target.value });
  };

  const renderLabel = (label) => (
    <span>
      {label} <span style={{ color: 'red' }}>*</span>
    </span>
  );

  console.log('formData:', formData);

  return (
    <div className="container">
      <h1>{id ? t('Edit Organization') : t('Add Organization')}</h1>
      {alertMessage && <Alert variant={alertMessage.type}>{alertMessage.text}</Alert>}
      <Form onSubmit={handleFormSubmit}>
        <div className="row">
          <div className="col-md-6">
            <Form.Group controlId="organizationName">
              <Form.Label>{renderLabel(t('Organization Name'))}</Form.Label>
              <Form.Control
                type="text"
                value={formData.organizationName}
                onChange={(e) => setFormData({ ...formData, organizationName: e.target.value })}
                isInvalid={!!formErrors.organizationName}
              />
              <Form.Control.Feedback type="invalid">{formErrors.organizationName}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>{renderLabel(t('Description'))}</Form.Label>
              <Form.Control
                as="textarea"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                isInvalid={!!formErrors.description}
              />
              <Form.Control.Feedback type="invalid">{formErrors.description}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="establishedDate">
              <Form.Label>{renderLabel(t('Established Date'))}</Form.Label>
              <Form.Control
                type="date"
                value={formData.establishedDate}
                onChange={(e) => setFormData({ ...formData, establishedDate: e.target.value })}
                isInvalid={!!formErrors.establishedDate}
              />
              <Form.Control.Feedback type="invalid">{formErrors.establishedDate}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="tenantID">
              <Form.Label>{renderLabel(t('Tenant Name'))}</Form.Label>
              <Form.Control
                as="select"
                value={formData.tenantID}
                onChange={handleTenantChange}
                isInvalid={!!formErrors.tenantID}
              >
                <option value="">{t('Select Tenants')}</option>
                {tenants.map((tenant) => (
                  <option key={tenant.tenantID} value={tenant.tenantID}>{tenant.name}</option>
                ))}
              </Form.Control>
              <Form.Control.Feedback type="invalid">{formErrors.tenantID}</Form.Control.Feedback>
            </Form.Group>
          </div>
          <div className="col-md-6">
            <Form.Group controlId="contactEmail">
              <Form.Label>{renderLabel(t('Contact Email'))}</Form.Label>
              <Form.Control
                type="email"
                value={formData.contactEmail}
                onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                isInvalid={!!formErrors.contactEmail}
              />
              <Form.Control.Feedback type="invalid">{formErrors.contactEmail}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="contactPhone">
              <Form.Label>{renderLabel(t('Phone'))}</Form.Label>
              <Form.Control
                type="text"
                value={formData.contactPhone}
                onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                isInvalid={!!formErrors.contactPhone}
              />
              <Form.Control.Feedback type="invalid">{formErrors.contactPhone}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="address">
              <Form.Label>{renderLabel(t('Address'))}</Form.Label>
              <Form.Control
                as="textarea"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                isInvalid={!!formErrors.address}
              />
              <Form.Control.Feedback type="invalid">{formErrors.address}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="categoryIDs">
              <Form.Label>{renderLabel(t('Category ID'))}</Form.Label>
              <DropdownTreeSelect
                data={categories}
                onChange={handleCategoryChange}
                className={formErrors.categoryIDs ? 'is-invalid' : ''}
                values={formData.categoryIDs?.map(id => ({ value: id }))}
              />
              {formErrors.categoryIDs && <div className="invalid-feedback">{formErrors.categoryIDs}</div>}
            </Form.Group>
            <Form.Group controlId="location">
              <Form.Label>{renderLabel(t('Location'))}</Form.Label>
              <div className="form-row">
                <div className="col">
                  <Form.Label>{t('Latitude')}</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.locations && formData.locations.$values && formData.locations.$values[0] ? formData.locations.$values[0].latitude : ''}
                    onChange={(e) => handleLocationChange(0, 'latitude', e.target.value)}
                    placeholder={t('Enter Latitude')}
                    isInvalid={!!formErrors.locations}
                  />
                </div>
                <div className="col">
                  <Form.Label>{t('Longitude')}</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.locations && formData.locations.$values && formData.locations.$values[0] ? formData.locations.$values[0]?.longitude : ''}
                    onChange={(e) => handleLocationChange(0, 'longitude', e.target.value)}
                    placeholder={t('Enter Longitude')}
                    isInvalid={!!formErrors.locations}
                  />
                </div>
                <div className="col">
                  <Form.Label>{t('Address')}</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.locations && formData.locations.$values && formData.locations.$values[0] ? formData.locations.$values[0]?.address : ''}
                    onChange={(e) => handleLocationChange(0, 'address', e.target.value)}
                    placeholder={t('Enter address')}
                    isInvalid={!!formErrors.locations}
                  />
                </div>
              </div>
              {formErrors.locations && <div className="invalid-feedback">{formErrors.locations}</div>}
            </Form.Group>
          </div>
        </div>
        <Button type="submit" className="btn-primary" disabled={!isFormValid}>
          {t('Submit')}
        </Button>
      </Form>
    </div>
  );
};

export default OrganizationForm;
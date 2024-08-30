import React, { useState, useContext } from 'react';
import { Modal, Button, Form, FormGroup, FormLabel } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { TenantContext } from '../../contexts/TenantContext';
import { toast } from 'react-toastify';

const CreateTenantForm = ({ show, handleClose, currentTenant }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const { createTenant, updateTenant, fetchTenants } = useContext(TenantContext);
  const [isSubmitting, setIsSubmitting] = useState(false);


  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const createPayload = {
        name: data.name,
        description: data.description,
      };
      const updatedPayload = {
        tenantID: currentTenant && currentTenant.tenantID,
        name: data.name,
        description: data.description,
      };
      if (currentTenant && currentTenant.tenantID) {
        await updateTenant(currentTenant.tenantID, updatedPayload);
        toast.success('Tenant updated successfully');
      } else {
        await createTenant(createPayload);
        toast.success('Tenant created successfully');
      }
      handleClose();
      await fetchTenants();
    } catch (error) {
      console.error('Error processing role form:', error.message, error.stack);
      toast.error(`Error: ${error.response ? error.response.data.message : 'Could not process the role form.'}`);
    } finally {
      reset();
      setIsSubmitting(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{currentTenant && currentTenant.tenantID ? 'Edit Tenant' : 'Create Tenant'}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body>
          <FormGroup className="mb-3">
            <FormLabel>Tenant Name</FormLabel>
            <Form.Control
              type="text"
              placeholder="Enter tenant name"
              {...register('name', { required: true })}
            />
            {errors.name && <Form.Text className="text-muted">Tenant name is required.</Form.Text>}
          </FormGroup>
          <FormGroup className="mb-3">
            <FormLabel>Description</FormLabel>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="description"
              {...register('description', { required: true })}
            />
            {errors.description && <Form.Text className="text-muted">Description is required.</Form.Text>}
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default CreateTenantForm;
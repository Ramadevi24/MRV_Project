import React, { useState, useContext, useEffect } from 'react';
import { Modal, Button, Form, FormGroup, FormLabel, FormCheck } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { RolesContext } from '../../contexts/RolesContext';
import { PermissionsContext } from '../../contexts/PermissionsContext';
import { toast } from 'react-toastify';

const CreateRoleForm = ({ show, handleClose, currentRole }) => {
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();
  const { createRole, updateRole, fetchRoles } = useContext(RolesContext);
  const { permissions, fetchPermissions } = useContext(PermissionsContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedPermissions, setSelectedPermissions] = useState([]);

  useEffect(() => {
    fetchPermissions().catch(error => {
      console.error('Error fetching permissions:', error.message, error.stack);
      toast.error('Error fetching permissions.');
    });
  }, [fetchPermissions]);

  useEffect(() => {
    if (show) {
      setSelectedPermissions([]);
      if (currentRole) {
        const rolePermissions = currentRole.permissions.map(p => ({
          permissionID: p.permissionID,
          permissionDisplayName: p.permissionDisplayName,
          description: p.description
        }));
        setSelectedPermissions(rolePermissions);
        setValue('roleName', currentRole.roleName);
        setValue('description', currentRole.description);
      } else {
        reset();
      }
    }
  }, [show, currentRole, setValue, reset]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    console.log(selectedPermissions.map(item=>item.permissionID), 'selectedPermissions')
    try {
      const createPayload = {
        roleName: data.roleName,
        description: data.description,
        permissionIds: selectedPermissions.map(item=>item.permissionID),
      };
      const updatedPayload = {
        roleID: currentRole && currentRole.roleID,
        roleName: data.roleName,
        description: data.description,
        permissions: selectedPermissions.map(p => ({
          permissionID: p.permissionID,
          permissionDisplayName: p.permissionDisplayName,
          description: p.description
        }))
      };
      if (currentRole && currentRole.roleID) {
        await updateRole(currentRole.roleID, updatedPayload);
        toast.success('Role updated successfully');
      } else {
        await createRole(createPayload);
        toast.success('Role created successfully');
      }
      handleClose();
      await fetchRoles();
    } catch (error) {
      console.error('Error processing role form:', error.message, error.stack);
      toast.error(`Error: ${error.response ? error.response.data.message : 'Could not process the role form.'}`);
    } finally {
      reset();
      setIsSubmitting(false);
      setSelectedPermissions([]);
    }
  };

  const handlePermissionChange = (permissionID, permissionName, description) => {
    const exists = selectedPermissions.find(p => p.permissionID === permissionID);
    if (exists) {
      setSelectedPermissions(selectedPermissions.filter(p => p.permissionID !== permissionID));
    } else {
      setSelectedPermissions([...selectedPermissions, { permissionID, permissionName, description }]);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{currentRole && currentRole.roleID ? 'Edit Role' : 'Create Role'}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body>
          <FormGroup className="mb-3">
            <FormLabel>Role Name</FormLabel>
            <Form.Control
              type="text"
              placeholder="Enter role name"
              {...register('roleName', { required: true })}
            />
            {errors.roleName && <Form.Text className="text-muted">Role name is required.</Form.Text>}
          </FormGroup>
          <FormGroup className="mb-3">
            <FormLabel>Description</FormLabel>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Role description"
              {...register('description', { required: true })}
            />
            {errors.description && <Form.Text className="text-muted">Description is required.</Form.Text>}
          </FormGroup>
          <FormGroup className="mb-3">
            <FormLabel>Permissions</FormLabel>
            {permissions.map(permission => (
              <FormCheck
                key={permission.permissionID}
                label={permission.permissionDisplayName}
                type="checkbox"
                id={`permission-${permission.permissionID}`}
                checked={selectedPermissions.some(p => p.permissionID === permission.permissionID)}
                onChange={() => handlePermissionChange(permission.permissionID, permission.permissionDisplayName, permission.description)}
              />
            ))}
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

export default CreateRoleForm;
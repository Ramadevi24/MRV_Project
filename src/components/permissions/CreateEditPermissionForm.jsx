import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { usePermissions } from '../../contexts/PermissionsContext';
import { toast } from 'react-toastify';
import { useTranslation } from "react-i18next";

const CreateEditPermissionForm = ({ show, handleClose, currentPermission }) => {
  const {t}=useTranslation();
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();
  const { createPermission, updatePermission, fetchPermissions } = usePermissions();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (currentPermission) {
      Object.keys(currentPermission).forEach(key => {
        setValue(key, currentPermission[key]);
      });
    } else if (show) {
      reset();
    }
  }, [currentPermission, setValue, reset, show]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      if (currentPermission && currentPermission.permissionID) {
        const UpdateData ={
          description: data.description,
          permissionID: data.permissionID,
          permissionName:data.permissionName

        }
        await updatePermission(currentPermission.permissionID, UpdateData);
        toast.success(t('Permission updated successfully'));
      } else {
        await createPermission(data);
        toast.success(t('Permission created successfully'));
      }
      handleClose();
      await fetchPermissions();
    } catch (error) {
      console.error('Error processing permission form:', error.message, error.stack);
      toast.error(`Error: ${error.response ? error.response.data.message : t('Could not process the permission form.')}`);
    } finally {
      reset();
      setIsSubmitting(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{currentPermission && currentPermission.permissionID ? t('Edit Permission') : t('Create Permission')}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>{t('Permission Name')}</Form.Label>
            <Form.Control
              type="text"
              placeholder={t("Enter permission name")}
              {...register('permissionName', { required: true })}
            />
            {errors.permissionName && <Form.Text className="text-muted">{t('Permission name is required.')}</Form.Text>}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>{t('Description')}</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder={t("Permission description")}
              {...register('description', { required: true })}
            />
            {errors.description && <Form.Text className="text-muted">{t('Description is required.')}</Form.Text>}
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {t('Close')}
          </Button>
          <Button variant="primary" type="submit" disabled={isSubmitting}>
            {isSubmitting ? t('Saving...') : t('Save Changes')}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default CreateEditPermissionForm;
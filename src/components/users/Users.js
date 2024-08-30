import React, { useState, useEffect } from 'react';
import { Button, Table, Modal, Form } from 'react-bootstrap';
import { useUsers } from '../../contexts/UsersContext';
import { useCompanyProfile } from '../../contexts/CompanyProfileContext';
import { useRoles } from '../../contexts/RolesContext'
import { toast } from 'react-toastify';
import Topbar from "../Topbar";
import Sidebar from "../Sidebar";

const Users = () => {
  const [show, setShow] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [viewingUser, setViewingUser] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const { users, fetchUsers, createUser, updateUser, deleteUser } = useUsers();
  const { companyProfiles, fetchCompanyProfiles } = useCompanyProfile();
  const { roles, fetchRoles } = useRoles();

  console.log(users, 'users')

  useEffect(() => {
    fetchUsers().catch(error => {
      console.error('Error fetching users:', error.message, error.stack);
      toast.error('Error fetching users');
    });
    fetchCompanyProfiles().catch(error => {
      console.error('Error fetching company profiles:', error.message, error.stack);
      toast.error('Error fetching company profiles');
    });
    fetchRoles().catch(error => {
      console.error('Error fetching roles:', error.message, error.stack);
      toast.error('Error fetching roles');
    });
  }, [fetchUsers, fetchCompanyProfiles, fetchRoles]);

  const handleClose = () => {
    setShow(false);
    setCurrentUser({});
    setEditMode(false);
    setViewingUser(null);
    setShowViewModal(false);
  };
  const handleShow = () => setShow(true);

  const handleEdit = (user) => {
    setEditMode(true);
    setCurrentUser(user);
    handleShow();
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      toast.success('User deleted successfully');
    } catch (error) {
      console.error('Error deleting user:', error.message, error.stack);
      toast.error('Error deleting user');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const userData = Object.fromEntries(formData.entries());

    try {
      if (editMode) {
        await updateUser(currentUser.userID, userData);
        toast.success('User updated successfully');
      } else {
        await createUser(userData);
        toast.success('User created successfully');
      }
    } catch (error) {
      console.error('Error processing user form:', error.message, error.stack);
      toast.error('Error processing user form');
    } finally {
      handleClose();
      fetchUsers();
    }
  };

  const handleView = (userId) => {
    const user = users.find(user => user.userID === userId);
    if (user) {
      setViewingUser(user);
      setShowViewModal(true);
    }
  };

  return (
    <>
    <div className="layout-wrapper">
      <div className="main-menu active">
        <Sidebar />
      </div>
      <div className="page-content">
        <Topbar />
        <div>
      <Button variant="primary" style={{margin: "20px",float:"inline-end"}} onClick={() => { setEditMode(false); handleShow(); }}>
        Add User
      </Button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>User ID</th>
            <th>First Name</th>
            <th>Email</th>
            <th>Login Type</th>
            <th>Tenant Name</th>
            <th>Organization Name</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* {users && users?.map(user => (
            <tr key={user.userID}> */}
              <td>{users.userID}</td>
              <td>{users.firstName}</td>
              <td>{users.email}</td>
              <td>{users.loginType}</td>
              <td>{users.tenantName}</td>
              <td>{users.organizationName}</td>
              <td>{users.roleName}</td>
              <td>
                <Button variant="success" onClick={() => handleEdit(users)}>Edit</Button>{' '}
                <Button variant="danger" onClick={() => handleDelete(users.userID)}>Delete</Button>{' '}
                <Button variant="info" onClick={() => handleView(users.userID)}>View</Button>
              </td>
            {/* </tr>
          ))} */}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editMode ? 'Edit User' : 'Add User'}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control name="firstName" type="text" defaultValue={currentUser.firstName} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control name="lastName" type="text" defaultValue={currentUser.lastName} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control name="email" type="email" defaultValue={currentUser.email} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Tenant Name</Form.Label>
              <Form.Control name="tenantName" type="text" defaultValue={currentUser.tenantName} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Company</Form.Label>
              <Form.Select name="companyID" defaultValue={currentUser.companyID || ''} required>
                <option value="">Select Company</option>
                {companyProfiles.map((company) => (
                  <option key={company.companyID} value={company.companyID}>{company.companyName}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Select name="roleID" defaultValue={currentUser.roleID || ''} required>
                <option value="">Select Role</option>
                {roles.map((role) => (
                  <option key={role.roleID} value={role.roleID}>{role.roleName}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control name="password" type="password" defaultValue={currentUser.password} required={!editMode} />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <Modal show={showViewModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>User Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {viewingUser && (
            <Table striped bordered>
              <tbody>
                <tr>
                  <td>First Name</td>
                  <td>{viewingUser.firstName}</td>
                </tr>
                <tr>
                  <td>Last Name</td>
                  <td>{viewingUser.lastName}</td>
                </tr>
                <tr>
                  <td>Username</td>
                  <td>{viewingUser.username}</td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td>{viewingUser.email}</td>
                </tr>
                <tr>
                  <td>Company</td>
                  <td>{companyProfiles.find(cp => cp.companyID === viewingUser.companyID)?.companyName || 'N/A'}</td>
                </tr>
                <tr>
                  <td>Role</td>
                  <td>{roles.find(r => r.roleID === viewingUser.roleID)?.roleName || 'N/A'}</td>
                </tr>
              </tbody>
            </Table>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
      </div>
      </div>
    </div>
      </>
  );
};

export default Users;
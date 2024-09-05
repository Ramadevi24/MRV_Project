import React, { useState, useEffect } from "react";
import { Button, Table, Modal, Form } from "react-bootstrap";
import { useUsers } from "../../contexts/UsersContext";
import { useCompanyProfile } from "../../contexts/CompanyProfileContext";
import { useTenantRoles } from "../../contexts/TenantRolesContext";
import { useTenants } from "../../contexts/TenantContext";
import { toast } from "react-toastify";
import CryptoJS from 'crypto-js';
import '../../css/TableGrid.css';
import eyeicon from '../../images/eyeicon.png';
import editicon from '../../images/editicon.png';
import deleteicon from '../../images/deleteicon.png';
import '../../css/AddNewRole.css';
import searchicon from '../../images/searchbaricon.png';

const Users = () => {
  const [show, setShow] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [viewingUser, setViewingUser] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const { users, fetchUsers, createUser, updateUser, deleteUser } = useUsers();
  const { companyProfiles, fetchCompanyProfiles } = useCompanyProfile();
  const { tenants, fetchTenants } = useTenants();
  const { tenantroles, fetchTenantRoles } = useTenantRoles();

  useEffect(() => {
    fetchUsers().catch((error) => {
      console.error("Error fetching users:", error.message, error.stack);
      toast.error("Error fetching users");
    });
    fetchCompanyProfiles().catch((error) => {
      console.error(
        "Error fetching company profiles:",
        error.message,
        error.stack
      );
      toast.error("Error fetching company profiles");
    });
    fetchTenantRoles().catch((error) => {
      console.error("Error fetching roles:", error.message, error.stack);
      toast.error("Error fetching roles");
    });
    fetchTenants().catch((error) => {
      console.error("Error fetching roles:", error.message, error.stack);
      toast.error("Error fetching roles");
    });
  }, [fetchUsers, fetchCompanyProfiles, fetchTenantRoles, fetchTenants]);

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
      toast.success("User deleted successfully");
    } catch (error) {
      console.error("Error deleting user:", error.message, error.stack);
      toast.error("Error deleting user");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const userData = Object.fromEntries(formData.entries());
    const encryptedPassword = CryptoJS.SHA256(userData.passwordHash).toString();
    userData.loginType = "custom";
    userData.passwordHash = encryptedPassword;
    console.log(userData, "userData");
    try {
      if (editMode) {
        await updateUser(currentUser.userID, userData);
        toast.success("User updated successfully");
      } else {
        await createUser(userData);
        toast.success("User created successfully");
      }
    } catch (error) {
      console.error("Error processing user form:", error.message, error.stack);
      toast.error("Error processing user form");
    } finally {
      handleClose();
      fetchUsers();
    }
  };

  const handleView = (userId) => {
    const user = users.find((user) => user.userID === userId);
    if (user) {
      setViewingUser(user);
      setShowViewModal(true);
    }
  };

  return (
    <>
          <div style={{padding:'20px'}}>
            {/* <Button
              variant="primary"
              style={{ margin: "20px", float: "inline-end" }}
              onClick={() => {
                setEditMode(false);
                handleShow();
              }}
            >
              Add User
            </Button> */}
            <div className="header-container mt-3">
<h2 className="header-title">Users</h2>
<div className="header-actions">
<div className="search-box">

<input
            type="text"
            placeholder="Search User"
            className="search-input"
          />
          <img className="search-icon" src={searchicon} />

</div>
<select className="sort-dropdown">
<option>Sort By</option>
<option value="created-date">Created Date</option>
<option value="role-name">Role Name</option>
</select>
<button onClick={() => {
                setEditMode(false);
                handleShow();
              }} className="add-role-btn">Add User</button>
</div>
</div>

            {/* <Table striped bordered hover style={{width:'95%', marginLeft:'35px'}}>
              <thead>
                <tr>
                  <th>User ID</th>
                  <th>First Name</th>
                  <th>Email</th>
                  <th>Login Type</th>
                  <th>Tenant Name</th>
                  <th>Organization Name</th>
                  <th>Tenant Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users && users?.map(user => (
            <tr key={user.userID}>
                <td>{user.userID}</td>
                <td>{user.firstName}</td>
                <td>{user.email}</td>
                <td>{user.loginType}</td>
                <td>{user.tenantName}</td>
                <td>{user.organizationName} </td>
                <td>{user.roleName}</td>
                <td>
                  <Button variant="success" onClick={() => handleEdit(user)}>
                    Edit
                  </Button>{" "}
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(user.userID)}
                  >
                    Delete
                  </Button>{" "}
                  <Button
                    variant="info"
                    onClick={() => handleView(users.userID)}
                  >
                    View
                  </Button>
                </td>
                </tr>
          ))}
              </tbody>
            </Table> */}
            <table className="custom-table">
<thead className='tabel-head'>
<tr>
<th><input className='check-box' type="checkbox" /></th>
<th>User ID</th>
                  <th>First Name</th>
                  <th>Email</th>
                  <th>Login Type</th>
                  <th>Tenant Name</th>
                  <th>Organization Name</th>
                  <th>Tenant Role</th>
                  <th>Actions</th>
</tr>
</thead>
<tbody>
{users && users?.map(user => (
  <tr key={user.userID}>
<td><input className='check-box' type="checkbox" /></td>
<td>{user.userID}</td>
                <td>{user.firstName}</td>
                <td>{user.email}</td>
                <td>{user.loginType}</td>
                <td>{user.tenantName}</td>
                <td>{user.organizationName} </td>
                <td>{user.roleName}</td>
<td>
<span className="action-icons">
<button className="view-btn" onClick={() => handleView(users.userID)}><img src={eyeicon} /></button>
<button onClick={() => handleEdit(user)} className="edit-btn"><img src={editicon} /></button>
<button onClick={() => handleDelete(user.userID)} className="delete-btn"><img src={deleteicon} /></button>
</span>
</td>
</tr>
        ))}
</tbody>
</table>

            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>{editMode ? "Edit User" : "Add User"}</Modal.Title>
              </Modal.Header>
              <Form onSubmit={handleSubmit}>
                <Modal.Body>
                  <Form.Group className="mb-3">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      name="firstName"
                      type="text"
                      defaultValue={currentUser.firstName}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      name="lastName"
                      type="text"
                      defaultValue={currentUser.lastName}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      name="email"
                      type="email"
                      defaultValue={currentUser.email}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Mobile Number</Form.Label>
                    <Form.Control
                      name="phone"
                      type="number"
                      defaultValue={currentUser.phone}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      name="passwordHash"
                      type="password"
                      defaultValue={currentUser.passwordHash}
                      required={!editMode}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Tenant Name</Form.Label>
                    <Form.Select
                      name="tenantID"
                      defaultValue={currentUser.tenantID || ""}
                      required
                    >
                      <option value="">Select Tenants</option>
                      {tenants.map((company) => (
                        <option key={company.tenantID} value={company.tenantID}>
                          {company.name}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Organization</Form.Label>
                    <Form.Select
                      name="organizationID"
                      defaultValue={currentUser.organizationID || ""}
                      required
                    >
                      <option value="">Select Company</option>
                      {companyProfiles.map((company) => (
                        <option
                          key={company.organizationID}
                          value={company.organizationID}
                        >
                          {company.organizationName}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Tenant Role</Form.Label>
                    <Form.Select
                      name="tenantRoleID"
                      defaultValue={currentUser.tenantRoleID || ""}
                      required
                    >
                      <option value="">Select Role</option>
                      {tenantroles.map((role) => (
                        <option
                          key={role.tenantRoleID}
                          value={role.tenantRoleID}
                        >
                          {role.roleName}
                        </option>
                      ))}
                    </Form.Select>
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
                        <td>
                          {companyProfiles.find(
                            (cp) => cp.companyID === viewingUser.companyID
                          )?.companyName || "N/A"}
                        </td>
                      </tr>
                      <tr>
                        <td>Role</td>
                        <td>
                          {tenantroles.find(
                            (r) => r.tenantRoleID === viewingUser.tenantRoleID
                          )?.roleName || "N/A"}
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                )}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
    </>
  );
};

export default Users;

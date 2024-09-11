import React, { useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { usePermissions } from '../../contexts/PermissionsContext';
import { toast } from 'react-toastify';
import '../../css/TableGrid.css';
import eyeicon from '../../images/eyeicon.png';
import editicon from '../../images/editicon.png';
import deleteicon from '../../images/deleteicon.png';

const PermissionsGrid = ({ handleSelectPermissionForEdit }) => {
  const { permissions, fetchPermissions, deletePermission } = usePermissions();

  useEffect(() => {
    fetchPermissions().catch(error => {
      console.error('Failed to fetch permissions:', error.message, error.stack);
      toast.error('Error fetching permissions.');
    });
  }, [fetchPermissions]);

  const handleEdit = (permission) => {
    handleSelectPermissionForEdit(permission);
  };

  const handleDelete = async (id) => {
    try {
      await deletePermission(id);
      toast.success('Permission deleted successfully.');
    } catch (error) {
      console.error(`Error deleting permission with ID ${id}:`, error.message, error.stack);
      toast.error(`Error deleting permission with ID ${id}.`);
    }
  };

  return (
    // <Table striped bordered hover style={{width:'95%', marginLeft:'35px'}}>
    //   <thead>
    //     <tr>
    //       <th>Permission Name</th>
    //       <th>Description</th>
    //       <th>Actions</th>
    //     </tr>
    //   </thead>
    //   <tbody>
    //     {permissions.map((permission) => (
    //       <tr key={permission.permissionID}>
    //         <td>{permission.permissionName}</td>
    //         <td>{permission.description}</td>
    //         <td>
    //           <Button variant="info" onClick={() => handleEdit(permission)}>Edit</Button>{' '}
    //           <Button variant="danger" onClick={() => handleDelete(permission.permissionID)}>Delete</Button>
    //         </td>
    //       </tr>
    //     ))}
    //   </tbody>
    // </Table>
    <table className="custom-table">
<thead className='tabel-head'>
<tr>
<th><input className='check-box' type="checkbox" /></th>
<th>Permission Name</th>
<th>Description</th>
 <th>Actions</th>
</tr>
</thead>
<tbody>
{permissions.map((permission) => (
  <tr key={permission.permissionID}>
<td><input className='check-box' type="checkbox" /></td>
<td>{permission.permissionDisplayName}</td>
  <td>{permission.description}</td>
<td>
<span className="action-icons">
{/* <button className="view-btn"><img src={eyeicon} /></button> */}
<button onClick={() => handleEdit(permission)} className="edit-btn"><img src={editicon} /></button>
<button  onClick={() => handleDelete(permission.permissionID)} className="delete-btn"><img src={deleteicon} /></button>
</span>
</td>
</tr>
        ))}
</tbody>
</table>
  );
};

export default PermissionsGrid;
// import React, { useEffect } from 'react';
// import { Table, Button } from 'react-bootstrap';
// import { useRoles } from '../../contexts/RolesContext';
// import { toast } from 'react-toastify';
// import formatDate from '../../utils/formateDate'

// const RolesGrid = ({ handleSelectRoleForEdit }) => {
//   const { roles, fetchRoles, deleteRole } = useRoles();

//   useEffect(() => {
//     fetchRoles().catch(error => {
//       console.error('Failed to fetch roles:', error.message, error.stack);
//     });
//   }, [fetchRoles]);

//   const handleEdit = (role) => {
//     handleSelectRoleForEdit(role);
//   };

//   const handleDelete = async (id) => {
//     try {
//       await deleteRole(id);
//       toast.success('Role deleted successfully.');
//     } catch (error) {
//       console.error(`Error deleting role with ID ${id}:`, error.message, error.stack);
//       toast.error(`Error deleting role with ID ${id}.`);
//     }
//   };

//   return (
//     <div className="roles-grid-container">
//       <Table striped bordered hover className="roles-table" style={{width:'95%', marginLeft:'35px'}}>
//       <thead>
//         <tr>
//           <th>Role Name</th>
//           <th>Description</th>
//           <th>Created Date</th>
//           <th>Actions</th>
//         </tr>
//       </thead>
//       <tbody>
//         {roles.map((role) => (
//           <tr key={role.roleID}>
//             <td>{role.roleName}</td>
//             <td>{role.description}</td>
//             <td>{formatDate(role.createdDate)}</td>
//             <td>
//               <Button variant="info" onClick={() => handleEdit(role)}>Edit</Button>{' '}
//               <Button variant="danger" onClick={() => handleDelete(role.roleID)}>Delete</Button>
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </Table>
//     </div>
//   );
// };

// export default RolesGrid;
import React, { useEffect } from 'react';
import { useRoles } from '../../contexts/RolesContext';
import { toast } from 'react-toastify';
import formatDate from '../../utils/formateDate'
import '../../css/TableGrid.css';
import eyeicon from '../../images/eyeicon.png';
import editicon from '../../images/editicon.png';
import deleteicon from '../../images/deleteicon.png';
 
const RolesGrid = ({handleSelectRoleForEdit}) => {
  const { roles, fetchRoles, deleteRole } = useRoles();

  useEffect(() => {
    fetchRoles().catch(error => {
      console.error('Failed to fetch roles:', error.message, error.stack);
    });
  }, [fetchRoles]);

  const handleEdit = (role) => {
    handleSelectRoleForEdit(role);
  };

  const handleDelete = async (id) => {
    try {
      await deleteRole(id);
      toast.success('Role deleted successfully.');
    } catch (error) {
      console.error(`Error deleting role with ID ${id}:`, error.message, error.stack);
      toast.error(`Error deleting role with ID ${id}.`);
    }
  };
  
 
  return (
<table className="custom-table">
<thead className='tabel-head'>
<tr>
<th><input className='check-box' type="checkbox" /></th>
<th>Role Name</th>
<th>Description</th>
<th>Created Date</th>
<th>Actions</th>
</tr>
</thead>
<tbody>
        {roles.map((role) => (
<tr key={role.roleID}>
<td><input className='check-box' type="checkbox" /></td>
<td>{role.roleName}</td>
<td>{role.description}</td>
<td>{formatDate(role.createdDate)}</td>
<td>
<span className="action-icons">
<button className="view-btn"><img src={eyeicon} /></button>
<button onClick={() => handleEdit(role)} className="edit-btn"><img src={editicon} /></button>
<button  onClick={() => handleDelete(role.roleID)} className="delete-btn"><img src={deleteicon} /></button>
</span>
</td>
</tr>
        ))}
</tbody>
</table>
  );
};
 
export default RolesGrid;
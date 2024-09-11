import React, { useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { useTenants } from '../../contexts/TenantContext';
import { toast } from 'react-toastify';
import formatDate from '../../utils/formateDate'
import '../../css/TableGrid.css';
import eyeicon from '../../images/eyeicon.png';
import deleteicon from '../../images/deleteicon.png';
import editicon from '../../images/editicon.png';
import { useTranslation } from "react-i18next";

const TenantGrid = ({ handleSelectTenantForEdit }) => {
  const{t}=useTranslation();
  const { tenants, fetchTenants, deleteTenant } = useTenants();

  useEffect(() => {
    fetchTenants().catch(error => {
      console.error('Failed to fetch roles:', error.message, error.stack);
    });
  }, [fetchTenants]);

  const handleEdit = (tenant) => {
    handleSelectTenantForEdit(tenant);
  };

  const handleDelete = async (id) => {
    try {
      await deleteTenant(id);
      toast.success(t('Role deleted successfully.'));
    } catch (error) {
      console.error(`Error deleting role with ID ${id}:`, error.message, error.stack);
      toast.error(t(`Error deleting role with ID ${id}.`));
    }
  };

  return (
    // <Table striped bordered hover style={{width:'95%', marginLeft:'35px'}}>
    //   <table  className="custom-table">
    //   <thead className='tabel-head'>
    //     <tr>
    //     <th>Tenant ID</th>
    //       <th>Tenant Name</th>
    //       <th>Description</th>
    //       <th>Created Date</th>
    //       <th>Actions</th>
    //     </tr>
    //   </thead>
    //   <tbody>
    //     {tenants.map((tenant) => (
    //       <tr key={tenant.tenantID}>
    //          <td>{tenant.tenantID}</td>
    //         <td>{tenant.name}</td>
    //         <td>{tenant.description}</td>
    //         <td>{formatDate(tenant.createdDate)}</td>
    //         <td>
    //           <Button variant="info" onClick={() => handleEdit(tenant)}>Edit</Button>{' '}
    //           <Button variant="danger" onClick={() => handleDelete(tenant.tenantID)}>Delete</Button>
    //         </td>
    //       </tr>
    //     ))}
    //   </tbody>
    //   </table>
    // </Table>
    <table className="custom-table">
<thead className='tabel-head'>
<tr>
<th><input className='check-box' type="checkbox" /></th>
<th>{t('Tenant ID')}</th>
<th>{t('Tenant Name')}</th>
<th>{t('Description')}</th>
 <th>{t('Created Date')}</th>
<th>{t('Actions')}</th>
</tr>
</thead>
<tbody>
{tenants.map((tenant) => (
<tr key={tenant.tenantID}>
<td><input className='check-box' type="checkbox" /></td>
<td>{tenant.tenantID}</td>
<td>{tenant.name}</td>
<td>{tenant.description}</td>
<td>{formatDate(tenant.createdDate)}</td>
<td>
<span className="action-icons">
<button className="view-btn"><img src={eyeicon} /></button>
<button onClick={() => handleEdit(tenant)} className="edit-btn"><img src={editicon} /></button>
<button  onClick={() => handleDelete(tenant.tenantID)} className="delete-btn"><img src={deleteicon} /></button>
</span>
</td>
</tr>
        ))}
</tbody>
</table>
    
  );
};

export default TenantGrid;
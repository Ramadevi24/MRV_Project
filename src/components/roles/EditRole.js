import React, { useState, useEffect } from 'react';
import '../../css/AddNewRole.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from 'react-router-dom';

const EditRole = ({userPermissions}) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { id } = useParams(); 
    const [permissions, setPermissions] = useState([]); 
    const [role, setRole] = useState(null); 
    const [formData, setFormData] = useState({
        roleName: '',
        description: '',
        permissionIds: [],
        tenantID: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [dropdownState, setDropdownState] = useState({});
    const [selectedPermissions, setSelectedPermissions] = useState([]);
    const [tenants, setTenants] = useState([]);

    useEffect(() => {
        fetchTenants();
      }, []);
    
      const fetchTenants = async () => {
        try {
          const response = await axios.get(
            "https://atlas.smartgeoapps.com/MRVAPI/api/Tenant",
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("AuthToken")}`,
              },
            }
          );
          setTenants(response.data.$values);
        } catch (error) {
          toast.error(t("errorFetchingData"));
        }
      };

    const toggleDropdown = (groupName) => {
        setDropdownState((prevState) => ({
            ...prevState,
            [groupName]: !prevState[groupName]
        }));
    };


        useEffect(() => {
            const fetchRole = async () => {
                try {
                  const tenantId = userPermissions.tenantID || null; // Check if tenantID exists
                  const roleId = id;
            
                  const url = tenantId 
                    ? `https://atlas.smartgeoapps.com/MRVAPI/api/Role/${roleId}?tenantId=${tenantId}`
                    : `https://atlas.smartgeoapps.com/MRVAPI/api/Role/${roleId}`;
            
                  const response = await axios.get(url, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('AuthToken')}` },
                  });
            
                  setRole(response.data);
                } catch (error) {
                  toast.error(t('errorFetchingRole'));
                }
              };
          
        // Fetch all permissions
        const fetchPermissionsData = async () => {
            try {
                const response = await axios.get('https://atlas.smartgeoapps.com/MRVAPI/api/Permissions', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('AuthToken')}` }
                });
                setPermissions(response.data.$values); // Set permissions from API response
            } catch (error) {
                console.error('Failed to fetch permissions:', error.message);
            }
        };

        fetchRole();
        fetchPermissionsData();
    }, [id, t]);

    useEffect(() => {
        if (role) {
            setFormData({
                roleName: role.roleName,
                description: role.description,
                permissionIds: role.permissions.$values || [], // Pre-set permission IDs from role
                tenantID: role.tenantID || ''
            });
            setSelectedPermissions(role.permissions.$values.map(item=>item.permissionID) || []); // Pre-select permissions based on role data
        }
    }, [role]);

    const handlePermissionChange = (permissionID) => {
        setSelectedPermissions((prevPermissions) =>
            prevPermissions.includes(permissionID)
                ? prevPermissions.filter(id => id !== permissionID) // Remove if already selected
                : [...prevPermissions, permissionID] // Add if not selected
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isSubmitting) return;

        if (!selectedPermissions.length) {
            toast.error(t('Please select at least one permission'));
            return;
        }

        setIsSubmitting(true);
        try {
            const roleData = {
                roleName: formData.roleName,
                description: formData.description,
                permissionIds: selectedPermissions,
                tenantID: formData.tenantID || null
            };
            const tenantId = userPermissions.tenantID || null; // Check if tenantID exists
            const roleId = id;
            const url = tenantId 
            ? `https://atlas.smartgeoapps.com/MRVAPI/api/Role/${roleId}?tenantId=${tenantId}`
            : `https://atlas.smartgeoapps.com/MRVAPI/api/Role/${roleId}`;
    
           await axios.put(url, roleData,{
            headers: { Authorization: `Bearer ${localStorage.getItem('AuthToken')}` },
          });
            toast.success('Role updated successfully');
            navigate('/Mrv/roles');  // Redirect to roles list
        } catch (error) {
            console.error('Error updating role:', error.message);
            toast.error('Failed to update role');
        } finally {
            setIsSubmitting(false);
        }
    };

    const groupedPermissions = permissions.reduce((grouped, permission) => {
        const group = permission.permissionGroup;
        if (!grouped[group]) {
            grouped[group] = [];
        }
        grouped[group].push(permission);
        return grouped;
    }, {});

    return (
        <div className='right-body'>
            <div className='right-body-ctnt'>
                <div>
                    <div className='addnewrole'>{t('Edit Role')}</div>
                </div>
                <div>
                    <button onClick={() => navigate(-1)} className='form_back'>{t('Back')}</button>
                </div>
            </div>
            <div className='rightbody-content'>
                <form onSubmit={handleSubmit}>
                    <div className='rolename'>
                        <div>{t('Role Name')}</div>
                        <div>
                            <input
                                type='text'
                                className='role-name-input'
                                name='roleName'
                                placeholder={t('Role Name')}
                                value={formData.roleName}
                                onChange={(e) => setFormData({ ...formData, roleName: e.target.value })}
                                required
                            />
                        </div>
                    </div>
                    <div className='rolename'>
                        <div>{t('Role Description')}</div>
                        <div>
                            <input
                                type='text'
                                className='role-name-input'
                                name='description'
                                placeholder={t('Description')}
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                required
                            />
                        </div>
                    </div>
                    <div className="row mb-3">
          <div className="col">
            <label>
              {t("Tenant ID")}
              <span className="text-danger">*</span>
            </label>
            <select
              name="tenantID"
              value={formData.tenantID}
              onChange={(e) => setFormData({ ...formData, tenantID: e.target.value })}
              className="form-control"
              required
            >
              <option value="">{t("selectTenant")}</option>
              {tenants.map((tenant) => (
                <option key={tenant.tenantID} value={tenant.tenantID}>
                  {tenant.name}
                </option>
              ))}
            </select>
          </div>
        </div>
                    <div className='row '>
                        <div className='dropdown-grid-container'>
                            {Object.entries(groupedPermissions).map(([groupName, groupPermissions]) => (
                                <div className="dropdown drop-down mt-3 col-12 dropdown-container" key={groupName}>
                                    <button
                                        type="button"
                                        onClick={() => toggleDropdown(groupName)}
                                        className="dropdown-toggle drop-down-header d-flex align-items-center justify-content-between"
                                    >
                                        {groupName}
                                    </button>
                                    {dropdownState[groupName] && (
                                        <div className="dropdown-menu dropdown-content">
                                            {groupPermissions.map((permission) => (
                                                <div className="form-check form-switch" key={permission.permissionID}>
                                                    <input
                                                        className="form-check-input switches user-switches"
                                                        type="checkbox"
                                                        id={`permission-${permission.permissionID}`}
                                                        checked={selectedPermissions.includes(permission.permissionID)} // Pre-check if permission is selected
                                                        onChange={() => handlePermissionChange(permission.permissionID)}
                                                    />
                                                    <label className="form-check-label" htmlFor={`permission-${permission.permissionID}`}>
                                                        {permission.permissionDisplayName}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <button className='add-btn' type='submit' disabled={isSubmitting}>
                            {isSubmitting ? t('Saving...') : t('Save')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditRole;

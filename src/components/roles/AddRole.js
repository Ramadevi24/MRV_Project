import React, { useState, useEffect } from 'react';
import '../../css/AddNewRole.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useTranslation } from "react-i18next";
import { useNavigate } from 'react-router-dom';

const AddRole = ({userPermissions}) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        roleName: '',
        description: '',
        permissionIds: [],
        tenantID:''
    });
    const [permissions, setPermissions] = useState([]);
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

    // Fetch permissions when the component mounts
    useEffect(() => {
        const fetchPermissionsData = async () => {
            try {
                const response = await axios.get('https://atlas.smartgeoapps.com/MRVAPI/api/Permissions', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('AuthToken')}` }
                });
                setPermissions(response.data.$values);
            } catch (error) {
                console.error('Failed to fetch permissions:', error.message);
            }
        };

        fetchPermissionsData();
    }, []);

    const handlePermissionChange = (permissionID) => {
        setSelectedPermissions((prevPermissions) =>
            prevPermissions.includes(permissionID)
                ? prevPermissions.filter(id => id !== permissionID)
                : [...prevPermissions, permissionID]
        );
    };

    const toggleDropdown = (groupName) => {
        setDropdownState((prevState) => ({
            ...prevState,
            [groupName]: !prevState[groupName]
        }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Ensure the default form submission is prevented

        // Prevent submission if already submitting
        if (isSubmitting) return;

        // Ensure that selectedPermissions are present before submitting
        if (selectedPermissions.length === 0) {
            toast.error('Please select at least one permission');
            return;
        }

        setIsSubmitting(true);
        try {
            const roleData = {
                roleName: formData.roleName,
                description: formData.description,
                permissionIds: selectedPermissions,
            };
            await axios.post('https://atlas.smartgeoapps.com/MRVAPI/api/Role/Roles', roleData, {
                headers: { Authorization: `Bearer ${localStorage.getItem('AuthToken')}` }
            });
            toast.success('Role created successfully');
            navigate('/Mrv/roles');  // Redirect to roles list
        } catch (error) {
            console.error('Error saving role:', error.message);
            toast.error('Failed to save role');
        } finally {
            setIsSubmitting(false);
        }
    };

    const groupedPermissions = permissions?.reduce((grouped, permission) => {
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
                    <div className='addnewrole'>{t('Add New Role')}</div>
                </div>
                <div>
                    <button onClick={() => navigate(-1)} className='form_back'>{t('Back')}</button>
                </div>
            </div>
            <div className='rightbody-content'>
                <form onSubmit={handleSubmit} autoComplete="off"> {/* Added autoComplete="off" */}
                    <div className='rolename'>
                        <div>{t('Role Name')}</div>
                        <div>
                            <input
                                type='text'
                                className='role-name-input'
                                name='roleName'
                                placeholder={t('Role Name')}
                                value={formData.roleName}
                                onChange={handleChange}
                                required
                                autoComplete="off" // Disable auto-complete for this input
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
                                onChange={handleChange}
                                required
                                autoComplete="off" // Disable auto-complete for this input
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
              onChange={handleChange}
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
                            {Object?.entries(groupedPermissions)?.map(([groupName, groupPermissions]) => (
                                <div className="dropdown drop-down mt-3 col-12 dropdown-container" key={groupName}>
                                    <button
                                        type="button" // Changed from button to avoid form submit trigger
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
                                                        checked={selectedPermissions.includes(permission.permissionID)}
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

export default AddRole;

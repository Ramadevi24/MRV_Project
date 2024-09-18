import React, { useState, useEffect } from 'react';
import '../../css/AddNewRole.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from 'react-router-dom';

const EditRole = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { id } = useParams(); // Get role ID from URL
    const [permissions, setPermissions] = useState([]);
    const [role, setRole] = useState(null);
    const [formData, setFormData] = useState({
        roleName: '',
        description: '',
        permissionIds: []
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [dropdownState, setDropdownState] = useState({});
    const [selectedPermissions, setSelectedPermissions] = useState([]);

    console.log(role, 'role');

    const toggleDropdown = (groupName) => {
        setDropdownState((prevState) => ({
            ...prevState,
            [groupName]: !prevState[groupName]
        }));
    };

    useEffect(() => {
        fetchRole();
    }, []);
    
    const fetchRole = async () => {
        try {
            const response = await axios.get(`https://atlas.smartgeoapps.com/MRVAPI/api/Role/${id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            setRole(response.data);
        } catch (error) {
            toast.error(t('errorFetchingRole'));
        }
    };

    useEffect(() => {
        const fetchPermissionsData = async () => {
            try {
                const response = await axios.get('https://atlas.smartgeoapps.com/MRVAPI/api/Permissions', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                setPermissions(response.data.$values);
            } catch (error) {
                console.error('Failed to fetch permissions:', error.message);
            }
        };

        fetchPermissionsData();
    }, []);

    useEffect(() => {
        if (role) {
            setFormData({
                roleName: role.roleName,
                description: role.description,
                permissionIds: role.permissionIds || []
            });
            setSelectedPermissions(role.permissionIds || []);
        }
    }, [role]);

    const handlePermissionChange = (permissionID) => {
        setSelectedPermissions((prevPermissions) =>
            prevPermissions.includes(permissionID)
                ? prevPermissions.filter(id => id !== permissionID)
                : [...prevPermissions, permissionID]
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isSubmitting) return;

        setIsSubmitting(true);
        try {
            const roleData = {
                roleName: formData.roleName,
                description: formData.description,
                permissionIds: selectedPermissions,
            };

            // Update Role
            await axios.put(`https://atlas.smartgeoapps.com/MRVAPI/api/Role/${id}`, roleData, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            toast.success('Role updated successfully');
            navigate('/roles');  // Redirect to roles list
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
                                type='textarea'
                                className='role-name-input'
                                placeholder={t('Description')}
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                required
                            />
                        </div>
                    </div>
                    <div className='row '>
                        <div className='dropdown-grid-container'>
                            {Object.entries(groupedPermissions).map(([groupName, groupPermissions]) => (
                                <div className="dropdown drop-down mt-3 col-12 dropdown-container" key={groupName}>
                                    <button
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

export default EditRole;
import React, { useState, useEffect, useContext } from 'react';
import '../../css/AddNewRole.css';
import { PermissionsContext } from '../../contexts/PermissionsContext';
import { RolesContext } from '../../contexts/RolesContext';
import { toast } from 'react-toastify';
import { useTranslation } from "react-i18next";

const AddNewRole = () => {
    const {t}=useTranslation();
    const { permissions, fetchPermissions } = useContext(PermissionsContext);
    const { createRole, updateRole, fetchRoles, selectedRole } = useContext(RolesContext);
    const [roleName, setRoleName] = useState('');
    const [description, setDescription] = useState('');
    const [selectedPermissions, setSelectedPermissions] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // State to manage dropdown visibility
    const [dropdownState, setDropdownState] = useState({});

    // Fetch permissions when the component mounts
    useEffect(() => {
        fetchPermissions().catch(error => {
            console.error('Failed to fetch permissions:', error.message);
        });

        // If selectedRole exists, pre-populate the form for editing
        if (selectedRole) {
            setRoleName(selectedRole.roleName);
            setDescription(selectedRole.description);
            setSelectedPermissions(selectedRole.permissions.map(p => p.permissionID));
        }
    }, [fetchPermissions, selectedRole]);

    // Function to handle toggling of dropdowns
    const toggleDropdown = (groupName) => {
        setDropdownState((prevState) => ({
            ...prevState,
            [groupName]: !prevState[groupName]
        }));
    };
    const dropdownItems = [
        { id: 'selectAll', label: t('Select All') },
        { id: 'createUser', label: t('Create User') },
        { id: 'deleteUser', label: t('Delete User') },
        { id: 'editUser', label: t('Edit User') },
        { id: 'viewUsers', label: t('View Users') },
        { id: 'unlock', label: t('Unlock') }
        // Add more items as needed
    ];

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
                roleName,
                description,
                permissionIds: selectedPermissions,
            };

            if (selectedRole && selectedRole.roleID) {
                // Update Role
                await updateRole(selectedRole.roleID, roleData);
                toast.success('Role updated successfully');
            } else {
                // Create Role
                await createRole(roleData);
                toast.success('Role created successfully');
            }

            await fetchRoles();  // Refresh the roles list after creation/update
        } catch (error) {
            console.error('Error saving role:', error.message);
            toast.error('Failed to save role');
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
                    <div className='addnewrole'>{selectedRole ? 'Edit Role' : t('Add New Role')}</div>
                    <div className='role'>{t('Roles')}/ {selectedRole ? 'Edit Role' : t('Add New Role')}</div>
                </div>
                <div>
                    <button className='back'>{t('Back')}</button>
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
                                value={roleName}
                                onChange={(e) => setRoleName(e.target.value)}
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
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className='row'>
    {Object.entries(groupedPermissions).map(([groupName, groupPermissions]) => (
        <div className="dropdown drop-down mt-3 col-12" key={groupName}>
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
                                className="form-check-input"
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
                    <div className='buttons col-6'>
                        <div>
                            <button className='cancel-btn' disabled={isSubmitting}>{t('CANCEL')}</button>
                        </div>
                        <div>
                            <button className='add-btn' type='submit' disabled={isSubmitting}>
                                {isSubmitting ? t('Saving...') : t('Save')}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddNewRole;

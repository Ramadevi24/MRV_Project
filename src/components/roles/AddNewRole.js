import React, { useState, useEffect, useContext } from 'react';
import '../../css/AddNewRole.css';
import { PermissionsContext } from '../../contexts/PermissionsContext';
import { RolesContext } from '../../contexts/RolesContext';
import { toast } from 'react-toastify';

const AddNewRole = () => {
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
                    <div className='addnewrole'>{selectedRole ? 'Edit Role' : 'Add New Role'}</div>
                    <div className='role'>Roles / {selectedRole ? 'Edit Role' : 'Add New Role'}</div>
                </div>
                <div>
                    <button className='back'>Back</button>
                </div>
            </div>
            <div className='rightbody-content'>
                <form onSubmit={handleSubmit}>
                    <div className='rolename'>
                        <div>Role Name</div>
                        <div>
                            <input
                                type='text'
                                className='addroleinput'
                                placeholder='Role Name'
                                value={roleName}
                                onChange={(e) => setRoleName(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className='rolename'>
                        <div>Role Description</div>
                        <div>
                            <input
                                type='textarea'
                                className='addroleinput'
                                placeholder='Description'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className='row col-12'>
                        {Object.entries(groupedPermissions).map(([groupName, groupPermissions]) => (
                            <div className="dropdown drop-down mt-3 col-6" key={groupName}>
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
                            <button className='cancel-btn' disabled={isSubmitting}>CANCEL</button>
                        </div>
                        <div>
                            <button className='add-btn' type='submit' disabled={isSubmitting}>
                                {isSubmitting ? 'Saving...' : 'Save'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddNewRole;

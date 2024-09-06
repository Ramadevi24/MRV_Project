import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/AddNewRole.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import adminimage from '../../images/Ellipse 5.png';
import logoimage from '../../images/Logoimage.png';
import Dashboardicon from '../../images/Dashboardicon.png';
import Reportsicon from '../../images/ReportIcon.png';
import Datamanagementicon from '../../images/DataManagementicon.png';
import Administrationicon from '../../images/Administrationicon.png';
import Rolesicon from '../../images/Rolesicon.png';
import Usersicon from '../../images/Usericon.png';
import settingsicon from '../../images/Gearicon.png';

const AddNewRole = () => {
    const [dropdownState, setDropdownState] = useState({
        toggleDropdown: false,
        toggleDropdowntwo: false,
        toggleDropdownthree: false,
        toggleDropdownfour: false,
        toggleDropdownfive: false,
        toggleDropdownsix: false,
        administration: false
        // help: false,
        // more: false
    });

    // Toggle function
    const toggleDropdown = (dropdown) => {
        setDropdownState((prevState) => ({
            ...prevState,
            [dropdown]: !prevState[dropdown]
        }));
    };
    const dropdownItems = [
        { id: 'selectAll', label: 'Select All' },
        { id: 'createUser', label: 'Create User' },
        { id: 'deleteUser', label: 'Delete User' },
        { id: 'editUser', label: 'Edit User' },
        { id: 'viewUsers', label: 'View Users' },
        { id: 'unlock', label: 'Unlock' }
        // Add more items as needed
    ];


    return (
            

                   
                    <div className='right-body'>
                        <div className='right-body-ctnt'>
                            <div>
                                <div className='addnewrole'>Add New Role</div>
                                <div className='role'>Roles / Add New Role</div>
                            </div>
                            <div>
                                <button className='back'>back</button>
                            </div>
                        </div>
                        <div className='rightbody-content'>
                            <div className='rolename'>
                                <div>Role Name</div>
                                <div> 
                                    <input type='text'className='addroleinput' placeholder='dataprovider' />
                                </div>
                            </div>
                            <div className='row col-12'>
                                <div className="dropdown drop-down mt-3 col-6">

                                    <button onClick={() => toggleDropdown('toggleDropdown')} className="dropdown-toggle toggledropwn drop-down-header d-flex align-items-center justify-content-between">
                                        Users
                                    </button>

                                    {dropdownState.toggleDropdown && (
                                        <div className="dropdown-menu dropdown-content">
                                            {dropdownItems.map((item) => (
                                                <div className="form-check from-switch form-switch" key={item.id}>
                                                    <input
                                                        className="form-check-input from-switch-input"
                                                        type="checkbox"
                                                        role="switch"
                                                        id={item.id}
                                                    />
                                                    <label className="form-check-label" htmlFor={item.id}>
                                                        {item.label}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <div className="dropdown drop-down mt-3 col-6">

                                    <button onClick={() => toggleDropdown('toggleDropdowntwo')} className="dropdown-toggle drop-down-header d-flex align-items-center justify-content-between" style={{ marginLeft: '10px' }}>
                                        Alerts
                                    </button>

                                    {dropdownState.toggleDropdowntwo && (
                                        <div className="dropdown-menu dropdown-content" style={{ marginLeft: '10px' }}>
                                            {dropdownItems.map((item) => (
                                                <div className="form-check form-switch" key={item.id}>
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        role="switch"
                                                        id={item.id}
                                                    />
                                                    <label className="form-check-label" htmlFor={item.id}>
                                                        {item.label}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <div className="dropdown drop-down mt-3 col-6">

                                    <button onClick={() => toggleDropdown('toggleDropdownthree')} className="dropdown-toggle drop-down-header d-flex align-items-center justify-content-between">
                                        Alerts
                                    </button>

                                    {dropdownState.toggleDropdownthree && (
                                        <div className="dropdown-menu dropdown-content">
                                            {dropdownItems.map((item) => (
                                                <div className="form-check form-switch" key={item.id}>
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        role="switch"
                                                        id={item.id}
                                                    />
                                                    <label className="form-check-label" htmlFor={item.id}>
                                                        {item.label}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <div className="dropdown drop-down mt-3 col-6">

                                    <button onClick={() => toggleDropdown('toggleDropdownfour')} className="dropdown-toggle drop-down-header d-flex align-items-center justify-content-between" style={{ marginLeft: '10px' }}>
                                        Alerts
                                    </button>

                                    {dropdownState.toggleDropdownfour && (
                                        <div className="dropdown-menu dropdown-content" style={{ marginLeft: '10px' }}>
                                            {dropdownItems.map((item) => (
                                                <div className="form-check form-switch" key={item.id}>
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        role="switch"
                                                        id={item.id}
                                                    />
                                                    <label className="form-check-label" htmlFor={item.id}>
                                                        {item.label}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <div className="dropdown drop-down mt-3 col-6">

                                    <button onClick={() => toggleDropdown('toggleDropdownfive')} className="dropdown-toggle drop-down-header d-flex align-items-center justify-content-between">
                                        Alerts
                                    </button>

                                    {dropdownState.toggleDropdownfive && (
                                        <div className="dropdown-menu dropdown-content">
                                            {dropdownItems.map((item) => (
                                                <div className="form-check form-switch" key={item.id}>
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        role="switch"
                                                        id={item.id}
                                                    />
                                                    <label className="form-check-label" htmlFor={item.id}>
                                                        {item.label}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <div className="dropdown drop-down mt-3 col-6">

                                    <button onClick={() => toggleDropdown('toggleDropdownsix')} className="dropdown-toggle drop-down-header d-flex align-items-center justify-content-between" style={{ marginLeft: '10px' }}>
                                        Alerts
                                    </button>

                                    {dropdownState.toggleDropdownsix && (
                                        <div className="dropdown-menu dropdown-content " style={{ marginLeft: '10px' }}>
                                            {dropdownItems.map((item) => (
                                                <div className="form-check form-switch" key={item.id}>
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        role="switch"
                                                        id={item.id}
                                                    />
                                                    <label className="form-check-label" htmlFor={item.id}>
                                                        {item.label}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                            {/* <div className="dropdown mt-3 col-6">

                                <button onClick={() => toggleDropdown('toggleDropdownthree')} className="dropdown-toggle drop-down-header d-flex align-items-center justify-content-between">
                                    Alerts
                                </button>

                                {dropdownState.toggleDropdownthree && (
                                    <div className="dropdown-menu dropdown-content">
                                        {dropdownItems.map((item) => (
                                            <div className="form-check form-switch" key={item.id}>
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    role="switch"
                                                    id={item.id}
                                                />
                                                <label className="form-check-label" htmlFor={item.id}>
                                                    {item.label}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className="dropdown mt-3 col-6">

                                <button onClick={() => toggleDropdown('toggleDropdownfour')} className="dropdown-toggle drop-down-header d-flex align-items-center justify-content-between" style={{ marginLeft: '10px' }}>
                                    Alerts
                                </button>

                                {dropdownState.toggleDropdownfour && (
                                    <div className="dropdown-menu dropdown-content" style={{ marginLeft: '10px' }}>
                                        {dropdownItems.map((item) => (
                                            <div className="form-check form-switch" key={item.id}>
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    role="switch"
                                                    id={item.id}
                                                />
                                                <label className="form-check-label" htmlFor={item.id}>
                                                    {item.label}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="dropdown mt-3 col-6">

                                <button onClick={() => toggleDropdown('toggleDropdownfive')} className="dropdown-toggle drop-down-header d-flex align-items-center justify-content-between">
                                    Alerts
                                </button>

                                {dropdownState.toggleDropdownfive && (
                                    <div className="dropdown-menu dropdown-content">
                                        {dropdownItems.map((item) => (
                                            <div className="form-check form-switch" key={item.id}>
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    role="switch"
                                                    id={item.id}
                                                />
                                                <label className="form-check-label" htmlFor={item.id}>
                                                    {item.label}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className="dropdown mt-3 col-6">

                                <button onClick={() => toggleDropdown('toggleDropdownsix')} className="dropdown-toggle drop-down-header d-flex align-items-center justify-content-between" style={{ marginLeft: '10px' }}>
                                    Alerts
                                </button>

                                {dropdownState.toggleDropdownsix && (
                                    <div className="dropdown-menu dropdown-content " style={{ marginLeft: '10px' }}>
                                        {dropdownItems.map((item) => (
                                            <div className="form-check form-switch" key={item.id}>
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    role="switch"
                                                    id={item.id}
                                                />
                                                <label className="form-check-label" htmlFor={item.id}>
                                                    {item.label}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div> */}
                            <div className='buttons col-6'>
                                <div>
                                    <button className='cancel-btn'>CANCEL</button>
                                </div>
                                <div>
                                    <button className='add-btn'>ADD</button>
                                </div>
                            </div>

                        </div>
                    </div>


    )
}
export default AddNewRole;

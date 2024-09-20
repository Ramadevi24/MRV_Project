import React, { useEffect, useState } from 'react';
import '../css/Topbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faEnvelope, faMagnifyingGlass,faBars } from '@fortawesome/free-solid-svg-icons';
import adminimage from '../images/Ellipse 5.png';
import { useNavigate } from 'react-router-dom';
import i18n from '../i18n';
import { useTranslation } from 'react-i18next';

const Topbar = ({selectedMenuItem ,toggleSidebar,isSidebarOpen}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [language, setLanguage] = useState(i18n.language);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'en';
    i18n.changeLanguage(savedLanguage);
    setLanguage(savedLanguage);
  }, []);
  



  

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible); // Toggle dropdown visibility
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setDropdownVisible(false); 
    navigate('/login');
  };

  const handleChange = (event) => {
    setDropdownVisible(false);
    const selectedLanguage = event.target.value; 
    i18n.changeLanguage(selectedLanguage);
    localStorage.setItem('selectedLanguage', selectedLanguage);
    setLanguage(selectedLanguage); // Update state to force re-render
  };
  
  // Close dropdown when clicking outside of the dropdown area

  const handleClickOutside = (event) => {
    if (!event.target.closest('.right-icons')) {
      setDropdownVisible(false);
    }
  };


  useEffect(() => {
    if (dropdownVisible) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside); // Cleanup on component unmount
    };
  }, [dropdownVisible]);


  return (
    <div className="top-navbar d-flex justify-content-between">
         <button className=" toggle-btn bars-icon " style={{border:'none'}} onClick={toggleSidebar} >
        {/* <FontAwesomeIcon icon={faBars} /> */}
        {isSidebarOpen ? <FontAwesomeIcon icon={faBars} /> : <FontAwesomeIcon icon={faBars} />}
      </button>
      <div className='page-name'>
        {selectedMenuItem}
      </div>
      
      <div className='d-flex align-items-center justify-content-center'>
      <div className="local-language">
        <select value={language} onChange={handleChange} onClick={()=>setDropdownVisible(false)} className="local-dropdown">
          <option value="en">English</option>
          <option value="fr">{t('French')}</option>
          <option value="ar">{t('Arabic')}</option>
          <option value="ger">German</option>
        </select>
      </div>
      <div className="icons">
        <div className="bell-icon">
          <span className="nav-icons">
            <FontAwesomeIcon icon={faBell} />
          </span>
        </div>
        <div className="letter-icon">
          <span className="nav-icons">
            <FontAwesomeIcon icon={faEnvelope} />
          </span>
        </div>
        <div>
          <span className="nav-icons">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </span>
        </div>
      </div>
      <div className="right-icons d-flex">
        <div className="userimg">
          <img src={adminimage} alt="Admin" style={{ width: '50px', height: '50px' }} />
        </div>
        <div>
            <div onClick={toggleDropdown} className="user-name dropdown-toggle">
              {t('Admin Name')}
            </div>
            <div className="admin">{t('Admin')}</div>

            {dropdownVisible && (
              <div className="dropdown-menu show admin-dropdown-menu" style={{ position: 'absolute',right:'10px'}}>
                <button className="dropdown-item admin-dropdown-item" onClick={handleLogout}>
                  {t('Logout')}
                </button>
                <button className="dropdown-item admin-dropdown-item">
                  {t('Profile')}
                </button>
                <button className="dropdown-item admin-dropdown-item">
                  {t('Settings')}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>

  );
};

export default Topbar;
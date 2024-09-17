import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Topbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faEnvelope, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import adminimage from '../images/Ellipse 5.png';
import { useNavigate } from 'react-router-dom';
import i18n from '../i18n';
import { useTranslation } from 'react-i18next';

const Topbar = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [language, setLanguage] = useState(i18n.language);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'en';
    i18n.changeLanguage(savedLanguage);
    setLanguage(savedLanguage);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  const handleChange = (event) => {
    const selectedLanguage = event.target.value;
    i18n.changeLanguage(selectedLanguage);
    localStorage.setItem('selectedLanguage', selectedLanguage);
    setLanguage(selectedLanguage); // Update state to force re-render
  };

  return (
    <div className="top-navbar">
      <div className="local-language">
        <select value={language} onChange={handleChange} className="local-dropdown">
          <option value="en">English</option>
          <option value="fr">{t('French')}</option>
          <option value="ar">{t('Arabic')}</option>
          <option value="de">{t('German')}</option>
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
          <div>
            <div onClick={handleLogout} className="user-name">
              {t('Admin Name')}
            </div>
            <div className="admin">{t('Admin')}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
import React from "react";
// import SideBar2 from '../components/SideBar2';
import { useTranslation } from "react-i18next";

import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";

const Dashboard = () => {
  const {t}= useTranslation();
  return (
    <>
      <div><h4 style={{textAlign:'center', marginTop:'20px'}}>{t('welcome')}</h4></div>
      </>
  );
};

export default Dashboard;

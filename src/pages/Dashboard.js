import React from "react";
// import SideBar2 from '../components/SideBar2';

import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";

const Dashboard = () => {
  return (
    <>
    <div className="layout-wrapper">
      <div className="main-menu active">
        <Sidebar />
      </div>
      <div className="page-content">
        <Topbar />
      <div><h4 style={{textAlign:'center', marginTop:'20px'}}>Welcome to Dashboard</h4></div>
      </div>
    </div>
      </>
  );
};

export default Dashboard;

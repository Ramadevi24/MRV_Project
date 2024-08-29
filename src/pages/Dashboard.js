import React from "react";
// import SideBar2 from '../components/SideBar2';

import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";

const Dashboard = () => {
  return (
    <div className="layout-wrapper">
      <div className="main-menu active">
        <Sidebar />
      </div>
      <div className="page-content">
        <Topbar />
      </div>
    </div>
  );
};

export default Dashboard;

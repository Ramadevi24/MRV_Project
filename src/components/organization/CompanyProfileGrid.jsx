import React, { useState } from "react";
import { useCompanyProfile } from "../../contexts/CompanyProfileContext";
import { toast } from "react-toastify";
import ViewCompanyProfileModal from "./ViewCompanyProfileModal";
import axios from "axios";
import "../../css/TableGrid.css";
import eyeicon from "../../images/eyeicon.png";
import editicon from "../../images/editicon.png";
import deleteicon from "../../images/deleteicon.png";
import { useTranslation } from "react-i18next";

const CompanyProfileGrid = ({ onEdit }) => {
  const {t}=useTranslation();
  const { companyProfiles, deleteCompanyProfile, fetchCompanyProfiles } = useCompanyProfile();
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);

  const handleDelete = async (id) => {
    try {
      await deleteCompanyProfile(id);
      await fetchCompanyProfiles();
      toast.success(t(`Organization deleted successfully.`));
    } catch (error) {
      toast.error(
       t( `Error deleting company profile with ID ${id}: ${error.message}`),
        error.stack
      );
    }
  };

  const handleView = async (profile) => {
    try {
      const response = await axios.get(
        `https://atlas.smartgeoapps.com/MRVAPI/api/Organization/${profile.organizationID}`
      );
      const organizationData = response.data;
      setSelectedProfile(organizationData); 
    setShowViewModal(true);
    } catch (error) {
      console.error("Error fetching organization data:", error);
    }
  };

  const handleCloseViewModal = () => {
    setShowViewModal(false);
    setSelectedProfile(null);
  };

  const handleEdit = async (profile) => {
    try {
      const response = await axios.get(
        `https://atlas.smartgeoapps.com/MRVAPI/api/Organization/${profile.organizationID}`
      );
      const organizationData = response.data;
      onEdit(organizationData); // Pass the fetched data to the parent component
    } catch (error) {
      console.error("Error fetching organization data:", error);
    }
  };
  return (
    <>
      {/* <Table striped bordered hover style={{width:'95%', marginLeft:'35px'}}>
        <thead>
          <tr>
            <th>Tenant Name</th>
            <th>Organization Name</th>
            <th>Categories</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {companyProfiles.map((profile) => (
            <tr key={profile.organizationID}>
              <td>{profile.tenantName}</td>
              <td>{profile.organizationName}</td>
              <td>{profile.categories.$values.join(',')}</td>
              <td>
                <Button variant="success" onClick={() => handleEdit(profile)}>Edit</Button>{' '}
                <Button variant="danger" onClick={() => handleDelete(profile.organizationID)}>Delete</Button>{' '}
                <Button variant="info" onClick={() => handleView(profile)}>View</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table> */}
      <table className="custom-table">
        <thead className="tabel-head">
          <tr>
            <th>
              <input className="check-box" type="checkbox" />
            </th>
            <th>{t('Tenant Name')}</th>
            <th>{t('Organization Name')}</th>
            <th>{t('Categories')}</th>
            <th>{t('Actions')}</th>
          </tr>
        </thead>
        <tbody>
          {companyProfiles.map((profile) => (
            <tr key={profile.organizationID}>
              <td>
                <input className="check-box" type="checkbox" />
              </td>
              <td>{profile.tenantName}</td>
              <td>{profile.organizationName}</td>
              <td>{profile.categories.$values.join(',')}</td>

              <td>
                <span className="action-icons">
                  <button
                    className="view-btn"
                    onClick={() => handleView(profile)}
                  >
                    <img src={eyeicon} />
                  </button>
                  <button
                    onClick={() => handleEdit(profile)}
                    className="edit-btn"
                  >
                    <img src={editicon} />
                  </button>
                  <button
                    onClick={() => handleDelete(profile.organizationID)}
                    className="delete-btn"
                  >
                    <img src={deleteicon} />
                  </button>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ViewCompanyProfileModal
        show={showViewModal}
        handleClose={handleCloseViewModal}
        companyProfile={selectedProfile}
      />
    </>
  );
};

export default CompanyProfileGrid;

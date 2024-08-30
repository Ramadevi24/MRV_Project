import { useEffect, useState } from 'react';
import { useCompanyProfile } from '../../contexts/CompanyProfileContext';
import '../../css/ManageCompanyProfile.css';
import CompanyProfileGrid from './CompanyProfileGrid';
import { Modal, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import Topbar from "../Topbar";
import Sidebar from "../Sidebar";

const CompanyProfile = () => {
  const { fetchCompanyProfiles, createCompanyProfile, updateCompanyProfile, deleteCompanyProfile, selectProfileForEdit, selectedProfile, setSelectedProfile } = useCompanyProfile();
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formState, setFormState] = useState({
    companyID: null,
    companyName: '',
    companyOwner: '',
    companyType: '',
    companyAddress: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    companyPhone: '',
    companyEmail: '',
    companyWebsite: '',
    companyDescription: '',
  });

  useEffect(() => {
      fetchCompanyProfiles().catch(console.error);
  }, [fetchCompanyProfiles]);

  useEffect(() => {
    if (selectedProfile) {
      setFormState({
        companyID: selectedProfile.companyID,
        companyName: selectedProfile.companyName,
        companyOwner: selectedProfile.companyOwner,
        companyType: selectedProfile.companyType,
        companyAddress: selectedProfile.companyAddress,
        city: selectedProfile.city,
        state: selectedProfile.state,
        zipcode: selectedProfile.zipcode,
        country: selectedProfile.country,
        companyPhone: selectedProfile.companyPhone,
        companyEmail: selectedProfile.companyEmail,
        companyWebsite: selectedProfile.companyWebsite,
        companyDescription: selectedProfile.companyDescription
      });
      setIsEditing(true);
      setShowForm(true);
    }
  }, [selectedProfile]);

  const handleEditClick = (profile) => {
    selectProfileForEdit(profile.companyID);
  };

  const handleDeleteClick = async (id) => {
    try {
      await deleteCompanyProfile(id);
      toast.success('Company profile deleted successfully.');
      fetchCompanyProfiles();
    } catch (error) {
      console.error('Error deleting company profile:', error);
      toast.error('Error deleting company profile.');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (isEditing) {
        await updateCompanyProfile(formState.companyID, formState);
        toast.success('Company profile updated successfully.');
      } else {
        console.log('Creating company profile with data:', formState);
        delete formState.companyID;
        await createCompanyProfile(formState);
        toast.success('Company profile created successfully.');
      }
        resetForm();
        fetchCompanyProfiles();
    } catch (error) {
      console.error('Error processing company profile:', error);
      toast.error('Error processing company profile.');
    }
  };

  const resetForm = () => {
    setFormState({
      companyID: null,
      companyName: '',
      companyOwner: '',
      companyType: '',
      companyAddress: '',
      city: '',
      state: '',
      zipcode: '',
      country: '',
      companyPhone: '',
      companyEmail: '',
      companyWebsite: '',
      companyDescription: '',
    });
    setIsEditing(false);
    setShowForm(false);
    setSelectedProfile(null);
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleCreateClick = () => {
    setShowForm(true); 
    setIsEditing(false); 
    setSelectedProfile(null); 
  };

  return (
    <>
    <div className="layout-wrapper">
      <div className="main-menu active">
        <Sidebar />
      </div>
      <div className="page-content">
        <Topbar />
    <div>
      <Button variant="primary" onClick={handleCreateClick} style={{margin: "20px",float:"inline-end"}}>Create Company</Button>
      <Modal show={showForm} onHide={() => setShowForm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? 'Edit Company Profile' : 'Create Company Profile'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            {Object.keys(formState).map((key) => {
              if (key !== 'companyID') {
                return (
                  <div key={key} className='form-group'>
                    <label>{key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1').trim()}</label>
                    <input
                      type="text"
                      className="form-control"
                      name={key}
                      value={formState[key]}
                      onChange={handleChange}
                      placeholder={`Enter ${key}`}
                      required
                    />
                  </div>
                );
              }
              return null;
            })}
            <div className='form-group'>
              <button className='btn btn-success' type="submit">Save</button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
      <CompanyProfileGrid onEdit={handleEditClick} onDelete={handleDeleteClick}/>
    </div>
    </div>
    </div>
      </>
  );
};

export default CompanyProfile;
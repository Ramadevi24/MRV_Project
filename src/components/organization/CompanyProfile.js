import { useEffect, useState } from "react";
import { useCompanyProfile } from "../../contexts/CompanyProfileContext";
import { useTenants } from "../../contexts/TenantContext";
import "../../css/ManageCompanyProfile.css";
import CompanyProfileGrid from "./CompanyProfileGrid";
import { Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import Topbar from "../Topbar";
import Sidebar from "../Sidebar";

const CompanyProfile = () => {
  const {
    fetchCompanyProfiles,
    createCompanyProfile,
    updateCompanyProfile,
    deleteCompanyProfile,
    selectProfileForEdit,
    selectedProfile,
    setSelectedProfile,
  } = useCompanyProfile();
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formState, setFormState] = useState({
    tenantID: null,
    organizationName: "",
    description: "",
    contactEmail: "",
    contactPhone: "",
    address: "",
  });
  const {tenants, fetchTenants} = useTenants()

  useEffect(() => {
    fetchCompanyProfiles().catch(console.error);
    fetchTenants().catch(console.error);
  }, [fetchCompanyProfiles, fetchTenants]);

 

  useEffect(() => {
    if (selectedProfile) {
      setFormState({
        tenantID: selectedProfile.companyID,
        organizationName: selectedProfile.companyName,
        description: selectedProfile.companyOwner,
        contactEmail: selectedProfile.companyType,
        contactPhone: selectedProfile.contactEmail,
        address: selectedProfile.companyAddress,
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
      toast.success("Company profile deleted successfully.");
      fetchCompanyProfiles();
    } catch (error) {
      console.error("Error deleting company profile:", error);
      toast.error("Error deleting company profile.");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (isEditing) {
        await updateCompanyProfile(formState.companyID, formState);
        toast.success("Organization updated successfully.");
      } else {
        delete formState.companyID;
        const updatedFormStateData = {
          ...formState,
          categoryIDs: [0],
          locations: [
            {
              latitude: 0,
              longitude: 0,
              address: "string",
              organizationID: 0,
            },
          ],
        };
        console.log(updatedFormStateData, 'updatedFormStateData')
        await createCompanyProfile(updatedFormStateData);
        toast.success("Organization created successfully.");
      }
      resetForm();
      fetchCompanyProfiles();
    } catch (error) {
      console.error("Error processing company profile:", error);
      toast.error("Error processing company profile.");
    }
  };

  const resetForm = () => {
    setFormState({
      tenantID: null,
      organizationName: "",
      description: "",
      contactEmail: "",
      address: "",
      categoryIDs: [],
      locations: [],
    });
    setIsEditing(false);
    setShowForm(false);
    setSelectedProfile(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
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
            <Button
              variant="primary"
              onClick={handleCreateClick}
              style={{ margin: "20px", float: "inline-end" }}
            >
              Create Organization
            </Button>
            <Modal show={showForm} onHide={() => setShowForm(false)}>
              <Modal.Header closeButton>
                <Modal.Title>
                  {isEditing ? "Edit Organization" : "Create Organization"}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <form onSubmit={handleSubmit}>
                  {Object.keys(formState).map((key) => {
                    if (key !== "companyID") {
                      return (
                        <div key={key} className="form-group">
                          <label>
                            {key.charAt(0).toUpperCase() +
                              key
                                .slice(1)
                                .replace(/([A-Z])/g, " $1")
                                .trim()}
                          </label>
                          {key === "tenantID" ? (
              <select
                className="form-control"
                name={key}
                value={formState[key]}
                onChange={handleChange}
                required
              >
                <option value="">Select Tenants</option>
                {tenants?.map((tenant) => (
                  <option key={tenant.tenantID} value={tenant.tenantID}>
                    {tenant.name}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type="text"
                className="form-control"
                name={key}
                value={formState[key]}
                onChange={handleChange}
                placeholder={`Enter ${key}`}
                required
              />
            )}
                        </div>
                      );
                    }
                    return null;
                  })}
                  <div className="form-group">
                    <button className="btn btn-success" type="submit">
                      Save
                    </button>
                  </div>
                </form>
              </Modal.Body>
            </Modal>
            <CompanyProfileGrid
              onEdit={handleEditClick}
              onDelete={handleDeleteClick}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CompanyProfile;

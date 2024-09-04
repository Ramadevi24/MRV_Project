import { useEffect, useState } from "react";
import { useCompanyProfile } from "../../contexts/CompanyProfileContext";
import { useTenants } from "../../contexts/TenantContext";
import "../../css/ManageCompanyProfile.css";
import CompanyProfileGrid from "./CompanyProfileGrid";
import { Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { fetchCategories } from '../../services/ManageCompanyProfileAPI';
import DropdownTreeSelect from 'react-dropdown-tree-select';
import 'react-dropdown-tree-select/dist/styles.css';

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
  const [categories, setCategories] = useState([]);
  const [formState, setFormState] = useState({
    tenantID: null,
    organizationName: "",
    description: "",
    establishedDate: "",
    contactEmail: "",
    contactPhone: "",
    address: "",
    categoryID: [],
    locations: [{
      latitude: "",
      longitude: ""
    }],
  });
  const { tenants, fetchTenants } = useTenants();

  useEffect(() => {
    fetchCompanyProfiles().catch(console.error);
    fetchTenants().catch(console.error);
    fetchCategories().then(setCategories).catch(console.error);
  }, [fetchCompanyProfiles, fetchTenants]);

  useEffect(() => {
    if (selectedProfile) {
      setFormState({
        tenantID: selectedProfile.tenantID,
        organizationName: selectedProfile.organizationName,
        description: selectedProfile.description,
        establishedDate: selectedProfile.establishedDate,
        contactEmail: selectedProfile.contactEmail,
        contactPhone: selectedProfile.contactPhone,
        address: selectedProfile.address,
        categoryID: selectedProfile.categoryIDs[0] || "",
        latitude: selectedProfile.locations[0]?.latitude || "",
        longitude: selectedProfile.locations[0]?.longitude || "",
      });
      setIsEditing(true);
      setShowForm(true);
    }
  }, [selectedProfile]);

  const handleEditClick = (profile) => {
    selectProfileForEdit(profile.organizationID);
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
      const updatedFormStateData = {
        tenantID: formState.tenantID,
        organizationName: formState.organizationName,
        description: formState.description,
        establishedDate: formState.establishedDate,
        contactEmail: formState.contactEmail,
        contactPhone: formState.contactPhone,
        address: formState.address,
        categoryIDs: [formState.categoryID],
        locations: [
          {
            latitude: formState.latitude,
            longitude: formState.longitude,
            address: formState.address,
            organizationID: 0,
          },
        ],
      };

      if (isEditing) {
        await updateCompanyProfile(selectedProfile.organizationID, updatedFormStateData);
        toast.success("Organization updated successfully.");
      } else {
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
      establishedDate: "",
      contactEmail: "",
      contactPhone: "",
      address: "",
      categoryID: "",
      latitude: "",
      longitude: "",
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

  const handleCategoryChange = (currentNode, selectedNodes) => {
    setFormState((prevState) => ({
      ...prevState,
      categoryID: currentNode.value,
    }));
  };

  console.log(formState, 'formState');

  const buildCategoryTree = (categories) => {
    return categories.map((category) => ({
      label: category.categoryName,
      value: category.categoryID,
      children: category.subCategories ? buildCategoryTree(category.subCategories.$values) : [],
    }));
  };

  return (
    <>
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
                      ) : key === "categoryID" ? (
                        <DropdownTreeSelect
                          className="dropdown-tree-select" // Apply custom class
                          name={key}
                          data={buildCategoryTree(categories)}
                          onChange={handleCategoryChange}
                          required
                        />
                      ) : (
                        <input
                          type={key === "establishedDate" ? "date" : "text"}
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
    </>
  );
};

export default CompanyProfile;
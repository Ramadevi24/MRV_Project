import { useEffect, useState } from "react";
import { useCompanyProfile } from "../../contexts/CompanyProfileContext";
import { useTenants } from "../../contexts/TenantContext";
import "../../css/ManageCompanyProfile.css";
import CompanyProfileGrid from "./CompanyProfileGrid";
import { Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { fetchCategories } from "../../services/ManageCompanyProfileAPI";
import "react-dropdown-tree-select/dist/styles.css";
import searchicon from '../../images/searchbaricon.png';

const transformNodes = (categories) => {
  return categories.map((category) => {
    return {
      label: category.categoryName,
      value: category.categoryCode,
      categoryID: category.categoryID,
      children: category.subCategories?.$values
        ? transformNodes(category.subCategories.$values)
        : [],
    };
  });
};

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
    locations: [
      {
        latitude: "",
        longitude: "",
        address: "",
      },
    ],
  });
  const { tenants, fetchTenants } = useTenants();
  const nodes = transformNodes(categories);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [expandedNodes, setExpandedNodes] = useState({});
  const [selectedCategoryIDs, setSelectedCategoryIDs] = useState([]);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleNode = (node) => {
    setExpandedNodes((prev) => ({
      ...prev,
      [node.value]: !prev[node.value],
    }));
  };

  const isCategorySelected = (categoryID) =>
    selectedCategoryIDs.includes(categoryID);

  const selectCategoryAndChildren = (category) => {
    let categoryIDsToSelect = [category.categoryID];

    const collectChildrenCategoryIDs = (node) => {
      if (node.children) {
        node.children.forEach((child) => {
          categoryIDsToSelect.push(child.categoryID);
          collectChildrenCategoryIDs(child);
        });
      }
    };
    collectChildrenCategoryIDs(category);

    setSelectedCategoryIDs((prevSelected) => {
      const newSelected = [
        ...prevSelected,
        ...categoryIDsToSelect.filter((id) => !prevSelected.includes(id)),
      ];
      return newSelected;
    });
  };

  const deselectCategoryAndChildren = (category) => {
    let categoryIDsToDeselect = [category.categoryID];

    const collectChildrenCategoryIDs = (node) => {
      if (node.children) {
        node.children.forEach((child) => {
          categoryIDsToDeselect.push(child.categoryID);
          collectChildrenCategoryIDs(child);
        });
      }
    };
    collectChildrenCategoryIDs(category);

    setSelectedCategoryIDs((prevSelected) =>
      prevSelected.filter((id) => !categoryIDsToDeselect.includes(id))
    );
  };

  const toggleSelectCategory = (category) => {
    const isSelected = isCategorySelected(category.categoryID);
    if (isSelected) {
      deselectCategoryAndChildren(category);
    } else {
      selectCategoryAndChildren(category);
    }
  };

  const handleCheckboxChange = (e, category) => {
    toggleSelectCategory(category);
  };

  const renderNode = (node) => {
    const hasChildren = node.children && node.children.length > 0;
    const isSelected = isCategorySelected(node.categoryID);

    return (
      <div key={node.value} className="node" style={{ paddingLeft: 20 }}>
        <div className="node-label">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={(e) => handleCheckboxChange(e, node)}
          />
          {hasChildren && (
            <span
              className="expand-icon"
              onClick={(e) => {
                e.stopPropagation();
                toggleNode(node);
              }}
            >
              {expandedNodes[node.value] ? "-" : "+"}
            </span>
          )}{" "}
          {node.label}
        </div>
        {hasChildren && expandedNodes[node.value] && (
          <div className="children">
            {node.children.map((child) => renderNode(child))}
          </div>
        )}
      </div>
    );
  };

  useEffect(() => {
    fetchCompanyProfiles().catch(console.error);
    fetchTenants().catch(console.error);
    fetchCategories().then(setCategories).catch(console.error);
  }, [fetchCompanyProfiles, fetchTenants]);

  useEffect(() => {
    if (selectedProfile) {
      const tenant = tenants.find(
        (tenant) => tenant.name === selectedProfile.tenantName
      );
      const tenantID = tenant ? tenant.tenantID : null;
      const findCategoryByName = (categories, categoryName) => {
        for (const category of categories) {
          if (category.categoryName === categoryName) {
            return category.categoryID;
          }
          if (category.subCategories?.$values) {
            const subCategoryID = findCategoryByName(category.subCategories.$values, categoryName);
            if (subCategoryID) {
              return subCategoryID;
            }
          }
        }
        return null;
      };

      const categoryIDs = selectedProfile.categories.$values.map((categoryName) => {
        return findCategoryByName(categories, categoryName);
      }).filter(id => id !== null);

      setFormState({
        tenantID: tenantID,
        organizationName: selectedProfile.organizationName,
        description: selectedProfile.description,
        establishedDate: selectedProfile.establishedDate.split("T")[0],
        contactEmail: selectedProfile.contactEmail,
        contactPhone: selectedProfile.contactPhone,
        address: selectedProfile.address,
        categoryID: categoryIDs,
        locations: selectedProfile.locations.$values || [
          { latitude: "", longitude: "" },
        ],
      });
      setSelectedCategoryIDs(categoryIDs); 
      setIsEditing(true);
      setShowForm(true);
    }
  }, [selectedProfile]);

  console.log(formState, 'formState');

  const handleEditClick = (profile) => {
    selectProfileForEdit(profile);
    setShowForm(true);
    setIsEditing(true);
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
        categoryIDs: selectedCategoryIDs,
        locations: formState.locations,
      };

      if (isEditing) {
        updatedFormStateData.organizationID = selectedProfile.organizationID;
        await updateCompanyProfile(
          selectedProfile.organizationID,
          updatedFormStateData
        );
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
      categoryID: [],
      locations: [{ latitude: "", longitude: "" }],
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

  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      locations: [{ ...prevState.locations[0], [name]: value }],
    }));
  };

  return (
    <>
      <div style={{padding:'20px'}}>
        {/* <Button
          variant="primary"
          onClick={handleCreateClick}
          style={{ margin: "20px", float: "inline-end" }}
        >
          Create Organization
        </Button> */}
        <div className="header-container mt-3">
<h2 className="header-title"> Organization</h2>
<div className="header-actions">
<div className="search-box">

<input
            type="text"
            placeholder="Search Organization"
            className="search-input"
          />
          <img className="search-icon" src={searchicon} />

</div>
<select className="sort-dropdown">
<option>Sort By</option>
<option value="created-date">Created Date</option>
<option value="role-name">Role Name</option>
</select>
<button   onClick={handleCreateClick} className="add-role-btn">   Create Organization</button>
</div>
</div>
        <Modal show={showForm} onHide={() => setShowForm(false)}>
          <Modal.Header closeButton>
            <Modal.Title>
              {isEditing ? "Edit Organization" : "Create Organization"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmit}>
              {Object.keys(formState).map((key) => {
                if (key !== "organizationID" && key !== "locations") {
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
                            <option
                              key={tenant.tenantID}
                              value={tenant.tenantID}
                            >
                              {tenant.name}
                            </option>
                          ))}
                        </select>
                      ) : key === "categoryID" ? (
                        <div className="dropdown-container">
                          <div
                            className="dropdown-header"
                            onClick={toggleDropdown}
                          >
                            Select Categories
                            <span className="dropdown-arrow">
                              {dropdownOpen ? "▲" : "▼"}
                            </span>
                          </div>
                          {dropdownOpen && (
                            <div className="dropdown-list">
                              {nodes.map((node) => renderNode(node))}
                            </div>
                          )}
                        </div>
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
                <label>Location</label>
                <input
                  type="text"
                  className="form-control"
                  name="latitude"
                  value={formState.locations[0].latitude}
                  onChange={handleLocationChange}
                  placeholder="Enter Latitude"
                  required
                />
                <input
                  type="text"
                  className="form-control"
                  name="longitude"
                  value={formState.locations[0].longitude}
                  onChange={handleLocationChange}
                  placeholder="Enter Longitude"
                  required
                />
              </div>
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

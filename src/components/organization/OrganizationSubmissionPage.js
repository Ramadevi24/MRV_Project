import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../css/CreateForm.css";
import DropdownTreeSelect from "react-dropdown-tree-select";
import "react-dropdown-tree-select/dist/styles.css";
import { useNavigate } from "react-router-dom";
import "react-dropdown-tree-select/dist/styles.css";
import "../../css/custom-dropdown.css";
// import "./styles.css";

const transformData = (categories) => {
  return categories
    .filter(
      (category) => category.categoryName && category.categoryCode // Filter only if both categoryName and categoryCode are present
    )
    .map((category) => ({
      label: `${category.categoryCode} - ${category.categoryName}`, // Concatenate category code before name
      value: category.categoryID,
      children: category.subCategories
        ? transformData(category.subCategories.$values || [])
        : [],
    }));
};

const OrganizationSubmissionPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    tenantID: "",
    organizationName: "",
    description: "",
    establishedDate: "",
    contactEmail: "",
    contactPhone: "",
    address: "",
    categoryIDs: [],
    locations: [{ latitude: "", longitude: "", address: "" }],
  });
  const [tenants, setTenants] = useState([]);
  const [categories, setCategories] = useState([]);
  const treeData = transformData(categories);

  const handleCategoryChange = (currentNode, selectedNodes) => {
    const categoryIds = selectedNodes.map((node) => node.value);
    setFormData({ ...formData, categoryIDs: categoryIds });
  };

  const handleCategoryAction = (node, action) => {
    if (action === 'checked' || action === 'unchecked') {
      const selectedNodes = node.checked ? [...formData.categoryIDs, node.value] : formData.categoryIDs.filter(id => id !== node.value);
      setFormData({ ...formData, categoryIDs: selectedNodes });
    }
  };

  useEffect(() => {
    fetchTenants();
    fetchCategories();
  }, []);

  const fetchTenants = async () => {
    try {
      const response = await axios.get(
        "https://atlas.smartgeoapps.com/MRVAPI/api/Tenant",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setTenants(response.data.$values);
    } catch (error) {
      toast.error(t("errorFetchingData"));
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "https://atlas.smartgeoapps.com/MRVAPI/api/Categories/level1and2",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setCategories(response.data.$values);
    } catch (error) {
      toast.error(t("errorFetchingData"));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLocationChange = (index, e) => {
    const { name, value } = e.target;
    const newLocations = formData.locations.map((location, i) =>
      i === index ? { ...location, [name]: value } : location
    );
    setFormData({ ...formData, locations: newLocations });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://atlas.smartgeoapps.com/MRVAPI/api/Organization",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success(t("Organization created successfully"));
      navigate("/organizations");
    } catch (error) {
      toast.error(t("createError"));
    }
  };

  return (
    <div className="container">
      <div className='form-heading-row'>
        <div>
        <h2 className="create-form-header">{t("Create Organization")}</h2>
        </div>
        <div>
        <button onClick={() => navigate(-1)} className='form_back'>{t('Back')}</button>
        </div>
        </div>
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <div className="col">
            <label>
              {t("Tenant ID")}
              <span className="text-danger">*</span>
            </label>
            <select
              name="tenantID"
              value={formData.tenantID}
              onChange={handleChange}
              className="form-control"
              required
            >
              <option value="">{t("selectTenant")}</option>
              {tenants.map((tenant) => (
                <option key={tenant.tenantID} value={tenant.tenantID}>
                  {tenant.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col">
            <label>
              {t("Organization Name")}
              <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              name="organizationName"
              value={formData.organizationName}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col">
            <label>
              {t("Description")}
              <span className="text-danger">*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="form-control"
              required
            ></textarea>
          </div>
          <div className="col">
            <label>
              {t("Established Date")}
              <span className="text-danger">*</span>
            </label>
            <input
              type="date"
              name="establishedDate"
              value={formData.establishedDate}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col">
            <label>
              {t("Contact Email")}
              <span className="text-danger">*</span>
            </label>
            <input
              type="email"
              name="contactEmail"
              value={formData.contactEmail}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="col">
            <label>
              {t("Contact Phone")}
              <span className="text-danger">*</span>
            </label>
            <input
              type="number"
              name="contactPhone"
              value={formData.contactPhone}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col">
            <label>
              {t("Address")}
              <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="col">
            <label>
              {t("categoryIDs")}
              <span className="text-danger">*</span>
            </label>
            <DropdownTreeSelect
              data={treeData}
              onChange={handleCategoryChange}
              onAction={handleCategoryAction}
              texts={{ placeholder: "Select Categories" }}
              className="category-tree-dropdown"
              keepTreeOnSearch={true}
              keepOpenOnSelect={true}
            />
          </div>
        </div>
        {formData.locations.map((location, index) => (
          <div className="row mb-3" key={index}>
            <div className="col">
              <label style={{ fontSize: "20px", marginTop: "10px" }}>
                {t("Locations")}
                <span className="text-danger">*</span>
              </label>
            </div>
            <div className="col">
              <label>
                {t("Latitude")}
                <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                name="latitude"
                value={location.latitude}
                onChange={(e) => handleLocationChange(index, e)}
                className="form-control"
                required
              />
            </div>
            <div className="col">
              <label>
                {t("Longitude")}
                <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                name="longitude"
                value={location.longitude}
                onChange={(e) => handleLocationChange(index, e)}
                className="form-control"
                required
              />
            </div>
            <div className="col">
              <label>
                {t("Location Address")}
                <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                name="address"
                value={location.address}
                onChange={(e) => handleLocationChange(index, e)}
                className="form-control"
                required
              />
            </div>
          </div>
        ))}
        <button type="submit" className="btn">
          {t("Submit")}
        </button>
      </form>
    </div>
  );
};

export default OrganizationSubmissionPage;
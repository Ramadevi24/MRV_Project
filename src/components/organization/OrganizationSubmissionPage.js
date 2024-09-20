import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../css/CreateForm.css";
import { useNavigate } from "react-router-dom";
import "../../css/custom-dropdown.css";


const OrganizationSubmissionPage = ({userPermissions}) => {
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
  const [checkedItems, setCheckedItems] = useState([]);
  const [expandedItems, setExpandedItems] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleCheck = (category) => {
    const allChildIds = getAllChildIds(category);
    setCheckedItems((prev) => {
      const newCheckedItems = allChildIds.every((id) => prev.includes(id))
        ? prev.filter((id) => !allChildIds.includes(id))
        : [...new Set([...prev, ...allChildIds])];
      setFormData((prevFormData) => ({
        ...prevFormData,
        categoryIDs: newCheckedItems,
      }));
      return newCheckedItems;
    });
  };

  const handleExpand = (categoryId) => {
    setExpandedItems((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const getAllChildIds = (category) => {
    let ids = [category.categoryID];
    category.subCategories?.$values?.forEach((subCategory) => {
      ids = [...ids, ...getAllChildIds(subCategory)];
    });
    return ids;
  };

  const CheckboxTree = ({
    data,
    checkedItems,
    expandedItems,
    handleCheck,
    handleExpand,
  }) => (
    <div style={{ paddingLeft: "20px" }}>
      {data
        ?.filter((category) => category.categoryName && category.categoryCode)
        ?.map((item) => (
          <div key={item.categoryID} style={{ marginBottom: "8px" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              {item.subCategories && (
                <span
                  onClick={() => handleExpand(item.categoryID)}
                  style={{ cursor: "pointer", marginRight: "8px" }}
                >
                  {expandedItems.includes(item.categoryID) ? "▼" : "▶"}
                </span>
              )}
              <input
                type="checkbox"
                checked={checkedItems.includes(item.categoryID)}
                onChange={() => handleCheck(item)}
                style={{
                  marginRight: "8px",
                  marginTop: "-5px",
                  width: "20px",
                  transform: "scale(1.3)",
                }}
              />
              <label>{`${item.categoryCode} - ${item.categoryName}`}</label>
            </div>
            {item.subCategories &&
              expandedItems.includes(item.categoryID) && (
                <CheckboxTree
                  data={item.subCategories.$values}
                  checkedItems={checkedItems}
                  expandedItems={expandedItems}
                  handleCheck={handleCheck}
                  handleExpand={handleExpand}
                />
              )}
          </div>
        ))}
    </div>
  );

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
            Authorization: `Bearer ${localStorage.getItem("AuthToken")}`,
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
            Authorization: `Bearer ${localStorage.getItem("AuthToken")}`,
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
            Authorization: `Bearer ${localStorage.getItem("AuthToken")}`,
          },
        }
      );
      toast.success(t("Organization created successfully"));
      navigate("/Mrv/organizations");
    } catch (error) {
      toast.error(t("createError"));
    }
  };

  return (
    <div className="container">
      <div className="form-heading-row">
        <div>
          <h2 className="create-form-header">{t("Create Organization")}</h2>
        </div>
        <div>
          <button onClick={() => navigate(-1)} className="form_back">
            {t("Back")}
          </button>
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
            <div style={{ margin: "0 auto" }}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                style={{
                  padding: "10px",
                  width: "100%",
                  textAlign: "left",
                  cursor: "pointer",
                  background: "white",
                  border: "1px solid #ddd",
                }}
              >
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div> Select Categories </div>
                  <div> {isDropdownOpen ? "▲" : "▼"} </div>
                </div>
              </button>

              {isDropdownOpen && (
                <div
                  style={{
                    border: "1px solid #ddd",
                    padding: "10px",
                    maxHeight: "300px",
                    overflowY: "auto",
                  }}
                >
                  <CheckboxTree
                    data={categories}
                    checkedItems={checkedItems}
                    expandedItems={expandedItems}
                    handleCheck={handleCheck}
                    handleExpand={handleExpand}
                  />
                </div>
              )}
            </div>
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
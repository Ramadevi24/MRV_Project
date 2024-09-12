import React, { useState, useEffect } from "react";
import { Table, Dropdown, DropdownButton, Modal, Button, Form } from "react-bootstrap";
import '../css/DataManagement.css';
import {faPencil} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import{faTrash} from '@fortawesome/free-solid-svg-icons';
import DataManagementAPI from "../services/DataManagementAPI";
import { useTranslation } from "react-i18next";
const DataManagement = () => {
  const {t}=useTranslation();
  const [selectedFuelType, setSelectedFuelType] = useState(""); // Initial empty state

  useEffect(() => {
    // Set the initial state after translations are ready
    setSelectedFuelType(t('All Fuels'));
  }, [t]); // Ensure this runs when `t` changes
  const [showAddModal, setShowAddModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentFuelId, setCurrentFuelId] = useState(null);
  const [formData, setFormData] = useState({
    fuelType: "Solid",
    fuelName: "",
    isPrimaryFuel: "Yes",
    netCalorificValue: "",
    carbonContentNCV: "",
    grossCalorificValue: "",
    carbonContentGCV: "",
    conversionFactorType: "NCV",
  });
  const [showUserDefined, setShowUserDefined] = useState(false);
  const [conversionFactorType, setConversionFactorType] = useState("NCV");
  const [fuelData, setFuelData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await DataManagementAPI.getAll();
        setFuelData(data);
      } catch (error) {
        console.error("Error fetching fuel data:", error);
      }
    };
    fetchData();
  }, []);
  const handleCheckboxChange = () => {
    setShowUserDefined(!showUserDefined);
  };

  const handleToggleClick = () => {
    setConversionFactorType((prevType) => (prevType === "NCV" ? "GCV" : "NCV"));
  };

  const handleFuelTypeChange = (fuelType) => {
    setSelectedFuelType(fuelType);
  };

  const handleDeleteClick = async (fuelId) => {
    try {
      await DataManagementAPI.delete(fuelId);
      setFuelData(fuelData.filter((fuel) => fuel.fuelID !== fuelId));
    } catch (error) {
      console.error("Error deleting fuel:", error);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const updatedFormData = {
      ...formData,
      isPrimaryFuel: formData.isPrimaryFuel === "Yes" ? true : false,
    };
    try {
      if (isEditMode) {
        const editUpdatedFormData = {
          ...updatedFormData,
          fuelID: currentFuelId,
        };
        await DataManagementAPI.update(currentFuelId, editUpdatedFormData);
        setFuelData((prevFuelData) =>
          prevFuelData.map((fuel) =>
            fuel.fuelID === currentFuelId
              ? { ...fuel, ...editUpdatedFormData }
              : fuel
          )
        );
      } else {
        // Create new fuel
        const newFuel = await DataManagementAPI.create(updatedFormData);
        setFuelData([...fuelData, newFuel]);
      }
      handleCloseModal();
    } catch (error) {
      console.error("Error managing fuel:", error);
    }
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setIsEditMode(false);
    setFormData({
      fuelType: "Solid",
      fuelName: "",
      isPrimaryFuel: "Yes",
      netCalorificValue: "",
      carbonContentNCV: "",
      grossCalorificValue: "",
      carbonContentGCV: "",
      conversionFactorType: "NCV",
    });
  };

  const handleEditClick = (fuel) => {
    handleShowEditModal(fuel);
  };

  const handleShowEditModal = (fuel) => {
    setIsEditMode(true);
    setCurrentFuelId(fuel.fuelID);
    setFormData({
      fuelType: fuel.fuelType,
      fuelName: fuel.fuelName,
      isPrimaryFuel: fuel.isPrimaryFuel ? "Yes" : "No",
      netCalorificValue: fuel.netCalorificValue,
      carbonContentNCV: fuel.carbonContentNCV,
      grossCalorificValue: fuel.grossCalorificValue,
      carbonContentGCV: fuel.carbonContentGCV,
      conversionFactorType: fuel.conversionFactorType,
    });
    setShowAddModal(true);
  };

  const filteredFuelData =
    selectedFuelType === "All Fuels"
      ? fuelData
      : fuelData.filter((fuel) => fuel.fuelType === selectedFuelType);

  return (
    <div className="fuelmanager-body" style={{ padding: "20px" }}>
      <div className="table-header">
        <h2 className="fuelmanager">{t('Fuel Manager')}</h2>
        <div className="filters">
          <div className="button-box">
            <input
              type="checkbox"
              id="userDefined"
              checked={showUserDefined}
              onChange={handleCheckboxChange}
              style={{ transform: "scale(1.5)", marginRight:'10px' }}
            />
            <label htmlFor="userDefined" className="userdefined-label">
              {t('Show user-defined fuels only')}
            </label>
          </div>
          <div className="side-button-box toggle-button">
            <label className="conversionfactor">{t('Conversion Factor Type')} :</label>
            <div className="ncv">{t('NCV')}</div>
            <div className="form-check form-switch custom-switch">
              <input
                className="form-check-input form-switch"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckChecked"
                checked={conversionFactorType === "GCV"}
                onChange={handleToggleClick}
              />
            </div>
            <div>{t('GCV')}</div>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <DropdownButton 
          id="dropdown-basic-button"
          title={selectedFuelType}
          onSelect={handleFuelTypeChange}
         >
          <Dropdown.Item eventKey={t("All Fuels")}>{t('All Fuels')}</Dropdown.Item>
          <Dropdown.Item eventKey={t("Liquid")}>{t('Liquid Fuels')}</Dropdown.Item>
          <Dropdown.Item eventKey={t("Solid")}>{t('Solid Fuels')}</Dropdown.Item>
        </DropdownButton>
        <Button onClick={() => setShowAddModal(true)} className="add-fuel-btn">{t('Add New Fuel')}</Button>
      </div>
      <Table striped bordered hover className="mt-3 fuel-management-table">
        <thead>
          <tr>
            <th>{t('Fuel Name')}</th>
            <th>{t('Primary Fuel')}</th>
            <th>{t('Net Calorific Value (TJ/Gg)')}</th>
            <th>
              {conversionFactorType == "NCV"
                ? "Carbon Content NCV"
                : "Carbon Content GCV"}
            </th>
            <th>{t('Fuel Type')}</th>
            <th>{t('Actions')}</th>
          </tr>
        </thead>
        <tbody>
          {filteredFuelData?.map((fuel) => (
            <tr key={fuel.fuelID}>
              <td>{fuel.fuelName}</td>
              <td>{fuel.isPrimaryFuel ? "Yes" : "No"}</td>
              <td>{fuel.netCalorificValue}</td>
              <td>
                {conversionFactorType == "NCV"
                  ? fuel.carbonContentNCV
                  : fuel.carbonContentGCV}
              </td>
              <td>{fuel.fuelType}</td>
              <td>
                <button onClick={() => handleEditClick(fuel)}  className="fuel-management-editicon"><FontAwesomeIcon icon={faPencil} /></button>
                <button onClick={() => handleDeleteClick(fuel.fuelID)} className="fuel-management-binicon"><FontAwesomeIcon icon={faTrash} /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showAddModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditMode ? "Edit Fuel" : t("Add New Fuel")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group controlId="formFuelType">
              <Form.Label>{t('Fuel Type')}</Form.Label>
              <div className="d-flex">
                <Form.Check
                  type="radio"
                  label={t("Solid")}
                  name="fuelType"
                  value="Solid"
                  checked={formData.fuelType === "Solid"}
                  onChange={handleFormChange}
                  style={{ marginRight: "40px" }}
                />
                <Form.Check
                  type="radio"
                  label={t("Liquid")}
                  name="fuelType"
                  value="Liquid"
                  checked={formData.fuelType === "Liquid"}
                  onChange={handleFormChange}
                />
              </div>
            </Form.Group>
            <Form.Group controlId="formFuelName">
              <Form.Label>{t('Fuel Name')}</Form.Label>
              <Form.Control
                type="text"
                name="fuelName"
                value={formData.fuelName}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group controlId="formIsPrimaryFuel">
              <Form.Label>{t('Is Primary Fuel')}</Form.Label>
              <div className="d-flex">
                <Form.Check
                  type="radio"
                  label={t("Yes")}
                  name="isPrimaryFuel"
                  value="Yes"
                  checked={formData.isPrimaryFuel === "Yes"}
                  onChange={handleFormChange}
                  style={{ marginRight: "40px" }}
                />
                <Form.Check
                  type="radio"
                  label={t("No")}
                  name="isPrimaryFuel"
                  value="No"
                  checked={formData.isPrimaryFuel === "No"}
                  onChange={handleFormChange}
                />
              </div>
            </Form.Group>
            <Form.Group controlId="formNetCalorificValue">
              <Form.Label>{t('Net Calorific Value')}</Form.Label>
              <Form.Control
                type="number"
                name="netCalorificValue"
                value={formData.netCalorificValue}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group controlId="formCarbonContentNCV">
              <Form.Label>{t('Carbon Content NCV')}</Form.Label>
              <Form.Control
                type="number"
                name="carbonContentNCV"
                value={formData.carbonContentNCV}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group controlId="formGrossCalorificValue">
              <Form.Label>{t('Gross Calorific Value')}</Form.Label>
              <Form.Control
                type="number"
                name="grossCalorificValue"
                value={formData.grossCalorificValue}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group controlId="formCarbonContentGCV">
              <Form.Label>{t('Carbon Content GCV')}</Form.Label>
              <Form.Control
                type="number"
                name="carbonContentGCV"
                value={formData.carbonContentGCV}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group controlId="formConversionFactorType">
              <Form.Label>{t('Conversion Factor Type')}</Form.Label>
              <div className="d-flex">
                <Form.Check
                  type="radio"
                  label={t("NCV")}
                  name="conversionFactorType"
                  value="NCV"
                  checked={formData.conversionFactorType === "NCV"}
                  onChange={handleFormChange}
                  style={{ marginRight: "40px" }}
                />
                <Form.Check
                  type="radio"
                  label={t("GCV")}
                  name="conversionFactorType"
                  value="GCV"
                  checked={formData.conversionFactorType === "GCV"}
                  onChange={handleFormChange}
                />
              </div>
            </Form.Group>
            <Button variant="primary" type="submit">
              {isEditMode ? "Update" : t("Submit")}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default DataManagement;

import React, { useState, useEffect } from "react";
import { Table, Dropdown, DropdownButton, Modal, Button, Form } from "react-bootstrap";
import "../css/DataManagement.css";
import DataManagementAPI from "../services/DataManagementAPI";

const DataManagement = () => {
  const [selectedFuelType, setSelectedFuelType] = useState("All Fuels");
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

  const handleToggleClick = (type) => {
    setConversionFactorType(type);
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
        }
        await DataManagementAPI.update(currentFuelId, editUpdatedFormData);
        setFuelData((prevFuelData) =>
          prevFuelData.map((fuel) =>
            fuel.fuelID === currentFuelId ? { ...fuel, ...editUpdatedFormData } : fuel
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
    <div style={{ padding: "20px" }}>
      <div className="table-header">
        <h2>Fuel Manager</h2>
        <div className="filters">
          <div className="button-box">
            <input
              type="checkbox"
              id="userDefined"
              checked={showUserDefined}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="userDefined">Show user-defined fuels only</label>
          </div>
          <div className="button-box toggle-button">
            <label>Conversion Factor Type:</label>
            <button
              className={conversionFactorType === "NCV" ? "active" : ""}
              onClick={() => handleToggleClick("NCV")}
            >
              NCV
            </button>
            <button
              className={conversionFactorType === "GCV" ? "active" : ""}
              onClick={() => handleToggleClick("GCV")}
            >
              GCV
            </button>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <DropdownButton
          id="dropdown-basic-button"
          title={selectedFuelType}
          onSelect={handleFuelTypeChange}
        >
          <Dropdown.Item eventKey="All Fuels">All Fuels</Dropdown.Item>
          <Dropdown.Item eventKey="Liquid">Liquid Fuels</Dropdown.Item>
          <Dropdown.Item eventKey="Solid">Solid Fuels</Dropdown.Item>
        </DropdownButton>
        <Button onClick={() => setShowAddModal(true)}>Add New Fuel</Button>
      </div>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Fuel Name</th>
            <th>Primary Fuel</th>
            <th>Net Calorific Value (TJ/Gg)</th>
            <th>Carbon Content (NCV) (Kg C/GJ)</th>
            <th>Fuel Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredFuelData?.map((fuel) => (
            <tr key={fuel.fuelID}>
              <td>{fuel.fuelName}</td>
              <td>{fuel.isPrimaryFuel ? "Yes" : "No"}</td>
              <td>{fuel.netCalorificValue}</td>
              <td>
                {fuel.carbonContentNCV} || {fuel.carbonContentGCV}
              </td>
              <td>{fuel.fuelType}</td>
              <td>
                <button onClick={() => handleEditClick(fuel)}>Edit</button>
                <button onClick={() => handleDeleteClick(fuel.fuelID)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showAddModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditMode ? "Edit Fuel" : "Add New Fuel"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group controlId="formFuelType">
              <Form.Label>Fuel Type</Form.Label>
              <div className="d-flex">
                <Form.Check
                  type="radio"
                  label="Solid"
                  name="fuelType"
                  value="Solid"
                  checked={formData.fuelType === "Solid"}
                  onChange={handleFormChange}
                  style={{ marginRight: "40px" }}
                />
                <Form.Check
                  type="radio"
                  label="Liquid"
                  name="fuelType"
                  value="Liquid"
                  checked={formData.fuelType === "Liquid"}
                  onChange={handleFormChange}
                />
              </div>
            </Form.Group>
            <Form.Group controlId="formFuelName">
              <Form.Label>Fuel Name</Form.Label>
              <Form.Control
                type="text"
                name="fuelName"
                value={formData.fuelName}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group controlId="formIsPrimaryFuel">
              <Form.Label>Is Primary Fuel</Form.Label>
              <div className="d-flex">
                <Form.Check
                  type="radio"
                  label="Yes"
                  name="isPrimaryFuel"
                  value="Yes"
                  checked={formData.isPrimaryFuel === "Yes"}
                  onChange={handleFormChange}
                  style={{ marginRight: "40px" }}
                />
                <Form.Check
                  type="radio"
                  label="No"
                  name="isPrimaryFuel"
                  value="No"
                  checked={formData.isPrimaryFuel === "No"}
                  onChange={handleFormChange}
                />
              </div>
            </Form.Group>
            <Form.Group controlId="formNetCalorificValue">
              <Form.Label>Net Calorific Value</Form.Label>
              <Form.Control
                type="number"
                name="netCalorificValue"
                value={formData.netCalorificValue}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group controlId="formCarbonContentNCV">
              <Form.Label>Carbon Content NCV</Form.Label>
              <Form.Control
                type="number"
                name="carbonContentNCV"
                value={formData.carbonContentNCV}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group controlId="formGrossCalorificValue">
              <Form.Label>Gross Calorific Value</Form.Label>
              <Form.Control
                type="number"
                name="grossCalorificValue"
                value={formData.grossCalorificValue}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group controlId="formCarbonContentGCV">
              <Form.Label>Carbon Content GCV</Form.Label>
              <Form.Control
                type="number"
                name="carbonContentGCV"
                value={formData.carbonContentGCV}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group controlId="formConversionFactorType">
              <Form.Label>Conversion Factor Type</Form.Label>
              <div className="d-flex">
                <Form.Check
                  type="radio"
                  label="NCV"
                  name="conversionFactorType"
                  value="NCV"
                  checked={formData.conversionFactorType === "NCV"}
                  onChange={handleFormChange}
                  style={{ marginRight: "40px" }}
                />
                <Form.Check
                  type="radio"
                  label="GCV"
                  name="conversionFactorType"
                  value="GCV"
                  checked={formData.conversionFactorType === "GCV"}
                  onChange={handleFormChange}
                />
              </div>
            </Form.Group>
            <Button variant="primary" type="submit">
              {isEditMode ? "Update" : "Submit"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default DataManagement;

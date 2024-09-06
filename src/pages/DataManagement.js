import React, { useState } from "react";
import { Table, Dropdown, DropdownButton, Modal, Button, Form } from "react-bootstrap";
import '../css/DataManagement.css';

const DataManagement = () => {
  const [selectedFuelType, setSelectedFuelType] = useState("All Fuels");
  const [fuelData, setFuelData] = useState([
    {
      fuelName: "Coal",
      primaryFuels: "Solid",
      netCalorificValue: "24 MJ/kg",
      fuelType: "Solid Fuels",
    },
    {
      fuelName: "Petrol",
      primaryFuels: "Liquid",
      netCalorificValue: "44 MJ/kg",
      fuelType: "Liquid Fuels",
    },
    // Add more data as needed
  ]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editFormData, setEditFormData] = useState({
    fuelName: "",
    primaryFuels: "",
    netCalorificValue: "",
    fuelType: "",
  });
  const [showUserDefined, setShowUserDefined] = useState(false);
  const [conversionFactorType, setConversionFactorType] = useState("NCV");

  const handleCheckboxChange = () => {
    setShowUserDefined(!showUserDefined);
  };

  const handleToggleClick = (type) => {
    setConversionFactorType(type);
  };

  const handleFuelTypeChange = (fuelType) => {
    setSelectedFuelType(fuelType);
  };

  const handleEditClick = (fuel) => {
    setEditFormData(fuel);
    setShowEditModal(true);
  };

  const handleDeleteClick = (fuelName) => {
    setFuelData(fuelData.filter((fuel) => fuel.fuelName !== fuelName));
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditFormSubmit = (e) => {
    e.preventDefault();
    setFuelData((prevData) =>
      prevData.map((fuel) =>
        fuel.fuelName === editFormData.fuelName ? editFormData : fuel
      )
    );
    setShowEditModal(false);
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
      <DropdownButton
        id="dropdown-basic-button"
        title={selectedFuelType}
        onSelect={handleFuelTypeChange}
      >
        <Dropdown.Item eventKey="All Fuels">All Fuels</Dropdown.Item>
        <Dropdown.Item eventKey="Liquid Fuels">Liquid Fuels</Dropdown.Item>
        <Dropdown.Item eventKey="Solid Fuels">Solid Fuels</Dropdown.Item>
      </DropdownButton>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Fuel Name</th>
            <th>Primary Fuels</th>
            <th>Net Calorific Value</th>
            <th>Fuel Type</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredFuelData.map((fuel, index) => (
            <tr key={index}>
              <td>{fuel.fuelName}</td>
              <td>{fuel.primaryFuels}</td>
              <td>{fuel.netCalorificValue}</td>
              <td>{fuel.fuelType}</td>
              <td>
                <button onClick={() => handleEditClick(fuel)}>Edit</button>
                <button onClick={() => handleDeleteClick(fuel.fuelName)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Fuel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditFormSubmit}>
            <Form.Group controlId="formFuelName">
              <Form.Label>Fuel Name</Form.Label>
              <Form.Control
                type="text"
                name="fuelName"
                value={editFormData.fuelName}
                onChange={handleEditFormChange}
                readOnly
              />
            </Form.Group>
            <Form.Group controlId="formPrimaryFuels">
              <Form.Label>Primary Fuels</Form.Label>
              <Form.Control
                type="text"
                name="primaryFuels"
                value={editFormData.primaryFuels}
                onChange={handleEditFormChange}
              />
            </Form.Group>
            <Form.Group controlId="formNetCalorificValue">
              <Form.Label>Net Calorific Value</Form.Label>
              <Form.Control
                type="text"
                name="netCalorificValue"
                value={editFormData.netCalorificValue}
                onChange={handleEditFormChange}
              />
            </Form.Group>
            <Form.Group controlId="formFuelType">
              <Form.Label>Fuel Type</Form.Label>
              <Form.Control
                as="select"
                name="fuelType"
                value={editFormData.fuelType}
                onChange={handleEditFormChange}
              >
                <option>Liquid Fuels</option>
                <option>Solid Fuels</option>
              </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default DataManagement;
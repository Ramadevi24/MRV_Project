import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  FormControl,
  InputGroup,
  Pagination,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";
import "../../css/custom-dropdown.css";

const OrganizationTable = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [organizations, setOrganizations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "organizationName",
    direction: "asc",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/Organization"
        );
        setOrganizations(response.data.$values);
      } catch (error) {
        console.error("Failed to fetch organizations", error);
      }
    };

    fetchOrganizations();
  }, []);

  const handleSortChange = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const handleDeleteOrganization = async (organizationID) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/Organization/${organizationID}`
      );
      setOrganizations(
        organizations.filter((org) => org.organizationID !== organizationID)
      );
    } catch (error) {
      console.error("Failed to delete organization", error);
    }
  };

  const sortedOrganizations = [...organizations].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  const filteredOrganizations = sortedOrganizations.filter((org) =>
    org.organizationName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrganizations = filteredOrganizations.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(filteredOrganizations.length / itemsPerPage);

  return (
    <div className="container">
      <h1>{t("Organizations")}</h1>
      <div className="top-bar">
        <InputGroup className="search-bar">
          <FormControl
            placeholder={t("Search")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>
        <DropdownButton
          id="dropdown-basic-button"
          title={t("Sort By")}
          className="sort-dropdown"
          onSelect={handleSortChange}
        >
          <Dropdown.Item eventKey="organizationName">
            {t("Organization Name")}
          </Dropdown.Item>
          <Dropdown.Item eventKey="tenantName">
            {t("Tenant Name")}
          </Dropdown.Item>
          <Dropdown.Item eventKey="establishedDate">
            {t("Established Date")}
          </Dropdown.Item>
        </DropdownButton>
        <Button
          className="create-button"
          onClick={() => navigate("/add-organization")}
        >
          {t("Create Organization")}
        </Button>
      </div>
      <Table responsive className="table-responsive">
        <thead>
          <tr>
            <th onClick={() => handleSortChange("organizationName")}>
              {t("Organization Name")}
            </th>
            <th onClick={() => handleSortChange("tenantName")}>
              {t("Tenant Name")}
            </th>
            <th>{t("Categories")}</th>
            <th onClick={() => handleSortChange("establishedDate")}>
              {t("Established Date")}
            </th>
            <th>{t("Actions")}</th>
          </tr>
        </thead>
        <tbody>
          {currentOrganizations.map((org) => (
            <tr key={org.organizationID}>
              <td>{org.organizationName}</td>
              <td>{org.tenantName}</td>
              <td>{org.categories.$values.join(",")}</td>
              <td>{org.establishedDate}</td>
              <td>
                <div className="icon-buttons-container">
                  <Button
                    className="icon-button view"
                    onClick={() =>
                      navigate(`/view-organization/${org.organizationID}`)
                    }
                  >
                    <FaEye />
                  </Button>
                  <Button
                    className="icon-button edit"
                    onClick={() =>
                      navigate(`/edit-organization/${org.organizationID}`)
                    }
                  >
                    <FaEdit />
                  </Button>
                  <Button
                    className="icon-button delete"
                    onClick={() => handleDeleteOrganization(org.organizationID)}
                  >
                    <FaTrash />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="pagination-container">
        <Pagination>
          <Pagination.First
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
          />
          <Pagination.Prev
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          />
          {[...Array(totalPages).keys()].map((number) => (
            <Pagination.Item
              key={number + 1}
              active={number + 1 === currentPage}
              onClick={() => setCurrentPage(number + 1)}
            >
              {number + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          />
          <Pagination.Last
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
          />
        </Pagination>
      </div>
    </div>
  );
};

export default OrganizationTable;

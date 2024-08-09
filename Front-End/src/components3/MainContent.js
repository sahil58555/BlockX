import React, { useEffect, useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Countries from "../icons/countries.png";
import Map from "../icons/map.png";
import Emp1 from "../icons/emp1.svg";
import Emp2 from "../icons/emp2.svg";
import Emp3 from "../icons/emp3.svg";

import settingsIcon from "../icons/settings.svg";
import notificationIcon from "../icons/notification.svg";
import { useNavigate } from "react-router-dom";
import domain from "../domain";
import axios from "axios";
import { logout } from "../utils/sidebarClick";
import getRandomInt from "../utils/randomno";
import CSVReader from "react-csv-reader";
import { BlockX } from "../constant";

const MainContent = ({ logo, children }) => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const handleClick = (event, employee) => {
    setAnchorEl(event.currentTarget);
    setSelectedEmployee(employee);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedEmployee(null);
  };

  const addEmployee = () => {
    navigate("/add-employee");
  };

  const getRandomImage = (account) => {
    const lastChar = account.charAt(account.length - 1);
    if (isNaN(lastChar)) return Emp1;

    const num = Number(lastChar);

    return num % 2 == 0 ? Emp2 : Emp3;
  };

  const handleCSVUpload = async (data) => {
    // Assuming 'data' is the CSV data received from CSVReader
    // Prepare the data for your API request
    data.pop();

    const result = data.slice(1).map((row) => {
      return {
        name: row[1],
        account: row[2],
        salary: row[3],
        payStartDate: row[4],
        payEndDate: row[5],
        department: row[6],
        designation: row[7],
      };
    });

    const token = localStorage.getItem("token");
    await axios.post(
      `${domain}/admin/csv-to-emp`,
      {
        data: result,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    window.location.href = "/admin-employee-section";
  };

  const getAllEmployees = async () => {
    try {
      const url = `${domain}/admin/get-all-employees`;
      const token = localStorage.getItem("token");

      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = res.data;
      setEmployees(res.data.data);
    } catch (err) {
      console.log("get all emps error");
    }
  };

  const updateEmployee = (employee) => {
    navigate("/update-employee", { state: employee });
  };

  const deleteEmployee = async (employee) => {
    try {
      const url = `${domain}/admin/remove-employee/${employee.account}`;
      const token = localStorage.getItem("token");
      const res = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (err) {
      console.log("Delete emp error");
    }

    getAllEmployees();
  };

  useEffect(() => {
    getAllEmployees();
  }, []);
  return (
    <main className="main-content">
      <header className="main-header">
        <div className="logohome" onClick={() => navigate("/")}>
          {BlockX}
        </div>
        <div className="user-profile">
          <img
            src={settingsIcon}
            alt="Settings"
            className="icon settings-icon"
          />
          <img
            src={notificationIcon}
            alt="Notifications"
            className="icon notification-icon"
          />
          <button onClick={() => logout(navigate, "/login")}>Logout</button>
          <div className="user-info">
            <span>{localStorage.getItem("username")}</span>
            <span>info@gmail.com</span>
          </div>
        </div>
      </header>
      <div>
        <section className="dashboard-header">
          <h1>Employees</h1>

          <div className="breadcrumb">Home / Employees</div>
        </section>
      </div>

      <section className="employees-section">
        <div className="employees-header">
          <h2>Employees</h2>
          <div className="employees-buttons">
            <button className="add-employee-btn" onClick={addEmployee}>
              + Add Employee
            </button>
            <button className="add-employee-csv-btn">
              <CSVReader
                cssClass="csv-reader-input"
                cssLabelClass="font-bold m-2"
                onFileLoaded={handleCSVUpload}
                onError={console.error}
                inputId="csv-reader"
                inputStyle={{ color: "red" }}
              />
            </button>
          </div>
        </div>
        <table className="employees-table">
          <thead className="table-header">
            <tr>
              <th>Employee Name</th>
              <th>Account</th>
              <th>Salary</th>
              <th>Designation</th>
              <th>Location</th>
              <th>Department</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, index) => (
              <tr key={index}>
                <td>
                  <img
                    src={getRandomImage(employee.account)}
                    alt="Employee"
                    className="employee-image"
                  />
                  {employee.name}
                </td>
                <td>{employee.account}</td>
                <td>{employee.salary}</td>
                <td>{employee.designation}</td>
                <td>Delhi</td>
                <td>Department</td>
                <td style={{ color: "white" }}>
                  <IconButton
                    onClick={(event) => handleClick(event, employee)}
                    sx={{ color: "white" }}
                  >
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem
                      onClick={() => {
                        updateEmployee(selectedEmployee);
                        handleClose();
                      }}
                    >
                      Update
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        deleteEmployee(selectedEmployee);
                        handleClose();
                      }}
                    >
                      Delete
                    </MenuItem>
                  </Menu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <div className="images">
        <img className="mapImage" src={Map} alt="" />
        <img className="countriesImage" src={Countries} alt="" />
      </div>
    </main>
  );
};
export default MainContent;

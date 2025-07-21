import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [name, setname] = useState("");
  const [designation, setdesignation] = useState("");
  const [yoe, setyoe] = useState("");
  const [phno, setphno] = useState("");
  const [data, setdata] = useState([]);
  const [editId, seteditId] = useState(null);
  const [isEditing, setisEditing] = useState(false);

  const fetchEmployees = () => {
    axios.get("http://localhost:3000/employees").then((response) => {
      setdata(response.data);
    });
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleDelete = (employeeid) => {
    axios
      .delete(`http://localhost:3000/deleteemployee/${employeeid}`)
      .then((response) => {
        setdata(response.data);
      })
      .catch((error) => {
        console.error("Delete failed:", error);
      });
  };

  const handleUpdate = () => {
    debugger;
    axios
      .put(`http://localhost:3000/update/${editId}`, {
        name,
        designation,
        yoe,
        phno,
      })
      .then((response) => {
        setdata(response.data); // safe updated list
        setname("");
        setdesignation("");
        setyoe("");
        setphno("");
        setisEditing(false);
        seteditId(null);
      })
      .catch((error) => {
        console.error("Update failed:", error);
      });
  };

  const handleEdit = (employee) => {
    setisEditing(true);
    seteditId(employee.id);
    setname(employee.name);
    setdesignation(employee.designation);
    setyoe(employee.yoe);
    setphno(employee.phno);
  };

  const handleAddEmployee = async () => {
    try {
      const response = await axios.post("http://localhost:3000/addemployee", {
        name,
        designation,
        yoe,
        phno,
      });
      setdata(response.data);
      setname("");
      setdesignation("");
      setyoe("");
      setphno("");
    } catch (error) {
      if (error.response) {
        console.error("🚨 Backend Error:", error.response.data.message);
      } else {
        console.error("❌ Axios error:", error.message);
      }
    }
  };

  return (
    <div className="container">
      <h1>Employee Management System</h1>

      <div className="form">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setname(e.target.value)}
        />
        <input
          type="text"
          placeholder="Designation"
          value={designation}
          onChange={(e) => setdesignation(e.target.value)}
        />
        <input
          type="number"
          placeholder="YOE"
          value={yoe}
          onChange={(e) => setyoe(e.target.value)}
        />
        <input
          type="number"
          placeholder="Phone Number"
          value={phno}
          onChange={(e) => setphno(e.target.value)}
        />
        <button onClick={isEditing ? handleUpdate : handleAddEmployee}>
          {isEditing ? "Update" : "Add Employee"}
        </button>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Designation</th>
              <th>YOE</th>
              <th>Phone</th>
              <th colSpan="2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((employee, index) => (
              <tr key={index}>
                <td>{employee.name}</td>
                <td>{employee.designation}</td>
                <td>{employee.yoe}</td>
                <td>{employee.phno}</td>
                <td>
                  <button
                    onClick={() => handleEdit(employee)}
                    className="btn-secondary"
                    disabled={isEditing}
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    className="btn-danger"
                    onClick={() => handleDelete(employee.id)}
                    disabled={isEditing}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;

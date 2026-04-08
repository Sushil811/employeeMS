import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
//import { useNavigate } from "react-router-dom";

const Employee = () => {
  const [employee, setEmployee] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  //const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/employee")
      .then((result) => {
        if (result.data.status) {
          setEmployee(result.data.Result);
        } else {
          setError(result.data.Error || "Failed to fetch employees.");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("An error occurred while fetching employees.");
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    console.log('🗑️ Deleting employee with ID:', id);
    axios.delete('http://localhost:3000/auth/delete_employee/' + id)
      .then(result => {
        console.log('Delete response:', result.data);
        if (result.data.status) {
          console.log('✅ Employee deleted successfully');
          window.location.reload(); // Reload the page to reflect changes
        } else {
          console.log('❌ Delete failed:', result.data.Error);
          alert(result.data.Error || "Failed to delete employee.");
        }
      })
      .catch(err => {
        console.error('❌ Delete error:', err);
        alert("An error occurred while deleting the employee.");
      });
  }

  const filteredEmployees = employee.filter(e => 
    e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  
  return (
    <div className="px-5 mt-3">
      <div className="d-flex justify-content-center">
        <h3>Employee List</h3>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <Link to="/dashboard/add_employee" className="btn btn-success">
          Add Employee
        </Link>
        <div className="w-25">
          <input 
            type="text" 
            placeholder="Search Employee..." 
            className="form-control"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="mt-3">
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : employee.length === 0 ? (
          <div className="text-center">No employees found.</div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Image</th>
                  <th>Email</th>
                  <th>Address</th>
                  <th>Salary</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((e) => (
                  <tr key={e._id}>
                    <td>{e.name}</td>
                    <td>
                      <img
                        src={`http://localhost:3000/Images/${e.image}`}
                        className="employee_image"
                        alt="Employee"
                        onError={(event) => {
                          event.target.onerror = null;
                          event.target.src = "/employeems.jpeg"; // Fixed fallback
                        }}
                      />
                    </td>
                    <td>{e.email}</td>
                    <td>{e.address}</td>
                    <td>₹{e.salary}</td>
                    <td>
                      <Link
                        to={`/dashboard/edit_employee/${e._id}`}
                        className="btn btn-info btn-sm me-2 mb-1"
                      >
                        Edit
                      </Link>
                      <button
                        className="btn btn-warning btn-sm mb-1"
                        onClick={() => handleDelete(e._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
};

export default Employee;
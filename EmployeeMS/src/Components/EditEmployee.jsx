import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditEmployee = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    salary: "",
    address: "",
    category_id: "",
  });
  const [category, setCategory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch categories
    axios.get('http://localhost:3000/auth/category')
      .then(result => {
        if (result.data.status || result.data.Status) {
          setCategory(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch(err => console.error(err));

    // Fetch employee details
    axios.get(`http://localhost:3000/auth/employee/${id}`)
      .then(result => {
        const emp = result.data.Result && result.data.Result[0];
        if (emp) {
          setEmployee({
            name: emp.name,
            email: emp.email,
            salary: emp.salary,
            address: emp.address,
            category_id: emp.category_id._id || emp.category_id
          });
        } else {
          alert("Employee not found!");
          navigate('/dashboard/employee');
        }
      })
      .catch(err => {
        alert("Error fetching employee data.");
        navigate('/dashboard/employee');
        console.error(err);
      });
  }, [id, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3000/auth/update_employee/${id}`, employee)
      .then(result => {
        if (result.data.status || result.data.Status) {
          navigate('/dashboard/employee');
        } else {
          alert(result.data.error || result.data.Error);
        }
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h3 className="text-center">Edit Employee</h3>
        <form className="row g-1" onSubmit={handleSubmit}>
          <div className="col-12">
            <label htmlFor="inputName" className="form-label">Name</label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputName"
              value={employee.name}
              onChange={(e) => setEmployee({ ...employee, name: e.target.value })}
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputEmail4" className="form-label">Email</label>
            <input
              type="email"
              className="form-control rounded-0"
              id="inputEmail4"
              autoComplete="off"
              value={employee.email}
              onChange={(e) => setEmployee({ ...employee, email: e.target.value })}
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputSalary" className="form-label">Salary</label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputSalary"
              autoComplete="off"
              value={employee.salary}
              onChange={(e) => setEmployee({ ...employee, salary: e.target.value })}
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputAddress" className="form-label">Address</label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputAddress"
              autoComplete="off"
              value={employee.address}
              onChange={(e) => setEmployee({ ...employee, address: e.target.value })}
            />
          </div>
          <div className="col-12">
            <label htmlFor="category" className="form-label">Category</label>
            <select
              name="category"
              id="category"
              className="form-select"
              value={employee.category_id}
              onChange={(e) => setEmployee({ ...employee, category_id: e.target.value })}
            >
              <option value="">Select Category</option>
              {category.map((c) => (
                <option key={c._id} value={c._id}>{c.name}</option>
              ))}
            </select>
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100">Edit Employee</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEmployee;
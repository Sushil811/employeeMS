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
        if (result.data.status) {
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
    const formData = new FormData();
    formData.append('name', employee.name);
    formData.append('email', employee.email);
    formData.append('salary', employee.salary);
    formData.append('address', employee.address);
    formData.append('category_id', employee.category_id);
    if(employee.image) {
        formData.append('image', employee.image);
    }

    axios.put(`http://localhost:3000/auth/update_employee/${id}`, formData)
      .then(result => {
        if (result.data.status) {
          navigate('/dashboard/employee');
        } else {
          alert(result.data.Error || "Failed to update employee");
        }
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded col-11 col-md-8 col-lg-6 border bg-white shadow-sm">
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
          <div className="col-12 mb-3">
            <label className="form-label" htmlFor="inputGroupFile01">
              Select Image (Optional)
            </label>
            <input
              type="file"
              className="form-control rounded-0"
              id="inputGroupFile01"
              name="image"
              onChange={(e) =>
                setEmployee({ ...employee, image: e.target.files[0] })
              }
            />
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100">Update Employee</button>
          </div>
        </form>
      </div>
    </div>
  );
};


export default EditEmployee;
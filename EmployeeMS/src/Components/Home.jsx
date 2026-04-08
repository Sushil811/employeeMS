import React, {useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';



function Home() {
  const [adminTotal, setAdminTotal] = useState();
  const [employeeTotal, setEmployeeTotal] = useState();
  const [salaryTotal, setSalaryTotal] = useState();
  const [admins, setAdmins] = useState([]);
  const [employee, setEmployee] = useState([]);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    adminCount();
    employeeCount();
    salaryCount();
    adminRecords();
    fetchChartData();
  }, [])

  const fetchChartData = () => {
    axios.get('http://localhost:3000/auth/employee')
      .then(result => {
        if (result.data.status) {
          const employees = result.data.Result;
          setEmployee(employees);
          const categoryCounts = {};
          employees.forEach(emp => {
            const catName = emp.category_id ? emp.category_id.name : 'Uncategorized';
            categoryCounts[catName] = (categoryCounts[catName] || 0) + 1;
          });
          const data = Object.keys(categoryCounts).map(name => ({
            name,
            count: categoryCounts[name]
          }));
          setChartData(data);
        }
      })
  }

  const adminCount = ()=>{
    axios.get('http://localhost:3000/auth/admin_count')
    .then(result =>{
      if(result.data.status){
        setAdminTotal(result.data.Result[0].admin);
      }
    })
  }

  const employeeCount = ()=>{
    axios.get('http://localhost:3000/auth/employee_count')
    .then(result =>{
      if(result.data.status){
        setEmployeeTotal(result.data.Result[0].employee)
      }
    })
  }

  const salaryCount = ()=>{
    axios.get('http://localhost:3000/auth/salary_count')
    .then(result =>{
      if(result.data.status){
        setSalaryTotal(result.data.Result[0].salary)
      }
    })
  }

    const adminRecords = ()=>{
    axios.get('http://localhost:3000/auth/admin_records')
    .then(result =>{
      if(result.data.status){
        setAdmins(result.data.Result);
      }else {
        alert(result.data.Error || "Failed to fetch admin records.");
      //console.error("Error fetching admin records:", err);
    }
  })
}
  
  return (
    <div>
      <div className='p-3 mt-3'>
        <div className='row'>
          <div className='col-12 col-md-4 mb-3'>
            <div className='px-3 pt-3 pb-3 border-0 shadow-sm glass-card bg-primary text-white' style={{background: 'linear-gradient(45deg, #4e54c8, #8f94fb)'}}>
              <div className='d-flex justify-content-between align-items-center mb-3'>
                <h4 className='mb-0'>Admin</h4>
                <i className="bi bi-person-badge fs-2 opacity-50"></i>
              </div>
              <hr className='opacity-25' />
              <div className='d-flex justify-content-between'>
                <h5>Total:</h5>
                <h5>{adminTotal}</h5>
              </div>
            </div>
          </div>
          <div className='col-12 col-md-4 mb-3'>
            <div className='px-3 pt-3 pb-3 border-0 shadow-sm glass-card bg-success text-white' style={{background: 'linear-gradient(45deg, #11998e, #38ef7d)'}}>
              <div className='d-flex justify-content-between align-items-center mb-3'>
                <h4 className='mb-0'>Employee</h4>
                <i className="bi bi-people fs-2 opacity-50"></i>
              </div>
              <hr className='opacity-25' />
              <div className='d-flex justify-content-between'>
                <h5>Total:</h5>
                <h5>{employeeTotal}</h5>
              </div>
            </div>
          </div>
          <div className='col-12 col-md-4 mb-3'>
            <div className='px-3 pt-3 pb-3 border-0 shadow-sm glass-card bg-info text-white' style={{background: 'linear-gradient(45deg, #00c6ff, #0072ff)'}}>
              <div className='d-flex justify-content-between align-items-center mb-3'>
                <h4 className='mb-0'>Salary</h4>
                <i className="bi bi-currency-rupee fs-2 opacity-50"></i>
              </div>
              <hr className='opacity-25' />
              <div className='d-flex justify-content-between'>
                <h5>Total:</h5>
                <h5>₹{salaryTotal}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='mt-4 px-3'>
        <div className='bg-white p-4 shadow-sm rounded'>
          <h3 className='mb-4'>Employee Distribution</h3>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#8884d8" name="Count" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className='mt-4 px-5 pt-3'>
        <h3>List Of Admins</h3>
        <div className="table-responsive">
          <table className='table table-hover mt-3 shadow-sm bg-white'>
            <thead className="table-light">
              <tr>
                <th className='px-4'>Email</th>
                <th className='px-4'>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                admins.map(a=>(
                  <tr key={a._id}>
                    <td className="px-4">{a.email}</td>
                    <td className="px-4">
                      <button className="btn btn-info btn-sm me-2 mb-1">
                        Edit
                      </button>
                      <button className="btn btn-warning btn-sm mb-1">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}

export default Home
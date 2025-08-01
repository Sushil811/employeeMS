import React from 'react'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './style.css'
import axios from 'axios'
import { Outlet, useNavigate } from 'react-router-dom'

function Dashboard() {
  const Navigate = useNavigate();
  axios.defaults.withCredentials = true; // Ensure cookies are sent with requests
  const handleLogout = ()=>{
    axios.get('http://localhost:3000/auth/logout')
    .then(result=>{
      if(result.data.status){
        Navigate('/adminlogin', { replace: true });
      }
    })
  }
  return (
    <div className='container-fluid'>
      <div className='row flex-nowrap'>
        <div className='col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark'>
            <div className='d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100'>
                <Link to="/dashboard" className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none"><span className="fs-5 fw-bolder d-none d-sm-inline">
                CWC Employee Management System
              </span></Link>
                <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
              id="menu">
                    <li className="w-100">
                        <Link to="/dashboard" className="nav-link text-white px-0 align-middle">
                        <i className="fs-4 bi-speedometer2 ms-2"></i>
                        <span className="ms-2 d-none d-sm-inline">
                            Dashboard
                        </span>
                        </Link>
                    </li>
                    <li className="w-100">
                        <Link to="/dashboard/employee" className="nav-link px-0 align-middle text-white">
                        <i className="fs-4 bi-people ms-2"></i>
                        <span className="ms-2 d-none d-sm-inline">
                        Manage Employee
                        </span></Link>
                    </li>
                    <li className="w-100">
                        <Link to="/dashboard/category" className="nav-link px-0 align-middle text-white">
                        <i className="fs-4 bi-columns ms-2"></i>
                        <span className="ms-2 d-none d-sm-inline">
                        Category
                        </span></Link>
                    </li>
                    <li className="w-100">
                        <Link to="/dashboard/profile" className="nav-link px-0 align-middle text-white">
                        <i className="fs-4 bi-person ms-2"></i>
                        <span className="ms-2 d-none d-sm-inline">
                        Profile
                        </span></Link>
                    </li>
                    <li className="w-100">
                        <Link className="nav-link px-0 align-middle text-white"
                        onClick={handleLogout}>
                        <i className="fs-4 bi-power ms-2"></i>
                        <span className="ms-2 d-none d-sm-inline">
                        Logout
                        </span></Link>
                    </li>
                </ul>
            </div>
        </div>
        <div className='col p-0 m-0'>
            <div className='p-2 d-flex justify-content-center shadow-sm bg-white'>
                <h4>Employee Management System</h4>
            </div>
            <Outlet/>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;

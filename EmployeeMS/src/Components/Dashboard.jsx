import React from 'react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './style.css'
import axios from 'axios'

function Dashboard() {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const handleLogout = () => {
    axios.get('http://localhost:3000/auth/logout')
      .then(result => {
        if (result.data.status) {
          navigate('/admin_login', { replace: true });
        }
      })
      .catch(err => console.error(err));
  }

  return (
    <div className='container-fluid'>
      <div className='row flex-nowrap'>
        {/* Sidebar */}
        <div className='col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark shadow'>
          <div className='d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100'>
            <Link to="/dashboard" className="d-flex align-middle align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none">
              <i className="fs-4 bi-building me-2 text-primary"></i>
              <span className="fs-5 fw-bolder d-none d-sm-inline">EMS Admin</span>
            </Link>
            <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start w-100" id="menu">
              <li className="nav-item w-100">
                <NavLink to="/dashboard" end className={({isActive}) => `nav-link text-white px-0 align-middle ${isActive ? 'active bg-primary' : ''}`}>
                  <i className="fs-4 bi-speedometer2 ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Dashboard</span>
                </NavLink>
              </li>
              <li className="nav-item w-100">
                <NavLink to="/dashboard/employee" className={({isActive}) => `nav-link text-white px-0 align-middle ${isActive ? 'active bg-primary' : ''}`}>
                  <i className="fs-4 bi-people ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Manage Employees</span>
                </NavLink>
              </li>
              <li className="nav-item w-100">
                <NavLink to="/dashboard/category" className={({isActive}) => `nav-link text-white px-0 align-middle ${isActive ? 'active bg-primary' : ''}`}>
                  <i className="fs-4 bi-columns-gap ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Categories</span>
                </NavLink>
              </li>
              <li className="nav-item w-100">
                <NavLink to="/dashboard/manage_leaves" className={({isActive}) => `nav-link text-white px-0 align-middle ${isActive ? 'active bg-primary' : ''}`}>
                  <i className="fs-4 bi-calendar-check ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Manage Leaves</span>
                </NavLink>
              </li>
              <li className="nav-item w-100">
                <NavLink to="/dashboard/profile" className={({isActive}) => `nav-link text-white px-0 align-middle ${isActive ? 'active bg-primary' : ''}`}>
                  <i className="fs-4 bi-person-circle ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Profile</span>
                </NavLink>
              </li>
              <li className="nav-item w-100">
                <button 
                  className="nav-link px-0 align-middle text-white bg-transparent border-0 w-100 text-start"
                  onClick={handleLogout}
                >
                  <i className="fs-4 bi-power ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Logout</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Main Content Area */}
        <div className='col p-0 m-0 overflow-hidden'>
          <div className='p-3 d-flex justify-content-between align-items-center shadow-sm bg-white sticky-top'>
            <h4 className="mb-0">Employee Management System</h4>
            <div className="d-flex align-items-center d-sm-none">
                <span className="badge bg-primary">Admin</span>
            </div>
          </div>
          <div className="p-4 dashboard-content">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;


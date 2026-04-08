import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import Login from './Components/Login.jsx'
import axios from 'axios'
axios.defaults.withCredentials = true;
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Dashboard from './Components/Dashboard.jsx'
import Home from './Components/Home.jsx'
import Employee from './Components/Employee.jsx'
import Category from './Components/Category.jsx'
import Profile from './Components/Profile.jsx'
import AddCategory from './Components/AddCategory.jsx'
import AddEmployee from './Components/AddEmployee.jsx'
import EditEmployee from './Components/EditEmployee.jsx'
import Start from './Components/Start.jsx'
import Register from './Components/Register.jsx'
import EmployeeLogin from './Components/EmployeeLogin.jsx'
import EmployeeRegister from './Components/EmployeeRegister.jsx'
import EmployeeDetail from './Components/EmployeeDetail.jsx'
import ApplyLeave from './Components/ApplyLeave.jsx'
import LeaveStatus from './Components/LeaveStatus.jsx'
import ManageLeaves from './Components/ManageLeaves.jsx'




function App() {

  return (
    <> 
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Start />} />
        <Route path='/employee_detail/:id' element={<EmployeeDetail />} />
        <Route path='/employee_detail/:id/apply_leave' element={<ApplyLeave />} />
        <Route path='/employee_detail/:id/leave_status' element={<LeaveStatus />} />
        <Route path='/employee_login' element={<EmployeeLogin/>} />
        <Route path='/employee_register' element={<EmployeeRegister />} />
        <Route path='/admin_login' element={<Login/>} />
        <Route path='/admin_register' element={<Register />} />
        <Route path='/dashboard' element={<Dashboard/>} >
        <Route path='' element={<Home/>} />
        <Route path='/dashboard/employee' element={<Employee/>} />
        <Route path='/dashboard/category' element={<Category/>} />
        <Route path='/dashboard/profile' element={<Profile/>} />
        <Route path='/dashboard/add_category' element={<AddCategory/>} />
        <Route path='/dashboard/add_employee' element={<AddEmployee />} />
        <Route path='/dashboard/edit_employee/:id' element={<EditEmployee />} />
        <Route path='/dashboard/manage_leaves' element={<ManageLeaves />} />
        

        </Route>
        
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

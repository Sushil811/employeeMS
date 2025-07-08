import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import Login from './Components/Login.jsx'
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
//import EmployeeLogin from './Components/EmployeeLogin.jsx'




function App() {

  return (
    <> 
      <BrowserRouter>
      <Routes>
        <Route path='/start' element={<Start/>} />
        <Route path='/adminlogin' element={<Login/>} />
        <Route path='/dashboard' element={<Dashboard/>} >
        <Route path='' element={<Home/>} />
        <Route path='/dashboard/employee' element={<Employee/>} />
        <Route path='/dashboard/category' element={<Category/>} />
        <Route path='/dashboard/profile' element={<Profile/>} />
        <Route path='/dashboard/add_category' element={<AddCategory/>} />
        <Route path='/dashboard/add_employee' element={<AddEmployee />} />
        <Route path='/dashboard/edit_employee/:id' element={<EditEmployee />} />
        

        </Route>
        
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

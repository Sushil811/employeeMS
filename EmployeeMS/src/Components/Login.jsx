import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './style.css'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

function Login() {
    const [values, setValues] = useState({
        email: "",
        password: "",
        //tick: false
    })

//const [error, setError] = useState(null);

const navigate = useNavigate()
axios.defaults.withCredentials = true;

    const handleSubmit = (event) =>{
        event.preventDefault()
        axios.post("http://localhost:3000/auth/admin_login", values)
        .then(result=> {
            console.log('Login response:', result.data);
            if(result.data.status){
                navigate('/dashboard')
            } else {
                alert(result.data.Error || 'Login failed')
            }
        })
       .catch(err=> {
           console.log(err)
           alert('Login failed. Please try again.')
       })
    }
  return (
    <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
        <div className='p-3 rounded-0 col-11 col-sm-8 col-md-6 col-lg-3 border loginForm'>
            <div className='text-warning'>
            </div>
            <h2>Login Page</h2>
            <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor="email"><strong>Email:</strong></label>
                    <input type="email" id="email" name="email" required autoComplete='off' placeholder='Enter Email'
                    onChange={(e)=> setValues({...values, email:e.target.value})} className='form-control rounded-0' />
                </div>
                <div className='mb-3'>
                    <label htmlFor="password"><strong>Password:</strong></label>
                    <input type="password" id="password" name="password" placeholder='Enter Password' 
                    onChange={(e)=>setValues({...values, password:e.target.value})} className='form-control rounded-0' />
                </div>
                <button className='btn btn-success w-100 rounded-0 mb-2'>Login</button>
                <div className='text-center mt-2 text-white'>
                    <p className="mb-0">Don't have an account?</p>
                    <Link to="/admin_register" className="text-white text-decoration-none">Register here</Link>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login;
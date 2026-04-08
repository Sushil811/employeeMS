import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './style.css'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

function Register() {
    const [values, setValues] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    })
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault()
        if (values.password !== values.confirmPassword) {
            setError("Passwords do not match")
            return
        }

        axios.post("http://localhost:3000/auth/admin_register", {
            email: values.email,
            password: values.password
        })
        .then(result => {
            if (result.data.status) {
                alert("Registration successful! Please login.")
                navigate('/admin_login')
            } else {
                setError(result.data.Error || "Registration failed")
            }
        })
        .catch(err => {
            console.error(err)
            setError("An error occurred during registration.")
        })
    }

    return (
        <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
            <div className='p-3 rounded-0 col-11 col-sm-8 col-md-6 col-lg-3 border loginForm'>
                <div className='text-warning text-center'>
                    {error && <p>{error}</p>}
                </div>
                <h2 className='text-center'>Register Admin</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="email"><strong>Email:</strong></label>
                        <input type="email" id="email" name="email" required autoComplete='off' placeholder='Enter Email'
                            onChange={(e) => setValues({ ...values, email: e.target.value })} className='form-control rounded-0' />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="password"><strong>Password:</strong></label>
                        <input type="password" id="password" name="password" required placeholder='Enter Password'
                            onChange={(e) => setValues({ ...values, password: e.target.value })} className='form-control rounded-0' />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="confirmPassword"><strong>Confirm Password:</strong></label>
                        <input type="password" id="confirmPassword" name="confirmPassword" required placeholder='Confirm Password'
                            onChange={(e) => setValues({ ...values, confirmPassword: e.target.value })} className='form-control rounded-0' />
                    </div>
                    <button className='btn btn-success w-100 rounded-0 mb-2'>Register</button>
                    <div className='text-center mt-2'>
                        <p className="mb-0">Already have an account?</p>
                        <Link to="/admin_login" className="text-white text-decoration-none">Login here</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register

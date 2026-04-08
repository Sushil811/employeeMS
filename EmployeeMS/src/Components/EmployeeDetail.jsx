import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './style.css'

const EmployeeDetail = () => {
    const [employee, setEmployee] = useState([])
    const [attendance, setAttendance] = useState(null)
    const {id} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        fetchAttendanceStatus();
    }, [id])

    const fetchAttendanceStatus = () => {
        axios.get('http://localhost:3000/employee/attendance_status/' + id)
            .then(result => {
                if (result.data.status) {
                    setAttendance(result.data.Result)
                }
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        axios.get('http://localhost:3000/employee/detail/'+id)
        .then(result => {
            if(result.data.status) {
                setEmployee(result.data.Result[0])
            } else {
                alert(result.data.Error)
            }
        })
        .catch(err => console.log(err))
    }, [id])

    const handleLogout = () => {
        axios.get('http://localhost:3000/employee/logout')
        .then(result => {
          if(result.data.status) {
            navigate('/')
          }
        }).catch(err => console.log(err))
    }
    const handleCheckIn = () => {
        axios.post('http://localhost:3000/employee/check_in', { employee_id: id })
            .then(result => {
                if (result.data.status) {
                    alert(result.data.message)
                    fetchAttendanceStatus();
                } else {
                    alert(result.data.Error)
                }
            })
            .catch(err => console.log(err))
    }

    const handleCheckOut = () => {
        axios.post('http://localhost:3000/employee/check_out', { employee_id: id })
            .then(result => {
                if (result.data.status) {
                    alert(result.data.message)
                    fetchAttendanceStatus();
                } else {
                    alert(result.data.Error)
                }
            })
            .catch(err => console.log(err))
    }

  return (
    <div className="loginPage">
        <div className="d-flex justify-content-center flex-column align-items-center vh-100">
            <div className="loginForm p-5 text-center" style={{minWidth: '400px'}}>
                <img src={`http://localhost:3000/Images/${employee.image}`} className='emp_det_image mb-4 shadow' alt="Employee" 
                     style={{width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover', border: '5px solid rgba(255,255,255,0.2)'}}
                     onError={(e) => e.target.src = "/employeems.jpeg"}
                />
                <div className='d-flex flex-column align-items-center mt-3 text-white'>
                    <h2 className="mb-0">{employee.name}</h2>
                    <p className="opacity-75">{employee.email}</p>
                    <div className="w-100 mt-4 p-3 rounded" style={{background: 'rgba(255,255,255,0.05)'}}>
                        <div className="d-flex justify-content-between mb-2">
                            <span>Salary:</span>
                            <span className="fw-bold">₹{employee.salary}</span>
                        </div>
                        <div className="d-flex justify-content-between">
                            <span>Location:</span>
                            <span className="fw-bold">{employee.address}</span>
                        </div>
                    </div>
                </div>
                <div className="mt-4 p-3 rounded" style={{background: 'rgba(255,255,255,0.05)'}}>
                    <h5 className="text-white mb-3">Today's Attendance</h5>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <span>Status:</span>
                        <span className={`badge ${attendance ? 'bg-success' : 'bg-secondary'}`}>
                            {attendance ? 'Checked In' : 'Not Checked In'}
                        </span>
                    </div>
                    {attendance && (
                        <div className="d-flex justify-content-between align-items-center mb-2 text-white">
                            <span>Check In:</span>
                            <span className="fw-bold">{attendance.checkIn}</span>
                        </div>
                    )}
                    {attendance && attendance.checkOut && (
                        <>
                            <div className="d-flex justify-content-between align-items-center mb-2 text-white">
                                <span>Check Out:</span>
                                <span className="fw-bold">{attendance.checkOut}</span>
                            </div>
                            <div className="d-flex justify-content-between align-items-center mb-2 text-white border-top pt-2 mt-2">
                                <span>Hours Worked:</span>
                                <span className={`fw-bold ${attendance.hoursWorked >= 8 ? 'text-success' : 'text-warning'}`}>
                                    {attendance.hoursWorked} hrs
                                </span>
                            </div>
                            <div className="d-flex justify-content-between align-items-center mb-2 text-white">
                                <span>Goal (8 hrs):</span>
                                <span className={`badge ${attendance.hoursWorked >= 8 ? 'bg-success' : 'bg-danger'}`}>
                                    {attendance.hoursWorked >= 8 ? 'Completed' : 'Short'}
                                </span>
                            </div>
                        </>
                    )}
                    <div className="mt-2 text-white d-flex gap-2">
                        {!attendance ? (
                            <button className="btn btn-warning w-100 fw-bold" onClick={handleCheckIn}>
                                <i className="bi bi-clock me-2"></i>Clock In
                            </button>
                        ) : !attendance.checkOut ? (
                            <button className="btn btn-danger w-100 fw-bold" onClick={handleCheckOut}>
                                <i className="bi bi-clock-fill me-2"></i>Clock Out
                            </button>
                        ) : (
                            <button className="btn btn-secondary w-100 disabled">Full Day Completed</button>
                        )}
                    </div>
                </div>

                <div className="mt-4 d-flex flex-column gap-2">
                    <button className='btn btn-success w-100' onClick={() => navigate(`/employee_detail/${id}/apply_leave`)}>Apply for Leave</button>
                    <button className='btn btn-info w-100' onClick={() => navigate(`/employee_detail/${id}/leave_status`)}>View Leave Status</button>
                </div>
                <div className="mt-4 d-flex gap-3 justify-content-center">
                    <button className='btn btn-primary px-4' onClick={() => window.print()}>Print</button>
                    <button className='btn btn-danger px-4' onClick={handleLogout}>Logout</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default EmployeeDetail

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, Link } from 'react-router-dom'

const LeaveStatus = () => {
    const { id } = useParams()
    const [leaves, setLeaves] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3000/employee/leave_status/' + id)
        .then(result => {
            if(result.data.status) {
                setLeaves(result.data.Result)
            } else {
                alert(result.data.Error)
            }
        })
        .catch(err => console.log(err))
    }, [id])

    return (
        <div className='loginPage'>
             <div className="container py-5">
                <div className="loginForm">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h3>My Leave Status</h3>
                        <Link to={`/employee_detail/${id}/apply_leave`} className='btn btn-success'>Apply New Leave</Link>
                    </div>
                    <div className="table-responsive">
                        <table className='table text-white'>
                            <thead>
                                <tr>
                                    <th>Type</th>
                                    <th>From</th>
                                    <th>To</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {leaves.map(l => (
                                    <tr key={l._id}>
                                        <td>{l.leave_type}</td>
                                        <td>{new Date(l.from_date).toLocaleDateString()}</td>
                                        <td>{new Date(l.to_date).toLocaleDateString()}</td>
                                        <td>
                                            <span className={`badge bg-${l.status === 'Approved' ? 'success' : l.status === 'Rejected' ? 'danger' : 'warning text-dark'}`}>
                                                {l.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <Link to={`/employee_detail/${id}`} className='btn btn-warning mt-3'>Back to Profile</Link>
                </div>
            </div>
        </div>
    )
}

export default LeaveStatus

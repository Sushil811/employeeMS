import React, { useEffect, useState } from 'react'
import axios from 'axios'

const ManageLeaves = () => {
    const [leaves, setLeaves] = useState([])

    useEffect(() => {
        fetchLeaves()
    }, [])

    const fetchLeaves = () => {
        axios.get('http://localhost:3000/auth/leaves')
        .then(result => {
            if(result.data.status) {
                setLeaves(result.data.Result)
            } else {
                alert(result.data.Error)
            }
        })
        .catch(err => console.log(err))
    }

    const handleAction = (id, status) => {
        axios.post('http://localhost:3000/auth/update_leave_status', { id, status })
        .then(result => {
            if(result.data.status) {
                fetchLeaves()
            } else {
                alert(result.data.Error)
            }
        })
        .catch(err => console.log(err))
    }

    return (
        <div className='px-5 mt-3'>
            <div className='d-flex justify-content-center'>
                <h3>Manage Employee Leaves</h3>
            </div>
            <div className='mt-3 table-responsive'>
                <table className='table table-bordered table-striped table-hover shadow-sm bg-white'>
                    <thead className="table-dark">
                        <tr>
                            <th>Employee</th>
                            <th>Email</th>
                            <th>Type</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Reason</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leaves.map(l => (
                            <tr key={l._id}>
                                <td>{l.employee_id.name}</td>
                                <td>{l.employee_id.email}</td>
                                <td>{l.leave_type}</td>
                                <td>{new Date(l.from_date).toLocaleDateString()}</td>
                                <td>{new Date(l.to_date).toLocaleDateString()}</td>
                                <td>{l.reason}</td>
                                <td>
                                    <span className={`badge bg-${l.status === 'Approved' ? 'success' : l.status === 'Rejected' ? 'danger' : 'warning text-dark'}`}>
                                        {l.status}
                                    </span>
                                </td>
                                <td>
                                    {l.status === 'Pending' && (
                                        <div className="d-flex gap-2">
                                            <button className='btn btn-success btn-sm' onClick={() => handleAction(l._id, 'Approved')}>Approve</button>
                                            <button className='btn btn-danger btn-sm' onClick={() => handleAction(l._id, 'Rejected')}>Reject</button>
                                        </div>
                                    )}
                                    {l.status !== 'Pending' && (
                                        <button className='btn btn-info btn-sm' onClick={() => handleAction(l._id, 'Pending')}>Reset</button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ManageLeaves

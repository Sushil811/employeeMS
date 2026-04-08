import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams, Link } from 'react-router-dom'

const ApplyLeave = () => {
    const { id } = useParams()
    const [leave, setLeave] = useState({
        employee_id: id,
        leave_type: 'Sick Leave',
        from_date: '',
        to_date: '',
        reason: ''
    })
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3000/employee/apply_leave', leave)
        .then(result => {
            if(result.data.status) {
                alert("Leave applied successfully")
                navigate(`/employee_detail/${id}/leave_status`)
            } else {
                setError(result.data.Error)
            }
        })
        .catch(err => console.log(err))
    }

    return (
        <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
            <div className='p-3 rounded-0 col-11 col-sm-8 col-md-6 col-lg-3 border loginForm'>
                <h2 className='text-center'>Apply for Leave</h2>
                {error && <div className='alert alert-danger'>{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="type"><strong>Leave Type:</strong></label>
                        <select className='form-select rounded-0' 
                            onChange={(e) => setLeave({...leave, leave_type: e.target.value})}>
                            <option value="Sick Leave">Sick Leave</option>
                            <option value="Casual Leave">Casual Leave</option>
                            <option value="Vacation">Vacation</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="from"><strong>From Date:</strong></label>
                        <input type="date" className='form-control rounded-0' required
                            onChange={(e) => setLeave({...leave, from_date: e.target.value})} />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="to"><strong>To Date:</strong></label>
                        <input type="date" className='form-control rounded-0' required
                            onChange={(e) => setLeave({...leave, to_date: e.target.value})} />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="reason"><strong>Reason:</strong></label>
                        <textarea className='form-control rounded-0' placeholder='Enter reason...' required
                            onChange={(e) => setLeave({...leave, reason: e.target.value})}></textarea>
                    </div>
                    <button className='btn btn-success w-100 rounded-0 mb-3'>Apply</button>
                    <Link to={`/employee_detail/${id}`} className='btn btn-warning w-100 rounded-0'>Back to Profile</Link>
                </form>
            </div>
        </div>
    )
}

export default ApplyLeave

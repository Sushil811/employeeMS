import React from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css'

function Profile() {
  return (
    <div className='d-flex justify-content-center mt-5'>
      <div className='card shadow-sm p-4 col-11 col-md-6 col-lg-4 glass-card border-0'>
        <div className='text-center mb-4'>
           <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center shadow" style={{width: '80px', height: '80px'}}>
              <i className="bi bi-person-badge fs-1"></i>
           </div>
        </div>
        <h3 className='text-center mb-0'>Admin Profile</h3>
        <p className='text-muted text-center'>Administrator Account</p>
        <hr />
        <div className='mt-3'>
          <div className='d-flex justify-content-between mb-3 text-dark'>
            <span className='fw-bold'>Role:</span>
            <span className="badge bg-success">Super Admin</span>
          </div>
          <div className='d-flex justify-content-between text-dark'>
            <span className='fw-bold'>Email:</span>
            <span>admin@gmail.com</span>
          </div>
        </div>
        <div className='mt-4'>
          <button className='btn btn-outline-primary w-100'>Edit Profile</button>
        </div>
      </div>
    </div>
  )
}

export default Profile
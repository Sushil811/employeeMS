import React from "react";
import { useNavigate } from "react-router-dom";

const Start = () => {
    const navigate = useNavigate();
    return(
        <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
            <div className="p-3 rounded-0 col-11 col-sm-8 col-md-6 col-lg-3 border loginForm">
                <h2 className="text-center">Login As</h2>
                <div className="d-flex justify-content-between mt-5 mb-2">
                    <button className="btn btn-primary w-100 me-2" onClick={()=>{navigate('/employee_login')}}>Employee</button>
                    <button className="btn btn-success w-100 ms-2" onClick={()=>{navigate('/admin_login')}}>Admin</button>
                </div>
            </div>
        </div>
    )
}
export default Start;
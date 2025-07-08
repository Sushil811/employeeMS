import React from "react";
import { useNavigate } from "react-router-dom";

const Start = () => {
    const navigate = useNavigate();
    return(
        <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
            <div className="p-3 rounded w-25 border loginForm">
                <h2 className="text-center">Login As</h2>
                <div className="d-flex justify-content-between mt-5 mb-2">
                    <button className="btn btn-primary w-100 me-2" onClick={()=>{navigate('/employee_login')}}>Employee</button>
                    <button className="btn btn-success w-100 ms-2" onClick={()=>{navigate('/adminlogin')}}>Admin</button>
                </div>
            </div>
        </div>
    )
}
export default Start;
import React from 'react'
import { useNavigate } from 'react-router-dom'



 function Start(){
    const navigate = useNavigate()
    return(
        <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
        <div className='p-3 rounded w-25 border loginForm text-center'>
            <h2>Login As</h2>
            <div className='d-flex justfy-content-between mt-5'>
                <button className="btn btn-primary btn-lg" onClick={e => navigate('/employeeLogin')}>Student</button>
                <span style={{ margin: '0 75px' }}></span>
                <button className="btn btn-success btn-lg" onClick={e => navigate('/login')}>Teacher</button>
            </div>
        </div>
    </div>
    )
 }

 export default Start
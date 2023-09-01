import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import Employee from './Employee';

function EmployeeDetail(){
    const {id} = useParams();
    const navigate = useNavigate()
    const [employee, setEmployee] = useState({})
    useEffect(() => {
        axios.get(`http://localhost:8081/get/${id}`)
            .then(res => {
                console.log(res); // Log the response for debugging
                setEmployee(res.data.Result[0]); // Set the employee state
            })
            .catch(err => console.log(err));
    }, []);
    const handleLogout = () => {
        axios.get('http://localhost:8081/logout')
        .then(res => {
            navigate('/start')
        }).catch(err => console.log(err));
    }
    return(
     <div>
        <div className="d-flex justify-content-center flex-column align-items-center mt-3">
            {/* <img src={'http://localhost:8081/image/'+employee.image} alt='' className='empImg'/> */}
            <img src={`http://localhost:8081/image/${employee.image}`} alt='' className='empImg' />
            <div className="d-flex align-items-center flex-column">
                <h3>Name: {employee.name}</h3>
                <h3>Enrollment: {employee.enrollment}</h3>
                <h3>Email: {employee.email}</h3>
                <h3>Attendance: {employee.attendance}</h3>
            </div>
            <div>
                <button className='btn btn-primary me-2'>Edit</button>
                <button className="btn btn-danger" onClick={handleLogout}>Logout </button>
            </div>
        </div>
    </div>
    )
}

export default EmployeeDetail
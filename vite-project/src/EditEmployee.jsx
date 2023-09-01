import React, {useEffect, useState} from 'react'
import axios from 'axios';
import {useNavigate, useParams} from 'react-router-dom';

function EditEmployee(){
    const [data,setData] = useState({
        name:'',
        attendance:'',
        enrollment:'',
        email:'',
    })

    const navigate = useNavigate()
   
    const {id} = useParams();

    useEffect(() =>{
       axios.get('http://localhost:8081/get/' +id)
        .then(res =>{
            setData({...data, name: res.data.Result[0].name,
                 branch: res.data.Result[0].attendance,
                 enrollment: res.data.Result[0].enrollment,
                 email: res.data.Result[0].email
            })
    })
        .catch(err => console.log(err));
    }, [])

    const handleSubmit = async (event)=>{
        // async
        event.preventDefault();  
         axios.put('http://localhost:8081/update/' + id,data)
        .then(res => {
            if(res.data.Status  === "Success"){
               navigate('/employee')
            }
        })
        .catch(err => console.log(err)); 
    }
    return(
        <div className="d-flex flex-column align-items-center pt-4">
            <h2>Update Student</h2>
            <form className='row g-3 w-50'onSubmit={handleSubmit}>
            <div className='col-12'>
                <label htmlFor="inputName" className='form-label'>Full Name</label>
                <input type='text' className='form-control' id="inputName" placeholder='Enter Full Name' autoComplete='off'
                onChange={e => setData({...data,name: e.target.value})} value={data.name}/>
            </div>
            <div className='col-12'>
                <label htmlFor="inputatten4" className='form-label'>Attendance</label>
                <input type='text' className='form-control' id="inputatten4" placeholder='Attendance status' autoComplete='off'
                onChange={e => setData({...data,attendance: e.target.value})} value={data.attendance}/>
            </div>
            <div className="col-12">
                <label htmlFor="inputEnroll" className='form-label'>Enrollment</label>
                <input type='text' className='form-control' id='inputEnroll' placeholder='Enter Enrollment' autoComplete='off'
                onChange={e => setData({...data,enrollment: e.target.value})} value={data.enrollment}/>
            </div>
            <div className="col-12">
                <label htmlFor='inputEmail4' className='form-label'>Email</label>
                <input type='email' className='form-control' id='inputEmail4' placeholder='Enter Email' autoComplete='off'
                onChange={e => setData({...data,email: e.target.value})} value={data.email}/>
            </div>
            
            <div className="col-12">
                <button type='submit' className='btn btn-primary'>Update</button>
            </div>
        </form>
     </div>
    )
}

export default EditEmployee
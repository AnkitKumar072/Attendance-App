import React, {useState} from 'react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

function AddEmployee(){
    const [data,setData] = useState({
        name:'',
        attendance:'',
        enrollment:'',
        email:'',
        password:'',
        image:''
    })

    const navigate = useNavigate()

    const handleSubmit = async (event)=>{
        // async
        // event.preventDefault();  
        // const formdata = new FormData();
        //  formdata.append("name",data.name);
        //  formdata.append("attendance",data.attendance);
        //  formdata.append("enrollment",data.enrollment);
        //  formdata.append("email",data.email);
        //  formdata.append("password",data.password);
        //  formdata.append("image",data.image);
        //  await axios.post('http://localhost:8081/create',formdata)
        // .then(res => {
        //     console.log(res);
        //   navigate('/employee')
        // })
        // .catch(err => console.log(err)); 


        event.preventDefault();
        const formdata = new FormData();
        formdata.append("name", data.name);
        formdata.append("attendance", data.attendance);
        formdata.append("enrollment", data.enrollment);
        formdata.append("email", data.email);
        formdata.append("password", data.password);
        formdata.append("image", data.image);
        
        try {
            const response = await axios.post('http://localhost:8081/create', formdata);
            console.log(response);
            navigate('/employee');
        } catch (error) {
            console.error(error);
        }
    }
    return(
        <div className="d-flex flex-column align-items-center pt-4">
            <h2>Add Student</h2>
            <form className='row g-3 w-50'onSubmit={handleSubmit}>
            <div className='col-12'>
                <label htmlFor="inputName" className='form-label'>Full Name</label>
                <input type='text' className='form-control' id="inputName" placeholder='Enter Full Name' autoComplete='off'
                onChange={e => setData({...data,name: e.target.value})}/>
            </div>
            <div className='col-12'>
                <label htmlFor="inputatten4" className='form-label'>Attendance</label>
                <input type='text' className='form-control' id="inputatten4" placeholder='Attendance status' autoComplete='off'
                onChange={e => setData({...data,attendance: e.target.value})}/>
            </div>
            <div className="col-12">
                <label htmlFor="inputEnroll" className='form-label'>Enrollment</label>
                <input type='text' className='form-control' id='inputEnroll' placeholder='Enter Enrollment' autoComplete='off'
                onChange={e => setData({...data,enrollment: e.target.value})}/>
            </div>
            <div className="col-12">
                <label htmlFor='inputEmail4' className='form-label'>Email</label>
                <input type='email' className='form-control' id='inputEmail4' placeholder='Enter Email' autoComplete='off'
                onChange={e => setData({...data,email: e.target.value})}/>
            </div>
            <div className="col-12">
                <label htmlFor='inputPassword4' className='form-label'>Password</label>
                <input type='password' className='form-control' id='inputPassword4' placeholder='Enter Password' autoComplete='off'
                onChange={e => setData({...data,password: e.target.value})}/>
            </div>
            <div className="col-12 mb-3">
                <label className='form-label' htmlFor='inputGroupFile01'>Select Image</label>
                <input type='file' className='form-control' id='inputGroupFile01'
                onChange={e => setData({...data,image: e.target.files[0]})}/>
            </div>
            <div className="col-12">
                <button type='submit' className='btn btn-primary'>Create</button>
            </div>
            </form>
        </div>
    )
}

export default AddEmployee
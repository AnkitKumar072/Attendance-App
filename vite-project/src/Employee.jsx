import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Employee() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8081/getEmployee');
                if (response.data.Status === "Success") {
                    setData(response.data.Result);
                } else {
                    alert("Error");
                }
            } catch (error) {
                console.error(error);
            }
        };
    
        fetchData();
    }, [data]);
    

  const handleDelete = (id) => {
    axios.delete('http://localhost:8081/delete/'+id)
    .then(res => {
        if(res.data.Status === "Success"){
            window.location.reload(true);
        }else{
            alert("Error")
        }
    })
    .catch(err => console.log(err));
  }

    return(
        <div className="px-5 py-3">
         <div className='d-flex justify-content-center mt-2'>
            <h3>Student List</h3>       
        </div>
       <Link to="/create" className='btn btn-success'>Add Student</Link> 
       <div className="mt-3">
        <table className='table'>
        <thead>
            <tr>
                <th>Name</th>
                <th>Image</th>
                <th>Attendance</th>
                <th>Enrollment</th>
                <th>Email</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
           {data.map((employee, index) => {
            return  <tr key={index}>
                    <td>{employee.name}</td>
                    <td>{
                        //  <img src={`http://localhost:8081/image/${employee.image}`} alt="" className='employee_image' />
                        <img src="http://localhost:8081/image/employee.jpeg" alt="" className="employee_image" />

                         }
                    </td>
                    <td>{employee.attendance}</td> 
                    <td>{employee.enrollment}</td>
                    <td>{employee.email}</td>
                    <td>
                        <Link to={"/employeeEdit/" + employee.id} className='btn btn-primary btn-sm me-2'>Edit</Link>
                        <button onClick={e => handleDelete(employee.id)} className='btn btn-sm btn-danger'>Delete</button>
                    </td>
                </tr>
            })}
        </tbody>
       </table>
       </div>
    </div>
    )
}  

export default Employee
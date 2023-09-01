import React, {useEffect, useState} from "react";
import axios from 'axios'

function Home() {
  const [adminCount, setAdminCount] = useState();
  const [employeeCount, setEmployeeCount] = useState();
  const [presentCount, setPresentCount] = useState();
  
  useEffect(() => {
      axios.get('http://localhost:8081/adminCount')
          .then(res => {
              setAdminCount(res.data[0].admin);
          })
          .catch(err => console.log(err));
  
      axios.get('http://localhost:8081/employeeCount')
          .then(res => {
              setEmployeeCount(res.data[0].employee);
          })
          .catch(err => console.log(err));
  
      axios.get('http://localhost:8081/presentCount')
          .then(res => {
              setPresentCount(res.data[0].presentCount);
          })
          .catch(err => console.log(err));
  }, []);
  
  return (
    <div>
      <div className="p-3 d-flex justify-content-around mt-3">
        <div className="px-3 pt-2 pb-3 border shadow-sm w-25">
          <div className="text-center pb-1">
            <h4>Total student</h4>
          </div>
          <hr />
          <div className="">
            <h5>Total: {adminCount}</h5>
          </div>
        </div>
        <div className="px-3 pt-2 pb-3 border shadow-sm w-25">
          <div className="text-center pb-1">
            <h4>Present</h4>
          </div>
          <hr />
          <div className="">
            <h5>Total: { employeeCount}</h5>
          </div>
        </div>
        <div className="px-3 pt-2 pb-3 border shadow-sm w-25">
          <div className="text-center pb-1">
            <h4>Absent</h4>
          </div>
          <hr />
          <div className="">
            <h5>Total: {presentCount}</h5>
          </div>
        </div>
        </div>
        {/* list of admin */}
        <div className="mt-4 px-5 pt-3">
          <h3>List of Teachers</h3>
          <table className="table">
            <thead>
              <tr>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Admin</td>
                <td>Admin</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
  );
}

export default Home;

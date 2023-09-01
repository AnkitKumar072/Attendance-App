import React from 'react' 
import Login from './Login.jsx'
import {BrowserRouter,Routes,Route} from  'react-router-dom'
import Dashboard from './Dashboard.jsx'
import Employee from './Employee.jsx'
import Profile from './Profile.jsx'
import Home from './Home.jsx'
import AddEmployee from './AddEmployee.jsx'
import EditEmployee from './EditEmployee.jsx'
import Start from './Start.jsx'
import EmployeeDetail from './EmployeeDetail.jsx'
import EmployeeLogin from './EmployeeLogin.jsx'


function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path = '/' element={<Dashboard/>}>
          <Route path='/' element = {<Home />}></Route>
          <Route path='/employee' element={<Employee />}></Route>
          <Route path='/profile' element={<Profile />}></Route>
          <Route path='/create' element={<AddEmployee />}></Route>
          <Route path='/employeeEdit/:id' element={<EditEmployee />}></Route>
        </Route>
        <Route path = '/login' element={<Login />}></Route>
        <Route path = '/start' element={<Start />}></Route>
        <Route path = '/employeeLogin' element={<EmployeeLogin />}></Route>
        <Route path = '/employeedetail/:id' element={<EmployeeDetail />}></Route>
      </Routes>
      
      </BrowserRouter>
    </div>
  )
}

export default App

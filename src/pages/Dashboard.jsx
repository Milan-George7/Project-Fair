import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import MyProject from '../components/MyProject'
import Profile from '../components/Profile'

function Dashboard() {
  const [userName,setUserName] = useState("")
  useEffect(()=>{
   
      if(sessionStorage.getItem("username")){
        setUserName(sessionStorage.getItem("username"))
      }else{
        setUserName("")
      }
    
  },[])
  return (
    <>
    <Header insideDashboard/>
    
    <div className="dashboard container">
      <h1 className="fw-bolder">Welcome <span className='text-danger'>{userName?.split(" ")[0]}</span></h1>
        <div className="row mt-5">
          <div className="col-lg-8">
            <MyProject/>
          </div>
          <div className="col-lg-4">
            <Profile/>
          </div>
        </div>
      
    </div>
    </>
  )
}

export default Dashboard
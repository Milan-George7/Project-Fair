import React, { useEffect, useState } from 'react'
import landingImg from '../assets/images/landing-img.png'
import { Link, useNavigate } from 'react-router-dom'
import ProjectCard from '../components/ProjectCard'
import { ToastContainer, toast } from 'react-toastify';
import { getHomeProjectAPI } from '../services/allAPIs';

function Home() {
  const navigate = useNavigate()
  const [isLoggedIn,setIsLoggedIn] = useState(false)
  const [allProjects,setAllProjects] = useState([])
 console.log(allProjects);
  const getHomeProject = async ()=>{
    const result = await getHomeProjectAPI()
    if(result.status===200){
      setAllProjects(result.data)
    }else{
      console.log(result);
    }
  }

  useEffect(()=>{
    getHomeProject()
    if(sessionStorage.getItem("token")){
      setIsLoggedIn(true)
    }else{
      setIsLoggedIn(false)
    }
  },[])
  const handleProjectPage = ()=>{
   if(sessionStorage.getItem("token")){

    navigate('/projects')
   }else{
    toast.warning("Please login to explore our projects!!!")
   }
    
  }
  return (
    <>
    {/* landing page */}
    <div style={{width:'100%',height:'90vh',backgroundColor:'#90ee90'}} className='rounded '>
      <div style={{height:'100%'}} className="container" >
      <div style={{height:'100%'}} className='row  align-items-center'>
          <div className="col-lg-5">
            <h1 style={{fontSize:'80px'}} className='fw-bolder text-light'><i style={{height:'82px'}} className='fa-solid fa-paperclip'></i>Project Fair</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore animi dignissimos temporibus, itaque dolorem saepe, repudiandae aliquam placeat provident, voluptatibus eligendi! Magnam quis quod, molestiae itaque quaerat modi inventore eaque!</p>
            {isLoggedIn?<Link className='btn btn-warning' to={'/dashboard'}>Manage your Projects</Link>:<Link className='btn btn-warning' to={'/login'}>Get Started</Link>}
          </div>
          <div className="col-lg-2"/>
          <div className="col-lg-4">
            <img className='w-100'  src={landingImg} alt="No-image" />
          </div>
          <div className="col-lg-1"/>
      </div>
      </div>
    </div>

    {/* all projects */}
    <div className="projects mt-5">
      <h1 className=" text-center mb-5">Explore Our Projects</h1>
      <marquee >
        <div className="d-flex justify-content-between">
          {allProjects.length>0? allProjects.map((project,index)=>(
            <div key={index} className="me-5">
            <ProjectCard project={project}/>
          </div>
          )):null}
        </div>
      </marquee>
      <div className="text-center">
        <button onClick={handleProjectPage} className="btn btn-link">View More Projects</button>
      </div>

      
    </div>
    <ToastContainer autoClose={2000} theme='colored' position='top-center'/>

    </>
  )
}

export default Home
import React, { useEffect, useState } from 'react'
import AddProject from './AddProject'
import EditProject from './EditProject'
import {ToastContainer,toast} from 'react-toastify'
import { deleteProjectAPI, getUserProjectAPI } from '../services/allAPIs'
import { useContext } from 'react'
import { addProjectResponseContext, editProjectResponseContext } from '../Context API/ContextShare';


function MyProject() {
  const {addProjectResponse,setAddProjectResponse} = useContext(addProjectResponseContext)
  const {editProjectResponse,setEditProjectResponse} = useContext(editProjectResponseContext)
  const [allProjects,setAllProjects] = useState([])

  const getUserProjects = async ()=>{
    const token = sessionStorage.getItem("token")
    if(token){

      const reqHeader = {
        "Content-Type":"multipart/form-data",
        "Authorization":`Bearer ${token}`
    }
    const result = await getUserProjectAPI(reqHeader)
    if(result.status===200){
      setAllProjects(result.data)
    }else{
      console.log(result);
    }
  }
}
console.log(allProjects);
useEffect(()=>{
  getUserProjects()
},[addProjectResponse,editProjectResponse])

  const handleDeleteProject = async (pid)=>{
    const token = sessionStorage.getItem("token")
    if(token){
      const reqHeader = {
        "Content-Type":"application/json",
        "Authorization":`Bearer ${token}`
      }
      try{
        const result = await deleteProjectAPI(pid,reqHeader)
        if(result.status==200){
          getUserProjects()
        }else{
          toast.warning(result.response.data)
        }
      }catch(err){
        console.log(err);
      }
    }
  }

  return (
    <div className='card shadow p-3'>
      <div className="d-flex justify-content-between">
        <h2>My Projects</h2>
        <div> <AddProject/> </div>
        </div>
        <div className="mt-4">
          {
            
            allProjects.length>0?
            allProjects.map((project,index)=>(
              <div key={index} className="border rounded  d-flex justify-content-between  align-items-center text-danger mb-3 p-2">
              <h5>{project?.title}</h5>
              <div className="d-flex icons align-items-center">
                <EditProject project={project}/>
                <a href={project?.github} target='_blank' className='btn'><i style={{height:'34px'}} className="fa-brands fa-github fa-2x"></i></a>
                <button onClick={()=>handleDeleteProject(project?._id)} className="btn"><i style={{height:'34px'}} className="fa-solid fa-trash fa-2x"></i></button>
              </div>
            </div>
            ))
            :
            <div className='text-danger fs-4 fw-bolder'>
              No Projects Uploaded yet!!!
            </div>
           
          
          }
        </div>

        <ToastContainer autoClose={2000} theme='colored' />
      </div>
   
  )
}

export default MyProject
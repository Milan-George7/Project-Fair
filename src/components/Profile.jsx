import React, { useEffect, useState } from 'react'
import { Collapse } from 'react-bootstrap'
import uploadimg from '../assets/images/upload-img1.png'
import { SERVER_URL } from '../services/serverUrl';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateUserProfileApi } from '../services/allAPIs';

function Profile() {
  const [open, setOpen] = useState(false);
  const [userData,setUserData] = useState({
    username:"",password:"",email:"",github:"",linkedin:"",profileImage:""
  })
  const [existingImage, setExistingImage] = useState("")
  const [preview, setPreview] = useState("")
  useEffect(()=>{
    if(sessionStorage.getItem("userDetails")){
      const userDetails = JSON.parse(sessionStorage.getItem("userDetails"))
      setUserData({...userData,username:userDetails.username,password:userDetails.password,email:userDetails.email,github:userDetails.github,linkedin:userDetails.linkedin})
      setExistingImage(userDetails.profile)
    }
  },[open])

  useEffect(()=>{
    if(userData.profileImage){
      setPreview(URL.createObjectURL(userData.profileImage))
    }else{
      setPreview("")
    }
  },[userData.profileImage])
  console.log(userData);

  const handleProfileUpdate = async () => {
    const {username,password,email,github,linkedin,profileImage} = userData
    if(!github || !linkedin){
      toast.info("please fill the form completely!!!")
    }else{
      //proceed to api call
      const reqBody = new FormData()
      reqBody.append("username",username)
      reqBody.append("password",password)
      reqBody.append("email",email)
      reqBody.append("github",github)
      reqBody.append("linkedin",linkedin)
      preview?reqBody.append("profileImage",profileImage):reqBody.append("profileImage",existingImage)

      const token = sessionStorage.getItem("token")
      if(token){
        const reqHeader = {
          "Content-Type":preview?"multipart/form-data":"application/json",
          "Authorization":`Bearer ${token}`
        }
        //api call
        try{
          const result = await updateUserProfileApi(reqBody,reqHeader)
          if(result.status==200){
            setOpen(!open)
            sessionStorage.setItem("userDetails",JSON.stringify(result.data))
          }else{
            console.log(result);
          }
        }catch(err){
          console.log(err);
        }
      }
    }
  }

  return (
    
    <>
    <div className="d-flex rounded p-2 justify-content-between">
      <h2>Profile</h2>
      <button  onClick={() => setOpen(!open)} className='btn btn-outline-warning'><i className="fa-solid fa-chevron-down"></i></button>
    </div>
    <Collapse in={open}>
        <div className='row shadow p-3 justify-content-center mt-3' id="example-collapse-text">
         <label className='text-center'>
          <input style={{display:'none'}} type="file"  onChange={e=>setUserData({...userData,profileImage:e.target.files[0]})}/>

         { existingImage=="" ?

          <img className='rounded-circle' width={'200px'} height={'200px'} src={preview?preview:uploadimg} alt="uploaded img" />
          :
          <img className='rounded-circle' width={'200px'} height={'200px'} src={preview?preview:`${SERVER_URL}/uploads/${existingImage}`} alt="uploaded img" />

          }
         </label>
         <div className='mt-3'><input type="text" className='form-control' placeholder='Enter your Github URL' value={userData.github} onChange={e=>setUserData({...userData,github:e.target.value})}/></div>

         <div className='mt-3'><input type="text" className='form-control' placeholder='Enter your LinkedIN URL'
         value={userData.linkedin} onChange={e=>setUserData({...userData,linkedin:e.target.value})}/></div>

         <button onClick={handleProfileUpdate} className="mt-3 btn btn-warning w-100">Update</button>
         
        </div>
      </Collapse>
      <ToastContainer autoClose={2000} theme='colored' position='top-center'/>

    </>
  )
}

export default Profile
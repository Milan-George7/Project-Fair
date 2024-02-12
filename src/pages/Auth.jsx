import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Authimg from '../assets/images/Auth-img.png'
import { Form , Spinner } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginAPI, registerAPI } from '../services/allAPIs';
import { tokenAuthenticationContext } from '../Context API/TokenAuth';

function Auth({insideregister}) {
  const {isAuthorised,setIsAuthorised} = useContext(tokenAuthenticationContext)
  const [loginStatus,setLoginStatus] = useState(false)
  const navigate = useNavigate()
  const [userData,setUserData] = useState({
    username:"",email:"",password:""
  })
  
  const handleRegister = async (e)=>{
    e.preventDefault()
    console.log(userData);
    const {username,email,password} = userData
    if(!username || !email || !password){
     toast.info("Please fill the form!!!")
    }else{
      //api call
      try{
        const result = await registerAPI(userData)
        console.log(result);
        if(result.status===200){
          toast.success(`${result.data.username} has registered successfully!!`)
          setUserData({ username:"",email:"",password:""})
          setTimeout(() => {
            navigate('/login')
          }, 2000);
        }else{
          toast.warning(result.response.data)
        }
      }catch(err){
        console.log(err);
      }
    }
  }


  const handleLogin = async (e)=>{
    e.preventDefault()
    const {email,password} = userData
    if(!email || !password){
     toast.info("Please fill the form!!!")
    }else{
      //api call
      try{
        const result = await loginAPI({email,password})
        console.log(result);
        if(result.status===200){
          setLoginStatus(true)
          sessionStorage.setItem("username",result.data.existinguser.username)
          sessionStorage.setItem("token",result.data.token)
          sessionStorage.setItem("userDetails",JSON.stringify(result.data.existinguser))
          setIsAuthorised(true)
          setTimeout(()=>{
            setUserData({email:"",password:""})
            navigate('/')
            setLoginStatus(false)
          },2000)
         
          
        }else{
          toast.warning(result.response.data)
        }
      }catch(err){
        console.log(err);
      }
    }
  }
  return (
    <div style={{width:'100%',height:'100vh'}} className='d-flex justify-content-center align-items-center'>
      
      <div className="container w-75">
        <Link to={'/'}>Back to Home</Link>
        <div className="card shadow p-5 bg-success">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <img className='w-100' src={Authimg} alt="" />
            </div>
            <div className="col-lg-6">
              <div className="d-flex align-items-center flex-column">
                <h1 className="fw-bolder text-light mt-2"><i style={{height:'41px'}} className='fa-solid fa-paperclip'></i>Project Fair</h1>
                <h5 className='fw-bolder mt-2 pb-3 text-light'>
                  {insideregister?'Sign up to your Account':'Sign In to your Account'}
                </h5>
                <Form className='w-100'>
                  {insideregister && (
                         <Form.Group className="mb-3" controlId="formBasicEmail">
                         <Form.Control type="text" placeholder="Enter Username" onChange={e=>setUserData({...userData,username:e.target.value})} value={userData.username}/>
                         </Form.Group>
                  )}
                         
                         <Form.Group className="mb-3" controlId="formBasicEmail">
                         <Form.Control type="email" placeholder="Enter email" onChange={e=>setUserData({...userData,email:e.target.value})} value={userData.email}/>
                         </Form.Group>

                         <Form.Group className="mb-3" controlId="formBasicPassword">
                         <Form.Control type="password" placeholder="Password" onChange={e=>setUserData({...userData,password:e.target.value})} value={userData.password}/>
                         </Form.Group>
                         {
                          insideregister?
                          
                           <div>
                            <button onClick={handleRegister} className="btn btn-light mb-2">Register</button>
                            <p>Already a user? Click here to <Link to={'/login'}>Login </Link> </p>
                           </div>:
                           <div>
                           {loginStatus?<button className="btn btn-light mb-2" onClick={handleLogin}>Login <Spinner animation="border" variant="warning" /></button>:<button className="btn btn-light mb-2" onClick={handleLogin}>Login </button> }
                         
                           <p>Dont have an Account? Click here to <Link to={'/register'}>Register</Link> </p>
                          </div>
                         }

                </Form>

        
      
      
              </div>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer autoClose={2000} theme='colored' position='top-center'/>

    </div>
  )
}

export default Auth
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
import Projects from './pages/Projects'
import Footer from './components/Footer'
import { useContext } from 'react'
import { tokenAuthenticationContext } from './Context API/TokenAuth'





function App() {
  const {isAuthorised,setIsAuthorised} = useContext(tokenAuthenticationContext)


  return (
    <>
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Auth/>}/>
      <Route path='/register' element={<Auth insideregister/>}/>
      <Route path='/dashboard' element={ isAuthorised?<Dashboard/>:<Home/>}/>
      <Route path='/projects' element={ isAuthorised?<Projects/>:<Home/>}/>
      <Route path='/*' element={<Navigate to={'/'}/>}/>
     </Routes>
     <Footer/>
    </>
    
  )
}

export default App

import React,{ useEffect, useState } from 'react'
import './App.css'
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth'
import { login, logout } from './store/authSlice'
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'

function App() {
  const [loading,setLoading]=useState(true)
  const dispatch=useDispatch()

  useEffect(()=>{
    authService.currentUser() /** api call to check user is present or not */
    .then((userData)=>{       
      if(userData){            
        dispatch(login(userData))
      }
      else{
        dispatch(logout())
      }
    })
    .finally(()=>setLoading(false)) 
  },[])
  return !loading?(
    <div className='min-h-screen flex flex-wrap content-between bg-purple-300'>
      <div className='w-full-block'>
        <Header/>
        <main>
          TODo: <Outlet/>
        </main>
        <Footer/>
      </div>
    </div>
  ):null;
}

export default App

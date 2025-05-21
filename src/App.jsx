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
    <div className='min-h-screen flex flex-col content-between bg-white'>
      <div className='w-full-block'>
        <Header/>
        <main className='pt-27'>
           <Outlet/>
        </main>
        <Footer/>
      </div>
    </div>
  ):null;
}

export default App

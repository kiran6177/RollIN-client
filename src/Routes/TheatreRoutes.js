import React from 'react'
import { Route, Routes } from 'react-router'
import TheatreLogin from '../Pages/Theatre/Login/TheatreLogin'
import TheatreRegister from '../Pages/Theatre/Register/TheatreRegister'
import TheatreCompletePro from '../Pages/Theatre/CompleteProfile/TheatreCompletePro'
import TheatreProfile from '../Pages/Theatre/Profile/TheatreProfile'
import TheatreHome from '../Pages/Theatre/Home/TheatreHome'
import TheatreProtected from './TheatreProtected'

function TheatreRoutes() {
  return (
    <Routes>
        <Route path='/' element={
        <TheatreProtected>
            <TheatreHome/>
        </TheatreProtected>
        } />
        <Route path='/login' element={<TheatreLogin/>} />
        <Route path='/signup' element={<TheatreRegister/>} />
        <Route path='/completeprofile' element={<TheatreCompletePro/>} />
        <Route path='/profile' element={
        <TheatreProtected>
           <TheatreProfile/>
        </TheatreProtected>
        } />
    </Routes>
  )
}

export default TheatreRoutes

import React from 'react'
import { Route, Routes } from 'react-router'
import TheatreLogin from '../Pages/Theatre/Login/TheatreLogin'
import TheatreRegister from '../Pages/Theatre/Register/TheatreRegister'
import TheatreCompletePro from '../Pages/Theatre/CompleteProfile/TheatreCompletePro'
import TheatreProfile from '../Pages/Theatre/Profile/TheatreProfile'
import TheatreHome from '../Pages/Theatre/Home/TheatreHome'
import TheatreProtected from './TheatreProtected'
import TheatreOtp from '../Pages/Theatre/Otp/TheatreOtp'
import TheatreAddScreen from '../Pages/Theatre/AddScreen/TheatreAddScreen'
import TheatreEditScreen from '../Pages/Theatre/EditScreen/TheatreEditScreen'
import TheatreMovieEnroll from '../Pages/Theatre/MovieEnroll/TheatreMovieEnroll'
import TheatreMovieDetail from '../Pages/Theatre/MovieEnroll/TheatreMovieDetail'
import TheatreSeatLayout from '../Pages/Theatre/SeatLayout/TheatreSeatLayout'
import TheatreScreenDetail from '../Pages/Theatre/ScreenDetail/TheatreScreenDetail'
import TheatreScreenHome from '../Pages/Theatre/ScreenHome/TheatreScreenHome'
import TheatreBookingsHome from '../Pages/Theatre/Bookings/TheatreBookingsHome'
import TheatreBookingsScreen from '../Pages/Theatre/Bookings/TheatreBookingsScreen'
import TheatreShowReservations from '../Pages/Theatre/Bookings/TheatreShowReservations'
import TheatreBookingsList from '../Pages/Theatre/Bookings/TheatreBookingsList'
import TheatreNotificationsHome from '../Pages/Theatre/Notifications/TheatreNotificationsHome'

function TheatreRoutes() {
  return (
    <Routes>
        
        <Route path='/login' element={<TheatreLogin/>} />
        <Route path='/signup' element={<TheatreRegister/>} />
        <Route path='/completeprofile' element={<TheatreCompletePro/>} />
        <Route path='/profile' element={<TheatreProfile/>} />
        <Route path='/otpverification' element={<TheatreOtp/>} />

        <Route path='/' element={
        <TheatreProtected>
            <TheatreHome/>
        </TheatreProtected>
        } />
        <Route path='/screens' element={
        <TheatreProtected>
            <TheatreScreenHome/>
        </TheatreProtected>
        } />
        <Route path='/addscreen' element={
        <TheatreProtected>
            <TheatreAddScreen/>
        </TheatreProtected>
        } />
        <Route path='/screendetail' element={
        <TheatreProtected>
            <TheatreScreenDetail/> 
        </TheatreProtected>
        } />
        <Route path='/editscreen' element={
        <TheatreProtected>
            <TheatreEditScreen/> 
        </TheatreProtected>
        } />
        <Route path='/editscreen/enrollmovie' element={
        <TheatreProtected>
            <TheatreMovieEnroll/>  
        </TheatreProtected>
        } />
        <Route path='/editscreen/config' element={
        <TheatreProtected>
            <TheatreSeatLayout/>  
        </TheatreProtected>
        } />
        <Route path='/editscreen/enrollmovie/detail' element={
        <TheatreProtected>
            <TheatreMovieDetail/>  
        </TheatreProtected>
        } />
        <Route path='/movies' element={
        <TheatreProtected>
            <TheatreMovieEnroll/>  
        </TheatreProtected>
        } />
        <Route path='/movies/moviedetail' element={
        <TheatreProtected>
            <TheatreMovieDetail/>  
        </TheatreProtected>
        } />
        <Route path='/bookings' element={
        <TheatreProtected>
            <TheatreBookingsHome/> 
        </TheatreProtected>
        } />
        <Route path='/bookings/list' element={
        <TheatreProtected>
            <TheatreBookingsList/> 
        </TheatreProtected>
        } />
        <Route path='/bookings/screen' element={
        <TheatreProtected>
            <TheatreBookingsScreen/> 
        </TheatreProtected>
        } />
        <Route path='/bookings/reservations' element={
        <TheatreProtected>
            <TheatreShowReservations/> 
        </TheatreProtected>
        } />
        <Route path='/notifications' element={
        <TheatreProtected>
            <TheatreNotificationsHome/> 
        </TheatreProtected>
        } />
    </Routes>
  )
}

export default TheatreRoutes

import React from 'react'
import Navbar from '../../../Components/Navbar/Navbar'
import Footer from '../../../Components/Footer/Footer'
import Profile from '../../../Components/User/Profile/Profile'

function UserProfile() {
  return (
    <>
    <Navbar hide={true}/> 
    <Profile/>
    <Footer/>
    </>
  )
}

export default UserProfile

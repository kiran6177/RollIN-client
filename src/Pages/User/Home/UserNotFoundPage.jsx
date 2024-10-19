import React from 'react'
import Navbar from '../../../Components/Navbar/Navbar'
import Footer from '../../../Components/Footer/Footer'
import UserNotFound from '../../../Components/User/Home/UserNotFound'

function UserNotFoundPage({type}) {
  return (
    <>
    <Navbar/>
    <UserNotFound type={type} />
    <Footer/>
    </>
  )
}

export default UserNotFoundPage

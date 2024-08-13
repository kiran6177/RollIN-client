import React from 'react'
import { NavLink } from 'react-router-dom'

function Sidebar() {
  return (
    <div className='hidden lg:block fixed w-[15vw] min-h-[100vh] bg-black pt-32 text-white'>
      <div className='flex flex-col px-10 gap-8 text-md xl:text-lg'>
      <NavLink to={'/admin'} end >Dashboard</NavLink>
      <NavLink to={'/admin/users'}>Users</NavLink>
      <NavLink to={'/admin/movies'}>Movies</NavLink>
      <NavLink to={'/admin/theatres'}>Theatres</NavLink>
      <NavLink to={'/admin/persons'}>Persons</NavLink>
      </div>
    </div>
  )
}

export default Sidebar

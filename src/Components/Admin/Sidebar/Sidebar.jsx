import React from 'react'
import { NavLink } from 'react-router-dom'

function Sidebar() {
  return (
    <div className='hidden lg:block fixed w-[15vw] min-h-[100vh] bg-black pt-32 text-white'>
      <div className='flex flex-col px-10 gap-8 text-md xl:text-lg'>
      <NavLink>Dashboard</NavLink>
      <NavLink>Users</NavLink>
      <NavLink>Movies</NavLink>
      <NavLink>Theatres</NavLink>
      <NavLink>Persons</NavLink>
      </div>
    </div>
  )
}

export default Sidebar

import React from "react";
import { createPortal } from "react-dom";
import { IoIosClose } from "react-icons/io";
import PinLogo from '../../assets/pin-logo.png'
import { NavLink } from "react-router-dom";
import {  FaUserCircle } from "react-icons/fa";

function NavModal({isOpen,set}) {
    if(isOpen){
        return createPortal(
            <div className=" w-[100%] flex flex-col items-end bg-[rgba(0,0,0,0.6)] fixed top-0 right-0 h-[100%] max-h-full">
              <div className="bg-[#F6AE2D] w-[65%] sm:w-[45%] md:w-[35%]  min-h-[150px] h-[20%]">
                  <IoIosClose onClick={()=>set(false)} className="absolute right-3 top-3 w-[2rem] h-[2rem]"/>
                  <h3 className="font-semibold text-2xl p-5 tracking-widest">Menu</h3>
                  <div className=" flex items-center p-6 gap-3">
                    <FaUserCircle/>
                    <NavLink className={'font-medium tracking-wider text-sm'}>Profile</NavLink>
                </div>
              </div>
              <div className="bg-[#15121B] w-[65%] sm:w-[45%] md:w-[35%] scrollbar h-[80%] overflow-y-scroll p-6 ">
                <div className="text-white flex items-center py-5">
                    <img src={PinLogo} alt="" className="w-8" />
                    <NavLink className={'font-medium tracking-wider text-sm'}>Movies</NavLink>
                </div>
                <div className="text-white flex items-center">
                    <img src={PinLogo} alt="" className="w-8" />
                    <NavLink className={'font-medium tracking-wider text-sm'}>Screens</NavLink>
                </div>
              </div>
            </div>,
            document.getElementById('nav-modal'));
    }else{
        return null;
    }
  
}

export default NavModal;

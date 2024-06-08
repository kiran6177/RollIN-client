import React from 'react'
import { FaEnvelopeOpenText, FaFacebook, FaHeadset, FaInstagram, FaLinkedin, FaReceipt, FaRegCopyright, FaYoutube } from 'react-icons/fa'
import { FaSquareXTwitter } from 'react-icons/fa6';
import logo from '../../assets/logo.png'


function TheatreFooter() {
  return (
    <div >
      <div className='h-auto bg-black '>
            <div className='text-white px-[5rem] lg:px-[7rem] pt-[5rem] py-[2rem] flex flex-col gap-4'>
                <h5 className='font-semibold'>UPCOMING MOVIES</h5>
                <div className='flex justify-start gap-14 flex-wrap text-sm'><p className='min-w-[150px]'>Malayali From India</p><p className='min-w-[150px]'>Nadikar</p><p className='min-w-[150px]'>Aavesham</p><p className='min-w-[150px]'>Kingdom of Planet of Apes</p><p className='min-w-[150px]'>Manjummel Boys</p><p className='min-w-[150px]'>Shaithan</p></div>
            </div>
            <div className='text-white px-[5rem] lg:px-[7rem] py-[3rem] flex flex-col gap-4'>
                <h5 className='font-semibold'>MOVIES BY GENRE</h5>
                <div className='flex justify-start gap-14 flex-wrap text-sm'><p className='min-w-[150px]'>Drama Movies</p><p className='min-w-[150px]'>Comedy Movies</p><p className='min-w-[150px]'>Thriller Movies</p><p className='min-w-[150px]'>Action Movies</p><p className='min-w-[150px]'>Romantic Movies</p><p className='min-w-[150px]'>Sci-Fi Movies</p></div>
            </div>
            <div className='text-white px-[5rem] lg:px-[7rem] py-[3rem] flex flex-col gap-4'>
                <h5 className='font-semibold'>MOVIES BY LANGUAGE</h5>
                <div className='flex justify-start gap-14 flex-wrap text-sm'><p className='min-w-[150px]'>Movies in Malayalam</p><p className='min-w-[150px]'>Movies in Tamil</p><p className='min-w-[150px]'>Movies in Hindi</p><p className='min-w-[150px]'>Movies in English</p><p className='min-w-[150px]'>Movies in Telugu</p></div>
            </div>
            <div className='text-white px-[5rem] lg:px-[7rem] py-[3rem] pb-[5rem] flex flex-col gap-4'>
                <h5 className='font-semibold'>HELP</h5>
                <div className='flex justify-start gap-14 flex-wrap text-sm'><p className='min-w-[150px]'>Contact Us</p><p className='min-w-[150px]'>About Us</p><p className='min-w-[150px]'>Terms and Conditions</p><p className='min-w-[150px]'>FAQs</p><p className='min-w-[150px]'>Privacy Policy</p></div>
            </div>
            
      </div>
      <div className='h-auto min-h-[8rem] md:pt-28 bg-black relative  border-t-2 border-[#F6AE2D]'>
            <div className='w-[200px] absolute top-[-2.4rem] left-[27%] sm:left-[30%] md:left-[35%] lg:left-[40%] xl:left-[45%] drop-shadow-[0px_0px_15px_rgba(0,0,0,10)] flex flex-col'><img src={logo} alt="" /> <p className='text-white text-[10px] text-center font-semibold tracking-wider'>RollIN Entertainments.</p> </div>
            <div className='w-[100%] h-[100%] flex flex-col md:flex-row pt-32 gap-16 md:gap-0 md:pt-0 justify-center items-center'>
                <div className='w-[50%] h-[100%] flex justify-center items-end pb-[1.5rem] md:px-[5rem] gap-5'>
                    <FaRegCopyright className='text-[#F6AE2D] text-[2rem] opacity-75'/>
                    <p className='text-white text-xs '>Copyright 2024.All Rights Reserved.</p>
                </div>
                <div className='w-[50%] h-[100%] flex items-end justify-center md:justify-end pb-[1.5rem] md:px-[5rem] gap-5'>
                    <FaFacebook className='text-[#F6AE2D] text-[2rem] opacity-75'/>
                    <FaInstagram className='text-[#F6AE2D] text-[2rem] opacity-75'/>
                    <FaSquareXTwitter className='text-[#F6AE2D] text-[2rem] opacity-75'/>
                    <FaYoutube className='text-[#F6AE2D] text-[2rem] opacity-75'/>
                    <FaLinkedin className='text-[#F6AE2D] text-[2rem] opacity-75'/>
                </div>
            </div>
      </div>
    </div>
  )
}

export default TheatreFooter

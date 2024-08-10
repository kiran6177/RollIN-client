import React, { useEffect, useState } from 'react'
import { FaEnvelopeOpenText, FaFacebook, FaHeadset, FaInstagram, FaLinkedin, FaReceipt, FaRegCopyright, FaYoutube } from 'react-icons/fa'
import { FaSquareXTwitter } from 'react-icons/fa6';
import logo from '../../assets/logo.png'
import { GENRES } from '../../constants/movie-constants/genres';
import { languages } from '../../constants/movie-constants/languages'
import { useNavigate } from 'react-router';


function TheatreFooter() {
    const [genres,setGenres] = useState([]);
    const [randomLanguages,setRandomLanguages] = useState([]);

    const navigate = useNavigate();

    useEffect(()=>{
        console.log("GENRE");
        if(GENRES?.length > 0){
            let genreIds = []
            let randomGenres = [];
            for(let i = 0 ; i < 6 ; i++){
                let randomIndex = Math.floor(Math.random() * GENRES.length);
                if(!genreIds.includes(GENRES[randomIndex]?.id)){
                    randomGenres.push(GENRES[randomIndex])
                    genreIds.push(GENRES[randomIndex]?.id)
                }else{
                    i--
                }
            }
            setGenres(randomGenres)
        }
        if(languages?.length > 0){
            let languageIds = []
            let randomLang = [];
            for(let i = 0 ; i < 6 ; i++){
                let randomIndex = Math.floor(Math.random() * languages.length);
                if(!languageIds.includes(languages[randomIndex]?.id)){
                    randomLang.push(languages[randomIndex])
                    languageIds.push(languages[randomIndex]?.id)
                }else{
                    i--
                }
            }
            setRandomLanguages(randomLang)
        }
    },[])

  return (
    <div >
      <div className='h-auto bg-black '>
            <div className='text-white px-[5rem] lg:px-[7rem] py-[3rem] flex flex-col gap-4'>
                <h5 className='font-semibold'>MOVIES BY GENRE</h5>
                <div className='flex justify-start gap-14 flex-wrap text-sm'>
                  {
                    genres?.length > 0 && genres?.map((genreObj,i)=>{
                        return <p onClick={()=>navigate(`/theatre/movies?genre=${genreObj?.name}`)} key={'genre'+genreObj?.id} className='min-w-[150px]'>{genreObj?.name} Movies</p>
                    })  
                  }
                </div>
            </div>
            <div className='text-white px-[5rem] lg:px-[7rem] py-[3rem] flex flex-col gap-4'>
                <h5 className='font-semibold'>MOVIES BY LANGUAGE</h5>
                <div className='flex justify-start gap-14 flex-wrap text-sm'>
                    {
                        randomLanguages?.length > 0 && randomLanguages?.map((langObj,i)=>{
                            return <p onClick={()=>navigate(`/theatre/movies?lang=${langObj?.name}`)} key={'lang'+langObj?.id} className='min-w-[150px]'>Movies in {langObj?.name} </p>
                        })  
                    }
                </div>
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

import React, { useEffect, useState } from 'react'
import { HiPencilSquare } from 'react-icons/hi2';
import { MdChair } from 'react-icons/md';
import {  useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import { Toaster } from 'sonner';
import { BiSolidSpeaker } from "react-icons/bi";
import { RiSpeaker3Fill } from "react-icons/ri";
import { RiSpeaker2Fill } from "react-icons/ri";
import ChangeOrderModal from './ChangeOrderModal';
import ChangeIdentifierModal from './ChangeIdentifierModal';

function ScreenDetail() {
    const [searchParams] = useSearchParams();
    const screen_id = searchParams.get('id')
    const navigate = useNavigate()

    const {theatreScreenData,loading,message,error} = useSelector(state=>state.theatreFeat)

    const [showOrder,setShowOrder] = useState(false);
    const [showIdentifier,setShowIdentifier] = useState(false);

    const [enrolledMovies,setEnrolledMovies] = useState([])
    const [screenName,setScreenName] = useState('');
    const [showInput,setShowInput] = useState(false);
    const [showData,setShowData] = useState([])
    const [speakers,setSpeakers] = useState({
        front:0,
        left:0,
        rear:0,
        right:0,
        center:0,
        subwoofers:0,
    })

    const [tiers,setTiers] = useState([])

    const getDaysDifference = (enroll_to_date)=>{
        const now = new Date()
        const enrolled = new Date(enroll_to_date)  
        const differenceInMilli = Math.abs(now - enrolled)
        const millisecondsInOneDay = 24 * 60 * 60 * 1000;
        const diff = Math.ceil(differenceInMilli / millisecondsInOneDay)
        return diff
    }

    useEffect(()=>{
        if(theatreScreenData && theatreScreenData?.length > 0){
            console.log(screen_id);
            theatreScreenData.map(screen=>{
                if(screen._id === screen_id){
                    setScreenName(screen.name)
                    setShowData(screen.showtimes)
                    setSpeakers({
                        front:screen.sound_setup.front,
                        left:screen.sound_setup.left,
                        rear:screen.sound_setup.rear,
                        right:screen.sound_setup.right,
                        center:screen.sound_setup.center,
                        subwoofers:screen.sound_setup.subwoofers,
                    })
 
                    setTiers(prev=>[...screen.tiers].reverse())
                    setEnrolledMovies(screen.running_movies.map((movie)=>{
                        return {
                            ...movie,
                            daysLeft:getDaysDifference(movie.enroll_to)
                        }
                    }))
                } 
            })
        }
    },[theatreScreenData])

  return (
    <div className='py-10 bg-[#15121B] '>
        <Toaster richColors />
        <div className='pt-28 px-12  min-h-[10rem]'>
            <div className='flex flex-col sm:flex-row justify-between mb-6 sm:items-center'>
            <div className='w-[60%]'>
                <h5 className='text-white text-2xl sm:text-4xl font-semibold tracking-widest'>{screenName}</h5> 
                <div className="w-[90%] md:w-[55%] flex flex-col sm:flex-row sm:items-center gap-5 my-6">
                    <label className='text-white text-base tracking-widest'>Name :</label>
                    {
                        showInput ?
                        <>
                        <input type="text" value={screenName} onChange={(e)=>setScreenName(e.target.value)} className='w-[50%] my-2 p-2 border-2 rounded-md bg-black text-white border-[#f6ae2d]'/> 
                        <button onClick={()=>setShowInput(false)} className='bg-[#f6ae2d] rounded-sm px-4 py-2 max-w-[30%]'>SAVE</button>
                        </>
                        :
                        <>
                        <h6 className='text-white'>{screenName ? screenName : 'SCREEN '+(theatreScreenData?.length + 1)}</h6>
                        <HiPencilSquare onClick={()=>{setScreenName(screenName ? screenName : `SCREEN ${theatreScreenData?.length + 1}`);setShowInput(true)}} className='hover:text-[#f6ae2d] text-[#f6b02dd7]'/>
                        </>
                    }

                </div>
            </div>
            <div>
                <button onClick={()=>navigate(`/theatre/editscreen?id=${screen_id}`)} className='bg-[#f6ae2d] rounded-sm px-8 py-3 font-medium tracking-wider text-sm sm:text-base'>EDIT SCREEN</button>
            </div>
            </div>

            {enrolledMovies && enrolledMovies.length > 0 && 
            <div className='border-2 border-[#f6ae2d] rounded-md bg-black px-8 py-6 my-6'>
                <h4 className='text-[#f6ae2d] tracking-wider mb-8'>ENROLLED MOVIES</h4>
                
                {
                enrolledMovies.map((movie,i)=>{
                    return(
                    <div key={movie._id+i} className='flex flex-col md:flex-row gap-10 w-[95%] mx-auto border-2 overflow-hidden rounded-md border-[#4040407b] my-8 shadow-[0px_0px_55px_rgb(246,174,45,0.3)] p-6'>
                        <div className='w-[8rem] sm:w-[10rem] overflow-hidden  '>
                            <img src={movie?.poster_path} alt="" className='aspect-[3/4] object-cover' width={'100%'} />
                        </div>
                        <div className='flex flex-col sm:flex-row w-[100%] gap-4   justify-between'>
                            <div className='text-white flex flex-col w-[100%] sm:w-[65%] gap-4'>
                                <h3 className='text-lg font-medium text-[#f6ae2d]'>{movie?.title}</h3>
                                <h6 className='text-xs sm:text-sm'>{movie?.overview}</h6> 
                                <h6 className='text-sm'>{movie?.release_date.split('T')[0]}</h6>
                                <h6 className='text-sm'>{movie?.genres[0] ? movie?.genres[0].name : '' }{movie?.genres[1] ?" / "+ movie?.genres[1].name : '' }{movie?.genres[2] ?" / "+ movie?.genres[2].name : '' }</h6>
                        
                            </div>
                            <div className='flex flex-col justify-center gap-4'>
                                <p className='text-white text-xs'><span className='text-[#f6ae2d]'>Enrolled Days left : </span>{movie?.daysLeft}</p>
                            </div>
                        </div>
                         
                    </div>
                    )
                })
                }
            </div>}


            <div className='border-2 border-[#f6ae2d] rounded-md bg-black px-8 py-6 my-6'>
                <h4 className='text-[#f6ae2d] tracking-wider mb-8'>SHOWS</h4>
                <div className='flex justify-between'>
                    <div className='w-[100%]'>
                    {
                        showData && showData.length > 0 && 
                        showData.map((show,i)=>{
                            return(
                                <div key={show.showtime+i} className='relative flex flex-col gap-6 text-sm sm:text-base sm:flex-row justify-between border-2 border-[#f6ae2d] text-white w-[100%] rounded-sm p-6 my-6'>
                                    <h3><span className='text-[#f6ae2d]'>SHOWTIME : </span>{show.showtime}</h3>
                                    <div className='sm:w-[40%] flex flex-col items-end justify-center'>

                                        <div  className=' flex flex-col items-start h-[3rem]  rounded-sm border-2 border-black overflow-hidden ' >
                                            <h4 className='text-[#f6ae2d]'>Running movie :</h4>
                                            <p className=' text-xs sm:text-sm md:text-base text-white'>{show.movie_id !== null? enrolledMovies.find(mov=>mov.movie_id === show.movie_id)?.title :'Choose Movie'}</p>      
                                        </div>

                                    </div>
                                </div>
                            )
                        })

                    }
                    </div>
                </div>  
            </div>


            <div className='border-2 border-[#f6ae2d] rounded-md bg-black px-8 py-6 my-6'>
                <h4 className='text-[#f6ae2d] tracking-wider mb-8'>SOUND DESIGN</h4>
                <div className='flex flex-col md:flex-row justify-between my-2'>
                    <div className="text-white flex my-2 justify-between md:justify-normal md:my-0 text-sm w-[90%] md:w-[45%]">
                    <label className='text-[#f6ae2d]  tracking-widest w-[60%] '>Front Speakers</label>
                    <p>{speakers?.front} speakers</p>
                    </div>
                    <div className="text-white flex my-2 justify-between md:justify-normal md:my-0 text-sm w-[90%] md:w-[45%]">
                    <label className='text-[#f6ae2d]  tracking-widest w-[60%]'>Left Speakers</label>
                    <p>{speakers?.left} speakers</p>
                    </div>
                </div>
                <div className='flex flex-col md:flex-row justify-between my-2'>
                    <div className="text-white flex my-2 justify-between md:justify-normal md:my-0 text-sm w-[90%] md:w-[45%]">
                    <label className='text-[#f6ae2d]  tracking-widest w-[60%]'>Rear Speakers</label>
                    <p>{speakers?.rear} speakers</p>
                    </div>
                    <div className="text-white flex my-2 justify-between md:justify-normal md:my-0 text-sm w-[90%] md:w-[45%]">
                    <label className='text-[#f6ae2d]  tracking-widest w-[60%]'>Right Speakers</label>
                    <p>{speakers?.right} speakers</p>
                    </div>
                </div>
                <div className='flex flex-col md:flex-row justify-between my-2'>
                    <div className="text-white flex my-2 justify-between md:justify-normal md:my-0 text-sm w-[90%] md:w-[45%]">
                    <label className='text-[#f6ae2d]  tracking-widest w-[60%]'>Center Speakers</label>
                    <p>{speakers?.center} speakers</p>
                    </div>
                    <div className="text-white flex my-2 justify-between md:justify-normal md:my-0 text-sm w-[90%] md:w-[45%]">
                    <label className='text-[#f6ae2d]  tracking-widest w-[60%]'>Subwoofers</label>
                    <p>{speakers?.subwoofers} speakers</p>
                    </div>
                </div>
            </div>


            <div className='border-2 border-[#f6ae2d] rounded-md bg-black px-8 py-6 my-6'>
                <h4 className='text-[#f6ae2d] tracking-wider mb-2'>SEAT LAYOUT</h4>
                <div className='flex flex-col sm:flex-row sm:justify-end gap-3 mb-20'>
                    <button onClick={()=>setShowIdentifier(true)} className='bg-[#f6ae2d] rounded-sm px-8 py-3 font-medium tracking-wider text-sm sm:text-base '>CHANGE IDENTIFIERS</button>
                    <button onClick={()=>setShowOrder(true)} className='bg-[#f6ae2d] rounded-sm px-8 py-3 font-medium tracking-wider text-sm sm:text-base '>CHANGE ORDER</button>
                </div>
                <div className='relative '>
                    {
                        tiers?.length > 0 && tiers.map((tierData,i)=>{
                            return (
                                <div key={tierData?._id+i} className='flex flex-col text-white w-[85%] mx-auto text-[12px] sm:text-xs md:text-base'>
                                    <div key={'first'+i} className='flex gap-4 items-center justify-between my-3'>
                                        <div className='flex flex-col sm:flex-row gap-4 items-center'>
                                            <p className='text-[#f6ae2d]'>{tierData?.name}</p>
                                            <p>Rs. {tierData?.rate}</p>
                                        </div>
                                        <div>
                                            <p>ORDER : {tierData?.order}</p>
                                        </div> 
                                    </div> 
                                    <div>
                                        {
                                            tierData?.layout && tierData?.layout.length > 0 && tierData?.layout.map((obj,i)=>{
                                                let key = Object.keys(obj)[0];
                                                let value = obj[key]
                                                return(
                                                <div key={"main"+key+i} className='flex h-[100%] w-[100%] items-center mx-auto my-2'> 
                                                    <div className='text-white text-xs md:text-base'>
                                                        <p className='text-[10px] sm:text-xs md:text-base pe-4'>{key}</p>
                                                    </div>
                                                    <div key={key+i} style={{gridTemplateColumns:`repeat(${value?.length},1fr)`}} className={`grid w-[100%]`}> 
                                                        {value.map((seats,i)=>{
                                                            return(
                                                                <div key={"chair"+key+i}  className={` aspect-square flex justify-center items-center`}>
                                                                    {seats === 1 && <MdChair className='text-[#f6ae2d] w-[60%] h-[60%]' /> }
                                                                </div>
                                                            )
                                                        })}
                                                    </div>
                                                </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }
                    <div className='w-[100%] flex justify-center mt-16'>
                        <div className='w-[50%] border-black border-b-[#f6ae2d] border-b-[1rem] md:border-b-[2rem] border-r-[1rem] sm:border-r-[2rem] md:border-r-[3rem] lg:border-r-[4rem] xl:border-r-[5rem] border-l-[1rem] sm:border-l-[2rem] md:border-l-[3rem] lg:border-l-[4rem] xl:border-l-[5rem]'></div>
                    </div>
                    {/* front speakers */}
                    <div className='text-[#f6ae2d] absolute bottom-10 flex justify-evenly w-[100%] '>
                        {
                            speakers?.front >  0 && Array.from({length:speakers.front}).map((_,index)=>{
                                return(
                                    <div key={'front'+index} className='flex items-center justify-evenly '>
                                    <BiSolidSpeaker  className='md:h-[2rem] md:w-[2rem]'/>
                                    </div>
                                )
                            })
                        }
                    </div>
                    {/* sub speakers */}
                    <div className='text-[#f6ae2d] absolute bottom-10 flex justify-center w-[100%] '>
                    {
                        speakers?.subwoofers > 0 && Array.from({length:speakers.subwoofers}).map((_,ind)=>{
                                            return (
                                                <div key={'sub'+ind} className='flex items-center justify-evenly '>
                                                    <RiSpeaker3Fill   className='md:h-[1.5rem] md:w-[1.5rem]' />
                                                </div>
                                            )
                                        })
                                    }
                    </div>
                    {/* center speakers */}
                    <div className='text-[#f6ae2d] absolute bottom-16 md:bottom-20 flex justify-center w-[100%] '>
                    {
                        speakers?.center > 0 && Array.from({length:speakers.center}).map((_,ind)=>{
                                            return (
                                                <div key={'center'+ind} className='flex items-center justify-evenly bg-[#f6ae2d] text-black'>
                                                    <RiSpeaker2Fill  className='md:h-[1.5rem] md:w-[1.5rem]' />
                                                    <RiSpeaker2Fill  className='md:h-[1.5rem] md:w-[1.5rem]' />
                                                    
                                                </div>
                                            )
                                        })
                                    }
                    </div>
                    {/* rear speakers */}
                    <div className='text-[#f6ae2d] absolute -top-10 flex justify-evenly w-[100%] '>
                        {
                            speakers?.rear >  0 && Array.from({length:speakers.rear}).map((_,index)=>{
                                return(
                                    <BiSolidSpeaker key={'rear'+index}  className='md:h-[2rem] md:w-[2rem]'/>
                                )
                            })
                        }
                    </div>
                    {/* left speakers */}
                    <div className='text-[#f6ae2d] absolute -left-3 md:-left-0 top-0 flex flex-col justify-evenly h-[100%] '>
                        {
                            speakers?.left >  0 && Array.from({length:speakers.left}).map((_,index)=>{
                                return(
                                    <BiSolidSpeaker key={'left'+index}  className='md:h-[2rem] md:w-[2rem]'/>
                                )
                            })
                        }
                    </div>
                    {/* right speakers */}
                    <div className='text-[#f6ae2d] absolute -right-3 md:-right-0 top-0 flex flex-col justify-evenly h-[100%] '>
                        {
                            speakers?.right >  0 && Array.from({length:speakers.right}).map((_,index)=>{
                                return(
                                    <BiSolidSpeaker key={'right'+index}  className='md:h-[2rem] md:w-[2rem]'/>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            <ChangeOrderModal isOpen={showOrder} set={setShowOrder} />
            <ChangeIdentifierModal isOpen={showIdentifier} set={setShowIdentifier} />
      </div>
    </div>
  )
}

export default ScreenDetail

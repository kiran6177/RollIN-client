import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { HiPencilSquare } from "react-icons/hi2";
import { LocalizationProvider, MobileTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs';
import { Toaster, toast } from 'sonner';
import { IoIosClose } from 'react-icons/io';
import { theatreAddScreen } from '../../../features/theatreFeat/theatreFeatAction';
import { resetTheatreFeatActions } from '../../../features/theatreFeat/theatreFeatSlice';
import { useNavigate } from 'react-router';


function AddScreen() {

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const {theatreScreenData,loading,message} = useSelector(state=>state.theatreFeat)
    const {theatreData,theatreToken} = useSelector(state=>state.theatre);

    const [screenName,setScreenName] = useState('')
    const [showInput,setShowInput] = useState(false);

    const [time,setTime] = useState(dayjs('2024-08-09T15:30'))

    const [shows,setShows] = useState([])
    const [enrolledMovies,setEnrolledMovies] = useState([])

    const [showData,setShowData] = useState([])

    const [movieSelect,setMovieSelect] = useState(false)

    const [tier,setTier] = useState(0);
    const [tierCount,setTierCount] = useState(0)

    const [tierName,setTierName] = useState({})
    const [tierSeats,setTierSeats] = useState({})
    const [tierRate,setTierRate] = useState({})

    const [speakers,setSpeakers] = useState({
        front:0,
        left:0,
        rear:0,
        right:0,
        center:0,
        subwoofers:0,
    })

    useEffect(()=>{
        if(theatreScreenData){
            setScreenName(`SCREEN ${theatreScreenData?.length + 1}`)
        }
    },[theatreScreenData])

    useEffect(()=>{
        if(message){
            toast.success(message)
            setTimeout(()=>{navigate('/theatre',{replace:true})},1000)
            dispatch(resetTheatreFeatActions())
            return
        }
    },[message])
    
    useEffect(()=>{
        setTierName(()=>{
            let obj = {}
            for(let i = 1 ; i <= tierCount ; i++){
                obj['name'+i] = ''
            }
            return obj
        })
        setTierSeats(()=>{
            let obj = {}
            for(let i = 1 ; i <= tierCount ; i++){
                obj['seats'+i] = ''
            }
            return obj
        })
        setTierRate(()=>{
            let obj = {}
            for(let i = 1 ; i <= tierCount ; i++){
                obj['rate'+i] = ''
            }
            return obj
        })
    },[tierCount]) 

    useEffect(()=>{
        setShows(showData)  
    },[showData])
 
    useEffect(()=>{
        const tierInt = parseInt(tier) 
        if(tierInt !== 0){
            if(tierInt > 0){
                console.log(tierInt);
                setTierCount(tierInt)
            }else{
                toast.error('Enter valid number.')
            }
        }else{
            setTierCount(0)
        }
        
    },[tier])

    const handleCreateShow = ()=>{
        console.log(time.format());
        let timetoSave = (time.hour()%12 !== 0 ? time.hour()%12 : 12)+':'+(time.minute() < 10 ? '0'+time.minute() : time.minute() )+(time.hour() >= 12  ? 'PM' : 'AM')
        console.log('TIME',timetoSave);
        for(let i = 0 ; i < showData.length ; i++){
            if(showData[i].showtime === timetoSave){
                toast.error('Show already exists.')
                return
            }
        }
        setShowData(prev=>{
            return [...prev,{showtime:timetoSave,movie:null}]
        })
    }

    const handleShowSelect = (movie,show)=>{
        setShows(shows.map(sho=>{
            console.log(sho);
            if(sho.showtime === show.showtime){
                return {
                    ...sho,
                    movie
                }
            }
            return sho
        }))
        setMovieSelect(false)
    }

    const handleTierName = (e,index)=>{
        setTierName((prev)=>{
            return {
                ...prev,
                [`name${index}`]:e.target.value.toUpperCase()
            }
        })
    }

    const handleTierSeats = (e,index)=>{
        setTierSeats((prev)=>{
            return {
                ...prev,
                [`seats${index}`]:e.target.value
            }
        })
    }

    const handleTierRate = (e,index)=>{
        setTierRate((prev)=>{
            return {
                ...prev,
                [`rate${index}`]:e.target.value
            }
        })
    }


    const handleSave = ()=>{
        
        console.log("SHOWDATA",showData);
        console.log("SPEAKERS",speakers);
        const tierData = []
        for(let i = 1 ; i <= tierCount ; i++){
            if(tierName[`name${i}`].trim() === ''){
                toast.error('Enter tier name.')
                return;
            }
            if(tierSeats[`seats${i}`] === ''){
                toast.error('Enter seats.')
                return;
            }
            if(tierRate[`rate${i}`] === ''){
                toast.error('Enter tier rate.')
                return;
            }
            if(parseInt(tierSeats[`seats${i}`]) < 1){
                toast.error('Enter valid seats.')
                return;
            }
            if(parseInt(tierRate[`rate${i}`]) < 1){
                toast.error('Enter valid tier rate.')
                return;
            }

            tierData.push({
                name:tierName[`name${i}`],
                seats:tierSeats[`seats${i}`],
                rate:tierRate[`rate${i}`]
            })
        }
        console.log(tierData);
        if(showData?.length === 0 && tierData?.length === 0 ){
            toast.error('Complete the details.')
        }else if(showData?.length === 0){
            toast.error('Complete show details.')
        }else if(tierData?.length === 0){
            toast.error('Complete tier details.')
        }else if(speakers.front === 0 || speakers?.left === 0 || speakers?.right === 0 || speakers?.rear === 0){
            toast.error('Complete sound details.')
        }else if(speakers.front < 1 || speakers?.left < 1 || speakers?.right < 1 || speakers?.rear < 1 || speakers?.center < 0 || speakers?.subwoofers < 0){
            toast.error('Provide valid sound details.')
        }else {
            console.log("VALIDATED");
            console.log(screenName);
            const data = {theatreid:theatreData?.id,name:screenName,tierData,showData,speakers}
            dispatch(theatreAddScreen({data,token:theatreToken}))
        }
    }

  return (
    <div className='py-10 bg-[#15121B] '>
        <Toaster richColors />
        <div className='pt-28 px-12  min-h-[10rem]'>
            <div className='flex flex-col sm:flex-row justify-between mb-6 sm:items-center'>
            <div className='w-[60%]'>
                <h5 className='text-white text-2xl sm:text-4xl font-semibold tracking-widest'>SCREEN {theatreScreenData?.length + 1}</h5> 
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

            </div>




            <div className='border-2 border-[#f6ae2d] rounded-md bg-black px-8 py-6 my-6'>
                <h4 className='text-[#f6ae2d] tracking-wider mb-8'>SHOWS</h4>
                <div className='flex flex-col lg:flex-row justify-between'>
                    <div className='lg:w-[55%]'>
                    {
                        shows && shows.length > 0 && 
                        shows.map((show,i)=>{
                            return(
                                <div key={show.showtime+i} className='relative flex flex-col gap-6 text-sm sm:text-base sm:flex-row justify-between border-2 border-[#f6ae2d] text-white w-[100%] rounded-sm p-6 my-6'>
                                    <IoIosClose onClick={()=>{ setShowData(showData.filter((showObj)=>showObj.showtime !== show.showtime))}} className="absolute cursor-pointer right-1 top-1 w-[1.5rem] h-[1.5rem]"/>
                                    <h3>SHOWTIME : {show.showtime}</h3>
                                    <div className='sm:w-[40%] flex flex-col items-center justify-center'>

                                        {
                                        enrolledMovies.length > 0 && 
                                        <div className=' overflow-scroll scrollbar-none flex flex-col justify-start text-black w-[90%] h-[7rem] '>
                                            {
                                            enrolledMovies.map((movie,i)=>{
                                                return (
                                                <div key={i} onClick={()=>handleShowSelect(movie,show)} className='min-h-[3rem] flex items-center bg-white rounded-sm  ml-[1.5px] mt-[1px] border-black w-[100%]'>
                                                    <p className='mx-5 w-[100%]  text-ellipsis overflow-hidden'>{movie}</p>
                                                </div>
                                                )
                                            })
                                            }

                                        </div>
                                        
                                        }


                                    </div>
                                </div>
                            )
                        })

                    }
                    </div>

                    <div className='lg:w-[40%] border-2 border-[#f6ae2d] rounded-md p-6 '> 
                        <h1 className='text-[#f6ae2d] mb-6'>SET SHOW</h1> 
                        <LocalizationProvider dateAdapter={AdapterDayjs}> 
                        <div className='flex flex-col gap-8'> 
                            <MobileTimePicker className='invert' slotProps={{field:{sx:{border:'1px #2d4ff6 solid'}}}} value={time} onChange={(val)=>setTime(val)} />
                            <button onClick={handleCreateShow} className='bg-[#f6ae2d] text-sm sm:text-base rounded-md px-4 py-2 font-medium hover:scale-[1.02] transition-all duration-150 ease-in-out'>CREATE SHOW</button>
                        </div>
                        </LocalizationProvider>
                    </div>

                </div>  
            </div>


            <div className='border-2 border-[#f6ae2d] rounded-md bg-black px-8 py-6 my-6'>
                <h4 className='text-[#f6ae2d] tracking-wider mb-8'>SOUND DESIGN</h4>
                <div className='flex flex-col md:flex-row justify-between'>
                    <div className="w-[90%] md:w-[45%]">
                    <label className='text-white text-xs tracking-widest'>Front Speakers</label>
                    <input type="number" value={speakers.front} onChange={(e)=>setSpeakers(prev=>{
                        return{
                            ...prev,
                            front:e.target.value
                        }
                    })}  className='w-[100%] my-2 p-2 border-2 rounded-md bg-black text-white border-[#f6ae2d]'/>
                    </div>
                    <div className="w-[90%] md:w-[45%]">
                    <label className='text-white text-xs tracking-widest'>Left Speakers</label>
                    <input type="number" value={speakers.left} onChange={(e)=>setSpeakers(prev=>{
                        return{
                            ...prev,
                            left:e.target.value
                        }
                    })}  className='w-[100%] my-2 p-2 border-2 rounded-md bg-black text-white border-[#f6ae2d]'/>
                    </div>
                </div>
                <div className='flex flex-col md:flex-row justify-between'>
                    <div className="w-[90%] md:w-[45%]">
                    <label className='text-white text-xs tracking-widest'>Rear Speakers</label>
                    <input type="number" value={speakers.rear} onChange={(e)=>setSpeakers(prev=>{
                        return{
                            ...prev,
                            rear:e.target.value
                        }
                    })}  className='w-[100%] my-2 p-2 border-2 rounded-md bg-black text-white border-[#f6ae2d]'/>
                    </div>
                    <div className="w-[90%] md:w-[45%]">
                    <label className='text-white text-xs tracking-widest'>Right Speakers</label>
                    <input type="number" value={speakers.right} onChange={(e)=>setSpeakers(prev=>{
                        return{
                            ...prev,
                            right:e.target.value
                        }
                    })} className='w-[100%] my-2 p-2 border-2 rounded-md bg-black text-white border-[#f6ae2d]'/>
                    </div>
                </div>
                <div className='flex flex-col md:flex-row justify-between'>
                    <div className="w-[90%] md:w-[45%]">
                    <label className='text-white text-xs tracking-widest'>Center Speakers</label>
                    <input type="number" value={speakers.center} onChange={(e)=>setSpeakers(prev=>{
                        return{
                            ...prev,
                            center:e.target.value
                        }
                    })}  className='w-[100%] my-2 p-2 border-2 rounded-md bg-black text-white border-[#f6ae2d]'/>
                    </div>
                    <div className="w-[90%] md:w-[45%]">
                    <label className='text-white text-xs tracking-widest'>Subwoofers</label>
                    <input type="number" value={speakers.subwoofers} onChange={(e)=>setSpeakers(prev=>{
                        return{
                            ...prev,
                            subwoofers:e.target.value
                        }
                    })} className='w-[100%] my-2 p-2 border-2 rounded-md bg-black text-white border-[#f6ae2d]'/>
                    </div>
                </div>
            </div>


            <div className='border-2 border-[#f6ae2d] rounded-md bg-black px-8 py-6 my-6'>
                <h4 className='text-[#f6ae2d] tracking-wider mb-8'>SEAT LAYOUT</h4>
                <div className='w-[100%] md:w-[50%]'>
                    <label className='text-white text-xs tracking-widest'>Number of tiers</label>
                    <input type="number" min={0} max={10} value={tier} onChange={(e)=>setTier(e.target.value)}  className='w-[100%] my-2 p-2 border-2 rounded-md bg-black text-white border-[#f6ae2d]'/>
                </div>

                {
                Array.from({length:tierCount}).map((_,index)=>{ 
                    return (
                            <div key={index} className='my-10'>
                                <div className='flex flex-col md:flex-row justify-between'>
                                    <div className="w-[100%] md:w-[45%]">
                                    <label className='text-white text-xs tracking-widest'>Name</label>
                                    <input type="text" value={tierName['name'+(index+1)] ? tierName['name'+(index+1)] : ''} onChange={(e)=>handleTierName(e,index+1)} className='w-[100%] my-2 p-2 border-2 rounded-md bg-black text-white border-[#f6ae2d]'/>
                                    </div>
                                    <div className="w-[100%] md:w-[45%]">
                                    <label className='text-white text-xs tracking-widest'>Seats</label>
                                    <input type="number" value={tierSeats['seats'+(index+1)] ? tierSeats['seats'+(index+1)] : ''} onChange={(e)=>handleTierSeats(e,index+1)}  className='w-[100%] my-2 p-2 border-2 rounded-md bg-black text-white border-[#f6ae2d]'/>
                                    </div>
                                </div>
                                <div className='flex flex-col md:flex-row justify-between'>
                                    <div className="w-[100%] md:w-[45%]">
                                    <label className='text-white text-xs tracking-widest'>Rate</label>
                                    <input type="number" value={tierRate['rate'+(index+1)] ? tierRate['rate'+(index+1)] : ''} onChange={(e)=>handleTierRate(e,index+1)}  className='w-[100%] my-2 p-2 border-2 rounded-md bg-black text-white border-[#f6ae2d]'/>
                                    </div>
                                    
                                </div>
                            </div>
                    )
                }) 
                
                }
            </div>


                <div className='flex justify-center'>
                    <button onClick={handleSave} disabled={loading} className={loading? 'bg-[#f6b02dd1] rounded-sm w-[100%] md:w-[60%] py-3 font-semibold tracking-widest text-md sm:text-xl' :'bg-[#f6ae2d] rounded-sm w-[100%] md:w-[60%] py-3 font-semibold tracking-widest text-md sm:text-xl'}>SAVE</button> 
                </div>

        </div>
    </div>
  )
}

export default AddScreen

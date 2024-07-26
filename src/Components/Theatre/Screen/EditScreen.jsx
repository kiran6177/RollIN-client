import React, {  useEffect,  useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { HiPencilSquare } from "react-icons/hi2";
import { LocalizationProvider, MobileTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs';
import { Toaster, toast } from 'sonner';
import { IoIosClose } from 'react-icons/io';
import { theatreEditScreen, theatreExtendMovieForScreen, theatreRemoveMovieFromScreen } from '../../../features/theatreFeat/theatreFeatAction';
import { resetTheatreFeatActions } from '../../../features/theatreFeat/theatreFeatSlice';
import { useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import RemoveModal from './RemoveModal';
import ExtendModal from './ExtendModal';
import ChangeShowModal from './ChangeShowModal';


function EditScreen() {
    const [searchParams] = useSearchParams();
    const screen_id = searchParams.get('id')
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const {theatreScreenData,loading,message,error} = useSelector(state=>state.theatreFeat)
    const {theatreData,theatreToken} = useSelector(state=>state.theatre);

    const [screenName,setScreenName] = useState('')
    const [showInput,setShowInput] = useState(false);

    const [time,setTime] = useState(dayjs('2024-08-09T15:30'))

    const [enrolledMovies,setEnrolledMovies] = useState([])

    const [showData,setShowData] = useState([])


    const [tier,setTier] = useState(0);
    const [tierCount,setTierCount] = useState(0)

    const [tierName,setTierName] = useState({})
    const [tierSeats,setTierSeats] = useState({})
    const [tierRate,setTierRate] = useState({})

    const [existingTiers,setExistingTiers] = useState([])

    const [speakers,setSpeakers] = useState({
        front:0,
        left:0,
        rear:0,
        right:0,
        center:0,
        subwoofers:0,
    })


    const [showRemove,setShowRemove] = useState(false);
    const [showExtend,setShowExtend] = useState(false);
    const [showChangeMovie,setShowChangeMovie] = useState(false)

    const [isValidWithLayout,SetIsValidWithLayout] = useState(false)

    const getDaysDifference = (enroll_to_date)=>{
        console.log("DAYSS");
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
 
                    setExistingTiers(screen.tiers.map(tier=>{
                        return {
                            ...tier,
                            seatsChanged:false
                        }
                    }))
                    let tierValidCount = 0;
                    for(let tier of screen.tiers){
                        if(tier?.layout?.length > 0){
                            tierValidCount++
                        }
                    }
                    if(tierValidCount > 0 && tierValidCount === screen?.tiers?.length){
                        SetIsValidWithLayout(true) 
                    }

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

    useEffect(()=>{
        if(error && error.length > 0){
            error.map(err=>toast.error(err))
            dispatch(resetTheatreFeatActions())
            return
        }
        if(message){
            toast.success(message)
            setTimeout(()=>{
                if(message === 'Screen Updated Successfully.'){
                    navigate('/theatre',{replace:true})
                }else{
                    window.scrollTo(0,0)
                }
            },1000)
            dispatch(resetTheatreFeatActions())
            return
        }
    },[message,error])
    
    useEffect(()=>{
        setTierName(()=>{
            let obj = {}
            for(let i = 0 ; i < tierCount ; i++){
                obj['name'+(i+1)] = ''
            }
            return obj
        })
        setTierSeats(()=>{
            let obj = {}
            for(let i = 0 ; i < tierCount ; i++){
                obj['seats'+(i+1)] = ''
            }
            return obj
        })
        setTierRate(()=>{ 
            let obj = {}
            for(let i = 0 ; i < tierCount ; i++){
                obj['rate'+(i+1)] = ''
            }
            return obj
        })
    },[tierCount]) 


 
    useEffect(()=>{ 
        console.log("TIER",tier , typeof tier);
        let tierInt = parseInt(tier)
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
        for(let i = 0 ; i < showData.length ; i++){
            if(showData[i].showtime === timetoSave){
                toast.error('Show already exists.')
                return
            }
        }
        setShowData(prev=>{
            return [...prev,{showtime:timetoSave,movie_id:null}]
        })
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
                [`seats${index}`]:e.target.value ? parseInt(e.target.value) : 0
            }
        })
    }

    const handleTierRate = (e,index)=>{
        setTierRate((prev)=>{
            return {
                ...prev,
                [`rate${index}`]:e.target.value ? parseInt(e.target.value) : 0
            }
        })
    }

    const handleTierRemove = (i)=>{
        setExistingTiers(existingTiers.filter((_,index)=>index !== i))
    }


    const handleSave = ()=>{
        

        const tierData = []
        console.log(tierCount); 
        if(tierCount > 0){
            for(let i = 1 ; i <= tierCount ; i++){
                let isExisting = false;
                existingTiers.forEach((singleTier)=>{
                    if(singleTier.name.trim() === tierName[`name${i}`].trim()){
                        isExisting = true
                    }
                })
                let isDuplicate = false;
                for(let j = 1 ; j <= tierCount ; j++){
                    if(tierName[`name${i}`].trim() === tierName[`name${j}`].trim() && i !== j){
                    isDuplicate = true
                    }
                }
                if(isExisting || isDuplicate){
                    toast.error('Duplicate Entries.')
                    return;
                }
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
        }
        let i = 0
        for(let existTier of existingTiers){
            let isExisting = false;
            existingTiers.forEach((singleTier,index)=>{

                if(singleTier.name === existTier.name && (i !== index)){
                    console.log("exist",singleTier.name,index);
                    console.log("existOne",existTier.name,i);
                    isExisting = true
                }
            })
            if(isExisting){
                toast.error('Duplicate Entries.')
                return;
            }
            if(existTier.name.trim() === ''){
                toast.error('Enter tier name.')
                return;
            }
            if(existTier.seats === ''){
                toast.error('Enter seats.')
                return;
            }
            if(existTier.rate === ''){
                toast.error('Enter tier rate.')
                return;
            }
            if(parseInt(existTier.seats) < 1){
                toast.error('Enter valid seats.')
                return;
            }
            if(parseInt(existTier.rate) < 1){
                toast.error('Enter valid tier rate.')
                return;
            }
            tierData.push({
                ...existTier,
                name:existTier.name,
                seats:existTier.seats,
                rate:existTier.rate
            })
            i++
        }
        console.log("TIERDATA",tierData);
        if(showData?.length === 0 ){
            toast.error('Complete the details.')
        }else if(showData?.length === 0){
            toast.error('Complete show details.')
        }else if(speakers.front === 0 || speakers?.left === 0 || speakers?.right === 0 || speakers?.rear === 0){
            toast.error('Complete sound details.')
        }else if(speakers.front < 1 || speakers?.left < 1 || speakers?.right < 1 || speakers?.rear < 1 || speakers?.center < 0 || speakers?.subwoofers < 0){
            toast.error('Provide valid sound details.')
        }else {
            console.log("VALIDATED");
            console.log(screenName);
            const data = {screen_id:screen_id,name:screenName,tierData,showData,speakers}
            dispatch(theatreEditScreen({data,token:theatreToken}))
        }
    }

    const removeMovie = (movie_id)=>{
        console.log(screen_id,movie_id);
        dispatch(theatreRemoveMovieFromScreen({data:{screen_id,movie_id},token:theatreToken}))
        setShowRemove(false)
    }

    const extendMovie = (movie_id,toDate)=>{
        const to = new Date(toDate)
        let movie;
        enrolledMovies.map(mov=>{
            if(mov.movie_id === movie_id){
                movie = mov 
            }
        })
        if(movie.enroll_to > to){
            toast.error('Movie has already enrolled above this range.')
        }else{
            console.log(screen_id,movie_id,to);
            dispatch(theatreExtendMovieForScreen({data:{screen_id,movie_id,enroll_toDate:to},token:theatreToken}))
        }
        setShowExtend(false)
    }

    const handleShowMovieChange = (show)=>{
        setShowChangeMovie(show)
    }


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
                <button onClick={()=>navigate(`/theatre/editscreen/enrollmovie?screen_id=${screen_id}`)} className='bg-[#f6ae2d] rounded-sm px-8 py-3 font-medium tracking-wider text-sm sm:text-base'>ENROLL MOVIE</button>
            </div>
            </div>

            {enrolledMovies && enrolledMovies.length > 0 && 
            <div className='border-2 border-[#f6ae2d] rounded-md bg-black px-8 py-6 my-6'>
                <h4 className='text-[#f6ae2d] tracking-wider m'>ENROLLED MOVIES</h4>
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
                                <button onClick={()=>setShowRemove(movie)} className='bg-[#f6ae2d] px-6 py-2 text-sm sm:text-base font-medium rounded-sm border-2 border-[#f6ae2d] hover:bg-black hover:text-white transition-all duration-150 ease-in-out'>REMOVE</button>
                                <button onClick={()=>setShowExtend(movie)} className='bg-[#f6ae2d] px-6 py-2 text-sm sm:text-base font-medium rounded-sm border-2 border-[#f6ae2d] hover:bg-black hover:text-white transition-all duration-150 ease-in-out'>EXTEND</button>
                                <p className='text-white text-xs'><span className='text-[#f6ae2d]'>Enrolled Days left : </span>{movie?.daysLeft}</p>
                            </div>
                        </div>
                         
                    </div>
                    )
                })
                }
            </div>}


            <div className='border-2 border-[#f6ae2d] rounded-md bg-black px-8 py-6 my-6'>
                <h4 className='text-[#f6ae2d] tracking-wider '>SHOWS</h4>
                <p className='text-white text-xs b-8'><sup>*</sup> Extended movies needed Show re-assignment.</p>
                <div className='flex flex-col lg:flex-row justify-between'>
                    <div className='lg:w-[55%]'>
                    {
                        showData && showData.length > 0 && 
                        showData.map((show,i)=>{
                            return(
                                <div key={show.showtime+i} className='relative flex flex-col gap-6 text-sm sm:text-base sm:flex-row justify-between border-2 border-[#f6ae2d] text-white w-[100%] rounded-sm p-6 my-6'>
                                    <IoIosClose onClick={()=>{ 
                                        // setShowData(showData.filter((showObj)=>showObj.showtime !== show.showtime))
                                        }} className="absolute cursor-pointer right-1 top-1 w-[1.5rem] h-[1.5rem]"/>
                                    <div className='flex flex-col'>
                                        <h3>SHOWTIME : {show.showtime}</h3>
                                        <p className=' text-xs sm:text-sm text-[#f6ae2d]'>{show?.movie_id !== null? enrolledMovies.find(mov=>mov.movie_id === show?.movie_id)?.title :'No Movie'}</p> 
                                    </div>
                                    <div className='sm:w-[40%] flex flex-col items-center justify-center'>
                                        <button onClick={()=>handleShowMovieChange(show)} disabled={!isValidWithLayout}  className={!isValidWithLayout ? 'bg-[#c38c25c2] text-black px-6 py-2' :'bg-[#f6ae2d] text-black px-6 py-2'} >CHANGE</button>
                                        {!isValidWithLayout && <p className='text-[10px] text-white tracking-wider'>Complete the Layout.</p>}
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
                            front:parseInt(e.target.value)
                        }
                    })}  className='w-[100%] my-2 p-2 border-2 rounded-md bg-black text-white border-[#f6ae2d]'/>
                    </div>
                    <div className="w-[90%] md:w-[45%]">
                    <label className='text-white text-xs tracking-widest'>Left Speakers</label>
                    <input type="number" value={speakers.left} onChange={(e)=>setSpeakers(prev=>{
                        return{
                            ...prev,
                            left:parseInt(e.target.value)
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
                            rear:parseInt(e.target.value)
                        }
                    })}  className='w-[100%] my-2 p-2 border-2 rounded-md bg-black text-white border-[#f6ae2d]'/>
                    </div>
                    <div className="w-[90%] md:w-[45%]">
                    <label className='text-white text-xs tracking-widest'>Right Speakers</label>
                    <input type="number" value={speakers.right} onChange={(e)=>setSpeakers(prev=>{
                        return{
                            ...prev,
                            right:parseInt(e.target.value)
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
                            center:parseInt(e.target.value)
                        }
                    })}  className='w-[100%] my-2 p-2 border-2 rounded-md bg-black text-white border-[#f6ae2d]'/>
                    </div>
                    <div className="w-[90%] md:w-[45%]">
                    <label className='text-white text-xs tracking-widest'>Subwoofers</label>
                    <input type="number" value={speakers.subwoofers} onChange={(e)=>setSpeakers(prev=>{
                        return{
                            ...prev,
                            subwoofers:parseInt(e.target.value)
                        }
                    })} className='w-[100%] my-2 p-2 border-2 rounded-md bg-black text-white border-[#f6ae2d]'/>
                    </div>
                </div>
            </div>


            <div className='border-2 border-[#f6ae2d] rounded-md bg-black px-8 py-6 my-6'>
                <h4 className='text-[#f6ae2d] tracking-wider mb-8'>SEAT LAYOUT</h4>
                <h6 className='text-white tracking-wider text-sm mb-4' >EXISTING TIERS</h6>
                {
                            existingTiers.map((tier,index)=>{
                                return (
                                <div key={index} className='my-10'>
                                        <div className='relative flex flex-col md:flex-row justify-between'>
                                            <button onClick={()=>handleTierRemove(index)} className='absolute top-1 right-1 text-white tracking-wider text-sm mb-4' >REMOVE</button>
                                            <div className="w-[100%] md:w-[45%]">
                                            <label className='text-white text-xs tracking-widest'>Name</label>
                                            <input type="text" value={tier.name} onChange={(e)=>{setExistingTiers(existingTiers.map((tier,i)=>{
                                                if(i === index){
                                                    return {
                                                        ...tier,
                                                        name:e.target.value.toUpperCase()
                                                    }
                                                }
                                                return tier
                                            }))}} className='w-[100%] my-2 p-2 border-2 rounded-md bg-black text-white border-[#f6ae2d]'/>
                                            </div>
                                            <div className="w-[100%] md:w-[45%]">
                                            <label className='text-white text-xs tracking-widest'>Seats</label>
                                            <input type="number" value={tier.seats} onChange={(e)=>{setExistingTiers(existingTiers.map((tier,i)=>{
                                                if(i === index){
                                                    return {
                                                        ...tier,
                                                        seats:parseInt(e.target.value), 
                                                        seatsChanged:true
                                                    }
                                                }
                                                return tier
                                            }))}}  className='w-[100%] my-2 p-2 border-2 rounded-md bg-black text-white border-[#f6ae2d]'/>
                                            </div>
                                        </div>
                                        <div className='flex flex-col md:flex-row justify-between'>
                                            <div className="w-[100%] md:w-[45%]">
                                            <label className='text-white text-xs tracking-widest'>Rate</label>
                                            <input type="number" value={tier.rate} onChange={(e)=>{setExistingTiers(existingTiers.map((tier,i)=>{
                                                if(i === index){
                                                    return {
                                                        ...tier,
                                                        rate:parseInt(e.target.value) 
                                                    }
                                                }
                                                return tier
                                            }))}}  className='w-[100%] my-2 p-2 border-2 rounded-md bg-black text-white border-[#f6ae2d]'/>
                                            </div>
                                            <div className="w-[100%] md:w-[45%] flex flex-col items-start py-2">
                                                <button disabled={tier?.seatsChanged} onClick={()=>navigate(`/theatre/editscreen/config?tier_id=${tier._id}&screen_id=${screen_id}`)} className={tier?.seatsChanged? 'bg-[#f6b02da2] rounded-sm w-[100%] py-3 font-medium tracking-wider text-sm sm:text-base' :'bg-[#f6ae2d] rounded-sm w-[100%] py-3 font-medium tracking-wider text-sm sm:text-base'}>CONFIG SEAT</button> 
                                                {tier?.seatsChanged && <p  className='text-white text-xs tracking-widest my-1'>Save changes for edits.</p>}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                            
                        }
                <h6 className='text-white tracking-wider text-sm mb-4' >ADD TIERS</h6>

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
                                    {/* <div className="w-[100%] md:w-[45%] flex items-end py-2">
                                        <button className='bg-[#f6ae2d] rounded-sm w-[100%] py-3 font-medium tracking-wider text-sm sm:text-base'>CONFIG SEAT</button> 
                                    </div> */}
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
        <RemoveModal isOpen={showRemove} set={setShowRemove} handleConfirm={removeMovie} />
        <ExtendModal isOpen={showExtend} set={setShowExtend} handleConfirm={extendMovie} />
        <ChangeShowModal isOpen={showChangeMovie} set={setShowChangeMovie}  enrolledMovies={enrolledMovies} />
    </div>
  )
}

export default EditScreen

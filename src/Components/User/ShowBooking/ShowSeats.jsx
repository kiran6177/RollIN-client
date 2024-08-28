import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { userGetSingleTheatre } from '../../../features/userTheatres/userTheatreActions';
import { userGetSingleShowData, userSeatReservation } from '../../../features/userBooking/userBookingActions';
import { IoLocationOutline } from "react-icons/io5";
import { MdChair } from 'react-icons/md';
import { LuArmchair } from "react-icons/lu";
import { BiSolidSpeaker } from 'react-icons/bi';
import { RiSpeaker2Fill, RiSpeaker3Fill } from 'react-icons/ri';
import SelectTickets from './SelectTickets';
import { HiOutlinePencil } from "react-icons/hi";
import SessionTimedOutModal from './SessionTimedOutModal';
import { resetUserBookings, setSelectedSeats } from '../../../features/userBooking/userBookingSlice';
import LoadingSpinner from '../../Loaders/LoadingSpinner';

function ShowSeats() {
    const [searchParams] = useSearchParams();
    const show_id = searchParams.get('show_id')
    const date = searchParams.get('date')
    const theatre_id = searchParams.get('theatre_id')
    const {theatresDetailData} = useSelector(state=>state.userTheatre)
    const {singleShowData,message,loading} = useSelector(state=>state.userBooking)
    const {userToken} = useSelector(state=>state.user)
    const [singleTheatre,setSingleTheatre] = useState(null);
    const theatreLoading = useSelector(state=>state.userTheatre.loading)

    const [currentDate,setCurrentDate] = useState('')
    const [ticketCount,setTicketCount] = useState(0);
    const [selectedSeatCount,setSelectedSeatCount] = useState(0);
    const [seatData,setSeatData] = useState([])
    const [amount,setAmount] = useState(0);

    const [showSelectTicket,setShowSelectTicket] = useState(false);

    const [singleShow,setSingleShow] = useState(null);
    const [showSession,setShowSession] = useState(false); 

    const [showPay,setShowPay] = useState(false);

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()

    useEffect(()=>{
        if(theatre_id && show_id && date){
            const currentDate = new Date(date)
            setCurrentDate(currentDate.toUTCString().split(' ')[1] + ' ' + currentDate.toUTCString().split(' ')[2] + ' ' + currentDate.toUTCString().split(' ')[0] )
            const data = {date:date,show_id:show_id}
            dispatch(userGetSingleShowData({data,token:userToken}))
            if(theatresDetailData?.length > 0){
                let theatreFound = false;
                for(let theatre of theatresDetailData){
                    if(theatre._id == theatre_id){
                        setSingleTheatre(theatre)
                        theatreFound = true;
                        break;
                    }
                }
                if(!theatreFound){
                dispatch(userGetSingleTheatre({theatre_id}))
                }
            }else{
                dispatch(userGetSingleTheatre({theatre_id}))
            }
        }
    },[theatre_id,show_id,date,theatresDetailData])

    useEffect(()=>{
        if(ticketCount === 0){
            setShowSelectTicket(true)
        }else{
            setShowSelectTicket(false)
        }
    },[ticketCount])

    useEffect(()=>{
        if(singleShowData){
            setSingleShow(singleShowData)
        }
    },[singleShowData])

    useEffect(()=>{
        if(message === true){
            navigate(`/buytickets?theatre_id=${theatre_id}&date=${date}&show_id=${show_id}`,{replace:true})
            dispatch(resetUserBookings())
        }else if(message === false){
            setShowSession(true)
        }
    },[message])

    useEffect(()=>{
        if(singleShow){
            let count = 0;
            const checkData = JSON.parse(JSON.stringify(singleShow))
            for(let seatObj of checkData.shows[0].reservations){
                for(let singleObj of Object.values(seatObj)[0]){
                    if(singleObj.status === 'SELECTED'){
                        count++
                    }
                }
            }
            if(count === ticketCount && ticketCount > 0){
                setShowPay(true)
            }else{
                setShowPay(false)
            }
        }
    },[singleShow])

    const handleSeatSelection = (seats,key)=>{
        console.log(seats ,key,ticketCount); 
        const selectedSeats = [];
        if(seats?.status === 'SELECTED'){
            selectedSeats.push(seats?.seat_number)
        }else{
            const clicked = parseInt(seats.seat_number.match(/\d+/g).join(''));
            for(let i = 0 ; i < (ticketCount - selectedSeatCount) ; i++ ){
                selectedSeats.push(key+(clicked+i))
            }
        }
        console.log(selectedSeats);
        const newShowData = JSON.parse(JSON.stringify(singleShow))
        const updatedReservations = newShowData.shows[0].reservations.map(seatObj=>{
            if(Object.keys(seatObj)[0] === key){
                const valueUpdated = Object.values(seatObj)[0].map(singleObj=>{
                    if(selectedSeats.includes(singleObj.seat_number)){
                        if(singleObj.status === 'AVAILABLE'){
                            setSelectedSeatCount(prev=>prev+1)
                            setSeatData(prev=>[...prev,singleObj.seat_number])
                            return {
                                ...singleObj,
                                status:'SELECTED'
                            }
                        }
                        if(singleObj.status === 'SELECTED'){
                            setSelectedSeatCount(prev=>prev-1)
                            setSeatData(prev=>prev.filter(data=>data !== singleObj.seat_number))
                            return {
                                ...singleObj,
                                status:'AVAILABLE'
                            }
                        }
                        return singleObj
                    }
                    return singleObj
                })
                return {
                    [Object.keys(seatObj)[0]]:valueUpdated
                }
            }
            return seatObj
        })
        const dataToUpdate = {
            ...newShowData,
            shows:[{
                ...newShowData.shows[0],
                reservations:updatedReservations
            }]
        }
        setSingleShow(dataToUpdate)
    }

    useEffect(()=>{
        if(singleShow?.tiers?.length > 0 && seatData?.length > 0){
            let amount = 0;
            let seatIdentifiers = seatData.map(item=>item.replace(/[^a-zA-Z]/g, ''))
            seatIdentifiers.map(seatId=>{
                for(let tier of singleShow?.tiers){
                    if(tier?.identifiers.includes(seatId)){ 
                        amount+= tier?.rate
                        break;
                    }
                }  
            })
            setAmount(amount)
        }
    },[seatData])

    const handlePayment = ()=>{
        console.log(seatData);
        const data = {date,show_id,seatData}
        dispatch(userSeatReservation({data,token:userToken}))
        dispatch(setSelectedSeats(seatData))
    }
    if(theatreLoading || loading){
        return <LoadingSpinner/>
    }else{
  return (
    <div className='py-10 bg-[#15121B] '>
        <div className='pt-28 sm:px-12  min-h-[10rem] '>
            <div className='sm:border-2 border-[#f6ae2d] rounded-sm bg-black px-4 sm:px-0'>
                <div className='border-b-2 border-[#f6ae2d] py-6 px-10 flex flex-col md:flex-row gap-4 justify-between'>
                    <div className='flex flex-col gap-4'>
                        <h5 onClick={()=>navigate(`/moviedetail?movie_id=${singleShow?.movie?.movie_id}`)} className='text-[#f6ae2d] text-2xl sm:text-4xl font-semibold tracking-widest cursor-pointer'>{singleShow?.movie?.title}</h5>
                        <h6 onClick={()=>navigate(`/screenwithmovies?theatre_id=${theatre_id}`)} className='text-white text-md sm:text-base flex gap-3 items-center cursor-pointer'><IoLocationOutline className='text-[#f6ae2d]' /> {singleTheatre?.name}  </h6>
                        <h6 className='text-white text-[10px] sm:text-xs'>{singleTheatre?.address?.completeLocation} , {currentDate} {singleShow?.shows[0]?.showtime}</h6>
                        {
                            seatData?.length > 0 && 
                            <h6 className='text-white text-[10px] sm:text-xs'> Seats : {
                                    seatData.map(seat=>seat+ " ")
                                }
                            </h6>
                        }
                    </div>
                    <div>
                        <p onClick={()=>setShowSelectTicket(true)} className='cursor-pointer text-white text-sm tracking-wider border-2 border-[#f6ae2d] rounded-md px-3 py-1 flex items-center gap-2'>{ticketCount} {ticketCount > 1 ? 'tickets' : 'ticket'}<HiOutlinePencil className='text-[#f6ae2d]' /></p>
                    </div>
                </div>
                <div className='sm:border-b-2 border-[#f6ae2d] py-6 px-5 sm:px-10 flex flex-col gap-4'> 
                    {showPay && <div className='flex justify-center my-5'>
                        <button onClick={handlePayment} className='bg-[#f6ae2d] border-2 border-[#f6ae2d] text-sm md:text-base text-black px-4 py-1 md:py-2 rounded-sm w-[80%] md:w-[40%] font-medium tracking-widest hover:bg-black hover:text-white transition-all duration-150 ease-linear'>PAY Rs.{amount}</button>
                    </div>}
                    <div className='relative my-6 sm:my-16 md:mx-12 lg:mx-28 xl:mx-36'> 
                        {
                            singleShow && [...singleShow?.tiers].reverse().map((tierData,i)=>{ 
                                return (
                                    <div key={tierData?.name+i} className='flex flex-col text-white w-[85%] mx-auto text-[12px] sm:text-xs md:text-base '>
                                        <div key={'first'+i} className='flex gap-4 items-center justify-between my-3'>
                                            <div className='flex flex-col sm:flex-row gap-4 items-center'>
                                                <p className='text-[#f6ae2d]'>{tierData?.name}</p>
                                                <p>Rs. {tierData?.rate}</p>
                                            </div>
                                             
                                        </div> 
                                        <div>
                                            {
                                                tierData?.identifiers?.length > 0 && tierData?.identifiers.map((key,i)=>{
                                                    const value = singleShow?.shows[0]?.reservations?.find(obj=>Object.keys(obj)[0] === key)
                                                    return(
                                                    <div key={"main"+key+i} className='flex h-[100%] w-[100%] items-center mx-auto my-2'> 
                                                        <div className='text-white text-xs md:text-base'>
                                                            <p className='text-[10px] sm:text-xs md:text-base w-[1.5rem]'>{key}</p>
                                                        </div>
                                                        <div key={key+i} style={{gridTemplateColumns:`repeat(${value[key]?.length},1fr)`}} className={`grid w-[100%]`}> 
                                                            {value[key].map((seats,i)=>{
                                                                return(
                                                                    <div key={"chair"+key+i}  className={` aspect-square flex justify-center items-center`}>
                                                                        {seats.status !== 'INVALID' ? seats.status === 'AVAILABLE' ? <LuArmchair onClick={()=>handleSeatSelection(seats,key)} className='text-[#f6ae2d] w-[80%] sm:w-[60%] h-[80%] sm:h-[60%] cursor-pointer hover:scale-[1.1] transition-all duration-150 ease-linear' /> : seats.status === "RESERVED" || seats.status === 'SOLD' ?  <MdChair  className='text-[#f6b02d7c] w-[80%] sm:w-[60%] h-[80%] sm:h-[60%] cursor-pointer hover:scale-[1.1] transition-all duration-150 ease-linear' /> : <MdChair onClick={()=>handleSeatSelection(seats,key)} className='text-[#f6ae2d] w-[80%] sm:w-[60%] h-[80%] sm:h-[60%] cursor-pointer hover:scale-[1.1] transition-all duration-150 ease-linear' /> : '' }
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
                        <div className='w-[100%] flex justify-center mt-24'>
                            <div className='w-[50%] border-black border-b-[#f6ae2d] border-b-[1rem] md:border-b-[2rem] border-r-[1rem] sm:border-r-[2rem] md:border-r-[3rem] lg:border-r-[4rem] xl:border-r-[5rem] border-l-[1rem] sm:border-l-[2rem] md:border-l-[3rem] lg:border-l-[4rem] xl:border-l-[5rem]'></div>
                        </div>
                        {/* front speakers */}
                        <div className='text-[#f6ae2d] absolute bottom-10 flex justify-evenly w-[100%] '>
                            {
                                singleShow?.sound?.front >  0 && Array.from({length:singleShow.sound.front}).map((_,index)=>{
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
                            singleShow?.sound?.subwoofers > 0 && Array.from({length:singleShow.sound.subwoofers}).map((_,ind)=>{
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
                            singleShow?.sound?.center > 0 && Array.from({length:singleShow.sound.center}).map((_,ind)=>{
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
                        <div className='text-[#f6ae2d] absolute -top-8 sm:-top-14 flex justify-evenly w-[100%] '>
                            {
                                singleShow?.sound?.rear >  0 && Array.from({length:singleShow.sound.rear}).map((_,index)=>{
                                    return(
                                        <BiSolidSpeaker key={'rear'+index}  className='md:h-[2rem] md:w-[2rem]'/>
                                    )
                                })
                            }
                        </div>
                        {/* left speakers */}
                        <div className='text-[#f6ae2d] absolute -left-3 md:-left-0 top-0 flex flex-col justify-evenly h-[100%] '>
                            {
                                singleShow?.sound?.left >  0 && Array.from({length:singleShow.sound.left}).map((_,index)=>{
                                    return(
                                        <BiSolidSpeaker key={'left'+index}  className='md:h-[2rem] md:w-[2rem]'/>
                                    )
                                })
                            }
                        </div>
                        {/* right speakers */}
                        <div className='text-[#f6ae2d] absolute -right-3 md:-right-0 top-0 flex flex-col justify-evenly h-[100%] '>
                            {
                                singleShow?.sound?.right >  0 && Array.from({length:singleShow.sound.right}).map((_,index)=>{
                                    return(
                                        <BiSolidSpeaker key={'right'+index}  className='md:h-[2rem] md:w-[2rem]'/>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
            </div> 
            <SelectTickets isOpen={showSelectTicket} set={setShowSelectTicket} setTicketCount={setTicketCount} />
            <SessionTimedOutModal isOpen={showSession} set={setShowSession} url={location?.state?.previousUrl} />
        </div>
    )
    }
}

export default ShowSeats

import React, { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { IoLocationOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import { userGetSingleTheatre } from '../../../features/userTheatres/userTheatreActions';
import { userGetOneMovie } from '../../../features/userMovies/userMovieActions';
import { resetPaymentStatus, resetSelectedSeats } from '../../../features/userBooking/userBookingSlice';
import { userPayNow, userPayProcess } from '../../../features/userBooking/userBookingActions';
import { doPayment } from '../../../utils/cashfreeConfig';
import { toast, Toaster } from 'sonner';
import SessionTimedOutModal from './SessionTimedOutModal';
const PaymentFailure  = lazy(()=>import( './PaymentFailure'));
const PaymentSuccess = lazy(()=>import('./PaymentSuccess'));

function Checkout() {
    const [searchParams] = useSearchParams();
    const show_id = searchParams.get('show_id')
    const date = searchParams.get('date')
    const theatre_id = searchParams.get('theatre_id')
    const {singleShowData,selectedSeats,payment_data,error,loading,booking_data} = useSelector(state=>state.userBooking)
    const {singleMovieDetail} = useSelector(state=>state.userMovie)
    const {theatresDetailData} = useSelector(state=>state.userTheatre)
    const {userToken,userData} = useSelector(state=>state.user)
    const [singleShow,setSingleShow] = useState(null);
    const [singleTheatre,setSingleTheatre] = useState(null);
    const [currentDate,setCurrentDate] = useState('')

    const [seatWithTiers,setSeatWithTiers] = useState(null);
    const [totalAmount,setTotalAmount] = useState(0);
    const [timeout,setSessionTimeout] = useState(false);

    const [showFail,setShowFail] = useState(false);
    const [showSuccess,setShowSuccess] = useState(false);


    const orderIdRef = useRef(null)

    const [email,setEmail] = useState('')
    const [emailError,setEmailError] = useState('')
    const [mobile,setMobile] = useState('')
    const [mobileError,setMobileError] = useState('')
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


    const navigate = useNavigate();
    const dispatch = useDispatch();

    const getTierNames = ()=>{
        const tiers = {}
        let amount = 0;
        selectedSeats.map(seatId=>{
            for(let tier of singleShow?.tiers){
                if(tier?.identifiers.includes(seatId.replace(/[^a-zA-Z]/g, ''))){ 
                    amount += tier.rate;
                    if(tiers[tier.name]){
                        tiers[tier.name] = [...tiers[tier.name],seatId] 
                    }else{
                        tiers[tier.name] = [seatId]
                    }
                }
            }  
        })
        setSeatWithTiers(tiers)
        setTotalAmount(amount)
    }

    const handleReload = ()=>{
        console.log("HI");
        if(orderIdRef.current){
            const data = {order_id:orderIdRef.current}
            dispatch(userPayProcess({data,token:userToken}))
        }
        document.getElementById("cashfree-modal").style.display = "none"
        orderIdRef.current = null;
    }

    useEffect(()=>{
        window.addEventListener('beforeunload',handleReload)

        return()=>{
            
        window.removeEventListener('beforeunload',handleReload)
        }
    },[])

    useEffect(()=>{
        if(userData){
            setEmail(userData?.email) 
            setMobile(userData?.mobile)
        }
    },[userData])

    useEffect(()=>{
        if(booking_data!==null){
            if(booking_data){
                setShowSuccess(true);
            }else{
                setShowFail(true);
            }
        }
    },[booking_data])

    useEffect(()=>{
        if(singleShowData && theatre_id && date){
            console.log(singleShowData);
            setSingleShow(singleShowData)
            if(!singleMovieDetail || singleMovieDetail?._id != singleShowData?.movie?.movie_id){
                if(localStorage.getItem('city')){
                    const loc = JSON.parse(localStorage.getItem('city')).loc;
                    dispatch(userGetOneMovie({movie_id:singleShowData?.movie?.movie_id,location:loc})) 
                }else{
                    dispatch(userGetOneMovie({movie_id:singleShowData?.movie?.movie_id}))
                }
            }
            const currentDate = new Date(date)
            setCurrentDate(currentDate.toUTCString().split(' ')[1] + ' ' + currentDate.toUTCString().split(' ')[2] + ' ' + currentDate.toUTCString().split(' ')[0] )
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
        }else{
            navigate('/')
        }

        return ()=>{
            dispatch(resetSelectedSeats())
        }
    },[singleShowData,theatre_id,date])

    useEffect(()=>{
        if(error && error.length > 0 && error[0] === 'Invalid Seat booked!!'){
            setSessionTimeout(true)
        }
    },[error])

    useEffect(()=>{
        if(selectedSeats?.length > 0 && singleShow?.tiers?.length > 0){
            getTierNames()
        }

    },[selectedSeats,singleShow])


    useEffect(()=>{
        if(payment_data){
            async function pay(){
                const result = await doPayment(payment_data?.payment_status)
                console.log(result);
                if(result.error){
                    console.log(result.error);
                    if(payment_data){
                        orderIdRef.current = null;
                        const data = {order_id:payment_data?.order_id}
                        dispatch(userPayProcess({data,token:userToken}))
                        if(document.getElementById("cashfree-modal")){
                            document.getElementById("cashfree-modal").style.display = "none"
                        }
                    }
                    return
                }
                if(result.redirect){
                    console.log("REDIRECT");
                    return
                }
                if(result.paymentDetails){
                    console.log("SUCCESS",result.paymentDetails);
                    if(payment_data){
                        orderIdRef.current = null;
                        const data = {order_id:payment_data?.order_id}
                        dispatch(userPayProcess({data,token:userToken}))
                        if(document.getElementById("cashfree-modal")){
                            document.getElementById("cashfree-modal").style.display = "none"
                        }
                    }
                    return
                }
            }
            orderIdRef.current = payment_data?.order_id
            pay()
            document.getElementById("cashfree-modal").style.display = "flex"
        }

        return ()=>{
            console.log("gggg",payment_data);
            if(payment_data && orderIdRef.current){
                orderIdRef.current = null;
                console.log("BYE",payment_data?.order_id);
                const data = {order_id:payment_data?.order_id}
                dispatch(userPayProcess({data,token:userToken}))
                dispatch(resetPaymentStatus())  
            }
        }
    },[payment_data])

    const handlePayNow = ()=>{
        if(!email && !mobile){
            toast.error('Please share your contacts!!')
        }else if(!emailRegex.test(email)){ 
            toast.error('Invalid Email!!')
        }else if(!/[\d]/g.test(mobile)){ 
            toast.error('Invalid Mobile!!')
        }else if(mobile?.toString()?.length !== 10){ 
            toast.error('Mobile number should be 10 digits!!')
        }else{
            const data = {selectedSeats,show_id,date,userDetails:{email,mobile}} 
            dispatch(userPayNow({data,token:userToken}))
        }
        
    }

  return (
    <div className='py-10 bg-[#15121B] relative'>
        <div className='pt-28 px-12  min-h-[10rem] '>
            <Toaster richColors />
            <div className='border-2 border-[#f6ae2d] rounded-sm bg-black '>
                <div className='  flex flex-col-reverse md:flex-row gap-4 justify-between  md:max-h-[14rem] overflow-hidden'>
                    <div className='flex flex-col gap-4 py-6 px-10'>
                        <h5 className='text-[#f6ae2d] text-2xl  lg:text-4xl font-semibold tracking-widest cursor-pointer'>{singleShow?.movie?.title}</h5>
                        <h6 className='text-white text-sm lg:text-base flex gap-3 items-center cursor-pointer'><IoLocationOutline className='text-[#f6ae2d]' /> {singleTheatre?.name}  </h6>
                        <h6 className='text-white text-[10px] md:text-xs'>{singleTheatre?.address?.completeLocation} , {currentDate} {singleShow?.shows[0]?.showtime}</h6>
                        {
                            selectedSeats?.length > 0 && 
                            <h6 className='text-sm text-[#f6ae2d] md:text-lg'> Seats : {
                                    selectedSeats.map(seat=>seat+ " ")
                                }
                            </h6>
                        }
                    </div>
                    <div className='w-[100%] md:w-[90%] lg:w-[45%] h-[10rem] md:h-auto overflow-hidden relative'>
                        <div className='w-[100%] h-[100%] bg-gradient-to-t md:bg-gradient-to-r from-black to-transparent absolute'></div>
                        <img src={singleMovieDetail?.backdrop_path} alt="" />
                    </div>
                </div>
                
            </div>

            <div className='flex flex-col gap-6 md:gap-0 md:flex-row justify-between my-8'>
                    <div className='md:w-[68%] font-medium tracking-wider bg-black border-2 border-[#f6ae2d] rounded-md py-6 px-10'> 
                        <h3 className='text-[#f6ae2d] '>Share Contact Details</h3>
                        <h3 className='text-white text-sm my-5'>We send tickets for you.</h3>
                        <div>
                        <div className="md:w-[80%] ">
                            <label className='text-white text-xs tracking-widest'>Enter your Email</label>
                            <input type="text" value={email} onChange={(e)=>{
                                setEmail(e.target.value);
                                if(e.target.value.trim() === '' ){
                                    setEmailError('Enter a valid Email.');
                                }else if(!emailRegex.test(e.target.value)){
                                    setEmailError('Invalid Email Format!');
                                }else{
                                    setEmailError('')
                                }
                                }} className='w-[100%] my-2 p-2 border-2 rounded-md bg-black text-white border-[#f6ae2d]'/>
                            {emailError && <p className='text-[#ef4b4b] text-xs font-extralight tracking-wider'>{emailError}</p>}
                        </div>
                        <div className="md:w-[80%] ">
                            <label className='text-white text-xs tracking-widest'>Enter Mobile Number</label>
                            <input type="number" value={mobile} onChange={(e)=>{
                                setMobile(e.target.value);
                                if(e.target.value.trim() === '' ){
                                    setMobileError('Enter a valid Mobile.');
                                }else if(!/[\d]/g.test(e.target.value)){
                                    setMobileError('Please enter digits only!');
                                }else{
                                    setMobileError('')
                                }
                                }} className='w-[100%] my-2 p-2 border-2 rounded-md bg-black text-white border-[#f6ae2d]'/>
                            {mobileError && <p className='text-[#ef4b4b] text-xs font-extralight tracking-wider'>{mobileError}</p>}
                        </div>
                        </div>
                    </div>
                    <div className='md:w-[30%]  tracking-wider bg-black border-2 flex flex-col justify-between border-[#f6ae2d] rounded-md '>
                        <div className='mb-5 py-6 px-10'>
                            <h3 className='font-medium text-[#f6ae2d] my-3'>Booking Summary</h3>

                            <h3 className='text-white'>{singleShow?.shows[0]?.screenData[0]?.name}</h3>
                            {
                                seatWithTiers && Object.entries(seatWithTiers).map(([key,values])=>{
                                    return(
                                        <div key={key} className='text-[#9f9f9f] flex gap-3 text-xs my-2'>
                                            <h3 className='w-[30%]'>{key}</h3>
                                            {
                                                values?.length > 0 && values.map(val=>{
                                                    return (
                                                        <h4 key={val}>{val}</h4>
                                                    )
                                                })
                                            }
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className='align-baseline bg-[#f6ae2d] py-6 px-10'>
                            <h3 className='text-black font-semibold'>Total Amount : Rs.{totalAmount}</h3>
                        </div>
                    </div>
                </div>
                <div className='flex justify-center '>
                    <button onClick={handlePayNow} disabled={loading} className={loading ? 'bg-[#dd9e2ad0] border-2 border-[#f6ae2d] w-[40%] py-2 rounded-sm font-semibold tracking-widest hover:scale-[1.05] transition-all duration-150 ease-linear hover:bg-black hover:text-white hover:drop-shadow-[0px_0px_15px_rgb(245,175,45,0.6)]' :'bg-[#f6ae2d] border-2 border-[#f6ae2d] w-[40%] py-2 rounded-sm font-semibold tracking-widest hover:scale-[1.05] transition-all duration-150 ease-linear hover:bg-black hover:text-white hover:drop-shadow-[0px_0px_15px_rgb(245,175,45,0.6)]'}>PAY NOW</button>
                </div>
        </div>
        <SessionTimedOutModal isOpen={timeout} set={setSessionTimeout} />
        <Suspense>
            <PaymentFailure isOpen={showFail} set={setShowFail} /> 
        </Suspense>
        <Suspense>
            <PaymentSuccess isOpen={showSuccess} set={setShowSuccess} />
        </Suspense>
        <div id='cashfree-modal'></div>
    </div>
  )
}

export default Checkout

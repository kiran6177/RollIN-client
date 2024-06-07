import React, { Suspense, lazy, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import { Toaster, toast } from 'sonner';
import { completeTheatre, resetTheatreActions } from '../../../features/theatre/theatreSlice';
import { ScaleLoader } from 'react-spinners';
import { IoClose } from 'react-icons/io5';
import imageValidator from '../../../utils/imageValidator';
// import MapModal from './MapModal';
const MapModal = lazy(()=>import('./MapModal'))

function CompleteProfile() {
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [location,setLocation] = useState('');
    const [street,setStreet] = useState('');
    const [landmark,setLandmark] = useState('');
    const [city,setCity] = useState('');
    const [state,setState] = useState('');
    const [pin,setPin] = useState('');
    const [latlng,setLatlng] = useState(null);

    const [isOpen,setIsOpen] = useState(false);

    const imageRef = useRef();
    const imageAddRef = useRef();

    const [images,setImages] = useState([]);
    const [imageData,setImageData] = useState([]);
    const [hideBtn,setHideBtn] = useState(false)

    const {theatreData,theatreToken,success,error,message,loading} = useSelector(state=>state.theatre);
    const navigate = useNavigate();
    const navState = useLocation();
    const dispatch = useDispatch();

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const pinRegex = /^[\d]{6}$/;

    useEffect(()=>{
        if(images.length !== 0){
            setHideBtn(true)
        }else{
            setHideBtn(false)
        }
        if(!imageValidator(imageData)){
            toast.error("Invalid File Type.")
            setHideBtn(false)
        }
    },[images,imageData])

    useEffect(()=>{
        if(navState?.state?.message){
            toast.error(navState.state.message)
            navState.state = null
        }
        if(!theatreData || !theatreData?.isAccepted){
            navigate('/theatre/login')
            return
        }
        if(error){
            error.map(err=>{
                toast.error(err)
            })
            dispatch(resetTheatreActions())
            return
        }
        if(message){
            toast.success(message)
            dispatch(resetTheatreActions())
            setTimeout(()=>{
                navigate('/theatre')
            },2000)
            return
        }
        if(success){
            toast.success('Complete Your Profile.');
            setName(theatreData.name);
            setEmail(theatreData.email);
            dispatch(resetTheatreActions())
            return
        }
        
    },[theatreToken,success,error,message])

    const handleImage = ()=>{
        if(imageRef.current.files && imageRef.current.files.length > 0){
            const imageFile = imageRef.current.files;
            setImageData(Array.from(imageFile));
            setImages(Array.from(imageFile).map(image=>URL.createObjectURL(image)))
        }
    }

    const handleAddImage = ()=>{
        if(imageAddRef.current.files && imageAddRef.current.files.length > 0){
            const imageFile = imageAddRef.current.files;
            setImageData([...imageData ,... Array.from(imageFile)]);
            setImages([...images,...Array.from(imageFile).map(image=>URL.createObjectURL(image))])
        }
        console.log(imageAddRef.current.files);
    }

    const removeImage = (index)=>{
        setImageData(imageData.filter((img,i)=>i !== index))
        setImages(images.filter((img,i)=>i !== index))
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        if(name.trim() === '' && email.trim() === ''  && location.trim() === '' 
        && street.trim() === '' && landmark.trim() === '' && city.trim() === '' 
        && state.trim() === '' && pin.toString().trim() === '' && imageData.length === 0){
            toast.error('Please fill the fields.');
        }else if(name.trim() === ''){
            toast.error('Enter a valid Name.');
        }else if(email.trim() === '' ){
            toast.error('Enter a valid Email.');
        }else if(!emailRegex.test(email)){
            toast.error('Invalid Email Format!');
        }else if(location.trim() === ''){
            toast.error('Enter a location.');
        }else if(street.trim() === ''){
            toast.error('Enter a valid street.');
        }else if(city.trim() === ''){
            toast.error('Enter a valid city.');
        }else if(landmark.trim() === ''){
            toast.error('Enter a valid landmark.');
        }else if(state.trim() === ''){
            toast.error('Enter a valid state.');
        }else if(pin.toString().length !== 6){
            toast.error('Enter a valid 6 digit Pincode.');
        }else if(!pinRegex.test(pin)){
            toast.error('Pincode should only have digits.');
        }else if(!imageValidator(imageData)){
            toast.error('Invalid File type.');
        }
        else{
        const dataa = {id:theatreData.id,name,email,location,street,landmark,city,state,pin,latlng};
            function convertToFile(filesData){
                const dataTransfer = new DataTransfer();
                filesData.forEach(file=>dataTransfer.items.add(file));
                return dataTransfer.files;
            }
            console.log(convertToFile(imageData));
            const filesList = convertToFile(imageData)
            const data = new FormData()
            data.append("formdata",JSON.stringify(dataa));
            
            imageData.forEach(file=>{
                data.append("images",file);
            })

        dispatch(completeTheatre({data,token:theatreToken}))
        }
    }

    const chooseAddress = (address,latlng)=>{

        const addressArray = address.split(',').reverse();
        let state;
        let pin ;
            if(addressArray[1].split(' ').length > 1){
                state = addressArray[1].split(' ')[1]
                pin = parseInt(addressArray[1].split(' ')[2])
            }else{
                state = addressArray[1]
            }
        setState(state);
        setPin(pin)
        setCity(addressArray[2]);
        setStreet(addressArray[3]);
        setLocation(addressArray.reverse().join(','));
        setLatlng(latlng)
    }

  return (
    <>
    <div className='min-h-[100vh] relative flex justify-center items-center pt-32 pb-12 h-auto login-bg'>
        <div className='bg-[#15121B] top-0 absolute h-[100%] w-[100%]'></div>
        <Toaster richColors />
      <form onSubmit={handleSubmit} className='flex flex-col items-center  gap-6 border-2 border-[#F6AE2D] rounded-md bg-black backdrop-blur-sm w-[80%] md:w-[69%] lg:w-[62%] xl:w-[55%] 2xl:w-[45%] py-12'>
            <h3 className='font-semibold text-white tracking-widest'>COMPLETE YOUR PROFILE</h3>
            <div className="w-[90%] md:w-[85%]">
                <label className='text-white text-xs tracking-widest'>Theatre Name</label>
                <input type="text" value={name} onChange={(e)=>setName(e.target.value)} className='w-[100%] my-2 p-2 border-2 rounded-md bg-black text-white border-[#f6ae2d]'/>
            </div>
            <div className="w-[90%] md:w-[85%]">
                <label className='text-white text-xs tracking-widest'>Email</label>
                <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} className='w-[100%] my-2 p-2 border-2 rounded-md bg-black text-white border-[#f6ae2d]'/>
            </div>
            <div className="w-[90%] md:w-[85%] flex flex-col gap-4">
                <label className='text-white text-xs tracking-widest'>Images</label>
                   <div className='flex flex-wrap gap-10'>
                        {images && images.length > 0 && images.map((img,i)=>{
                            return (
                                <div key={img+i} className=' relative w-[10rem] h-[10rem] overflow-hidden'>
                                    <IoClose onClick={()=>removeImage(i)} className='absolute right-0 cursor-pointer'/>
                                    <img src={img} alt="Theatre Image" className='w-[100%]  object-cover' />
                                </div>
                            )
                        })  }
                    </div>  
                <input type="file" ref={imageRef}  className='hidden' onChange={handleImage} multiple />
                <input type="file" ref={imageAddRef}  className='hidden' onChange={handleAddImage} multiple />

                <button type='button' onClick={()=>imageAddRef.current.click()} className={!hideBtn ? 'hidden' :'bg-[#f6ae2d] px-4 py-1 w-[70%] mx-auto rounded-sm tracking-wider'}>Add More</button>
                <button type='button' onClick={()=>imageRef.current.click()} className={hideBtn ? 'hidden' :'bg-[#f6ae2d] px-4 py-1 w-[70%] mx-auto rounded-sm tracking-wider'}>Add images</button>
            </div>
            <div className="w-[90%] flex flex-col sm:flex-row items-center justify-between md:w-[85%]">
                <div className='w-[100%] sm:w-[70%]'>
                    <label className='text-white text-xs tracking-widest'>Location</label>
                    <input type="text" value={location} onChange={(e)=>setLocation(e.target.value)} className='w-[100%] my-2 p-2 border-2 rounded-md bg-black text-white border-[#f6ae2d]'/>
                </div>
                <button onClick={()=>setIsOpen(true)} type='button' className='bg-[#f6ae2d] w-[100%] font-medium tracking-wider sm:tracking-normal sm:font-normal sm:w-[25%] mt-5 text-xs py-2 rounded-md px-3'>CHOOSE LOCATION</button>
            </div>
            <h5 className='text-start w-[90%] font-semibold text-[#f6ae2d] tracking-widest'>ADDRESS</h5>
            <div className="w-[90%] md:w-[85%]">
                <label className='text-white text-xs tracking-widest'>Street</label>
                <input type="text" value={street} onChange={(e)=>setStreet(e.target.value)} className='w-[100%] my-2 p-2 border-2 rounded-md bg-black text-white border-[#f6ae2d]'/>
            </div>
            <div className="w-[90%] md:w-[85%]">
                <label className='text-white text-xs tracking-widest'>Landmark</label>
                <input type="text" value={landmark} onChange={(e)=>setLandmark(e.target.value)} className='w-[100%] my-2 p-2 border-2 rounded-md bg-black text-white border-[#f6ae2d]'/>
            </div>
            <div className="w-[90%] md:w-[85%]">
                <label className='text-white text-xs tracking-widest'>City</label>
                <input type="text" value={city} onChange={(e)=>setCity(e.target.value)} className='w-[100%] my-2 p-2 border-2 rounded-md bg-black text-white border-[#f6ae2d]'/>
            </div>
            <div className="w-[90%] md:w-[85%]">
                <label className='text-white text-xs tracking-widest'>State</label>
                <input type="text" value={state} onChange={(e)=>setState(e.target.value)} className='w-[100%] my-2 p-2 border-2 rounded-md bg-black text-white border-[#f6ae2d]'/>
            </div>
            <div className="w-[90%] md:w-[85%]">
                <label className='text-white text-xs tracking-widest'>Pincode</label>
                <input type="number" value={pin} onChange={(e)=>setPin(e.target.value)} className='w-[100%] my-2 p-2 border-2 rounded-md bg-black text-white border-[#f6ae2d]'/>
            </div>
            <button type='submit' disabled={loading} className={loading ? 'bg-[#d69e34] text-black border-2 border-black rounded-md px-6 md:px-14 py-2 flex justify-center gap-5 w-[90%] md:w-[85%] font-semibold text-lg tracking-widest' :'bg-[#F6AE2D] text-black border-2 border-black rounded-md px-6 md:px-14 py-2 flex justify-center gap-5 w-[90%] md:w-[85%] font-semibold text-lg tracking-widest'}>
                SUBMIT 
            </button>
            <ScaleLoader loading={loading} color='#f6ae2d' height={20} />
      </form>
    </div>
    {
        isOpen &&
        <Suspense>
            <MapModal isOpen={isOpen} set={setIsOpen} chooseAddress={chooseAddress} />
        </Suspense>
    }
    </>
  )
}

export default CompleteProfile

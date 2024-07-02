import React, { Suspense, lazy, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Toaster, toast } from 'sonner';
import { logoutTheatre, resetTheatreActions, theatreLogout, theatreProfileUpdate } from '../../../features/theatre/theatreSlice';
import { IoClose } from 'react-icons/io5';
import { logoutTheatreFeat } from '../../../features/theatreFeat/theatreFeatSlice';
const ProfileMap = lazy(()=>import('./ProfileMap')) ;

function Profile() {
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [location,setLocation] = useState('');
    const [street,setStreet] = useState('');
    const [landmark,setLandmark] = useState('');
    const [city,setCity] = useState('');
    const [state,setState] = useState('');
    const [pincode,setPincode] = useState('');
    const [images,setImages] = useState([]);
    const [latlng,setLatlng] = useState(null)

    const [isOpen,setIsOpen] = useState(false);

    const [hide,setHide] = useState(true);

    const imageRef = useRef();
    const [deleted,setDeleted] = useState([]);
    const [imageData,setImageData] = useState([]);


    const {theatreToken,theatreData,message} = useSelector(state=>state.theatre);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(()=>{
        if(message){
            toast.success(message)
            dispatch(resetTheatreActions())
            setTimeout(()=>{
                navigate('/theatre')
            },1000)
            return
        }
        if(!theatreToken){
            if(message){
                toast.success(message)
                dispatch(resetTheatreActions())
                setTimeout(()=>{
                    navigate('/theatre/login',{replace:true})
                },1000)
            }else{
                navigate('/theatre/login',{replace:true})
            }
            return
        }
        if(!theatreData?.isVerified || theatreData?.isBlocked){
            navigate('/theatre/login',{replace:true})
            return
        } 
        if(theatreData){
            setName(theatreData.name)
            setEmail(theatreData.email)
            setLocation(theatreData?.address?.completeLocation)
            setStreet(theatreData?.address?.street)
            setLandmark(theatreData?.address?.landmark)
            setCity(theatreData?.address?.city)
            setState(theatreData?.address?.state)
            setPincode(theatreData?.address?.pincode)
            setImages(theatreData?.images)
        }
    },[theatreToken,theatreData,message])

    useEffect(()=>{
        if(images.length > 0){
            const leftImages = images.filter(image=>image.url.startsWith('blob'));
            let leftImageData = [];
            for(let imageObj of leftImages){
                leftImageData.push(imageObj.filename)
            }
            console.log(leftImageData);
            setImageData(leftImageData) 
        }
    },[images])

    const chooseAddress = (address,latlng)=>{

        const addressArray = address.split(',').reverse();
        console.log(addressArray);
        let state;
        let pin ;
            if(addressArray[1].split(' ').length > 1){
                state = addressArray[1].split(' ')[1]
                pin = parseInt(addressArray[1].split(' ')[2])
            }else{
                state = addressArray[1]
            }
        setState(state);
        setPincode(pin)
        setCity(addressArray[2]);
        setStreet(addressArray[3]);
        setLocation(addressArray.reverse().join(','));
        setLatlng(latlng)
        setHide(false)
    }

    const handleProfile = async (e)=>{
        e.preventDefault();
        console.log(imageData);
        console.log(images);
        console.log(deleted);
        console.log(name,email,location,street,landmark,city,state,pincode,latlng);
        const data = {id:theatreData.id,name,email,location,street,landmark,city,state,pincode,latlng,deleted}

        const formData = new FormData();
        formData.append("data",JSON.stringify(data));
        imageData.forEach(file=>{
            formData.append("images",file);
        })
        dispatch(theatreProfileUpdate({data:formData,token:theatreToken}))
    }

    const handleImageRemove = (imagename)=>{
        if(!imagename.url.startsWith('blob')){
            setDeleted([...deleted,imagename.filename])
        }
        setImages(images.filter(image=>image.url !== imagename.url))
        setHide(false)
    }

    const handleImageAdd = ()=>{
        console.log(imageRef.current.files);
        const imageArray = Array.from(imageRef.current.files)
        const newImages = imageArray.map(image=>{
            return{
                url:URL.createObjectURL(image),
                filename: image
                }
            })
        console.log(newImages);
        setImages([...images,...newImages]);
        setHide(false)

    }

    const handleLogout = ()=>{
        dispatch(theatreLogout(theatreToken))
        dispatch(logoutTheatre())
        dispatch(logoutTheatreFeat())
    }

  return (
    <>
    <div className='min-h-[100vh] relative flex justify-center items-center pt-32 pb-12 h-auto login-bg'>
        <div className='bg-[#15121B] top-0 absolute h-[100%] w-[100%]'></div>
        <Toaster richColors />
      <div  className='flex flex-col items-center  gap-6 border-2 border-[#F6AE2D] rounded-md bg-black backdrop-blur-sm w-[80%] md:w-[69%] lg:w-[62%] xl:w-[55%] 2xl:w-[45%] py-12'>
            <div className='w-[90%] flex flex-col sm:flex-row items-center justify-between'>
                <h3 className='font-semibold text-white tracking-widest'>YOUR PROFILE</h3>
              <button onClick={handleLogout} className='text-xs sm:text-sm border-2 border-[#f6ae2d] bg-[#F6AE2D] px-4 sm:px-8 py-1 rounded-sm font-semibold tracking-widest my-5 hover:bg-[black] hover:text-white transition-all duration-150 ease-in-out'>LOGOUT</button>            
            </div>
            <div className="w-[90%] md:w-[85%]">
                <label className='text-white text-xs tracking-widest'>Theatre Name</label>
                <input type="text" value={name} onChange={(e)=>{setName(e.target.value); setHide(false)}} className='w-[100%] my-2 p-2 border-2 rounded-md bg-black text-white border-[#f6ae2d]'/>
            </div>
            <div className="w-[90%] md:w-[85%]">
                <label className='text-white text-xs tracking-widest'>Email</label>
                <input type="text" value={email} onChange={(e)=>{setEmail(e.target.value); setHide(false)}} className='w-[100%] my-2 p-2 border-2 rounded-md bg-black text-white border-[#f6ae2d]'/>
            </div>
            <div className="w-[90%] flex flex-col sm:flex-row items-center justify-between md:w-[85%]">
                <div className='w-[100%] sm:w-[70%]'>
                    <label className='text-white text-xs tracking-widest'>Location</label>
                    <input type="text" value={location} onChange={(e)=>{setLocation(e.target.value); setHide(false)}} className='w-[100%] my-2 p-2 border-2 rounded-md bg-black text-white border-[#f6ae2d]'/>
                </div>
                <button onClick={()=>setIsOpen(true)} className='bg-[#f6ae2d] w-[100%] font-medium tracking-wider sm:tracking-normal sm:font-normal sm:w-[25%] mt-5 text-xs py-2 rounded-md px-3'>CHANGE LOCATION</button>
            </div>
            <div className='w-[90%] md:w-[85%] flex flex-col items-center gap-8'>
            <h6 className='text-white text-xs tracking-widest my-4 text-start w-full '>Images</h6>
                <div className='w-[100%] flex flex-wrap gap-6 justify-center '>
                    {
                        images && images.length > 0 &&
                        images.map((image,i)=>{
                            return (
                                <div key={i} className='relative max-w-[80%] md:max-w-[30%] flex  bg-[#15121b] border-black'>
                                    <IoClose onClick={()=>handleImageRemove(image)}  className='absolute right-0 text-white cursor-pointer' />
                                    <img src={image.url} alt="" className='w-[100%] object-contain' />
                                </div>
                            ) 
                        })
                    }
                    <input type="file" ref={imageRef} onChange={handleImageAdd}  className='hidden' multiple />
                </div>
                <button onClick={()=>imageRef.current.click()} className='bg-[#f6ae2d] mx-auto px-6 py-2 rounded-sm tracking-widest'>Add More</button>
            </div>
            <h5 className='text-start w-[90%] font-semibold text-[#f6ae2d] tracking-widest'>ADDRESS</h5>
            <div className="w-[90%] md:w-[85%]">
                <label className='text-white text-xs tracking-widest'>Street</label>
                <input type="text" value={street} onChange={(e)=>{setStreet(e.target.value); setHide(false)}} className='w-[100%] my-2 p-2 border-2 rounded-md bg-black text-white border-[#f6ae2d]'/>
            </div>
            <div className="w-[90%] md:w-[85%]">
                <label className='text-white text-xs tracking-widest'>Landmark</label>
                <input type="text" value={landmark} onChange={(e)=>{setLandmark(e.target.value); setHide(false)}} className='w-[100%] my-2 p-2 border-2 rounded-md bg-black text-white border-[#f6ae2d]'/>
            </div>
            <div className="w-[90%] md:w-[85%]">
                <label className='text-white text-xs tracking-widest'>City</label>
                <input type="text" value={city} onChange={(e)=>{setCity(e.target.value); setHide(false)}} className='w-[100%] my-2 p-2 border-2 rounded-md bg-black text-white border-[#f6ae2d]'/>
            </div>
            <div className="w-[90%] md:w-[85%]">
                <label className='text-white text-xs tracking-widest'>State</label>
                <input type="text" value={state} onChange={(e)=>{setState(e.target.value); setHide(false)}} className='w-[100%] my-2 p-2 border-2 rounded-md bg-black text-white border-[#f6ae2d]'/>
            </div>
            <div className="w-[90%] md:w-[85%]">
                <label className='text-white text-xs tracking-widest'>Pincode</label>
                <input type="number" value={pincode} onChange={(e)=>{setPincode(e.target.value); setHide(false)}} className='w-[100%] my-2 p-2 border-2 rounded-md bg-black text-white border-[#f6ae2d]'/>
            </div>
            {hide || <button type='submit' onClick={handleProfile} className='bg-[#F6AE2D] text-black border-2 border-black rounded-md px-6 md:px-14 py-2 flex justify-center gap-5 w-[90%] md:w-[85%] font-semibold text-lg tracking-widest'>
                UPDATE 
            </button>}
      </div>
    </div>
    {
        isOpen &&
        <Suspense fallback={"Loading..."}>
            <ProfileMap isOpen={isOpen} set={setIsOpen} chooseAddress={chooseAddress} />
        </Suspense>
    }
    </>
  )
}

export default Profile

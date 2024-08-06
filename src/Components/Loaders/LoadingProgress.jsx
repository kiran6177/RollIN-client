import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router';
import { LoadingContext } from '../../Provider/LoadingProvider';

function LoadingProgress({setIsLoading}) {
    const [progress,setProgress] = useState(0);
    const {key} = useLocation();
    const loadingContext = useContext(LoadingContext);

    useEffect(()=>{
        let interval;
        if(loadingContext){            
             interval = setInterval(()=>{
                setProgress(prev=>prev <= 100 ? prev + 1 : 0)
            },!loadingContext?.firstLoad ? 20 :5)
        }
        return ()=>{
            clearInterval(interval)
            if(loadingContext?.firstLoad === false){
                loadingContext?.setFirstLoad(true)
            }
        }
    },[key,loadingContext])

    useEffect(()=>{ 
        if(progress > 100){
            setIsLoading(false)
        }
    },[progress])

  return (
    <div className={(!loadingContext?.firstLoad) ?  'fixed h-[100vh] w-[100vw] bg-[#000000e8] z-50' : 'fixed h-[100vh] w-[100vw] top-[6rem] bg-[#00000060] z-50' }>
        <div style={{width:`${progress}vw`}} className={(!loadingContext?.firstLoad)? 'bg-[#f6ae2d] h-[5px] transition-all duration-[0.02s] ease-linear' : 'bg-[#f6ae2d] h-[2px] transition-all duration-[0.005s] ease-linear'}></div>
        {!loadingContext?.firstLoad &&
        <div className='h-[100%] flex justify-center items-center'>
            <p className='text-white tracking-widest text-xl md:text-4xl' style={{fontFamily:"Teko"}}>LOADING{progress}</p>
        </div>}
    </div>
  )
}

export default React.memo(LoadingProgress)

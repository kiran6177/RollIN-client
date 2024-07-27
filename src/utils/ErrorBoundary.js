import React, { Component } from 'react'
import logo from '../assets/logo.png'
import tornticket from '../assets/tornticket.png'

export default class ErrorBoundary extends Component {
    constructor(props){
        super(props)
        this.state = {hasError:false}
    }
    static getDerivedStateFromError(error){
        return {hasError:true}

    }
    componentDidCatch(error,info){
        console.log("ERRRRR",error);
    }
  render() {
    if(this.state.hasError){
        return (
            <>
            <div className={'flex justify-between h-[6rem] items-center bg-gradient-to-b from-black fixed z-20 w-[100vw] transition-all duration-300 ease-in-out'}>

                <div className='w-[50%] min-[480]:w-[45%] h-[100%] sm:w-[50%] flex items-center gap-14 pl-5 text-white'>
                <div className='h-[100%] w-[100%] sm:w-[40%] md:w-[35%] flex items-center'>
                    <img  src={logo} alt="" className='cursor-pointer' />
                </div>
                </div>

               

                </div>                                                                  
            <div className='bg-[#15121b] min-h-[100vh] flex flex-col items-center justify-center'>
                <div className='w-[15rem] sm:w-[25rem]  relative'>
                    <img src={tornticket} alt="" width={'100%'} className='object-cover aspect-[4/3]' />
                    <h2 className='text-[#f6ae2d] absolute text-2xl sm:text-[45px] bottom-[5%] tracking-widest left-[2%] sm:left-0 whitespace-nowrap ' style={{fontFamily:"Odibee Sans, sans-serif"}}>Something Went Wrong!!!</h2>
                </div>
                <h2 className='text-white text-xs tracking-wide sm:text-base'>Please check your connection and try again.</h2>
            </div>
            </>
                )
    }else{
        return this.props.children
    }
    
  }
}

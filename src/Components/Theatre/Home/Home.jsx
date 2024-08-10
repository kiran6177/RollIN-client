import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Toaster, toast } from 'sonner';
import { resetTheatreActions  } from '../../../features/theatre/theatreSlice'
import { theatreGetRunningMovies, theatreGetTheatreData } from '../../../features/theatreFeat/theatreFeatAction';
import Chart, { CategoryScale, Legend } from 'chart.js/auto';
import DoughNutMovie from '../Charts/DoughNutMovie';
import BarStacked from '../Charts/BarStacked';
import { theatreGetLatestOrders, theatreGetMovieCollections, theatreGetScreenCollections } from '../../../features/theatreBookings/theatreBookingActions';
import { getBarChartConfig, getDoughNutConfig } from '../Charts/chartConfig';
import { resetCollections } from '../../../features/theatreBookings/theatreBookingSlice';
import RunningMovie from './RunningMovie';

const doughhhhh = {
  labels: [2000,2001,2002,2003,2004,2005,2006,2007], 
  datasets: [
    {
      label: "Users Gained ",
      data: [12,30,42,54,70,19,40,90],
      backgroundColor: [
        "rgba(75,192,192,1)",
        "rgba(175,192,192,1)",
        "rgba(75,192,92,1)",
        "rgba(75,12,192,1)",
        "rgba(75,222,192,1)"
        ],
      borderWidth:0
    }
  ]
}

function Home() {

    const  { theatreData,theatreToken , success , message } = useSelector(state=>state.theatre);
    const {screenCollections,movieCollections,latestOrders} = useSelector(state=>state.theatreBooking);
    const {runningMovies} = useSelector(state=>state.theatreFeat)

    const [selectedFrame,setSelectedFrame] = useState('DAILY');
    const [barData,setBarData] = useState(null);
    const [doughNutData,setDoughNutData] = useState(null);

    const dispatch = useDispatch();
    useEffect(()=>{
      if(success){
        toast.success("Login successfully.");
        dispatch(resetTheatreActions())
        return
      } 
    },[success])

    useEffect(()=>{
      if(theatreData.id && theatreToken){
        dispatch(theatreGetTheatreData({id:theatreData.id,token:theatreToken}))
        return
      }
    },[theatreData])

    useEffect(()=>{
      if(theatreToken){
        dispatch(theatreGetMovieCollections({token:theatreToken}))
        dispatch(theatreGetLatestOrders({token:theatreToken}))
        dispatch(theatreGetRunningMovies({token:theatreToken}))
        return
      }
    },[theatreToken])

    useEffect(()=>{
      console.log(selectedFrame);
      const data = {dataFrame:selectedFrame}
      dispatch(theatreGetScreenCollections({data,token:theatreToken}))
    },[selectedFrame])

    useEffect(()=>{
      return ()=>{
        dispatch(resetCollections())
      }
    },[])

    useEffect(()=>{
      if(screenCollections){
        setBarData(getBarChartConfig(screenCollections))
      }
    },[screenCollections])

    useEffect(()=>{
      if(movieCollections){
        setDoughNutData(getDoughNutConfig(movieCollections))
      }
    },[movieCollections])

  return (
    <div className='pt-32 min-h-[80vh] bg-[#15121B]'>
      <Toaster richColors />
      <div className='p-12'>
        <h1 className='text-white font-semibold text-3xl mb-10'>DASHBOARD</h1> 
        
        <div className='flex gap-10 md:justify-between flex-col md:flex-row'>
          <div className='bg-black md:w-[60%] p-8 rounded-md flex flex-col justify-evenly'>
            <div>
              <h2 className='text-[#f6ae2d] text-xl tracking-widest font-medium'>Screen Based Collection</h2>
              <div className='bg-[#bb8726] flex max-w-fit xl:max-w-[60%] rounded-sm my-4 flex-col md:flex-row'>
                <p onClick={()=>setSelectedFrame("DAILY")} className={selectedFrame === 'DAILY' ? 'px-4 py-1  text-xs lg:text-base font-medium cursor-pointer bg-[#f6ae2d] rounded-sm' :'px-4 py-1  text-xs lg:text-base font-medium cursor-pointer '}>DAILY</p>
                <p onClick={()=>setSelectedFrame("WEEKLY")} className={selectedFrame === 'WEEKLY' ? 'px-4 py-1  text-xs lg:text-base font-medium cursor-pointer bg-[#f6ae2d] rounded-sm' :'px-4 py-1  text-xs lg:text-base font-medium cursor-pointer '}>WEEKLY</p>
                <p onClick={()=>setSelectedFrame("MONTHLY")} className={selectedFrame === 'MONTHLY' ? 'px-4 py-1  text-xs lg:text-base font-medium cursor-pointer bg-[#f6ae2d] rounded-sm' :'px-4 py-1  text-xs lg:text-base font-medium cursor-pointer '}>MONTHLY</p>
                <p onClick={()=>setSelectedFrame("YEARLY")} className={selectedFrame === 'YEARLY' ? 'px-4 py-1  text-xs lg:text-base font-medium cursor-pointer bg-[#f6ae2d] rounded-sm' :'px-4 py-1  text-xs lg:text-base font-medium cursor-pointer '}>YEARLY</p>
              </div>
            </div>
            {barData && <BarStacked data={barData} />}
          </div>
          <div className='bg-black md:w-[35%] p-8 rounded-md flex flex-col gap-10 justify-between'>
            <h2 className='text-[#f6ae2d] text-xl tracking-widest font-medium'>Running Movies Collection</h2>
            {doughNutData && <DoughNutMovie data={doughNutData} />}
          </div>
        </div>

        <div className='my-10 bg-black p-10 rounded-md'>
          <h2 className='text-[#f6ae2d] text-2xl tracking-widest font-medium'>Latest Orders</h2>
          <div className='my-6 overflow-x-scroll w-[100%]'>

            <table className='table border-collpase  border border-[#f6ae2d] rounded-md  min-w-[1200px] w-[100%] bg-black text-white text-center my-10 '>
              <thead className='border-collpase border border-[#f6ae2d] '>
                <tr key="main-head" className='h-[4rem] bg-[#f6ae2d] text-black '>
                <th className='border-collpase border border-[#f6ae2d] font-semibold  w-[5%]' >S. No</th>
                <th className='border-collpase border border-[#f6ae2d] font-semibold  w-[12%]' >Date</th>
                <th className='border-collpase border border-[#f6ae2d] font-semibold  w-[18%]' >User</th>
                <th className='border-collpase border border-[#f6ae2d] font-semibold  w-[20%]' >Movie</th>
                <th className='border-collpase border border-[#f6ae2d] font-semibold  w-[20%]' >Booking ID</th>
                <th className='border-collpase border border-[#f6ae2d] font-semibold  w-[10%]' >Screen</th>
                <th className='border-collpase border border-[#f6ae2d] font-semibold  ' >Amount</th>
                </tr>          
              </thead>
              <tbody>
                {
                    latestOrders?.length > 0 ? latestOrders.map((order,i)=>{
                      return(
                        <tr key={order?._id} className='h-[8rem] xl:h-[4rem]'>
                            <td className='border-collpase border border-[#f6ae2d] rounded-md ' >{i + 1}</td>
                            <td className='border-collpase border border-[#f6ae2d] rounded-md ' >{new Date(order?.createdAt).toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric'})}</td>
                            <td className='border-collpase border border-[#f6ae2d] rounded-md ' >{order?.attachment_details?.email}</td>
                            <td className='border-collpase border border-[#f6ae2d] rounded-md ' >{order?.movie?.title}</td>
                            <td className='border-collpase border border-[#f6ae2d] rounded-md ' >{order?.order_id}</td>
                            <td className='border-collpase border border-[#f6ae2d] rounded-md ' >{order?.screendata?.screen_name}</td>
                            <td className='border-collpase border border-[#f6ae2d] rounded-md ' >Rs.{order?.billing_amount}</td>
                        </tr>
                      )
                    })
                    :
                  <tr key={"emptymain"} className='h-[8rem] xl:h-[4rem]'><td className='border-collpase border border-[#f6ae2d] rounded-md ' colSpan={5}>NO ORDERS</td></tr>
                }
              </tbody>
            </table>
          </div>
        </div>

        <div className='my-10 bg-black p-10 rounded-md'>
          <h2 className='text-[#f6ae2d] text-2xl tracking-widest font-medium'>Currently Running Movies</h2>
            <div className='flex gap-8 overflow-x-scroll scrollbar-none my-6'>
              {
                runningMovies?.length > 0 && runningMovies.map(movie=>{
                  return(
                    <RunningMovie key={movie?._id} movie={movie} />
                  )
                })

                }
            </div>
        </div>

      </div>
    </div>
  )
}

export default Home

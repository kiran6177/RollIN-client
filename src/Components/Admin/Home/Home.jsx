import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Toaster, toast } from 'sonner';
import { resetAdminActions } from '../../../features/admin/adminSlice';
import LineChart from '../Charts/LineChart';
import { adminGetHighMovies, adminGetRecentMovies, adminGetRegistrationDetails } from '../../../features/admin/adminActions';
import { getLineChartConfig } from '../Charts/chartConfig';

function Home() {
    const {adminData,adminToken,message,grossMovies,recentMovies,registrationData} = useSelector(state=>state.admin);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [selectedFrame,setSelectedFrame] = useState('DAILY');
    const [lineChartData,setLineChartData] = useState(null);

    useEffect(()=>{
      if(!adminToken){
        navigate('/admin/login',{replace:true})
        return
      }
      if(message){
        toast.success(message);
        dispatch(resetAdminActions());
        return
      }
      dispatch(adminGetHighMovies({token:adminToken}))
      dispatch(adminGetRecentMovies({token:adminToken}))
    },[adminToken,message])

    useEffect(()=>{
      if(adminToken){
        const data = {dateFrame:selectedFrame}
        dispatch(adminGetRegistrationDetails({data,token:adminToken}))
      }
    },[selectedFrame])

    useEffect(()=>{
      if(registrationData){
        setLineChartData(getLineChartConfig(registrationData))
      }
    },[registrationData])

  return (
    <div className='pt-28 lg:pl-56 min-h-[100vh] bg-[#15121B]'>
      <Toaster richColors />
      <div className='p-12'>
      <h2 className='text-white font-semibold text-4xl'>DASHBOARD</h2>
        
          <div className='bg-black md:w-[100%] p-8 rounded-md flex flex-col justify-evenly my-8'>
            <div>
              <h2 className='text-[#f6ae2d] text-xl tracking-widest font-medium'>REGISTRATION STATISTICS</h2>
              <div className='bg-[#bb8726] flex max-w-fit xl:max-w-[60%] rounded-sm my-4 flex-col md:flex-row'>
                <p onClick={()=>setSelectedFrame("DAILY")} className={selectedFrame === 'DAILY' ? 'px-4 py-1  text-xs lg:text-base font-medium cursor-pointer bg-[#f6ae2d] rounded-sm' :'px-4 py-1  text-xs lg:text-base font-medium cursor-pointer '}>DAILY</p>
                <p onClick={()=>setSelectedFrame("WEEKLY")} className={selectedFrame === 'WEEKLY' ? 'px-4 py-1  text-xs lg:text-base font-medium cursor-pointer bg-[#f6ae2d] rounded-sm' :'px-4 py-1  text-xs lg:text-base font-medium cursor-pointer '}>WEEKLY</p>
                <p onClick={()=>setSelectedFrame("MONTHLY")} className={selectedFrame === 'MONTHLY' ? 'px-4 py-1  text-xs lg:text-base font-medium cursor-pointer bg-[#f6ae2d] rounded-sm' :'px-4 py-1  text-xs lg:text-base font-medium cursor-pointer '}>MONTHLY</p>
                <p onClick={()=>setSelectedFrame("YEARLY")} className={selectedFrame === 'YEARLY' ? 'px-4 py-1  text-xs lg:text-base font-medium cursor-pointer bg-[#f6ae2d] rounded-sm' :'px-4 py-1  text-xs lg:text-base font-medium cursor-pointer '}>YEARLY</p>
              </div>
            </div>
            {lineChartData && <LineChart data={lineChartData} />}

          </div>


        <div className='my-10 bg-black p-10 rounded-md'>
          <h2 className='text-[#f6ae2d] text-2xl tracking-widest font-medium'>Recent Enlisted Movies</h2>
          <div className='my-6 overflow-x-scroll w-[100%]'>

            <table className='table border-collpase  border border-[#f6ae2d] rounded-md  min-w-[998px] w-[100%] bg-black text-white text-center my-10 '>
              <thead className='border-collpase border border-[#f6ae2d] '>
                <tr key="main-head" className='h-[4rem] bg-[#f6ae2d] text-black '>
                <th className='border-collpase border border-[#f6ae2d] font-semibold  w-[8%]' >S. No</th>
                <th className='border-collpase border border-[#f6ae2d] font-semibold  w-[20%]' >Image</th>
                <th className='border-collpase border border-[#f6ae2d] font-semibold  w-[18%]' >Title</th>
                <th className='border-collpase border border-[#f6ae2d] font-semibold  w-[20%]' >Description</th>
                <th className='border-collpase border border-[#f6ae2d] font-semibold  w-[20%]' >Genre</th>
                <th className='border-collpase border border-[#f6ae2d] font-semibold  ' >Release Date</th>
                </tr>          
              </thead>
              <tbody>
                {
                      recentMovies?.length > 0 ? recentMovies.map((movie,i)=>{
                        return(
                          <tr key={movie?._id} className='h-[8rem] xl:h-[4rem]'>
                              <td className='border-collpase border border-[#f6ae2d] rounded-md ' >{i + 1}</td>
                              <td className='border-collpase border border-[#f6ae2d] rounded-md ' >
                                <div className='w-[50%] mx-auto m-8'>
                                  <img src={movie?.poster_path} className='object-cover aspect-[4/5]' height={'100%'} alt="" />
                                </div>
                              </td>
                              <td className='border-collpase border border-[#f6ae2d] rounded-md ' >{movie?.title}</td>
                              <td className='border-collpase border border-[#f6ae2d] rounded-md w-[20%] overflow-hidden text-xs' >{movie?.overview}</td>
                              <td className='border-collpase border border-[#f6ae2d] rounded-md ' >{movie?.genres[0] ? movie?.genres[0]?.name ? movie?.genres[0]?.name : movie?.genres[0]  : '' }{movie?.genres[1] ? movie?.genres[1]?.name ? " / "+ movie?.genres[1]?.name : " / "+ movie?.genres[1] : '' }</td>
                              <td className='border-collpase border border-[#f6ae2d] rounded-md ' >{movie?.release_date?.split('-')[0]}</td>
                          </tr>
                        )
                      })
                      :
                    <tr key={"emptymain"} className='h-[8rem] xl:h-[4rem]'><td className='border-collpase border border-[#f6ae2d] rounded-md ' colSpan={5}>NO MOVIES</td></tr>
                  }
              </tbody>
            </table>
          </div>
        </div>

        <div className='my-10 bg-black p-10 rounded-md'>
          <h2 className='text-[#f6ae2d] text-2xl tracking-widest font-medium'>High Gross Movies</h2>
          <div className='my-4 overflow-x-scroll w-[100%]'>

            <table className='table border-collpase  border border-[#f6ae2d] rounded-md  min-w-[998px] w-[100%] bg-black text-white text-center my-10 '>
              <thead className='border-collpase border border-[#f6ae2d] '>
                <tr key="main-head" className='h-[4rem] bg-[#f6ae2d] text-black '>
                <th className='border-collpase border border-[#f6ae2d] font-semibold  w-[8%]' >S. No</th>
                <th className='border-collpase border border-[#f6ae2d] font-semibold  w-[20%]' >Image</th>
                <th className='border-collpase border border-[#f6ae2d] font-semibold  w-[18%]' >Title</th>
                <th className='border-collpase border border-[#f6ae2d] font-semibold  w-[20%]' >Genre</th>
                <th className='border-collpase border border-[#f6ae2d] font-semibold  w-[20%]' >Tickets Sold</th>
                <th className='border-collpase border border-[#f6ae2d] font-semibold  ' >Revenue</th>
                </tr>          
              </thead>
              <tbody>
                {
                    grossMovies?.length > 0 ? grossMovies.map((order,i)=>{
                      return(
                        <tr key={order?._id} className='h-[8rem] xl:h-[4rem]'>
                            <td className='border-collpase border border-[#f6ae2d] rounded-md ' >{i + 1}</td>
                            <td className='border-collpase border border-[#f6ae2d] rounded-md ' >
                              <div className='w-[50%] mx-auto m-8'>
                                <img src={order?.movie?.poster_path} className='object-cover aspect-[4/5]' height={'100%'} alt="" />
                              </div>
                            </td>
                            <td className='border-collpase border border-[#f6ae2d] rounded-md ' >{order?.movie?.title}</td>
                            <td className='border-collpase border border-[#f6ae2d] rounded-md ' >{order?.movie?.genres[0] ? order?.movie?.genres[0]?.name ? order?.movie?.genres[0]?.name : order?.movie?.genres[0]  : '' }{order?.movie?.genres[1] ? order?.movie?.genres[1]?.name ? " / "+ order?.movie?.genres[1]?.name : " / "+ order?.movie?.genres[1] : '' }</td>
                            <td className='border-collpase border border-[#f6ae2d] rounded-md ' >{order?.totalTickets}</td>
                            <td className='border-collpase border border-[#f6ae2d] rounded-md ' >Rs.{order?.amount}</td>
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

      </div>
    </div>
  )
}

export default Home

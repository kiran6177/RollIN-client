import React, { useEffect, useRef, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from 'react-redux'
import { ScaleLoader } from 'react-spinners';
import { Toaster } from 'sonner'
import WarningNotficationBox from '../../Notifications/WarningNotficationBox';
import { resetTheatreNotifications, theatreGetNotifications } from '../../../features/theatre/theatreSlice';
import { useSocket } from '../../../hooks/socket';
import BookingWarnNotification from '../../Notifications/BookingWarnNotification';

function NotificationsHome() {

    const {theatreToken,notifications} = useSelector(state=>state.theatre);
    const scrollRef = useRef(null);
    const dispatch = useDispatch();
    const [page,setPage] = useState(1);
    const socket = useSocket();
    
    useEffect(()=>{
        if(theatreToken){
            dispatch(theatreGetNotifications({data:{page:1},token:theatreToken}))
        }
        return ()=>{
            dispatch(resetTheatreNotifications())
        }
    },[theatreToken])


    useEffect(()=>{
        if(notifications?.length > 0){
            const unreadNotificationsIds = [...notifications].reduce((acc,each)=>{
                if(each.read_status === "UNREAD"){
                    acc.push(each._id)
                }
                return acc
            },[])
            console.log("THEATREUNREAD",unreadNotificationsIds);
            socket?.emit('read-notifications-theatre',unreadNotificationsIds)
        }
    },[notifications])

    const nextPage = ()=>{
        dispatch(theatreGetNotifications({data:{page:page+1},token:theatreToken}))
        setPage(prev=>prev+1);
    }

  return (
    <div className='py-10 bg-[#15121B] '>
        <Toaster richColors />
        <div className='pt-28 px-12  min-h-[10rem]'>
            <h5 className='text-white text-2xl md:text-4xl font-semibold tracking-widest'>NOTIFICATIONS</h5>
            <div ref={scrollRef} className='flex flex-col gap-8'>
            {
                notifications &&  notifications.length > 0 ?
                <InfiniteScroll dataLength={notifications?.length} scrollThreshold={'750px'} scrollableTarget={scrollRef} next={nextPage} loader={<ScaleLoader className='absolute -bottom-[6rem] ' color='#f6ae2d'/>} hasMore={true} className='my-6 py-4 px-2 mx-auto flex flex-wrap gap-7 relative  justify-evenly scrollbar-none'>
                {
                notifications.map((eachNoti)=>{
                    switch(eachNoti.type){
                        case 'ENROLLMENT_ENDED':
                            return (<WarningNotficationBox key={eachNoti._id} notification={eachNoti} />)
                        case 'BOOKINGS_ENDED':
                            return (<BookingWarnNotification key={eachNoti._id} notification={eachNoti} />)
                        default :
                            return null
                    }
                
                })
                }
                </InfiniteScroll>
                : <div className='text-white tracking-widest'> NO NOTIFICATIONS.</div>
            }
            </div>
        </div>
    </div>
  )
}

export default NotificationsHome

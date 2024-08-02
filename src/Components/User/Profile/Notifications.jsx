import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userGetNotifications } from '../../../features/user/userActions';
import ShowNotificationBox from '../../Notifications/ShowNotificationBox';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ScaleLoader } from 'react-spinners';
import { resetNotifications } from '../../../features/user/userSlice';
import { useSocket } from '../../../hooks/socket';
import MovieReminderNotfication from '../../Notifications/MovieReminderNotfication';

function Notifications() {
    const dispatch = useDispatch();
    const {userToken,notifications} = useSelector(state=>state.user);
    const scrollRef = useRef(null);
    const [page,setPage] = useState(1);

    const socket = useSocket();

    useEffect(()=>{
        dispatch(userGetNotifications({data:{page:1},token:userToken}))
        return ()=>{
            dispatch(resetNotifications())
        }
    },[])

    useEffect(()=>{
        if(notifications?.length > 0){
            const unreadNotificationsIds = [...notifications].reduce((acc,each)=>{
                if(each.read_status === "UNREAD"){
                    acc.push(each._id)
                }
                return acc
            },[])
            console.log(unreadNotificationsIds);
            socket?.emit('read-notifications',unreadNotificationsIds)
        }
    },[notifications])

    const nextPage = ()=>{
        dispatch(userGetNotifications({data:{page:page+1},token:userToken}));
        setPage(prev=>prev+1);
    }

  return (
    <div className='my-8'>
          <h2 className='text-white text-3xl font-semibold tracking-widest mb-5'>NOTIFICATIONS</h2>

            <div ref={scrollRef} className='flex flex-col gap-8'>
            {
                notifications &&  notifications.length > 0 ?
                <InfiniteScroll dataLength={notifications?.length} scrollThreshold={'750px'} scrollableTarget={scrollRef} next={nextPage} loader={<ScaleLoader className='absolute -bottom-[6rem] ' color='#f6ae2d'/>} hasMore={true} className='my-6 py-4 px-2 mx-auto flex flex-wrap gap-7 relative  justify-evenly scrollbar-none'>
                {
                notifications.map((eachNoti)=>{
                    switch(eachNoti.type){
                        case 'SHOW_ALERT':
                            return (<ShowNotificationBox key={eachNoti._id} notification={eachNoti} />)
                        case 'MOVIE_REMINDER':
                            return (<MovieReminderNotfication key={eachNoti._id} notification={eachNoti} />)
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
  )
}

export default Notifications

import React, {  useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { connectSocket } from '../utils/socket';
import { setUnread } from '../features/user/userSlice';
import { setTheatreUnread } from '../features/theatre/theatreSlice';

export const SocketContext = React.createContext(null)


function SocketProvider({children}) {
  const [socket,setSocket] = useState(null);
  const {userToken,userData} = useSelector(state=>state.user);
  const {theatreToken,theatreData} = useSelector(state=>state.theatre);

  useEffect(()=>{
    const socketConnect = connectSocket();
    if(socketConnect){
        setSocket(socketConnect)
    }
    return ()=>{
        socketConnect?.disconnect()
    }
  },[])

  const dispatch  = useDispatch()

  useEffect(()=>{
    const handleUnreadUpdate = (notifications)=>{
      console.log("HASNOTIFICATIONS",notifications);
      if(notifications?.length > 0){
          dispatch(setUnread(notifications))
      }else{
          dispatch(setUnread(null))
      }
    }
    const handleUnreadUpdateTheatre = (notifications)=>{
      console.log("THEATREUNREAD",notifications)
      if(notifications?.length > 0){
        dispatch(setTheatreUnread(notifications))
      }else{
          dispatch(setTheatreUnread(null))
      }
      }
    if(socket && userToken){
        socket.emit('connect-user',userData?.id)
        socket?.on('has-unread-notifications',handleUnreadUpdate) 
    }
    if(socket && theatreToken){
      socket.emit('connect-theatre',theatreData?.id)
      socket?.on('has-unread-notifications-for-theatre',handleUnreadUpdateTheatre) 
  }
    return ()=>{
      socket?.off('has-unread-notifications',handleUnreadUpdate)
      socket?.off('has-unread-notifications-for-theatre',handleUnreadUpdateTheatre)
    }
  },[userToken,theatreToken,socket])

  return (
    <SocketContext.Provider value={socket} >{children}</SocketContext.Provider>
  )

}

export default SocketProvider

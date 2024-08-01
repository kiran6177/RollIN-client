import React, {  useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { connectSocket } from '../utils/socket';
import { setUnread } from '../features/user/userSlice';

export const SocketContext = React.createContext(null)


function SocketProvider({children}) {
  const [socket,setSocket] = useState(null);
  const {userToken,userData} = useSelector(state=>state.user);

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
    if(socket && userToken){
        socket.emit('connect-user',userData?.id)
        socket?.on('has-unread-notifications',handleUnreadUpdate)
           
    }
    return ()=>{
      socket?.off('has-unread-notifications',handleUnreadUpdate)
    }
  },[userToken,socket])

  return (
    <SocketContext.Provider value={socket} >{children}</SocketContext.Provider>
  )

}

export default SocketProvider

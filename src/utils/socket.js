import { io } from "socket.io-client";
const SOCKET_ENDPOINT = 'http://localhost:4001';

export const connectSocket = ()=>{
    const socket = io(SOCKET_ENDPOINT);
    socket.on("connect",()=>{
        console.log("Socket connected",socket);
    })
    socket.on("error",(error)=>{
        console.log('Socket connection error:', error);
    })

    socket.on("disconnect", () => {
        console.log("disconnected"); 
    });
    
    return socket
}
import { useContext } from "react";
import { SocketContext } from "../Provider/SocketProvider";

export const useSocket = ()=> useContext(SocketContext)

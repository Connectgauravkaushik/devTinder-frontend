import io from "socket.io-client";
import { BASE_URL } from "./constants";


export const createSocketConnection = ()=> {
   // This config is required because on production it will not work
   if(location.hostname === "localhost"){
      return io(BASE_URL);
   }else{
      return io("/" , {path : "/api/socket.io"});
   }

}
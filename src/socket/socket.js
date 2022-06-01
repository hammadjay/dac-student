import io from "socket.io-client"
//https://dacbackend.herokuapp.com/
//http://localhost:27017/
const URL = 'https://dacbackend.herokuapp.com/'

const socket = io(URL, {autoConnect:false, transports:['websocket']})

socket.onAny((event,...args)=>{
    console.log(event,args)
})

export default socket;
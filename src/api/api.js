import axios from "axios";
//https://dacbackend.herokuapp.com/
//http://localhost:27017
export default axios.create({
    baseURL:'https://dacbackend.herokuapp.com/'
    
})
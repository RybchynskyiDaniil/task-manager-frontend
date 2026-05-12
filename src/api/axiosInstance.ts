import axios from "axios";

 const axiosInstand = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true ,    
});

export default axiosInstand
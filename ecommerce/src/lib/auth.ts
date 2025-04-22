
import { LoginTypes, RegisterTypes } from "@/type";
import api from "./api";



export const RegisterUser =  (data: RegisterTypes) => api.post("/auth/register", data)
export const LoginUser =  (data: LoginTypes) => api.post("/auth/login", data)

// try{
//     const token= localStorage.getItem("token")
//     if(token){
//         api.defaults.headers.common["Authorization"] = `Bearer ${token}`
//     }
//     api.interceptors.response.use(
//         (response) => {
//             return response;
//         },
//         (error) => {
//             if (error.response.status === 401) {
//                 localStorage.removeItem("token");
//                 window.location.href = "/login";
//             }
//             return Promise.reject(error);
//         }
//     );
  

// }
// catch (error) {
//     console.error("Error setting authorization header:", error);
// }
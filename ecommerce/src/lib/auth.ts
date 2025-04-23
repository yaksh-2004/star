
import { LoginTypes, RegisterTypes } from "@/type";
import api from "./api";



export const RegisterUser =  (data: RegisterTypes) => api.post("/auth/register", data)
export const LoginUser =  (data: LoginTypes) => api.post("/auth/login", data)
export const addProduct = (data: FormData) => api.post("/products", data,{
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
})


export const fetchUserData = async () => {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            throw new Error("Token not found");
        }
        const response = await api.get("/auth/user", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error setting authorization header:", error);
        throw error;
    }
};
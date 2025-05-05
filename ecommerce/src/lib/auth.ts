
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
export const forgotPassword = async (email: string) => {
  const res = await api.post("/auth/forgot-password", { email });
  return res.data;
};

export const resetPassword = async ({ token, password }: { token: string; password: string }) => {
  const res = await api.post("/auth/reset-password", { token, password });
  return res.data;
};

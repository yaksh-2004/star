export interface RegisterTypes {
    name : string,
    email : string,
    password : string,
    role : "Buyer" | "Seller"
}

export interface LoginTypes {
    email : string,
    password : string
}
export interface ProductTypes {
    name: string;
    desc: string;
    quantity: string;
    price:string;
    images: File[];
}
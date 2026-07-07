import { StaticImageData } from "next/image";

interface TProduct {
    id: number,
    name: string,
    image: StaticImageData,
    productId: string,
    category: string,
    price: number,
    stock: number,
    sales: number
}



interface IBodyProductUpdate {

    name?: string,
    image?: string,
    productId?: string,
    category?: string,
    price?: number,
    stock?: number,
    sales?: number
}


interface TPayloadToken {
    id: string | number,
    username: string,
    email: string,
    role?: "user" | "admin" | "manager"
}
interface IPayload  {id:number, username?:string, email?:string, phone?:string, country?:string}

export type {
    TProduct,
    IBodyProductUpdate,
    TPayloadToken,
    IPayload
}
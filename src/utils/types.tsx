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

export type {
    TProduct,
    IBodyProductUpdate
}
import { prisma } from "@/lib/prisma";
import { errorHandler } from "@/middleware/errorHandler";
import { IBodyProductUpdate } from "@/utils/types";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const GET = errorHandler( async (req: NextRequest, { params }: { params: { id: string } }) => {

    const p = await params
    const id = await Number(p.id);

    const product = await prisma.product.findUnique({
        where: {
            id
        }
    })
 
    if (!product) {
        return NextResponse.json(
            { msg: "Product Not Found" },
            { status: 404 },

        );

    }



    return NextResponse.json({ msg: 'SUCCESS', product }, { status: 200 })
})


export const PATCH = errorHandler( async (req: NextRequest, { params }: { params: { id: string } }) => {

    const p = await params
    const id = await Number(p.id);

    const body = await req.json() as IBodyProductUpdate



    const product = await prisma.product.findUnique({
        where: {
            id
        }
    })
    if (!product) {
        return NextResponse.json(
            { msg: "Product Not Found" },
            { status: 404 },

        );

    }

    const newProduct = await prisma.product.update({
        where: {
            id
        },
        data: {
            name: body.name,
            image: body.image,
            productId: body.productId,
            category: body.category,
            price: body.price,
            stock: body.stock,
            sales: body.sales

        }
    })
    return NextResponse.json({ msg: 'UPDATE SUCCESS', newProduct }, { status: 201 })


})


export const DELETE = errorHandler( async (req: NextRequest, { params }: { params: { id: string } }) => {

    const p = await params
    const id = await Number(p.id);


    const product = await prisma.product.findUnique({
        where: {
            id
        }
    })
    if (!product) {
        return NextResponse.json(
            { msg: "Product Not Found" },
            { status: 404 },

        );

    }

    const delProduct = await prisma.product.delete({
        where: {
            id
        }
    })

    return NextResponse.json({ msg: 'SUCCESS DEL', delProduct }, { status: 200 })
})
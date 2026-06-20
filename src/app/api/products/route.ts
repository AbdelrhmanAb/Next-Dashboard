import { NextRequest, NextResponse } from "next/server";


import { prisma } from "@/lib/prisma";
import { errorHandler } from "@/middleware/errorHandler";
import { z } from "zod";

import { writeFile } from "fs/promises";
import path from "path";

export const GET = errorHandler(async () => {

    const list = await prisma.product.findMany()


    return NextResponse.json({ msg: 'SUCCESS', list }, { status: 200 })
})


export const POST = errorHandler(async (req: NextRequest) => {


    const productSchema = z.object({
        name: z.string().min(2, "Name is required"),
        productId: z.string().min(1, "Product ID is required"),
        category: z.string().min(1, "Category is required"),
        price: z.coerce.number().positive("Price must be greater than 0"),
        stock: z.coerce.number().int().min(0, "Stock cannot be negative"),
        sales: z.coerce.number().int().min(0).default(0),
    });

    const formData = await req.formData();

    const image = formData.get('image') as File

    const data = {
        name: formData.get("name"),
        productId: formData.get("productId"),
        category: formData.get("category"),
        price: formData.get("price"),
        stock: formData.get("stock"),
        sales: formData.get("sales"),
    };

    const validation = productSchema.safeParse(data)


    if (!validation.success) {
        return NextResponse.json(
            {
                msg: "Validation Error",
                errors: validation.error.issues[0].message,
            },
            { status: 400 }
        );
    }

    if (!image) {
        return NextResponse.json({ msg: 'image is required' }, { status: 400 })
    }

    const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/webp",
        "image/jpg",
    ];

    if (!allowedTypes.includes(image.type)) {
        return NextResponse.json(
            {
                msg: "Only jpg, jpeg, png and webp images are allowed",
            },
            { status: 400 })
    }

    const maxSize = 5 * 1024 ** 2

    if (image.size > maxSize) {
        return NextResponse.json(
            {
                msg: "Image size must be less than 5MB",
            },
            { status: 400 }
        );
    }

    const bytes = await image.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const fileName = `${Date.now()}-${image.name.replaceAll(' ', '-')}`

    const uploadPath = path.join(
        process.cwd(),
        'public',
        'uploads',
        fileName
    )

    await writeFile(uploadPath, buffer)

    const product = await prisma.product.create({
        data: {
            ...validation.data, image: `/uploads/${fileName}`


        }
    })

    return NextResponse.json({ msg: 'SUCCESS', product }, { status: 201 })
})

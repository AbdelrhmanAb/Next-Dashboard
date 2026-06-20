import { prisma } from "@/lib/prisma";
import { errorHandler } from "@/middleware/errorHandler";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const POST = errorHandler(async (req: NextRequest) => {

    const body = await req.json();

    const registerSchema = z.object({
        username: z.string().min(3, "Username must be at least 3 characters"),
        email: z.email("Invalid email address"),
        password: z.string().min(8, "Password must be at least 8 characters"),
        phone: z.string().min(11, "Invalid phone number"),
        country: z.string().min(2, "Country is required"),
    });

    const validation = registerSchema.safeParse(body);

    if (!validation.success) {
        return NextResponse.json(
            {
                msg: validation.error.issues[0].message,
            },
            { status: 400 }
        );
    }
    const client = await prisma.user.findUnique({
        where: {
            email: validation.data.email
        }
    })


    if (client) {
        return NextResponse.json({msg:'User already exists'},{status:409})
        
    }
 
    const hashedPassword  = await bcrypt.hash(
        validation.data.password,
        12
    )
    const newClient = await prisma.user.create({
        data: { 
            ...validation.data,
            password:hashedPassword
         }
    })

    const {password, ...userWithoutPassword} = newClient

    return NextResponse.json(
        {
            msg: "User Created Successfully",
            data: userWithoutPassword,
        },
        { status: 201 }
    );
});
import { setCookie } from "@/lib/generatedToken";
import { prisma } from "@/lib/prisma";
import { errorHandler } from "@/middleware/errorHandler";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";



export const POST = errorHandler(async (req: NextRequest) => {

    const body = await req.json()

    const userSchema = z.object({
        email: z.string().email(),
        password: z.string().min(6)
    })

    const validation = userSchema.safeParse(body)

    if (!validation.success) {

        return NextResponse.json(
            { message: validation.error.issues[0].message },
            { status: 400 },
        );
    }

    const user = await prisma.user.findUnique({ where: { email: body.email } });
    if (!user) {
        return NextResponse.json(
            {
                message: "You don't have an account, Please Create an account first!",
            },
            { status: 400 },
        );
    }
        if (user.role !== "admin") {
        return NextResponse.json(
            { msg: "You are not authorized to access this resource" },
            { status: 403 }
        );
    }

    const isPasswordMatch = await bcrypt.compare(body.password, user.password)

    if (!isPasswordMatch) {
        return NextResponse.json(
            { message: "Invalid Password or Email!" },
            { status: 400 },
        );

    }

 

    const cookie =await setCookie(
        {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role
        })

    return NextResponse.json(
        { message: "Authenticated", cookie },
        { status: 200 }

    );
})
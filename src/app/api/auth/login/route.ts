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

    const isPasswordMatch = await bcrypt.compare(body.password, user.password)

    if (!isPasswordMatch) {
        return NextResponse.json(
            { message: "Invalid Password or Email!" },
            { status: 400 },
        );

    }

    return NextResponse.json(
        { message: "Authenticated  " },
        { status: 200 }

    );
})
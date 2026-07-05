import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/generatedToken";
import { errorHandler } from "@/middleware/errorHandler";
import { NextRequest, NextResponse } from "next/server";

export const GET = errorHandler(async (req: NextRequest) => {

    const cookie = req.cookies.get('jwtToken')?.value
           if (!cookie) {
        return NextResponse.json(
            { message: "User not allowed " },
            { status: 403 }
        );
    }

    const payload =await verifyToken(cookie);
  



    if (!payload) {
        return NextResponse.json(
            { msg: "Invalid Token" },
            { status: 401 }
        );
    }

    const user = await prisma.user.findUnique({
        where: {
            id: payload.id,
        },
        select: {
            id: true,
            username: true,
            email: true,
            phone: true,
            country: true,
        },
    });

    if (!user) {
        return NextResponse.json(
            { msg: "User Not Found" },
            { status: 404 }
        );
    }

    return NextResponse.json(
        {
            msg: "Success",
            user,
        },
        {
            status: 200,
        }
    );
});




import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/generatedToken";
export async function GET(req: NextRequest) {

    const cookie = req.cookies.get("jwtToken")?.value;

    if (!cookie) {
        return NextResponse.json(
            { message: "User not allowed " },
            { status: 403 }
        );
    }

    const payload = await verifyToken (cookie);




    if (!payload) {
        return NextResponse.json(
            { msg: "Invalid Token" },
            { status: 401 }
        );
    }

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
   
    });

    if (!user) {
        return NextResponse.json(
            { msg: "User Not Found" },
            { status: 404 }
        );
    }
    if (user.role !== "admin") {
        return NextResponse.json(
            { msg: "You are not authorized to access this resource" },
            { status: 403 }
        );
    }
    const users = await prisma.user.findMany({
        select: {
            id: true,
            username: true,
            email: true,
            createdAt: true,
            updatedAt: true,
        },
    });

    return NextResponse.json({ msg: "Users retrieved successfully", users });
}


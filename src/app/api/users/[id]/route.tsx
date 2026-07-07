import { prisma } from "@/lib/prisma";
import { errorHandler } from "@/middleware/errorHandler";
import { NextRequest, NextResponse } from "next/server";

interface Props {
    params: Promise<{
        id: string;
    }>;
}

export async function GET(
    req: NextRequest,
    { params }: Props
) {
    const p = await params
    const id = await Number(p.id);

    if (Number.isNaN(id)) {
        return NextResponse.json({ message: "Invalid user id" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
        where: { id },
        select: {
            id: true,
            username: true,
            email: true,
            createdAt: true,
            updatedAt: true,
        },
    });

    if (!user) {
        return NextResponse.json(
            { message: "User not found" },
            { status: 404 }
        );
    }

    return NextResponse.json({ msg: "User retrieved successfully", user });
}



export async function PUT(
    req: NextRequest,
    { params }: Props
) {
    const p = await params
    const id = await Number(p.id);

    if (Number.isNaN(id)) {
        return NextResponse.json({ message: "Invalid user id" }, { status: 400 });
    }
    const body = await req.json();
    const user = await prisma.user.findUnique({
        where: { id },
    });
    if (!user) {
        return NextResponse.json(
            { message: "User not found" },
            { status: 404 }
        );
    }
    const updatedUser = await prisma.user.update({
        where: { id },
        data: {
            username: body.username,
            email: body.email,
        },
        select: {
            id: true,
            username: true,
            email: true,
        },
    });

    return NextResponse.json({ msg: "User updated successfully", user: updatedUser });
}



export const DELETE = errorHandler(async (
    req: NextRequest,
    { params }: Props
) => {
    const p = await params
    const id = await Number(p.id);

    if (Number.isNaN(id)) {
        return NextResponse.json({ message: "Invalid user id" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
        where: { id },
    });
    if (!user) {
        return NextResponse.json(
            { message: "User not found" },
            { status: 404 }
        );
    }

    await prisma.user.delete({
        where: { id },
    });

    return NextResponse.json({
        message: "User deleted successfully",
    });
})
import { errorHandler } from "@/middleware/errorHandler";
import { NextRequest, NextResponse } from "next/server";


export const POST = errorHandler(async (req: NextRequest) => {

    const response = NextResponse.json({
        message: "Logged out successfully",
    })

     response.cookies.set("jwtToken", '', {
        httpOnly: true,
        expires: new Date(0),
        path: "/"

    })
    return response;
})
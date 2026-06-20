import { NextResponse } from "next/server";

type Handler = (req: any, ctx: any) => Promise<Response>;

export const errorHandler = (handler: Handler) => {
    return async (req: any, ctx: any) => {
        try {
            return await handler(req, ctx);
        } catch (error: any) {
            console.error("API Error:", error);

            return NextResponse.json(
                {
                    msg: "Internal Server Error",
                    error: error?.message || "Unknown error",
                },
                { status: 500 }
            );
        }
    };
};
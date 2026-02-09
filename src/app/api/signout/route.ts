import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
    (await cookies()).set({
        name: "token",
        value: "",
        path: "/",
        maxAge: 0,
        httpOnly: true,
        secure: true,
        sameSite: "strict",
    });

    return NextResponse.json({ message: "Wylogowano" });
}

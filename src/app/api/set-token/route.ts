import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const token = req.headers.get("authorization");

    if (!token) {
        return NextResponse.json({ error: "Brak tokenu" }, { status: 401 });
    }

    // Zapisujemy token w ciasteczku (można dodać zabezpieczenia)
    (await cookies()).set("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 60 * 60 * 24, // 1 dzień
        path: "/",
    });

    return NextResponse.json({ message: "Zalogowano" });
}

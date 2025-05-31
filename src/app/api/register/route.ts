import { NextResponse } from "next/server";
import { getAuth } from "firebase-admin/auth";
import { app } from "@/lib/firebase-admin"; // zakładam, że tu masz inicjalizację admin SDK

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ error: "Email i hasło są wymagane" }, { status: 400 });
        }

        const userRecord = await getAuth(app).createUser({
            email,
            password,
        });

        return NextResponse.json({
            message: "Użytkownik utworzony",
            uid: userRecord.uid,
        });
    } catch (error: any) {
        console.error("Błąd przy rejestracji:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

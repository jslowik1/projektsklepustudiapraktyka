/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { getAuth } from "firebase-admin/auth";
import { app } from "@/lib/firebase-admin"; // zakładam, że tu masz inicjalizację admin SDK
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email i hasło są wymagane" },
        { status: 400 }
      );
    }

    const userRecord = await getAuth(app).createUser({
      email,
      password,
    });
    if (userRecord) {
      try {
        await setDoc(doc(db, "users", userRecord.uid), {
          id: userRecord.uid,
          email: email,
        });
        return NextResponse.json({
          message: "Użytkownik utworzony",
          uid: userRecord.uid,
        });
      } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
    }
  } catch (error: any) {
    console.error("Błąd przy rejestracji:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

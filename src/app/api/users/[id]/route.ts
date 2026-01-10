import { adminDb } from "@/lib/firebase-admin";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const docRef = adminDb.collection("users").doc(params.id);
        const docSnap = await docRef.get();

        if (!docSnap.exists) {
            return NextResponse.json({ error: "Użytkownik nie znaleziony" }, { status: 404 });
        }

        return NextResponse.json({ id: docSnap.id, ...docSnap.data() });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Błąd serwera" }, { status: 500 });
    }
}
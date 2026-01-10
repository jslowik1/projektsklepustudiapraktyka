import { adminDb } from "@/lib/firebase-admin";
import { NextResponse } from "next/server";

export async function GET(request: Request, context: unknown) {
    try {
        const params = (typeof context === "object" && context !== null && "params" in context)
            ? (context as { params?: { id?: string | string[] } }).params ?? {}
            : {};
        // normalize id in case it's an array (Next can provide params as string | string[])
        const id = Array.isArray(params.id) ? params.id[0] : params.id;
        if (!id) {
            return NextResponse.json({ error: "Nieprawidłowy identyfikator" }, { status: 400 });
        }

        const docRef = adminDb.collection("users").doc(id);
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
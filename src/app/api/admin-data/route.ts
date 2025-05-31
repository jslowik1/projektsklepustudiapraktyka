import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";

export async function GET() {
    try {
        const snapshot = await adminDb.collection("items").get();
        const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        return NextResponse.json(items);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Błąd serwera" }, { status: 500 });
    }
}

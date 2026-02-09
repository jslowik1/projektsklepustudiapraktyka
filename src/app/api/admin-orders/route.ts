import { adminDb } from "@/lib/firebase-admin";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const snapshot = await adminDb.collection("orders").get();
        const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        return NextResponse.json(items);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Błąd serwera" }, { status: 500 });
    }
}

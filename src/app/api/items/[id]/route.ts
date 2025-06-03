import { db } from "@/lib/firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {

        const itemId = (await params).id;
        await deleteDoc(doc(db, "items", itemId));
        return NextResponse.json({ message: `Usunięto item ${itemId}` }, { status: 200 });
    } catch (e) {
        console.log(e);
        return NextResponse.json({ error: "Błąd przy dodawaniu danych" }, { status: 500 });
    }
}

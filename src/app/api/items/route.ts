import { NextResponse } from "next/server";
import { db } from "@/lib/firebase"; // importujesz swój firebase
import { addDoc, collection, getDocs } from "firebase/firestore";

export async function GET() {
    try {
        const snapshot = await getDocs(collection(db, "items"));
        const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        return NextResponse.json(items);
    } catch (e) {
        console.log(e);
        return NextResponse.json({ error: "Błąd przy pobieraniu danych" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const docRef = await addDoc(collection(db, "items"), data);
        return NextResponse.json({ id: docRef.id });
    } catch (e) {
        console.log(e);
        return NextResponse.json({ error: "Błąd przy dodawaniu danych" }, { status: 500 });
    }
}

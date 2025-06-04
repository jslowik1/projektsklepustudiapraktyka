// src/app/api/isAdmin/route.ts
import { NextRequest, NextResponse } from "next/server";
import * as admin from "firebase-admin";
import { adminDb } from "@/lib/firebase-admin";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { isAdmin: false, error: "Brak tokena" },
        { status: 401 }
      );
    }

    const decodedToken = await admin.auth().verifyIdToken(token);
    const uid = decodedToken.uid;

    const userDoc = await admin.firestore().collection("users").doc(uid).get();

    if (!userDoc.exists) {
      return NextResponse.json(
        { isAdmin: false, error: "Brak użytkownika" },
        { status: 404 }
      );
    }

    const userData = userDoc.data();
    const isAdmin = userData?.isAdmin === true;

    if (isAdmin === true) {
      const snapshot = await adminDb.collection("users").get();
      const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      return NextResponse.json(items);
    } else {
      return NextResponse.json(
        { isAdmin: false, error: "Brak uprawnien" },
        { status: 403 }
      );
    }
  } catch (error) {
    console.error("Błąd isAdmin:", error);
    return NextResponse.json(
      { isAdmin: false, error: "Błąd serwera" },
      { status: 500 }
    );
  }
}

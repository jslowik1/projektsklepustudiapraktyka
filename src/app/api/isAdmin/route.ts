// src/app/api/isAdmin/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "firebase-admin/auth";

export async function GET(req: NextRequest) {
  try {
    const authToken = req.headers.get("Authorization")?.split("Bearer ")[1];
    console.log(authToken);
    if (!authToken) {
      return NextResponse.json(
        { isAdmin: false, error: "Brak tokena" },
        { status: 401 }
      );
    }

    const decodedToken = await getAuth().verifyIdToken(authToken);
    const user = await getAuth().getUser(decodedToken.uid);

    // Sprawdź custom claims (lepsze rozwiązanie niż Firestore)
    const isAdmin = user.customClaims?.admin === true;

    return NextResponse.json({ isAdmin });
  } catch (error) {
    console.error("Błąd isAdmin:", error);
    return NextResponse.json(
      { isAdmin: false, error: "Błąd autentykacji" },
      { status: 500 }
    );
  }
}

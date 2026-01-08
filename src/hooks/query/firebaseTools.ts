import { db } from "@/lib/firebase";
import { addDoc, collection, deleteDoc, doc, DocumentData, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore";

export const getAllItemsFromCollection = async (collectionName: string): Promise<{ id: string, data: DocumentData }[]> => {
    const querySnapshot = await getDocs(collection(db, collectionName));
    return querySnapshot.docs.map((doc) => {
        return {
            id: doc.id,
            data: doc.data()
        }
    });
}

export const getItemFromCollectionById = async (collectionName: string, id: string) => {
    const docRef = doc(db, collectionName, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return docSnap.data()
    } else {
        return null;
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const addItemToCollection = async (collectionName: string, data: any, id?: string) => {
    if (id) {
        return await setDoc(doc(db, collectionName, id), data)
    } else {
        return await addDoc(collection(db, collectionName), data)
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateDocument = async (collectionName: string, id: string, data: any) => {
    const docRef = doc(db, collectionName, id);
    await updateDoc(docRef, data);
}

export const removeDocument = async (collectionName: string, id: string) => {
    const docRef = doc(db, collectionName, id);
    await deleteDoc(docRef);
}
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { Destination } from "../types/destination.types";

const COLLECTION_NAME = "destinations";

export const destinationService = {
  getAll: async (): Promise<Destination[]> => {
    const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
    return querySnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as Destination)
    );
  },

  getById: async (id: string): Promise<Destination | null> => {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Destination;
    }
    return null;
  },

  create: async (data: Omit<Destination, "id" | "createdAt" | "updatedAt">) => {
    return await addDoc(collection(db, COLLECTION_NAME), {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  },

  update: async (id: string, data: Partial<Destination>) => {
    const docRef = doc(db, COLLECTION_NAME, id);
    return await updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp(),
    });
  },

  delete: async (id: string) => {
    const docRef = doc(db, COLLECTION_NAME, id);
    return await deleteDoc(docRef);
  },
};

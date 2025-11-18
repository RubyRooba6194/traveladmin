import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { GalleryItem } from "../types/gallery.types";

const COLLECTION_NAME = "gallery";

export const galleryService = {
  getAll: async (): Promise<GalleryItem[]> => {
    const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
    return querySnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as GalleryItem)
    );
  },

  create: async (data: Omit<GalleryItem, "id" | "createdAt">) => {
    return await addDoc(collection(db, COLLECTION_NAME), {
      ...data,
      createdAt: serverTimestamp(),
    });
  },

  delete: async (id: string) => {
    const docRef = doc(db, COLLECTION_NAME, id);
    return await deleteDoc(docRef);
  },
};

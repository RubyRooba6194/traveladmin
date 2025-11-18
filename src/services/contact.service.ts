import {
  collection,
  getDocs,
  updateDoc,
  doc,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { ContactInquiry } from "../types/contact.types";

const COLLECTION_NAME = "contacts";

export const contactService = {
  getAll: async (): Promise<ContactInquiry[]> => {
    const q = query(
      collection(db, COLLECTION_NAME),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as ContactInquiry)
    );
  },

  updateStatus: async (id: string, status: ContactInquiry["status"]) => {
    const docRef = doc(db, COLLECTION_NAME, id);
    return await updateDoc(docRef, { status });
  },

  listenForNew: (callback: (count: number) => void) => {
    const q = query(
      collection(db, COLLECTION_NAME),
      where("status", "==", "new")
    );

    return onSnapshot(q, (snapshot) => {
      callback(snapshot.size);
    });
  },
};

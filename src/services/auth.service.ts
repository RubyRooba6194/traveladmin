import {
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
} from "firebase/auth";
import { auth } from "../config/firebase";

export const authService = {
  login: async (email: string, password: string) => {
    return await signInWithEmailAndPassword(auth, email, password);
  },

  logout: async () => {
    return await signOut(auth);
  },

  updatePassword: async (newPassword: string) => {
    if (auth.currentUser) {
      return await updatePassword(auth.currentUser, newPassword);
    }
    throw new Error("No user logged in");
  },
};

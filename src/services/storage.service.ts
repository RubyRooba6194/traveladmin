import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { storage } from "../config/firebase";

export const storageService = {
  uploadImage: async (file: File, path: string): Promise<string> => {
    const storageRef = ref(storage, `${path}/${Date.now()}_${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    return await getDownloadURL(snapshot.ref);
  },

  uploadMultipleImages: async (
    files: File[],
    path: string
  ): Promise<string[]> => {
    const uploadPromises = files.map((file) =>
      storageService.uploadImage(file, path)
    );
    return await Promise.all(uploadPromises);
  },

  deleteImage: async (url: string) => {
    const imageRef = ref(storage, url);
    return await deleteObject(imageRef);
  },
};

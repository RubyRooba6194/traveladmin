const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

export const cloudinaryService = {
  uploadImage: async (file: File): Promise<string> => {
    // Debug: Check environment variables
    console.log("🔍 Cloudinary Config:", {
      cloudName: CLOUD_NAME,
      uploadPreset: UPLOAD_PRESET,
      fileName: file.name,
      fileSize: file.size,
    });

    if (!CLOUD_NAME || !UPLOAD_PRESET) {
      throw new Error("Cloudinary configuration missing! Check .env file");
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);
    formData.append("folder", "destinations");

    try {
      const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
      console.log("📤 Uploading to:", url);

      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });

      console.log("📥 Response status:", response.status);

      // Get response text first to see error details
      const responseText = await response.text();
      console.log("📥 Response body:", responseText);

      if (!response.ok) {
        let errorMessage = "Upload failed";
        try {
          const errorData = JSON.parse(responseText);
          errorMessage =
            errorData.error?.message || errorData.message || errorMessage;
        } catch (e) {
          errorMessage = responseText || errorMessage;
        }
        throw new Error(`Upload failed: ${errorMessage}`);
      }

      const data = JSON.parse(responseText);
      console.log("✅ Upload success:", data.secure_url);
      return data.secure_url;
    } catch (error: any) {
      console.error("❌ Cloudinary upload error:", error);
      throw error;
    }
  },

  uploadMultipleImages: async (files: File[]): Promise<string[]> => {
    try {
      console.log(`📤 Uploading ${files.length} files...`);
      const uploadPromises = files.map((file) =>
        cloudinaryService.uploadImage(file)
      );
      const results = await Promise.all(uploadPromises);
      console.log("✅ All uploads completed:", results);
      return results;
    } catch (error) {
      console.error("❌ Multiple upload error:", error);
      throw error;
    }
  },

  deleteImage: async (imageUrl: string): Promise<void> => {
    console.log("🗑️ Delete image:", imageUrl);
  },
};

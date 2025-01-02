const upload_preset = import.meta.env.VITE_UPLOAD_PRESET;
const cloud_name = import.meta.env.VITE_CLOUD_NAME;

const uploadPDFToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", upload_preset); // Using the environment variable
  formData.append("cloud_name", cloud_name); // Using the environment variable

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, // Using the dynamic cloud name
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error("Failed to upload PDF");
    }

    const data = await response.json();
    return data.secure_url; // Cloudinary's URL for the uploaded file
  } catch (error) {
    console.error("Error uploading PDF to Cloudinary:", error);
    throw error;
  }
};

export default uploadPDFToCloudinary;

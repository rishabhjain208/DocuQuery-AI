import React, { useRef, useState } from "react";
import logo from "../assets/logo.jpg";
import Vector from "../assets/Vector.png";
import { CiCirclePlus } from "react-icons/ci";
import uploadPDFToCloudinary from "../utils/uploadCloudinary";

const Navbar = () => {
  const [fileName, setFileName] = useState("");
  const [uploadedURL, setUploadedURL] = useState("");
  const fileInputRef = useRef(null);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const uploadedURL = await uploadPDFToCloudinary(file);
      setUploadedURL(uploadedURL); // Store the uploaded file's URL
      setFileName(file.name); // Display the uploaded file's name
    } catch (error) {
      console.error("Error uploading PDF:", error);
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleUploadAgain = () => {
    setFileName(""); // Reset the file name
    setUploadedURL(""); // Reset the uploaded URL
  };

  return (
    <nav className="p-4 flex justify-between items-center shadow-md bg-white">
      <div className="flex items-center">
        <img src={logo} alt="Logo" className="h-8 ml-4" />
        <img src={Vector} alt="Vector Icon" className="h-6" />
      </div>

      <div className="relative w-[180px] h-[50px] flex flex-col items-center justify-center">
        {!uploadedURL && ( // Show the upload button and icon only if no file is uploaded
          <>
            <input
              type="file"
              accept=".pdf"
              ref={fileInputRef}
              onChange={handleFileUpload}
              className="hidden"
            />
            <button
              onClick={handleButtonClick}
              className="flex items-center justify-center font-semibold border border-zinc-800 rounded-lg cursor-pointer text-headingColor text-[15px] leading-6 p-2 w-full"
            >
              <CiCirclePlus className="text-xl mr-2" /> Upload PDF
            </button>
          </>
        )}

        {uploadedURL && ( // Show the uploaded file name and the plus icon for re-uploading
          <div className="flex items-center mt-2 text-sm text-green-500">
            <p className="mr-2">
              Uploaded: <strong>{fileName}</strong>
            </p>
            <CiCirclePlus
              className="text-xl text-gray-800 w-14 h-32 cursor-pointer"
              onClick={handleUploadAgain}
            />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

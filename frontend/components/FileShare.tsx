"use client";
import React, { useRef, useState } from 'react';

const FileShare = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [downloadLink, setDownloadLink] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false); // New loading state

  const handleDivClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];

      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
      if (!allowedTypes.includes(file.type)) {
        setErrorMessage('Invalid file type. Please upload an image or PDF.');
        return;
      }

      const formData = new FormData();
      formData.append('file', file);

      try {
        setIsLoading(true); // Start loading
        setErrorMessage(null);
        setDownloadLink(null);

        const response = await fetch('http://127.0.0.1:8080/upload', {
          method: 'POST',
          body: formData,
        });

        const result = await response.json(); // Parse the JSON response

        if (!response.ok) {
          throw new Error(result); // Throw an error with the response message
        }

        // If upload is successful, set the download link
        if (result.includes("Access it at")) {
          const downloadLink = result.split("Access it at ")[1]; // Extract the link
          setDownloadLink(downloadLink);
        }
      } catch (error) {
        console.error('Error uploading file:', error);
        setErrorMessage('Failed to upload the file. Please try again.');
      } finally {
        setIsLoading(false); // End loading
      }
    }
  };

  return (
    <div className="p-5 rounded-2xl group bg-[#42424a] transition-all duration-500">
      {downloadLink ? (
        <div className="flex flex-col items-center justify-center border-[3px] border-dashed border-gray-500 w-[70vw] h-80 hover:bg-slate-800">
          <span className="text-xl text-green-600 mb-4">File uploaded successfully!</span>
          <span className="text-lg text-gray-300 mb-2">Use this link to download your file:</span>
          <a
            href={downloadLink}
            className="text-lg text-blue-500 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {downloadLink}
          </a>
        </div>
      ) : (
        <div
          className="border-dashed rounded-2xl group-hover:bg-slate-800 h-80 w-[70vw] cursor-pointer flex flex-col items-center justify-center border-[3px] border-gray-500 transition-colors duration-500"
          onClick={handleDivClick}
        >
          <span className='border-orange-600 rounded-full border-[3px] text-orange-600 w-16 h-16 flex items-center justify-center text-5xl mb-5'>+</span>
          <span className='text-2xl text-center mx-4'>Click to browse or drag files here to start sharing</span>
        </div>
      )}

      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileUpload}
      />

      {errorMessage && (
        <div className="mt-4 text-red-500">{errorMessage}</div>
      )}
      {isLoading && <p className="text-blue-500">Uploading...</p>} {/* Loading message */}
    </div>
  );
};

export default FileShare;

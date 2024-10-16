import React, { useRef, useState } from 'react';

const FileShare = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [downloadLink, setDownloadLink] = useState<string | null>(null); // State to store the download link

  const handleDivClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const formData = new FormData();
      formData.append('file', files[0]);

      try {
        const response = await fetch('http://127.0.0.1:8080/upload', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Error uploading file');
        }

        const result = await response.text();
        console.log(result); // Display the result, which contains the unique link

        // Extract the file ID from the result (assuming the result contains the download path)
        const fileIdMatch = result.match(/Access it at (\/download\/[a-zA-Z0-9-]+)/);
        if (fileIdMatch) {
          setDownloadLink(`http://127.0.0.1:8080${fileIdMatch[1]}`); // Set the download link state
        }
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  };

  return (
    <div className="p-5 rounded-2xl group bg-[#42424a] transition-all duration-500">
      {downloadLink ? ( // Ternary operator to display the link or the upload interface
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
        onChange={handleFileUpload} // Updated event handler
      />
    </div>
  );
};

export default FileShare;

import React, { useState, useCallback } from 'react';
import { UploadIcon, LoadingSpinner } from './icons';

interface ImageUploaderProps {
  onImageChange: (file: File) => void;
  isLoading: boolean;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageChange, isLoading }) => {
  const [isDragging, setIsDragging] = useState(false);

  // Fix: Changed React.DragEvent<HTMLDivElement> to React.DragEvent<HTMLLabelElement> for drag event handlers to match the <label> element they are attached to.
  const handleDragEnter = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onImageChange(e.dataTransfer.files[0]);
    }
  }, [onImageChange]);
  
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImageChange(e.target.files[0]);
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      <label
        htmlFor="dropzone-file"
        className={`flex flex-col items-center justify-center w-full h-96 border-2 border-dashed rounded-lg cursor-pointer transition-colors duration-300
        ${isDragging ? 'border-indigo-500 bg-gray-800' : 'border-gray-600 bg-gray-800/50 hover:bg-gray-800'}
        `}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          {isLoading ? (
            <>
              <LoadingSpinner />
              <p className="mt-4 text-lg text-gray-400">Analyzing your world...</p>
            </>
          ) : (
            <>
              <UploadIcon />
              <p className="mb-2 text-sm text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
              <p className="text-xs text-gray-500">PNG, JPG, or GIF</p>
            </>
          )}
        </div>
        <input id="dropzone-file" type="file" className="hidden" onChange={handleFileSelect} accept="image/png, image/jpeg, image/gif" disabled={isLoading} />
      </label>
    </div>
  );
};

export default ImageUploader;
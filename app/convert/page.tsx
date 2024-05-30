"use client";

import React, { useRef, useState } from "react";

export default function Convert() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedVideoFile, setSelectedVideoFile] = useState<File>();
  const [videoFileSize, setVideoFileSize] = useState<Number>(0);

  const handleOuterDivClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const resetFiles = () => {
    setSelectedVideoFile(undefined);
    setVideoFileSize(0);
  };

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];

    if (file) {
      setSelectedVideoFile(file);
      const sizeInMB = file.size / 1_000_000;
      console.log(`File size: ${sizeInMB.toFixed(2)} MB`);
      setVideoFileSize(sizeInMB);
    }
  };

  return (
    <main className="pt-14 flex flex-col items-center justify-center px-6">
      <div className="space-y-6">
        <div className="text-muted-foreground text-md md:text-lg text-center md:px-24 xl:px-44 2xl:px-52">
          Convert media directly on your device with our server-free technology.
        </div>
      </div>
      {!selectedVideoFile && (
        <div className="pt-10 container max-w-4xl lg:max-w-6xl 2xl:max-w-7xl">
          <div
            role="presentation"
            className="bg-background h-72 lg:h-80 xl:h-96 rounded-3xl shadow-sm border-secondary border-2 border-dashed cursor-pointer flex items-center justify-center"
            onClick={handleOuterDivClick}
          >
            <input
              ref={inputRef}
              onChange={handleFileChange}
              accept="video/mp4,video/x-m4v,video/webm,video/*, .mkv"
              tabIndex={-1}
              type="file"
              className="hidden"
            />
            <div className="space-y-4 text-foreground">
              <div className="justify-center flex text-3xl  md:text-4xl lg:text-6xl">
                <svg
                  stroke="currentColor"
                  fill="none"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <polyline points="16 16 12 12 8 16"></polyline>
                  <line x1="12" y1="12" x2="12" y2="21"></line>
                  <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path>
                  <polyline points="16 16 12 12 8 16"></polyline>
                </svg>
              </div>
              <h3 className="text-center font-medium text-lg md:text-2xl">
                Select a video file
              </h3>
              <h5 className="text-center text-sm md:text-base text-gray-400">
                Supports any video format, any size.
              </h5>
            </div>
          </div>
        </div>
      )}

      {/* Video file card */}
      {selectedVideoFile && (
        <div className="pt-10 container max-w-4xl lg:max-w-6xl 2xl:max-w-7xl">
          <div className="px-5 bg-background h-24 rounded-3xl shadow-sm border-secondary border cursor-pointer flex items-center justify-between">
            <div className="flex">
              <span className="text-2xl text-orange-600">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  stroke-width="0"
                  viewBox="0 0 16 16"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M.002 3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-12a2 2 0 0 1-2-2zm1 9v1a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062zm5-6.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0"></path>
                </svg>
              </span>
              <span className="ml-3">{selectedVideoFile.name}</span>
              <span className="text-gray-500 ml-1">
                ({videoFileSize.toFixed(2)} MB)
              </span>
            </div>

            {/* Close button */}
            <div
              onClick={resetFiles}
              className="cursor-pointer hover:bg-gray-100 rounded-full h-10 w-10 flex items-center justify-center text-2xl text-foreground"
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 24 24"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
              </svg>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

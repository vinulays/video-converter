"use client";

import React, { useRef } from "react";

export default function Convert() {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleOuterDivClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <main className="pt-14 flex flex-col items-center justify-center px-6">
      <div className="space-y-6">
        <div className="text-muted-foreground text-md md:text-lg text-center md:px-24 xl:px-44 2xl:px-52">
          Convert media directly on your device with our server-free technology.
        </div>
      </div>
      <div className="pt-10 container max-w-4xl lg:max-w-6xl 2xl:max-w-7xl">
        <div
          role="presentation"
          className="bg-background h-72 lg:h-80 xl:h-96 rounded-3xl shadow-sm border-secondary border-2 border-dashed cursor-pointer flex items-center justify-center"
          onClick={handleOuterDivClick}
        >
          <input
            ref={inputRef}
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
    </main>
  );
}

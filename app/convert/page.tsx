"use client";

import React, { useRef, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import { Circle, Line } from "rc-progress";

export default function Convert() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [selectedVideoFile, setSelectedVideoFile] = useState<File>();
  const [videoFileSize, setVideoFileSize] = useState<Number>(0);

  const [outputFormat, setOutputFormat] = useState<string>("");
  const [outputFileName, setOutputFileName] = useState<string>("testvideo");
  const [convertedVideo, setConvertedVideo] = useState<string | null>(null);

  const [percentage, setPercentage] = useState<Number>(0);
  const [remainingTime, setRemainingTime] = useState<string>("");

  const ffmpeg = createFFmpeg({ log: true });

  // * use to select a video file when clicked the square
  const handleOuterDivClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  // * reset selected video file
  const resetFiles = () => {
    setSelectedVideoFile(undefined);
    setVideoFileSize(0);
    setOutputFormat("");
    setConvertedVideo(null);
    setPercentage(0);
    setRemainingTime("");
  };

  // * use to display selected video file and the size
  const handleFileChange = (event: any) => {
    const file = event.target.files[0];

    if (file) {
      setSelectedVideoFile(file);
      const sizeInMB = file.size / 1_000_000;
      console.log(`File size: ${sizeInMB.toFixed(2)} MB`);
      setVideoFileSize(sizeInMB);
    }
  };

  // * convert selected video
  const handleConvert = async () => {
    if (!selectedVideoFile) return;

    await ffmpeg.load();
    ffmpeg.FS("writeFile", "input", await fetchFile(selectedVideoFile));

    const outputFileNameWithExtension = `${outputFileName}.${outputFormat}`;

    let command;
    switch (outputFormat) {
      case "webm":
        command = [
          "-i",
          "input",
          "-c:v",
          "libvpx",
          "-c:a",
          "libvorbis",
          outputFileNameWithExtension,
        ];
        break;
      case "ogg":
        command = [
          "-i",
          "input",
          "-c:v",
          "libtheora",
          "-c:a",
          "libvorbis",
          outputFileNameWithExtension,
        ];
        break;
      case "avi":
        command = [
          "-i",
          "input",
          "-c:v",
          "mpeg4",
          "-c:a",
          "mp3",
          outputFileNameWithExtension,
        ];
        break;
      case "mkv":
        command = [
          "-i",
          "input",
          "-c:v",
          "libx264",
          "-c:a",
          "aac",
          outputFileNameWithExtension,
        ];
        break;
      case "mov":
        command = [
          "-i",
          "input",
          "-c:v",
          "libx264",
          "-c:a",
          "aac",
          outputFileNameWithExtension,
        ];
        break;
      case "flv":
        command = [
          "-i",
          "input",
          "-c:v",
          "flv",
          "-c:a",
          "mp3",
          outputFileNameWithExtension,
        ];
        break;
      case "wmv":
        command = [
          "-i",
          "input",
          "-c:v",
          "wmv2",
          "-c:a",
          "wma",
          outputFileNameWithExtension,
        ];
        break;
      case "mpeg":
        command = [
          "-i",
          "input",
          "-c:v",
          "mpeg1video",
          "-c:a",
          "mp2",
          outputFileNameWithExtension,
        ];
        break;
      case "gif":
        command = ["-i", "input", outputFileNameWithExtension];
        break;
      case "mp3":
        command = ["-i", "input", "-q:a", "0", outputFileNameWithExtension];
        break;
      case "aac":
        command = ["-i", "input", "-c:a", "aac", outputFileNameWithExtension];
        break;
      case "wav":
        command = [
          "-i",
          "input",
          "-c:a",
          "pcm_s16le",
          outputFileNameWithExtension,
        ];
        break;
      case "flac":
        command = ["-i", "input", "-c:a", "flac", outputFileNameWithExtension];
        break;
      case "alac":
        command = ["-i", "input", "-c:a", "alac", outputFileNameWithExtension];
        break;
      case "wma":
        command = ["-i", "input", "-c:a", "wmav2", outputFileNameWithExtension];
        break;
      case "aiff":
        command = [
          "-i",
          "input",
          "-c:a",
          "pcm_s16be",
          outputFileNameWithExtension,
        ];
        break;
      default:
        command = [
          "-i",
          "input",
          "-c:v",
          "libx264",
          "-preset",
          "ultrafast",
          "-c:a",
          "aac",
          outputFileNameWithExtension,
        ];
        break;
    }

    const startTime = Date.now();

    ffmpeg.setProgress(({ ratio }) => {
      setPercentage(ratio * 100);

      const elapsedTime = (Date.now() - startTime) / 1000;
      const estimatedTotalTime = elapsedTime / ratio;
      const remainingTime = estimatedTotalTime - elapsedTime;

      setRemainingTime(formatRemainingTime(remainingTime));
    });

    await ffmpeg.run(...command);

    const data = ffmpeg.FS("readFile", outputFileNameWithExtension);

    const mimeType =
      outputFormat === "mp3" ||
      outputFormat === "aac" ||
      outputFormat === "wav" ||
      outputFormat === "flac" ||
      outputFormat === "alac" ||
      outputFormat === "wma" ||
      outputFormat === "aiff"
        ? `audio/${outputFormat}`
        : `video/${outputFormat}`;

    const videoUrl = URL.createObjectURL(
      new Blob([data.buffer], { type: mimeType })
    );
    setConvertedVideo(videoUrl);
  };

  const formatRemainingTime = (seconds: number): string => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    let formattedTime = "";

    if (h > 0) {
      formattedTime += `${h}h `;
    }
    if (m > 0 || h > 0) {
      formattedTime += `${m}min `;
    }
    formattedTime += `${s}s remaining`;
    return formattedTime;
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
        <div className="pt-10 container max-w-4xl lg:max-w-6xl 2xl:max-w-7xl flex-col">
          <div className="px-5 bg-background h-24 rounded-3xl shadow-sm border-secondary border cursor-pointer flex items-center justify-between">
            <div className="flex basis-2/3">
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

            {/* Video type drop down */}
            <div className="flex items-center gap-3">
              {percentage.valueOf() == 0 && <div>Convert to</div>}
              {percentage.valueOf() == 0 && (
                <div>
                  <Select onValueChange={setOutputFormat}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select a format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mp4">MP4</SelectItem>
                      <SelectItem value="webm">WebM</SelectItem>
                      <SelectItem value="ogg">OGG</SelectItem>
                      <SelectItem value="avi">AVI</SelectItem>
                      <SelectItem value="mkv">MKV</SelectItem>
                      <SelectItem value="gif">GIF</SelectItem>
                      <SelectItem value="mov">MOV</SelectItem>
                      <SelectItem value="wmv">WMV</SelectItem>
                      <SelectItem value="mpeg">MPEG</SelectItem>
                      <SelectItem value="mp3">MP3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              {percentage.valueOf() > 0 && percentage.valueOf() != 100 && (
                <div className="py-6 flex items-center gap-2">
                  <div className="w-5">
                    <Circle
                      percent={percentage as number}
                      strokeWidth={15}
                      strokeColor="#22C55E"
                      trailColor="#D3D3D3"
                    />
                  </div>

                  <div>
                    <span>{remainingTime}</span>
                  </div>
                </div>
              )}

              {percentage.valueOf() == 100 && (
                <div className="py-6 flex items-center gap-2">
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="#22C55E"
                      className="size-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                  </div>
                  <div>Completed</div>
                </div>
              )}
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

          <div className="flex justify-end mt-5 items-center gap-5">
            {!convertedVideo && percentage.valueOf() == 0 && (
              <button
                disabled={outputFormat == "" ? true : false}
                onClick={handleConvert}
                className="justify-center whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8 rounded-xl font-semibold relative py-4 text-md flex items-center w-44"
              >
                Convert Now
              </button>
            )}

            {convertedVideo && (
              <div className="flex justify-center mt-5">
                <a
                  href={convertedVideo}
                  download={outputFileName}
                  className="justify-center whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8 rounded-xl font-semibold relative py-4 text-md flex items-center w-44"
                >
                  Download
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}

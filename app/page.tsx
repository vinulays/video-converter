import Image from "next/image";

export default function Home() {
  return (
    <main>
      {/* Navigation bar */}
      <nav className="flex items-center justify-between flex-wrap px-6 sm:px-24 py-10">
        <div className="flex gap-2 items-center flex-shrink-0 text-black mr-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="34"
            height="34"
            viewBox="0 0 50 50"
          >
            <path d="M 20 4 C 14.507813 4 10 8.507813 10 14 L 10 31.75 L 7.125 28.875 L 4.3125 31.71875 L 12 39.40625 L 19.6875 31.71875 L 16.875 28.90625 L 14 31.75 L 14 14 C 14 10.691406 16.691406 8 20 8 L 31 8 L 31 4 Z M 38 10.59375 L 30.28125 18.3125 L 33.125 21.125 L 36 18.25 L 36 36 C 36 39.308594 33.308594 42 30 42 L 19 42 L 19 46 L 30 46 C 35.492188 46 40 41.492188 40 36 L 40 18.25 L 42.875 21.125 L 45.6875 18.28125 Z"></path>
          </svg>
          <span className="font-bold text-2xl whitespace-nowrap">
            Convertify
          </span>
        </div>
        <div>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="34"
              height="34"
              viewBox="0 0 24 24"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </div>
        </div>
      </nav>
      {/* Header */}
      <header className="mx-auto flex flex-col justify-center items-center max-w-3xl text-center py-12 sm:py-28 mt-10 lg:pt-8 xl:pb-0 ">
        <div className="border bg-blue-50 border-white shadow-lg shadow-blue-200 mb-4 w-44 rounded-full p-1">
          <div className="w-full text-base">✨ Try it Free!</div>
        </div>
        <h1 className="mb-6 pb-4 text-4xl font-bold  md:text-6xl">
          Seamless Video Conversion, Anytime, Anywhere.
        </h1>
        <div className="mx-auto mb-5 max-w-[528px] text-xl text-[#636262] lg:mb-8">
          Say Goodbye to Server Hassles, Say Hello to Instant Conversion.
        </div>
        <a
          className="hover:scale-105 transition-all inline-block rounded-full bg-blue-700 px-8 py-4 text-center font-bold text-white  hover:border-black hover:bg-blue-500"
          href="/convert"
        >
          Get Started
        </a>
      </header>
      <div className="mt-16 mb-16 flex flex-col items-center justify-center divide-y divide-gray-300 sm:flex-row sm:divide-x sm:divide-y-0 md:mt-20">
        <div className="flex max-w-xs space-x-2 px-4 py-4">
          <div className="text-gray-600 dark:text-gray-400">
            Our app stands out by utilizing client-side conversion technology,
            eliminating the need for server-side processing.
          </div>
        </div>
        <div className="flex max-w-xs space-x-2 px-4 py-4">
          <div className="text-gray-600 dark:text-gray-400">
            Say goodbye to subscription fees and hidden charges. Our app offers
            free access to its powerful conversion.
          </div>
        </div>
        <div className="flex max-w-xs space-x-2 px-4 py-4">
          <div className="text-gray-600 dark:text-gray-400">
            With no restrictions on usage, our app provides unlimited
            conversions for all your media files. Whether you are converting one
            file or a hundred.
          </div>
        </div>
      </div>
      <div className="text-center mb-5" role="img" aria-label="love">
        Made with &#10084;&#65039; by{" "}
        <a href="https://github.com/vinulays">vinulays</a>
      </div>
    </main>
  );
}

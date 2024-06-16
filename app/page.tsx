import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      {/* Header */}
      <header className="mx-auto flex flex-col justify-center items-center max-w-3xl text-center py-12 sm:py-28 mt-10 lg:pt-8 xl:pb-0 ">
        <div className="border bg-red-50 border-white shadow-lg shadow-red-200 mb-4 w-44 rounded-full p-1">
          <div className="w-full text-base">✨ Try it Free!</div>
        </div>
        <h1 className="mb-6 mx-3 pb-4 text-3xl font-bold sm:text-6xl">
          Seamless Video Conversion, Anytime, Anywhere.
        </h1>
        <div className="md:mx-auto mx-5  mb-5 max-w-[528px] text-base md:text-xl text-[#636262] lg:mb-8">
          Say Goodbye to Server Hassles, Say Hello to Instant Conversion.
        </div>
        <Link
          className="hover:scale-105 transition-all inline-block rounded-full bg-[#FD0054] px-8 py-4 text-center font-bold text-white  hover:border-black hover:bg-[#A80038]"
          href="/convert"
        >
          Get Started
        </Link>
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

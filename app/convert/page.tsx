export default function Convert() {
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
        >
          <input
            multiple
            accept="image/*,.jpg,.jpeg,.png,.gif,.bmp,.webp,.ico,.tif,.tiff,.raw,.tga,audio/*,video/*"
            tabIndex={-1}
            type="file"
            style={{ display: "none" }}
          />
          <div className="space-y-4 text-foreground">
            <div className="justify-center flex text-3xl  md:text-4xl lg:text-6xl">
              <svg
                stroke="currentColor"
                fill="none"
                stroke-width="2"
                viewBox="0 0 24 24"
                stroke-linecap="round"
                stroke-linejoin="round"
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
              Click, or drop your files here
            </h3>
          </div>
        </div>
      </div>
    </main>
  );
}

export const Skeleton = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <div className="w-full max-w-2xl mt-10 px-4 flex flex-col items-center">
        <div className="w-full mb-4">
          <div className="w-full h-10 bg-gray-300 rounded-md"></div>
        </div>
        <div className="w-full flex  mb-4">
          <div className="w-32 h-10 bg-gray-300 rounded-md"></div>
        </div>
        <div className="w-full mb-4 bg-gray-300 h-64 rounded-md flex items-center justify-center">
          <span className="text-gray-300">Video Player</span>
        </div>
        <div className="w-full bg-white p-4 rounded-md shadow-md">
          <div className="w-40 h-6 bg-gray-300 mb-4 rounded"></div>
          <div className="space-y-2">
            <div className="bg-gray-200 h-6 rounded-md"></div>
            <div className="bg-gray-200 h-6 rounded-md"></div>
            <div className="bg-gray-200 h-6 rounded-md"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

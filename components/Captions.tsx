import { Caption } from "@/lib/types";
import React, { useState, useEffect } from "react";

export const Captions = ({ captionList }: { captionList: Caption[] }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="w-full bg-white p-4 rounded-md shadow-md">
      <h2 className="text-xl font-bold mb-4">Captions</h2>
      <div className="space-y-2">
        {captionList.map((item, idx) => {
          const startTime = new Date(item.startTime);
          const endTime = new Date(item.endTime);

          if (currentTime >= startTime && currentTime <= endTime) {
            return (
              <div key={idx} className="bg-gray-200 p-2 rounded-md">
                {item.caption}
              </div>
            );
          }

          return null;
        })}
      </div>
    </div>
  );
};

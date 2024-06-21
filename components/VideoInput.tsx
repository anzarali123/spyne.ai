"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
export const VideoInput = ({
  setVideourl,
  setLoading,
  videourl,
}: {
  setVideourl: (value: string) => void;
  setLoading: (value: boolean) => void;
  videourl: string;
}) => {
  const [inputValue, setInputValue] = useState<string>(videourl);
  const [disabled, setDisabled] = useState(false);
  const handleSubmit = async () => {
    if (!inputValue) {
      toast.error("Please enter a valid url");
      return;
    }
    setLoading(true);
    setDisabled(true);
    try {
      const response = await axios.post(`/api/addvideo`, {
        videourl: inputValue,
      });
      console.log(response, "response from url");
      if (response.data.success) {
        sessionStorage.setItem("videoid", response.data.dbResponse.id);
        setVideourl(inputValue);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
    setDisabled(false);
  };

  console.log(inputValue, "input");
  return (
    <div className="flex justify-center flex-col w-full m-10 items-center">
      <label htmlFor="video-url" className="mb-3 font-bold">
        {" "}
        Video URL
      </label>
      <div className="flex gap-5 ">
        <input
          onChange={(e) => setInputValue(e.target.value)}
          type="text"
          name="input"
          value={inputValue}
          placeholder="Enter a video url"
          className="w-96 p-3 rounded-md border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          disabled={disabled}
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded-md "
        >
          Submit
        </button>
      </div>
    </div>
  );
};

"use client";
import { Navbar } from "@/components/Navbar";
import { VideoInput } from "@/components/VideoInput";
import { VideoPlayer } from "@/components/VideoPlayer";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import { BACKEND_URL } from "@/config";
import { Skeleton } from "./Skeleton";
import { Video, VideoUrl } from "@/lib/types";

export const Home = () => {
  const [videourl, setVideourl] = useState<VideoUrl>("");
  const [loading, setLoading] = useState(false);
  const [videoDetails, setVideoDetails] = useState<Video | null | []>(null);

  const fetchUserVideoDetails = async () => {
    try {
      const response = await axios.get(`/api/videodetails`);
      console.log(response.data, "response from video");
      const data: Video = response.data.dbResponse.video;
      if (response.data.dbResponse && response.data.dbResponse.video) {
        setVideoDetails(response.data.dbResponse.video);
        setVideourl(response.data.dbResponse.video.video);
        sessionStorage.setItem("videoid", response.data.dbResponse.video.id);
      } else {
        setVideoDetails([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserVideoDetails();
  }, []);

  return (
    <>
      <Toaster />
      <Navbar />
      {videoDetails ? (
        <>
          <VideoInput
            setLoading={setLoading}
            videourl={videourl}
            setVideourl={setVideourl}
          />
          <VideoPlayer
            //@ts-ignore
            captions={videoDetails?.captions}
            loading={loading}
            src={videourl}
          />
        </>
      ) : (
        <Skeleton />
      )}
    </>
  );
};

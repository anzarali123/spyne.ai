import ReactPlayer from "react-player";
import AddCaption from "./AddCaption";
import { useEffect, useState } from "react";
import { Captions } from "./Captions";

import axios from "axios";
import { BACKEND_URL } from "@/config";
import toast from "react-hot-toast";
import { Caption, CaptionInput } from "@/lib/types";
import { Loader } from "./Loader";

export const VideoPlayer = ({
  src,
  loading,
  captions,
}: {
  src: string;
  loading: boolean;
  captions: Caption[];
}) => {
  const [captionList, setCaptionList] = useState<Caption[]>(captions || []);

  const handleCaption = async (caption: CaptionInput) => {
    toast.loading("Adding Caption Please wait...");
    const videoid = sessionStorage.getItem("videoid");
    const payload = { videoid, ...caption };
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/addcaption`,
        payload
      );
      if (response.data.success) {
        await fetchCaptions();
      }
    } catch (error) {
      console.log(error);
    }
    toast.dismiss();
  };

  const fetchCaptions = async () => {
    try {
      const { data } = await axios.get(`${BACKEND_URL}/api/videodetails`);
      console.log(data, "response from video");
      setCaptionList(data.dbResponse.video.captions);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCaptions();
  }, [src]);

  if (loading) {
    return <Loader width={10} height={10} />;
  }
  return (
    <div className="flex justify-center items-center mt-12">
      {src ? (
        <div className="flex flex-col gap-4">
          <AddCaption handleCaption={handleCaption} />
          <ReactPlayer controls url={src} />
          <Captions captionList={captionList} />
        </div>
      ) : (
        <div className="font-bolder text-3xl text-gray-400">No Video</div>
      )}
    </div>
  );
};

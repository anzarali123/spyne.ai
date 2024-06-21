export type VideoUrl = string;

export interface Caption {
  id: number;
  caption: string;
  videoId: number;
  startTime: string;
  endTime: string;
}

export interface Video {
  id?: number;
  video: string;
  captions: Caption[];
}

export interface CaptionInput {
  startTime: string;
  endTime: string;
  caption: string;
}

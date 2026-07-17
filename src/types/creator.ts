import { Video } from "./video";

export interface Creator {
    channelId: string;
    channelName: string;
    handle: string;
    channelUrl: string;

    subscribers: number;
    videoCount: number;
    totalViews: number;

    description: string;
    country?: string;

    website?: string;
    instagram?: string;

    sourceQuery: string;
    videos?: Video[];
}
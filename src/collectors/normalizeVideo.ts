import { Video } from "../types/video";

export function normalizeVideo(raw: any): Video {

    return {

        videoId: raw.videoId,

        title: raw.title,

        url: raw.url,

        thumbnailUrl: raw.thumbnailUrl,

        publishedTime: raw.publishedTimeText,

        views: raw.viewCount,

        duration: raw.durationFormatted

    };

}
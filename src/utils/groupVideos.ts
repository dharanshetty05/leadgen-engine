import { Video } from "../types/video";

export function groupVideosByChannel(rawVideos: any[]) {

    const grouped = new Map<string, Video[]>();

    for (const raw of rawVideos) {

        const video: Video = {

            videoId: raw.videoId,

            title: raw.title,

            url: raw.url,

            thumbnailUrl: raw.thumbnailUrl,

            publishedTime: raw.publishedTimeText,

            views: raw.viewCount,

            duration: raw.durationFormatted

        };

        const existing = grouped.get(raw.channelId) ?? [];

        existing.push(video);

        grouped.set(raw.channelId, existing);

    }

    return grouped;

}
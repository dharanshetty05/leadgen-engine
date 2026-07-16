import { Creator } from "../types/creator";

export function normalizeCreator(raw: any): Creator {
    return {
        channelId: raw.channelId,
        channelName: raw.title,
        handle: raw.handle,
        channelUrl: raw.channelUrl,

        subscribers: raw.subscriberCount,
        videoCount: raw.videoCount,
        totalViews: raw.viewCount,

        description: raw.description ?? "",

        country: raw.country,

        website: raw.website,

        instagram: raw.socialLinks?.instagram,

        sourceQuery: raw.query
    };
}
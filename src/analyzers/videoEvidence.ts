import { CreatorWithVideos } from "../types/creatorWithVideos";
import { Video } from "../types/video";
import { VideoEvidence } from "../types/videoEvidence";
import { calculateViewStats } from "./helpers/calculateViewStats";
import { calculateDurationStats } from "./helpers/calculateDurationStats";
import { calculateTitleStats } from "./helpers/calculateTitleStats";
import { calculateUploadStats } from "./helpers/calculateUploadStats";
import { parseRecencyToDays } from "../utils/recency";

export function analyzeVideoEvidence(creator: { channelId: string; videos: Video[] }): VideoEvidence {
    const videos = creator.videos ?? [];

    const viewStats = calculateViewStats(videos);
    const durationStats = calculateDurationStats(videos);
    const titleStats = calculateTitleStats(videos);
    const uploadStats = calculateUploadStats(videos);

    // Sort latestVideos deterministically by recency (least days ago first, unparseable at the end)
    const latestVideos = [...videos].sort((a, b) => {
        const daysA = parseRecencyToDays(a.publishedTime);
        const daysB = parseRecencyToDays(b.publishedTime);
        if (daysA === null && daysB === null) return 0;
        if (daysA === null) return 1;
        if (daysB === null) return -1;
        return daysA - daysB;
    });

    const thumbnailUrls = videos
        .map((v) => v.thumbnailUrl)
        .filter((url): url is string => Boolean(url));

    return {
        channelId: creator.channelId,

        uploadStats,
        viewStats,
        durationStats,
        titleStats,

        thumbnailUrls,
        latestVideos,
    };
}

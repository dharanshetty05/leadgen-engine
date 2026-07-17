import { Creator } from "../types/creator";
import { VideoEvidence } from "../types/videoEvidence";
import { calculateViewStats } from "./helpers/calculateViewStats";
import { calculateDurationStats } from "./helpers/calculateDurationStats";
import { calculateTitleStats } from "./helpers/calculateTitleStats";
import { calculateUploadStats } from "./helpers/calculateUploadStats";
import { parseRecencyToDays } from "../utils/recency";

export function analyzeVideoEvidence(creator: Creator): VideoEvidence {
    const videos = creator.videos ?? [];

    const viewStats = calculateViewStats(videos);
    const durationStats = calculateDurationStats(videos);
    const titleLengthStats = calculateTitleStats(videos);
    const { uploadRecency, uploadFrequency, uploadConsistency } = calculateUploadStats(videos);

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

        uploadCount: videos.length,
        uploadRecency,
        uploadFrequency,
        uploadConsistency,

        averageViews: viewStats.average,
        medianViews: viewStats.median,
        highestViewedVideo: viewStats.highest,
        lowestViewedVideo: viewStats.lowest,
        averageDuration: durationStats.averageSeconds,
        durationRange: durationStats.rangeSeconds,

        viewStats,
        durationStats,
        titleLengthStats,

        thumbnailUrls,
        latestVideos,
    };
}

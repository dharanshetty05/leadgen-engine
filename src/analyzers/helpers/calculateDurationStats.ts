import { Video } from "../../types/video";
import { DurationStats } from "../../types/videoEvidence";
import { parseDurationToSeconds, formatSecondsToDuration } from "../../utils/duration";

export function calculateDurationStats(videos: Video[]): DurationStats {
    if (!videos || videos.length === 0) {
        return {
            averageSeconds: 0,
            averageFormatted: "0:00",
            shortestSeconds: 0,
            longestSeconds: 0,
            rangeSeconds: 0,
        };
    }

    const durationsInSeconds = videos.map((video) => parseDurationToSeconds(video.duration));

    const sum = durationsInSeconds.reduce((acc, curr) => acc + curr, 0);
    const averageSeconds = Math.round(sum / durationsInSeconds.length);
    const averageFormatted = formatSecondsToDuration(averageSeconds);

    const shortestSeconds = Math.min(...durationsInSeconds);
    const longestSeconds = Math.max(...durationsInSeconds);
    const rangeSeconds = Math.max(0, longestSeconds - shortestSeconds);

    return {
        averageSeconds,
        averageFormatted,
        shortestSeconds,
        longestSeconds,
        rangeSeconds,
    };
}

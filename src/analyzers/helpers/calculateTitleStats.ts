import { Video } from "../../types/video";
import { TitleLengthStats } from "../../types/videoEvidence";

export function calculateTitleStats(videos: Video[]): TitleLengthStats {
    if (!videos || videos.length === 0) {
        return {
            averageChars: 0,
            minChars: 0,
            maxChars: 0,
            averageWords: 0,
        };
    }

    let totalChars = 0;
    let totalWords = 0;
    let minChars = Infinity;
    let maxChars = -Infinity;

    for (const video of videos) {
        const title = video.title ?? "";
        const charCount = title.length;
        const wordCount = title.trim().split(/\s+/).filter(Boolean).length;

        totalChars += charCount;
        totalWords += wordCount;

        if (charCount < minChars) minChars = charCount;
        if (charCount > maxChars) maxChars = charCount;
    }

    if (minChars === Infinity) minChars = 0;
    if (maxChars === -Infinity) maxChars = 0;

    return {
        averageChars: Number((totalChars / videos.length).toFixed(1)),
        minChars,
        maxChars,
        averageWords: Number((totalWords / videos.length).toFixed(1)),
    };
}

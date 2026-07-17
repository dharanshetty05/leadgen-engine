import { Video } from "../../types/video";
import { UploadRecency, UploadFrequency, UploadConsistency, UploadStats } from "../../types/videoEvidence";
import { parseRecencyToDays } from "../../utils/recency";

export function calculateUploadStats(videos: Video[]): UploadStats {
    if (!videos || videos.length === 0) {
        return {
            count: 0,
            recency: { latestPublishedTime: null, approximateDaysAgo: null },
            frequency: { estimatedUploadsPerMonth: 0, averageDaysBetweenUploads: null },
            consistency: { stdDevDaysBetweenUploads: null, coefficientOfVariation: null, intervalsInDays: [] },
        };
    }

    // Map and filter videos with numeric recency
    const videosWithRecency = videos.map((video) => ({
        video,
        daysAgo: parseRecencyToDays(video.publishedTime),
    }));

    const validEntries = videosWithRecency
        .filter((entry): entry is { video: Video; daysAgo: number } => entry.daysAgo !== null)
        .sort((a, b) => a.daysAgo - b.daysAgo);

    // Calculate upload recency
    let uploadRecency: UploadRecency;
    if (validEntries.length > 0) {
        uploadRecency = {
            latestPublishedTime: validEntries[0].video.publishedTime || null,
            approximateDaysAgo: validEntries[0].daysAgo,
        };
    } else {
        uploadRecency = {
            latestPublishedTime: videos[0].publishedTime || null,
            approximateDaysAgo: null,
        };
    }

    // If fewer than 2 valid entries, estimate from single video or defaults
    if (validEntries.length < 2) {
        let estimatedUploadsPerMonth = 0;
        let averageDaysBetweenUploads: number | null = null;

        if (validEntries.length === 1) {
            const daysAgo = validEntries[0].daysAgo;
            averageDaysBetweenUploads = daysAgo;
            if (daysAgo > 0) {
                estimatedUploadsPerMonth = Number((30 / daysAgo).toFixed(1));
            } else {
                estimatedUploadsPerMonth = 30;
                averageDaysBetweenUploads = 1;
            }
        }

        return {
            count: videos.length,
            recency: uploadRecency,
            frequency: {
                estimatedUploadsPerMonth,
                averageDaysBetweenUploads,
            },
            consistency: {
                stdDevDaysBetweenUploads: validEntries.length === 1 ? 0 : null,
                coefficientOfVariation: validEntries.length === 1 ? 0 : null,
                intervalsInDays: [],
            },
        };
    }

    // Calculate gaps between adjacent uploads sorted chronologically
    const gaps: number[] = [];
    for (let i = 1; i < validEntries.length; i++) {
        const gap = validEntries[i].daysAgo - validEntries[i - 1].daysAgo;
        gaps.push(Math.max(0, gap));
    }

    const sumGaps = gaps.reduce((acc, val) => acc + val, 0);
    const averageDaysBetweenUploads = Number((sumGaps / gaps.length).toFixed(1));

    const estimatedUploadsPerMonth =
        averageDaysBetweenUploads > 0
            ? Number((30 / averageDaysBetweenUploads).toFixed(1))
            : gaps.length * 30;

    // Standard deviation of gaps
    const variance =
        gaps.reduce((acc, val) => acc + Math.pow(val - averageDaysBetweenUploads, 2), 0) /
        gaps.length;
    const stdDevDaysBetweenUploads = Number(Math.sqrt(variance).toFixed(1));

    // Coefficient of variation
    let coefficientOfVariation: number | null = 0;

    if (averageDaysBetweenUploads > 0) {
        coefficientOfVariation = Number((stdDevDaysBetweenUploads / averageDaysBetweenUploads).toFixed(2));
    } else {
        coefficientOfVariation = 0;
    }

    return {
        count: videos.length,
        recency: uploadRecency,
        frequency: {
            estimatedUploadsPerMonth,
            averageDaysBetweenUploads,
        },
        consistency: {
            stdDevDaysBetweenUploads,
            coefficientOfVariation,
            intervalsInDays: gaps,
        },
    };
}

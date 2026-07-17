import { Video } from "./video";

export interface UploadRecency {
    latestPublishedTime: string | null;
    approximateDaysAgo: number | null;
}

export interface UploadFrequency {
    estimatedUploadsPerMonth: number;
    averageDaysBetweenUploads: number | null;
}

export interface UploadConsistency {
    stdDevDaysBetweenUploads: number | null;
    coefficientOfVariation: number | null;
    intervalsInDays: number[];
}

export interface UploadStats {
    count: number;
    recency: UploadRecency;
    frequency: UploadFrequency;
    consistency: UploadConsistency;
}

export interface ViewStats {
    average: number;
    median: number;
    highest: Video | null;
    lowest: Video | null;
}

export interface DurationStats {
    averageSeconds: number;
    averageFormatted: string;
    shortestSeconds: number;
    longestSeconds: number;
    rangeSeconds: number;
}

export interface TitleStats {
    averageChars: number;
    minChars: number;
    maxChars: number;
    averageWords: number;
}

export interface VideoEvidence {
    channelId: string;

    uploadStats: UploadStats;
    viewStats: ViewStats;
    durationStats: DurationStats;
    titleStats: TitleStats;

    thumbnailUrls: string[];
    latestVideos: Video[];
}

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
    isRegular: boolean;
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

export interface TitleLengthStats {
    averageChars: number;
    minChars: number;
    maxChars: number;
    averageWords: number;
}

export interface VideoEvidence {
    channelId: string;

    // Upload metrics
    uploadCount: number;
    uploadRecency: UploadRecency;
    uploadFrequency: UploadFrequency;
    uploadConsistency: UploadConsistency;

    // Direct convenience properties required by specification
    averageViews: number;
    medianViews: number;
    highestViewedVideo: Video | null;
    lowestViewedVideo: Video | null;
    averageDuration: number; // in seconds
    durationRange: number; // in seconds

    // Detailed structured statistics
    viewStats: ViewStats;
    durationStats: DurationStats;
    titleLengthStats: TitleLengthStats;

    // Visuals and records
    thumbnailUrls: string[];
    latestVideos: Video[];
}

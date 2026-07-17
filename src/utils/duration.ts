export function parseDurationToSeconds(duration: string | undefined | null): number {
    if (!duration) return 0;

    const trimmed = duration.trim();
    if (!trimmed) return 0;

    const parts = trimmed
        .split(":")
        .map((part) => parseInt(part, 10))
        .filter((num) => !isNaN(num));

    if (parts.length === 3) {
        // HH:MM:SS
        return parts[0] * 3600 + parts[1] * 60 + parts[2];
    } else if (parts.length === 2) {
        // MM:SS
        return parts[0] * 60 + parts[1];
    } else if (parts.length === 1) {
        // SS
        return parts[0];
    }

    return 0;
}

export function formatSecondsToDuration(totalSeconds: number): string {
    if (!totalSeconds || totalSeconds < 0 || isNaN(totalSeconds)) {
        return "0:00";
    }

    const rounded = Math.round(totalSeconds);
    const hours = Math.floor(rounded / 3600);
    const minutes = Math.floor((rounded % 3600) / 60);
    const seconds = rounded % 60;

    const secondsFormatted = seconds.toString().padStart(2, "0");

    if (hours > 0) {
        const minutesFormatted = minutes.toString().padStart(2, "0");
        return `${hours}:${minutesFormatted}:${secondsFormatted}`;
    }

    return `${minutes}:${secondsFormatted}`;
}

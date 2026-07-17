export function parseRecencyToDays(publishedTimeText: string | undefined | null): number | null {
    if (!publishedTimeText) return null;

    const text = publishedTimeText.toLowerCase().trim();
    if (!text) return null;

    // Handle immediate/very recent phrasing
    if (text.includes("just now") || text.includes("second") || text.includes("minute") || text.includes("hour") || text.includes("today")) {
        return 0;
    }

    if (text.includes("yesterday")) {
        return 1;
    }

    // Match patterns with numbers (e.g. "streamed 3 days ago", "2 weeks ago")
    const numMatch = text.match(/(\d+)\s+(day|week|month|year)/);
    if (numMatch) {
        const value = parseInt(numMatch[1], 10);
        const unit = numMatch[2];

        if (unit === "day") return value;
        if (unit === "week") return value * 7;
        if (unit === "month") return value * 30;
        if (unit === "year") return value * 365;
    }

    // Match patterns with singular indefinite article (e.g. "a day ago", "an hour ago", "a week ago")
    if (text.match(/an?\s+day/)) return 1;
    if (text.match(/an?\s+week/)) return 7;
    if (text.match(/an?\s+month/)) return 30;
    if (text.match(/an?\s+year/)) return 365;

    // Check if it's an ISO date string or standard date representation
    const parsedDate = Date.parse(publishedTimeText);
    if (!isNaN(parsedDate)) {
        const diffMs = Math.max(0, Date.now() - parsedDate);
        return Math.round(diffMs / (1000 * 60 * 60 * 24));
    }

    return null;
}

import { Video } from "../../types/video";
import { ViewStats } from "../../types/videoEvidence";

export function calculateViewStats(videos: Video[]): ViewStats {
    if (!videos || videos.length === 0) {
        return {
            average: 0,
            median: 0,
            highest: null,
            lowest: null,
        };
    }

    let sum = 0;
    let highest: Video = videos[0];
    let lowest: Video = videos[0];

    for (const video of videos) {
        const views = typeof video.views === "number" && !isNaN(video.views) ? video.views : 0;
        sum += views;

        if (!highest || views > (typeof highest.views === "number" ? highest.views : 0)) {
            highest = video;
        }
        if (!lowest || views < (typeof lowest.views === "number" ? lowest.views : 0)) {
            lowest = video;
        }
    }

    const average = Math.round(sum / videos.length);

    const sortedByViews = [...videos].sort((a, b) => {
        const viewsA = typeof a.views === "number" && !isNaN(a.views) ? a.views : 0;
        const viewsB = typeof b.views === "number" && !isNaN(b.views) ? b.views : 0;
        return viewsA - viewsB;
    });

    const mid = Math.floor(sortedByViews.length / 2);
    let median = 0;

    if (sortedByViews.length % 2 === 0) {
        const views1 = typeof sortedByViews[mid - 1].views === "number" ? sortedByViews[mid - 1].views : 0;
        const views2 = typeof sortedByViews[mid].views === "number" ? sortedByViews[mid].views : 0;
        median = Math.round((views1 + views2) / 2);
    } else {
        median = typeof sortedByViews[mid].views === "number" ? sortedByViews[mid].views : 0;
    }

    return {
        average,
        median,
        highest,
        lowest,
    };
}

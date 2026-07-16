import dotenv from "dotenv";
import { ApifyClient } from "apify-client";
import { normalizeCreator } from "./collectors/normalize";
import { deduplicateCreators } from "./utils/deduplicate";
import { filterCreators } from "./filters/filterCreators";
import { saveJson } from "./utils/saveJson";
import { classifyCreator } from "./classifiers/groq";
import { normalizeVideo } from "./collectors/normalizeVideo";
import { groupVideosByChannel } from "./utils/groupVideos";

dotenv.config();

const client = new ApifyClient({
    token: process.env.APIFY_TOKEN,
});

async function main() {
    console.log("Running actor...");
    
    const run = await client.actor("scrapesage/youtube-scraper").call({
        mode: "searchChannels",
        searchTerms: [
            "business",
        ],
        maxResultsPerQuery: 5,
        includeVideos: true,
        maxVideosPerChannel: 10,
        includeVideoStats: true,
        enrichCreatorContacts: false,
        language: "en",
    });

    const { items } = await client
        .dataset(run.defaultDatasetId!)
        .listItems();

    const channelItems = items.filter(
    item => item.type === "channel"
);

const videoItems = items.filter(
    item => item.type === "video"
);

console.log(channelItems.length);
console.log(videoItems.length);

const videos = videoItems.map(normalizeVideo);
const creators = items.map(normalizeCreator);

const videosByChannel = groupVideosByChannel(videoItems);

console.log(
    videosByChannel.get(
        creators[0].channelId
    )
);

    // const uniqueCreators = deduplicateCreators(creators);
    // const filteredCreators = filterCreators(uniqueCreators);

    // console.log(`
    //     Pipeline Results
    //     ----------------
    //     Raw: ${items.length}
    //     Normalized: ${creators.length}
    //     Unique: ${uniqueCreators.length}
    //     Filtered: ${filteredCreators.length}
    // `);

    // console.table(
    //     filteredCreators.map((creator) => ({
    //         Name: creator.channelName,
    //         Subscribers: creator.subscribers,
    //         Country: creator.country,
    //         Query: creator.sourceQuery,
    //     }))
    // );

    // const result = await classifyCreator(filteredCreators[0]);
    // const qualifiedCreators = [];
    // for (const creator of filteredCreators) {
    //     const classification = await classifyCreator(creator);
    //     if (classification.fit) {
    //         qualifiedCreators.push({
    //             creator,
    //             classification
    //         });
    //     }
    // }

    // await saveJson(
    //     "qualified-creators.json",
    //     qualifiedCreators
    // );
}

main();
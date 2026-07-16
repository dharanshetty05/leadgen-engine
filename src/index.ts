import dotenv from "dotenv";
import { ApifyClient } from "apify-client";
import { normalizeCreator } from "./collectors/normalize";
import { deduplicateCreators } from "./utils/deduplicate";
import { filterCreators } from "./filters/filterCreators";

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
            "psychology"
        ],
        maxResultsPerQuery: 5,
        includeVideos: false,
        enrichCreatorContacts: false,
        language: "en"
    });

    const { items } = await client
        .dataset(run.defaultDatasetId!)
        .listItems();

    const creators = items.map(normalizeCreator);
    const uniqueCreators = deduplicateCreators(creators);
    const filteredCreators = filterCreators(uniqueCreators);

    console.log(filteredCreators.slice(0, 5));

    console.log(`
        Pipeline Results
        ----------------
        Raw: ${items.length}
        Normalized: ${creators.length}
        Unique: ${uniqueCreators.length}
        Filtered: ${filteredCreators.length}
    `);

    console.table(
        filteredCreators.map((creator) => ({
            Name: creator.channelName,
            Subscribers: creator.subscribers,
            Country: creator.country,
            Query: creator.sourceQuery,
        }))
    );
}

main();
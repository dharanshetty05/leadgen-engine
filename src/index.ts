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

    console.log(run.defaultDatasetId);

    const { items } = await client
        .dataset(run.defaultDatasetId!)
        .listItems();

    console.log("Raw items:", items.length);

    const creators = items.map(normalizeCreator);

    console.log(creators[0]);

    const uniqueCreators = deduplicateCreators(creators);

    console.log("Before:", creators.length);
    console.log("After:", uniqueCreators.length);

    const filteredCreators = filterCreators(uniqueCreators);

    console.log("Filtered:", filteredCreators.length);

    console.log(filteredCreators.slice(0, 5));
}

main();
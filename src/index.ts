import dotenv from "dotenv";
import { ApifyClient } from "apify-client";

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

    console.log(items);
}

main();
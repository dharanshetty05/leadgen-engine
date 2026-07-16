import { Actor } from "apify";
import dotenv from "dotenv";

dotenv.config();

async function main() {
    await Actor.init();

    console.log("Hello");

    await Actor.exit();
}

main();
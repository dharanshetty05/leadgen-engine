import { Creator } from "../types/creator";

export function filterCreators(creators: Creator[]): Creator[] {
    const filtered: Creator[] = [];

    for (const creator of creators) {

        if (creator.subscribers < 10000) {
            console.log(`❌ ${creator.channelName} - Less than 10k subscribers`);
            continue;
        }

        if (creator.subscribers > 200000) {
            console.log(`❌ ${creator.channelName} - More than 200k subscribers`);
            continue;   
        }

        if (!creator.description?.trim()) {
            console.log(`❌ ${creator.channelName} - No description`);
            continue;
        }

        console.log(`✅ ${creator.channelName}`);

        filtered.push(creator);
    }

    return filtered;
}
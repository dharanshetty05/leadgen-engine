import { normalizeCreator } from "../collectors/normalize";
import { Creator } from "../types/creator";

export function deduplicateCreators(creators: Creator[]): Creator[] {

    const map = new Map<string, Creator>();

    for (const creator of creators) {
        map.set(creator.channelId, creator);
    }

    return [...map.values()];
}
import { Creator } from "../types/creator";

export function filterCreators(creators: Creator[]) {

    return creators.filter((creator) => {

        if (creator.subscribers < 10000) return false;

        if (creator.subscribers > 200000) return false;

        if (!creator.instagram) return false;

        return true;
    });

}
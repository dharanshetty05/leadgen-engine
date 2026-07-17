import { QualifiedCreator } from "./qualifiedCreator";
import { Video } from "./video";

export interface CreatorWithVideos extends QualifiedCreator {
    videos: Video[];
}

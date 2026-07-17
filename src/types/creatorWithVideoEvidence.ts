import { CreatorWithVideos } from "./creatorWithVideos";
import { VideoEvidence } from "./videoEvidence";

export interface CreatorWithVideoEvidence extends CreatorWithVideos {
    evidence: VideoEvidence;
}

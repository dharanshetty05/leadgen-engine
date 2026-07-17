import { Creator } from "./creator";
import { Classification } from "./classification";

export interface QualifiedCreator extends Creator {
    classification: Classification;
}
// This is an auto generated file

// Types: GetBeatmapsetDiscussionsResponseFormat, ResponseFormatReviewsConfig

// Type imports
import type { Beatmap } from "./beatmap.d.mjs"
import type { BeatmapsetDiscussion } from "./beatmapsetDiscussion.d.mjs"
import type { UserCompact } from "./userCompact.d.mjs"

/**
 * [Source](https://osu.ppy.sh/docs/index.html#responseformat)
 */
export interface GetBeatmapsetDiscussionsResponseFormat {
    /**
     * List of beatmaps associated with the discussions returned.
     * Updated types: `Beatmap`[] -> Beatmap[]
     */
    beatmaps: Beatmap[]
    /**
     * Updated types: `CursorString` -> CursorString
     */
    cursor_string: CursorString
    /**
     * List of discussions according to `sort` order.
     * Updated types: `BeatmapsetDiscussion`[] -> BeatmapsetDiscussion[]
     */
    discussions: BeatmapsetDiscussion[]
    /**
     * Additional discussions related to `discussions`.
     * Updated types: `BeatmapsetDiscussion`[] -> BeatmapsetDiscussion[]
     */
    included_discussions: BeatmapsetDiscussion[]
    /**
     * Maximum number of blocks allowed in a review.
     */
    reviews_config: ResponseFormatReviewsConfig
    /**
     * List of users associated with the discussions returned.
     * Updated types: `UserCompact`[] -> UserCompact[]
     */
    users: UserCompact[]
}

export interface ResponseFormatReviewsConfig {
    /**
     * Maximum number of blocks allowed in a review.
     */
    max_blocks: number
}

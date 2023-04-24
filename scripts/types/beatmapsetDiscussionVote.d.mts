// This is an auto generated file

// Types: BeatmapsetDiscussionVote

// Type imports
import type { Timestamp } from "./timestamp.d.mjs"

/**
 * Represents a vote on a BeatmapsetDiscussion.
 * [Source](https://osu.ppy.sh/docs/index.html#beatmapsetdiscussionvote)
 */
export interface BeatmapsetDiscussionVote {
    beatmapset_discussion_id: number
    /**
     * Updated types: `Timestamp` -> Timestamp
     */
    created_at: Timestamp
    id: number
    score: number
    /**
     * Updated types: `Timestamp` -> Timestamp
     */
    updated_at: Timestamp
    user_id: number
}

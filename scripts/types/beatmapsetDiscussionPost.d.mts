// This is an auto generated file

// Types: BeatmapsetDiscussionPost

// Type imports
import type { Timestamp } from "./timestamp.d.mjs"

/**
 * Represents a post in a BeatmapsetDiscussion.
 * [Source](https://osu.ppy.sh/docs/index.html#beatmapsetdiscussionpost)
 */
export interface BeatmapsetDiscussionPost {
    beatmapset_discussion_id: number
    /**
     * Updated types: `Timestamp` -> Timestamp
     */
    created_at: Timestamp
    /**
     * Updated types: `Timestamp` -> Timestamp
     */
    deleted_at?: Timestamp
    deleted_by_id?: number
    id: number
    last_editor_id?: number
    message: string
    system: boolean
    /**
     * Updated types: `Timestamp` -> Timestamp
     */
    updated_at: Timestamp
    user_id: number
}

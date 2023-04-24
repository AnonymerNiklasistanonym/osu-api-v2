// This is an auto generated file

// Types: BeatmapsetDiscussion, MessageType

// Type imports
import type { BeatmapCompact } from "./beatmapCompact.d.mjs"
import type { BeatmapsetCompact } from "./beatmapsetCompact.d.mjs"
import type { BeatmapsetDiscussionPost } from "./beatmapsetDiscussionPost.d.mjs"
import type { CurrentUserAttributes } from "./commentableMeta.d.mjs"
import type { Timestamp } from "./timestamp.d.mjs"

/**
 * Represents a Beatmapset modding discussion.
 * [Source](https://osu.ppy.sh/docs/index.html#beatmapsetdiscussion)
 */
export interface BeatmapsetDiscussion {
    /**
     * Updated types: `BeatmapCompact` -> BeatmapCompact
     */
    beatmap?: BeatmapCompact
    beatmap_id?: number
    /**
     * Updated types: `BeatmapsetCompact` -> BeatmapsetCompact
     */
    beatmapset?: BeatmapsetCompact
    beatmapset_id: number
    can_be_resolved: boolean
    can_grant_kudosu: boolean
    /**
     * Updated types: `Timestamp` -> Timestamp
     */
    created_at: Timestamp
    /**
     * Updated types: `CurrentUserAttributes` -> CurrentUserAttributes
     */
    current_user_attributes: CurrentUserAttributes
    /**
     * Updated types: `Timestamp` -> Timestamp
     */
    deleted_at?: Timestamp
    deleted_by_id?: number
    id: number
    kudosu_denied: boolean
    /**
     * Updated types: `Timestamp` -> Timestamp
     */
    last_post_at: Timestamp
    /**
     * Updated types: `MessageType` -> MessageType
     */
    message_type: MessageType
    parent_id?: number
    /**
     * Updated types: `BeatmapsetDiscussionPost`[] -> BeatmapsetDiscussionPost[]
     */
    posts?: BeatmapsetDiscussionPost[]
    resolved: boolean
    /**
     * Updated types: `BeatmapsetDiscussionPost` -> BeatmapsetDiscussionPost
     */
    starting_post?: BeatmapsetDiscussionPost
    timestamp?: number
    /**
     * Updated types: `Timestamp` -> Timestamp
     */
    updated_at: Timestamp
    user_id: number
}

/**
 * [Source](https://osu.ppy.sh/docs/index.html#messagetype)
 */
export enum MessageType {
    /**
     * Description
     */
    HYPE = "hype",
    /**
     * Description
     */
    MAPPER_NOTE = "mapper_note",
    /**
     * Description
     */
    PRAISE = "praise",
    /**
     * Description
     */
    PROBLEM = "problem",
    /**
     * Description
     */
    REVIEW = "review",
    /**
     * Description
     */
    SUGGESTION = "suggestion",
}

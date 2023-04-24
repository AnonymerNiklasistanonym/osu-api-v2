// This is an auto generated file

// Types: ForumTopic, Poll, PollOption, PollOptionText, PollTitle

// Type imports
import type { Timestamp } from "./timestamp.d.mjs"

/**
 * [Source](https://osu.ppy.sh/docs/index.html#forumtopic)
 */
export interface ForumTopic {
    /**
     * Updated types: `Timestamp` -> Timestamp
     */
    created_at: Timestamp
    /**
     * Updated types: `Timestamp` -> Timestamp
     */
    deleted_at?: Timestamp
    first_post_id: number
    forum_id: number
    id: number
    is_locked: boolean
    last_post_id: number
    /**
     * Updated types: `Poll` -> Poll
     */
    poll?: Poll
    post_count: number
    title: string
    /**
     * Updated types: `normal` -> "normal", `sticky` -> "sticky", `announcement` -> "announcement"
     */
    type: "normal" | "sticky" | "announcement"
    /**
     * Updated types: `Timestamp` -> Timestamp
     */
    updated_at: Timestamp
    user_id: number
}

/**
 * [Source](https://osu.ppy.sh/docs/index.html#poll)
 */
export interface Poll {
    allow_vote_change: boolean
    /**
     * Updated types: `Timestamp` -> Timestamp
     */
    ended_at?: Timestamp
    hide_incomplete_results: boolean
    /**
     * Updated types: `Timestamp` -> Timestamp
     */
    last_vote_at?: Timestamp
    max_votes: number
    /**
     * Updated types: `PollOption`[] -> PollOption[]
     */
    options: PollOption[]
    /**
     * Updated types: `Timestamp` -> Timestamp
     */
    started_at: Timestamp
    title: PollTitle
    total_vote_count: number
}

/**
 * [Source](https://osu.ppy.sh/docs/index.html#polloption)
 */
export interface PollOption {
    id: number
    text: PollOptionText
    vote_count?: number
}

export interface PollOptionText {
    bbcode: string
    html: string
}

export interface PollTitle {
    bbcode: string
    html: string
}

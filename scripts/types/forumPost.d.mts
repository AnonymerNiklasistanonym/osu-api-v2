// This is an auto generated file

// Types: ForumPost, ForumPostBody

// Type imports
import type { Timestamp } from "./timestamp.d.mjs"

/**
 * [Source](https://osu.ppy.sh/docs/index.html#forumpost)
 */
export interface ForumPost {
    /**
     * Post content in HTML format.
     */
    body?: ForumPostBody
    /**
     * Updated types: `Timestamp` -> Timestamp
     */
    created_at: Timestamp
    /**
     * Updated types: `Timestamp` -> Timestamp
     */
    deleted_at?: Timestamp
    /**
     * Updated types: `Timestamp` -> Timestamp
     */
    edited_at?: Timestamp
    edited_by_id?: number
    forum_id: number
    id: number
    topic_id: number
    user_id: number
}

export interface ForumPostBody {
    /**
     * Post content in HTML format.
     */
    html?: string
    /**
     * Post content in BBCode format.
     */
    raw?: string
}

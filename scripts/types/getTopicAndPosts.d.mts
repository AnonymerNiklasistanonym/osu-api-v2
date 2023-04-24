// This is an auto generated file

// Types: GetTopicAndPostsResponseFormat

// Type imports
import type { ForumPost } from "./forumPost.d.mjs"
import type { ForumTopic } from "./forumTopic.d.mjs"

/**
 * [Source](https://osu.ppy.sh/docs/index.html#responseformat)
 */
export interface GetTopicAndPostsResponseFormat {
    /**
     * Updated types: `CursorString` -> CursorString
     */
    cursor_string: CursorString
    /**
     * Updated types: `ForumPost`[] -> ForumPost[]
     */
    posts: ForumPost[]
    search: unknown
    /**
     * Updated types: `ForumTopic` -> ForumTopic
     */
    topic: ForumTopic
}

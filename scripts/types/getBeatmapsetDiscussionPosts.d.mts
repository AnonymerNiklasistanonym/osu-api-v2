// This is an auto generated file

// Types: GetBeatmapsetDiscussionPostsResponseFormat

// Type imports
import type { BeatmapsetCompact } from "./beatmapsetCompact.d.mjs"
import type { BeatmapsetDiscussionPost } from "./beatmapsetDiscussionPost.d.mjs"
import type { UserCompact } from "./userCompact.d.mjs"

/**
 * [Source](https://osu.ppy.sh/docs/index.html#responseformat)
 */
export interface GetBeatmapsetDiscussionPostsResponseFormat {
    /**
     * Updated types: `BeatmapsetCompact` -> BeatmapsetCompact
     */
    beatmapsets: BeatmapsetCompact
    /**
     * Updated types: `CursorString` -> CursorString
     */
    cursor_string: CursorString
    /**
     * Updated types: `BeatmapsetDiscussionPost`[] -> BeatmapsetDiscussionPost[]
     */
    posts: BeatmapsetDiscussionPost[]
    /**
     * Updated types: `UserCompact` -> UserCompact
     */
    users: UserCompact
}

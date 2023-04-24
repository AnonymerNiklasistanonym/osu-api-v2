// This is an auto generated file

// Types: GetBeatmapsetDiscussionVotesResponseFormat

// Type imports
import type { BeatmapsetDiscussion } from "./beatmapsetDiscussion.d.mjs"
import type { BeatmapsetDiscussionVote } from "./beatmapsetDiscussionVote.d.mjs"
import type { UserCompact } from "./userCompact.d.mjs"

/**
 * [Source](https://osu.ppy.sh/docs/index.html#responseformat)
 */
export interface GetBeatmapsetDiscussionVotesResponseFormat {
    /**
     * Updated types: `CursorString` -> CursorString
     */
    cursor_string: CursorString
    /**
     * Updated types: `BeatmapsetDiscussion` -> BeatmapsetDiscussion
     */
    discussions: BeatmapsetDiscussion
    /**
     * Updated types: `UserCompact` -> UserCompact
     */
    users: UserCompact
    /**
     * Updated types: `BeatmapsetDiscussionVote`[] -> BeatmapsetDiscussionVote[]
     */
    votes: BeatmapsetDiscussionVote[]
}

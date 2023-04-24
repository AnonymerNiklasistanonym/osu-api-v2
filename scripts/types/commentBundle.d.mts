// This is an auto generated file

// Types: CommentBundle

// Type imports
import type { Comment } from "./comment.d.mjs"
import type { CommentableMeta } from "./beatmapCompact.d.mjs"
import type { UserCompact } from "./userCompact.d.mjs"

/**
 * @example
 * ```json
 * {
 *   "commentable_meta": [
 *     {
 *       "id": 407,
 *       "title": "Clicking circles linked to increased performance",
 *       "type": "news_post",
 *       "url": "https://osu.ppy.sh/home"
 *     }
 *   ],
 *   "comments": [
 *     {
 *       "commentable_id": 407,
 *       "commentable_type": "news_post",
 *       "created_at": "2019-09-05T06:31:20+00:00",
 *       "deleted_at": null,
 *       "edited_at": null,
 *       "edited_by_id": null,
 *       "id": 276,
 *       "legacy_name": null,
 *       "message": "yes",
 *       "message_html": "yes\n",
 *       "parent_id": null,
 *       "replies_count": 0,
 *       "updated_at": "2019-09-05T06:31:20+00:00",
 *       "user_id": 1,
 *       "votes_count": 1337
 *     },
 *     {
 *       "commentable_id": 407,
 *       "commentable_type": "news_post",
 *       "created_at": "2019-09-05T07:31:20+00:00",
 *       "deleted_at": null,
 *       "edited_at": null,
 *       "edited_by_id": null,
 *       "id": 277,
 *       "legacy_name": null,
 *       "message": "absolutely",
 *       "message_html": "absolutely\n",
 *       "parent_id": null,
 *       "replies_count": 0,
 *       "updated_at": "2019-09-05T07:31:20+00:00",
 *       "user_id": 2,
 *       "votes_count": 1337
 *     }
 *   ],
 *   "has_more": true,
 *   "has_more_id": 276,
 *   "included_comments": [],
 *   "pinned_comments": [],
 *   "sort": "new",
 *   "user_follow": false,
 *   "user_votes": [277],
 *   "users": [
 *     {
 *       "avatar_url": "https://a.ppy.sh/2?1519081077.png",
 *       "country_code": "AU",
 *       "default_group": "pippi",
 *       "id": 1,
 *       "is_active": true,
 *       "is_bot": false,
 *       "is_online": true,
 *       "is_supporter": true,
 *       "last_visit": "2025-09-05T08:35:00+00:00",
 *       "pm_friends_only": false,
 *       "profile_colour": null,
 *       "username": "pippi"
 *     },
 *     {
 *       "avatar_url": "https://a.ppy.sh/2?1519081077.png",
 *       "country_code": "AU",
 *       "default_group": "yuzu",
 *       "id": 2,
 *       "is_active": true,
 *       "is_bot": false,
 *       "is_online": false,
 *       "is_supporter": true,
 *       "last_visit": "2025-09-04T09:28:00+00:00",
 *       "pm_friends_only": false,
 *       "profile_colour": null,
 *       "username": "yuzu"
 *      }
 *   ]
 * }
 * ```
 * Comments and related data.
 * [Source](https://osu.ppy.sh/docs/index.html#commentbundle)
 */
export interface CommentBundle {
    /**
     * ID of the object the comment is attached to
     * Updated types: `CommentableMeta`[] -> CommentableMeta[]
     */
    commentable_meta: CommentableMeta[]
    /**
     * Array of comments ordered according to `sort`;
     * Updated types: `Comment`[] -> Comment[]
     */
    comments: Comment[]
    /**
     * Updated types: `Cursor` -> Cursor
     */
    cursor: Cursor
    /**
     * If there are more comments or replies available
     */
    has_more: boolean
    has_more_id?: number
    /**
     * Related comments; e.g. parent comments and nested replies
     * Updated types: `Comment`[] -> Comment[]
     */
    included_comments: Comment[]
    /**
     * Pinned comments
     * Updated types: `Comment`[] -> Comment[]
     */
    pinned_comments?: Comment[]
    /**
     * one of the `CommentSort` types
     */
    sort: string
    /**
     * Number of comments at the top level. Not returned for replies.
     */
    top_level_count?: number
    /**
     * Total number of comments. Not retuned for replies.
     */
    total?: number
    /**
     * is the current user watching the comment thread?
     */
    user_follow: boolean
    /**
     * IDs of the comments in the bundle the current user has upvoted
     * Updated types: number[] -> number[]
     */
    user_votes: number[]
    /**
     * array of users related to the comments
     * Updated types: `UserCompact`[] -> UserCompact[]
     */
    users: UserCompact[]
}

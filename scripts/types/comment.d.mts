// This is an auto generated file

// Types: Comment

/**
 * @example
 * ```json
 * {
 *   "commentable_id": 407,
 *   "commentable_type": "news_post",
 *   "created_at": "2019-09-05T06:31:20+00:00",
 *   "deleted_at": null,
 *   "edited_at": null,
 *   "edited_by_id": null,
 *   "id": 276,
 *   "legacy_name": null,
 *   "message": "yes",
 *   "message_html": "yes\n",
 *   "parent_id": null,
 *   "pinned": true,
 *   "replies_count": 0,
 *   "updated_at": "2019-09-05T06:31:20+00:00",
 *   "user_id": 1,
 *   "votes_count": 0
 * }
 * ```
 * Represents an single comment.
 * [Source](https://osu.ppy.sh/docs/index.html#comment)
 */
export interface Comment {
    /**
     * ID of the object the comment is attached to
     */
    commentable_id: number
    /**
     * type of object the comment is attached to
     */
    commentable_type: string
    /**
     * ISO 8601 date
     */
    created_at: string
    /**
     * ISO 8601 date if the comment was deleted; null, otherwise
     */
    deleted_at?: string
    /**
     * ISO 8601 date if the comment was edited; null, otherwise
     */
    edited_at?: string
    /**
     * user id of the user that edited the post; null, otherwise
     */
    edited_by_id?: number
    /**
     * the ID of the comment
     */
    id: number
    /**
     * username displayed on legacy comments
     */
    legacy_name?: string
    /**
     * markdown of the comment's content
     */
    message?: string
    /**
     * html version of the comment's content
     */
    message_html?: string
    /**
     * ID of the comment's parent
     */
    parent_id?: number
    /**
     * Pin status of the comment
     */
    pinned: boolean
    /**
     * number of replies to the comment
     */
    replies_count: number
    /**
     * ISO 8601 date
     */
    updated_at: string
    /**
     * user ID of the poster
     */
    user_id: number
    /**
     * number of votes
     */
    votes_count: number
}

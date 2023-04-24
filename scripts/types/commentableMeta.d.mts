// This is an auto generated file

// Types: CommentableMetaAvailable, CommentableMetaDeleted, CurrentUserAttributes

/**
 * @example
 * ```json
 * {
 *   "id": 407,
 *   "title": "Clicking circles linked to increased performance",
 *   "type": "news_post",
 *   "url": "https://osu.ppy.sh/home/"
 * }
 * ```
 * Metadata of the object that a comment is attached to.
 * If object is available:
 * [Source](https://osu.ppy.sh/docs/index.html#commentablemeta)
 */
export interface CommentableMetaAvailable {
    /**
     * Updated types: `CurrentUserAttributes` -> CurrentUserAttributes
     */
    current_user_attributes: CurrentUserAttributes
    /**
     * the ID of the object
     */
    id: number
    /**
     * User ID which owns the object
     */
    owner_id?: number
    /**
     * Object owner type, used for display (`MAPPER` for beatmapset)
     */
    owner_title?: string
    /**
     * display title
     */
    title: string
    /**
     * the type of the object
     */
    type: string
    /**
     * url of the object
     */
    url: string
}

/**
 * Otherwise if object has been deleted:
 * [Source](https://osu.ppy.sh/docs/index.html#commentablemeta)
 */
export interface CommentableMetaDeleted {
    /**
     * display title
     */
    title: string
}

/**
 * [Source](https://osu.ppy.sh/docs/index.html#currentuserattributes)
 */
export interface CurrentUserAttributes {
    /**
     * null if current user can comment on it, reason sentence otherwise
     */
    can_new_comment_reason?: string
}
